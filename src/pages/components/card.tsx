// components/Card.tsx
import React from 'react';
import Chip from './chip';
import Image from 'next/image'

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  chipLabel: string; // This can represent comics or any other count
  color?: 'green' | 'blue' | 'red' | 'yellow'; // Optional color for the Chip
  size?: 'small' | 'medium' | 'large'; // Optional size for the Chip
  displayDiscription?: boolean
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  chipLabel, 
  color = 'red', 
  size = 'medium' ,
  displayDiscription
}) => {
  return (
    <div className="cursor-pointer group relative flex flex-col h-full mb-2 bg-base-600 border border-base-700 rounded-lg hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-72 m-2.5 overflow-hidden text-white rounded-md">
        <div className='absolute z-10 top-2 left-2'>
          <Chip color={color} size={size} label={chipLabel} />
        </div>
        <Image
            src={imageUrl} 
            alt={title} 
            fill
            className="object-cover w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110" 
        />
      </div>
      <div className="p-4">
        <h6 className="mb-2 text-xl font-semibold">{title}</h6>
        {displayDiscription &&
        <p className="leading-normal text-sm font-extralight truncate text-gray-200">
          {description || 'No description available.'}
        </p>
        }
      </div>
    </div>
  );
};

export default Card;
