// pages/characters/[id].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchCharacterByIdApi } from './../api/services';
import { Character } from '../api/characterInterfaces';
import Image from 'next/image';
import List from '../components/list';
import { debounce } from './../api/utilities';
import Loader  from '../components/loader';

const CharacterPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Extract the dynamic parameter
  const [character, setCharacter] = useState<Character | null>(null); // State for the character data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Debounced function to fetch character data
  const fetchCharacter = debounce(async (characterId: number) => {
    try {
      setLoading(true); // Set loading to true before fetching
      const characterData = await fetchCharacterByIdApi(characterId); // Fetch character data
      setCharacter(characterData); // Set character data
      console.log(characterData);
    } catch (err: unknown) {
      console.error(err);
      setError('Error loading character details'); // Set error message if fetching fails
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }, 300); // Set debounce delay to 300ms

  useEffect(() => {
    // Check if the ID is available and is a valid number
    if (id && !Array.isArray(id)) {
      fetchCharacter(Number(id)); // Call the debounced fetch function
    }
  }, [id]); // Run the effect when the ID changes

  // Conditional rendering based on loading and error states
  if (loading) {
    return <Loader label='Unmasking your hero... Hold tight!' isLoading={loading}/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!character) {
    return <div>No character data available.</div>;
  }

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-base-600 border border-base-700 rounded-lg h-3/5 flex flex-col">
          <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 py-4 flex-grow">
            <Image
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded-lg"
            />
            <h1 className="z-10 text-2xl font-medium text-white py-4 xs:text-xl md:text-3xl">{character.name}</h1>
            {character.description && (
              <p className="leading-normal font-extralight text-gray-200">
                {character.description || 'No description available.'}
              </p>
            )}
          </div>
        </div>
        <div className="col-span-3 sm:col-span-1 md:col-span-3 bg-base-600 border border-base-700 rounded-lg h-3/5 flex flex-col">
          <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 py-4 flex-grow">
            <h1 className="z-10 text-2xl font-medium text-white py-4 xs:text-xl md:text-3xl">Comics</h1>
            <List items={character.comics.items} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterPage;
