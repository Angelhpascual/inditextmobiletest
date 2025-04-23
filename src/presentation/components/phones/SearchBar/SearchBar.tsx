import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchPhones } from '../../../hooks/usePhones';

interface SearchBarProps {
  onResultsChange: (count: number) => void;
  onSearch: (results: any[]) => void;
}

const SearchContainer = styled.div`
  margin: 0;
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 768px) {
    padding: 1.25rem 1.5rem;
    font-size: 1.125rem;
  }
`;

const ResultCount = styled.p`
  margin: 0.75rem 0 0;
  color: #666;
  font-size: 0.875rem;
  text-align: left;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export function SearchBar({ onResultsChange, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: searchResults, isLoading } = useSearchPhones(searchTerm);

  useEffect(() => {
    if (searchResults) {
      onResultsChange(searchResults.length);
      onSearch(searchResults);
    }
  }, [searchResults, onResultsChange, onSearch]);

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search phones by brand or model..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ResultCount>
        {isLoading
          ? 'Searching...'
          : searchTerm
            ? `Found ${searchResults?.length || 0} results`
            : ''}
      </ResultCount>
    </SearchContainer>
  );
}
