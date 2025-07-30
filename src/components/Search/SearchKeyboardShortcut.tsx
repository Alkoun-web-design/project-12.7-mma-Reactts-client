import React, { useEffect } from 'react';
import { useSearch } from './SearchContext';

export const SearchKeyboardShortcut: React.FC = () => {
  const { setIsSearchOpen } = useSearch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  return null;
};
