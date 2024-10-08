// src/types/characterInterfaces.ts
// Interface for the comic items
interface ComicItem {
    resourceURI: string;
    name: string;
}

// Interface for the comics object
interface Comics {
    available: number;
    collectionURI: string;
    items: ComicItem[];
    returned: number; // Assuming this is the count of comics returned in the response
}

// Interface for the thumbnail object
interface Thumbnail {
    path: string;
    extension: string;
}

// Interface for the individual character result
export interface CharacterResult {
    id: number;
    name: string;
    description: string;
    modified: string; // Use a string for ISO date format
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: Comics;
}

// Interface for the comics array
export interface comicsList {
    name: string;
    resourceURI: string;
}


export interface Character {
    id: number;
    name: string;
    description: string;
    comics: {
        available: number;
        items: comicsList[];
    };
    thumbnail: {
        path: string;
        extension: string;
    };
}

export interface CharacterListProps {
    characters: Character[];
}

// Define a type for the possible chip colors
export type ChipColor = 'green' | 'blue' | 'red' | 'yellow';
