// components/List.tsx
import React from 'react';

interface Item {
  name: string;
}

interface ListProps {
  items: Item[];
}

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul className="space-y-2 overflow-y-auto h-full">
      {(items || []).map((item, index) => (
        <li key={index} className="bg-base-600 text-white p-4 border-b-2 border-base-700 hover:bg-background transition duration-200">
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default List;
