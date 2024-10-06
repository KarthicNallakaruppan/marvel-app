import React, { useEffect, useState, useRef, useCallback } from 'react';
import CharacterList from './charactersList';
import Loader from '../components/loader';
import { fetchCharactersApi, fetchCharactersByNameApi } from './../api/services';
import { CharacterResult } from '../api/characterInterfaces';
import ErrorCard from './../components/errorCard';
import { debounce } from './../api/utilities';

const CharacterListContainer: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState<unknown | null>(null); 
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); // For search input
  const [isSearchMode, setIsSearchMode] = useState(false); // Track if in search mode

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false); // Track fetching state

  // Function to fetch characters based on the current offset or search query
  const fetchCharacters = async () => {
    if (isFetchingRef.current || !hasMore) return; // Prevent multiple requests

    setLoading(true); 

    isFetchingRef.current = true; // Set fetching state to true
    try {
      const data = isSearchMode
        ? await fetchCharactersByNameApi(searchQuery, offset) // Fetch by name if searchQuery exists
        : await fetchCharactersApi(offset); // Otherwise, fetch by offset

      setErrorState(null);

      if (data.results.length > 0) {
        setCharacters((prev) => [...prev, ...data.results]); // Append new data
        setOffset((prev) => prev + data.results.length); // Increment offset
      } else {
        setHasMore(false); // No more data to fetch
      }
    } catch (errors) {
      console.error(errors);
      setErrorState(errors);
    } finally {
      setLoading(false); // Ensure loading is set to false at the end
      isFetchingRef.current = false; // Reset fetching state
    }
  };


  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setOffset(0); // Reset offset on a new search
      setCharacters([]); // Clear previous results
      setIsSearchMode(!!query); // Set search mode based on input
      setSearchQuery(query);
    }, 300), []); // Debouncing the search for 300ms

  // Fetch characters initially and whenever the search query or offset changes
  useEffect(() => {
    fetchCharacters();
  }, [searchQuery]);

  // Set up Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('Loader is visible. Fetching more characters...');
          fetchCharacters(); // Fetch more characters when loader comes into view
        }
      },
      { threshold: 1.0 } // Trigger when the loader is fully visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current); // Start observing the loader
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current); // Cleanup the observer
      }
    };
  }, [loaderRef, characters]);

  return (
    <>
      {/* Search input */}
      <input
        className='p-2 text-white bg-base-600 border border-base-700 rounded-md mb-8 ml-auto w-96 flex'
        type="text"
        placeholder="Search characters by name"
        onChange={(e) => debouncedSearch(e.target.value)} // Throttle the search input
      />
  
      {/* Render error state */}
      {errorState ? (
        <ErrorCard label='Oops! Our superheroes are busy saving the world. Try to catch them later!' description={`${errorState}`} />
      ) : (
        <>
          {/* Render loading state or character list */}
          {characters.length === 0 && loading ? (
            <Loader label='Assembling your Marvel heroes…' isLoading={loading} />
          ) : (
            <>
              <CharacterList characters={characters} />
              {hasMore && (
                <>
                  <Loader label='Unleashing more superheroes…' isLoading={loading} />
                  <div ref={loaderRef} style={{ height: '20px' }} /> {/* Loader */}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
  
};

export default CharacterListContainer;
