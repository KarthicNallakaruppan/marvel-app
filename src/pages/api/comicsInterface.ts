export interface ComicsResult {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string;
    modified: string;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: Array<unknown>;
    resourceURI: string;
    urls: Array<{
      type: string;
      url: string;
    }>;
    series: {
      resourceURI: string;
      name: string;
    };
    variants: Array<{
      resourceURI: string;
      name: string;
    }>;
    collections: Array<unknown>;
    collectedIssues: Array<unknown>; 
    dates: Array<{
      type: string;
      date: string;
    }>;
    prices: Array<{
      type: string;
      price: number;
    }>;
    thumbnail: {
      path: string;
      extension: string;
    };
    images: Array<unknown>;
    creators: {
      available: number;
      collectionURI: string;
      items: Array<{
        resourceURI: string;
        name: string;
        role: string;
      }>;
      returned: number;
    };
    characters: {
      available: number;
      collectionURI: string;
      items: Array<unknown>;
      returned: number;
    };
    stories: {
      available: number;
      collectionURI: string;
      items: Array<{
        resourceURI: string;
        name: string;
        type: string;
      }>;
      returned: number;
    };
    events: {
      available: number;
      collectionURI: string;
      items: Array<unknown>;
      returned: number;
    };
  }

  interface Comics {
    id: number;
    title: string;
    description: string;
    pageCount: number;
    thumbnail: {
      path: string;
      extension: string;
    };
  }
  
  export interface ComicsListProps {
    comics: Comics[];
  }
  