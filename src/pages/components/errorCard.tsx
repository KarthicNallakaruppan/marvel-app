// components/errorCard.tsx
import React from 'react';
import Image from 'next/image'
import Chip from './chip';

interface ErrorCardProps {
  image?: string; // Optional label for the image  
  label?: string; // Optional label for the label
  description?: string; // Optional label for the error description
}

const Loader: React.FC<ErrorCardProps> = ({ image = '/error.jpg', label = 'There was an error. Please try again later', description }) => {
  return (
    <div className="cursor-pointer group relative flex flex-col w-96 mx-auto h-full mb-2 bg-base-600 border border-base-700 rounded-lg hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-72 m-2.5 overflow-hidden text-white rounded-md">
        <Image
            src={image}
            alt={label} 
            fill
            className="object-cover w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110" 
        />
      </div>
      <div className="p-4">
        <h6 className="mb-4 text-xl font-semibold">{label}</h6>
        { description && <Chip color='red' size='medium' label={description} />}
      </div>
    </div>
  );
};

export default Loader;
