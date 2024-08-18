import { createContext, useContext, useState } from 'react';

const SearchResultsContext = createContext();

export const useSearchResults = () => {
  return useContext(SearchResultsContext);
};

export const SearchResultsProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <SearchResultsContext.Provider value={{ searchResults, updateSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
};

