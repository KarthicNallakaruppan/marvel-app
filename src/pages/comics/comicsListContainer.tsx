import React, { useEffect, useState, useRef } from 'react';
import ComicsList from './comicsList';
import Loader  from '../components/loader';
import { fetchComicsApi } from './../api/services';
import { ComicsResult }  from './../api/comicsInterface'
import ErrorCard from './../components/errorCard'

const ComicsListContainer: React.FC = () => {
  const [comics, setcomics] = useState<ComicsResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [errorState, setErrorState] = useState<unknown | null>(null); 
  const [offset, setOffset] = useState(0);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false); // Track fetching state

  // Function to fetch comics based on the current offset
  const fetchComics = async () => {
    if (isFetchingRef.current || !hasMore) return; // Prevent multiple requests
    
    setLoading(true);
    isFetchingRef.current = true; // Set fetching state to true

    try{
      const data = await fetchComicsApi(offset); // Fetch with current offset
      if (data.results.length > 0) {
        setcomics((prev) => [...prev, ...data.results]); // Append new data.results
        setOffset((prev) => prev + data.results.length); // Increment offset
      } else {
        setHasMore(false); // No more data to fetch
      }
    } catch (errors) {
      console.error(errors)
      setErrorState(errors)
    } finally {
      setLoading(false);
      isFetchingRef.current = false; // Reset fetching state
    }
  };

 // Fetch comics initially
  useEffect(() => {
    fetchComics();
  }, []);

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('Loader is visible. Fetching more comics...');
          fetchComics(); // Fetch more comics when loader comes into view
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
  },[loaderRef , comics]);

    // Render error state
    if (errorState) return <ErrorCard label='Sorry! The comic book vault is currently unavailable. Come back soon!' description={`${errorState}`} image='/error-two.jpg'/>; // Display error message

  // Render loading state or comics list
  if (comics.length === 0 && loading) return <Loader label='Gathering epic tales from the Marvel Universe...' isLoading={loading}/> // Show loading initially

  return (
    <>
      <ComicsList comics={comics} />
      <Loader label='Fetching additional stories from the multiverse...' isLoading={loading}/>
      {hasMore && <div ref={loaderRef} style={{ height: '20px' }} />} {/* Loader */}
    </>
  );
};

export default ComicsListContainer;

