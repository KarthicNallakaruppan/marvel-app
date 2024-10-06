import React, { useEffect, useState, useRef } from 'react';
import CharacterList from './charactersList';
import Loader  from '../components/loader';
import { fetchCharactersApi } from './../api/services';
import { CharacterResult } from '../api/characterInterfaces'
import ErrorCard from './../components/errorCard'

const CharacterListContainer: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState<unknown | null>(null); 
  const [hasMore, setHasMore] = useState(true);

  const [offset, setOffset] = useState(0);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false); // Track fetching state

  // Function to fetch characters based on the current offset
  const fetchCharacters = async () => {
    if (isFetchingRef.current || !hasMore) return; // Prevent multiple requests
    
    setLoading(true);
    isFetchingRef.current = true; // Set fetching state to true
    try{
        const data = await fetchCharactersApi(offset); // Fetch with current offset
        setErrorState(null)
        if (data.results.length > 0) {
          setCharacters((prev) => [...prev, ...data.results]); // Append new data.results
          setOffset((prev) => prev + data.results.length); // Increment offset
        } else {
          setHasMore(false); // No more data to fetch
        }
    } catch (errors) {
      console.log(errors)
        console.error(errors)
        setErrorState(errors)
    } finally {
        setLoading(false); // Ensure loading is set to false at the end
        isFetchingRef.current = false; // Reset fetching state
    }
  };

 // Fetch characters initially
  useEffect(() => {
    fetchCharacters();
  },[]);

  // Set up Intersection Observer
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
      console.log('Observer is set up to observe the loader.');
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current); // Cleanup the observer
        console.log('Observer cleaned up.');
      }
    };
  },[loaderRef , characters]);

  // Render error state
  if (errorState) return <ErrorCard label='Oops! Our superheroes are busy saving the world. Try to catch them later!' description={`${errorState}`}/>; // Display error message

  // Render loading state or character list
  if (characters.length === 0 && loading) return <Loader label='Assembling your Marvel heroes…' isLoading={loading}/> // Show loading initially

  return (
    <>
      <CharacterList characters={characters} />
      <Loader label='Unleashing more superheroes…' isLoading={loading}/>
      {hasMore && <div ref={loaderRef} style={{ height: '20px' }} />} {/* Loader */}
    </>
  );
};

export default CharacterListContainer;
