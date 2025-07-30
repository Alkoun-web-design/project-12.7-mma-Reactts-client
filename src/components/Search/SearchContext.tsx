import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { serverAPI } from '../Utilities';

// Add backend API URL from environment variables
// const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:5000/api';

export type SearchFilter = 'all' | 'admin' | 'tutors' | 'counsellors' 
| 'classroom-schedules' | 'subjects' | 'classes' 
| 'standardized-test-prep' | 'study-coaching' | 'student-clubs' 
| 'academic-resources' | 'faqs' | 'pricing' | 'languages'
| 'educational-services' | 'services-pricing';

// Define search result interface
export interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  path: string;
  category: SearchFilter;
}

// Define raw API result interface
export interface RawSearchResult {
  id?: string | number;
  title?: string;
  description?: string;
  path?: string;
  category?: SearchFilter;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchContextType {
  isSearchOpen: boolean;
  searchQuery: string;
  activeFilters: SearchFilter[];
  searchResults: SearchResultItem[];
  isLoading: boolean;
  error: string | null;
  setIsSearchOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  toggleFilter: (filter: SearchFilter) => void;
  setSearchResults: (results: SearchResultItem[]) => void;
}

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>(['all']);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add new effect to perform search when query or filters change
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery || searchQuery.length < 2) {
        setSearchResults([]);
        setIsLoading(false); // Reset loading state when search is aborted
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${serverAPI}search?q=${encodeURIComponent(searchQuery)}&filters=${encodeURIComponent(JSON.stringify(activeFilters))}`);
        
        if (!response.ok) {
          throw new Error(`Search failed: ${response.status} ${response.statusText}`);
        }
        
        const results = await response.json();
        
        // Transform results to have consistent structure
        const transformedResults = results.map((result: RawSearchResult, index: number) => ({
          ...result,
          id: result.id?.toString() || `item-${index}`,
          title: result.title || 'Untitled',
          description: result.description || '',
          path: result.path || '#',
          category: result.category || 'all'
        }));
        
        setSearchResults(transformedResults);
      } catch (err) {
        setError(`Failed to perform search: ${err instanceof Error ? err.message : 'Unknown error'}`);
        console.error('Search error:', err);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    performSearch();
  }, [searchQuery, activeFilters]);

  const toggleFilter = (filter: SearchFilter) => {
    setActiveFilters(prev => {
      if (filter === 'all') {
        return ['all'];
      }
      const newFilters = prev.filter(f => f !== 'all' && f !== filter);
      if (!prev.includes(filter)) {
        newFilters.push(filter);
      }
      return newFilters.length === 0 ? ['all'] : newFilters;
    });
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        searchQuery,
        activeFilters,
        searchResults,
        isLoading,
        error,
        setIsSearchOpen,
        setSearchQuery,
        toggleFilter,
        setSearchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
