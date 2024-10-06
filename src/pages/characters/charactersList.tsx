import React from 'react';
import Card from './../components/card';
import { CharacterListProps, ChipColor } from '../api/characterInterfaces'
import Link from 'next/link';

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {

    // Function to determine label and color based on comics count
    const getChipProps = (available: number): { label: string; color: ChipColor } => {
      if (available === 0) {
        return { label: 'No comics', color: 'red' };
      } else {
        return { label: `${available} comics`, color: 'green' };
      }
    };
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {(characters || []).map((character) => {
          const { label, color } = getChipProps(character.comics.available);
          
          return (
            <Link className='flex flex-col' href={`/characters/${character.id}`} key={character.id} passHref>
              <Card
                title={character.name}
                description={character.description}
                imageUrl={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                chipLabel={label}
                color={color} // Set color based on comics count
                size="medium" // Set size for the Chip
                displayDiscription
              />
            </Link> 
          );
        })}
      </div>
    );
  };

export default CharacterList;


