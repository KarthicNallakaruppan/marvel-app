import React from 'react';
import Card from './../components/card';
import { ComicsListProps } from '../api/comicsInterface'


const ComicsList: React.FC<ComicsListProps> = ({ comics }) => {
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {(comics || []).map((comic) => {
          const label = comic.pageCount > 0 ? `${comic.pageCount} pages` : 'Not available'
          
          return (
            <Card
              key={comic.id}
              title={comic.title}
              description={comic.description}
              imageUrl={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              chipLabel={label}
              color='blue'
            />
          );
        })}
      </div>
    );
  };

export default ComicsList;


