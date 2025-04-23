import { useState } from 'react';
import styled from 'styled-components';
import { Phone } from '../../../domain/entities/Phone';
import { usePhones } from '../../hooks/usePhones';
import { ProductCard } from '../../components/phones/ProductCard/ProductCard';
import { SearchBar } from '../../components/phones/SearchBar/SearchBar';

const PageContainer = styled.div`
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 2rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 2rem;

  h2 {
    margin: 0 0 1.5rem;
    font-size: 1.75rem;
    color: #ff0000;
  }

  p {
    color: #666;
    margin: 0 0 2rem;
    font-size: 1.125rem;
  }
`;

const ErrorText = styled.p`
  color: #ff0000;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  padding: 1rem 2rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #222;
  }
`;

export function PhoneListPage() {
  const [searchResults, setSearchResults] = useState<Phone[] | null>(null);
  const { data: phones, isLoading, error, refetch } = usePhones();

  const displayedPhones = searchResults || phones || [];

  if (error) {
    return (
      <ErrorContainer>
        <h2>Error</h2>
        <p>
          {error instanceof Error ? error.message : 'Error loading phones. Please try again later.'}
        </p>
        <RetryButton onClick={() => refetch()}>Retry Loading</RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <PageContainer>
      <SearchContainer>
        <SearchBar
          onSearch={setSearchResults}
          onResultsChange={() => {}} // We can safely ignore the result count
        />
      </SearchContainer>

      {isLoading ? (
        <LoadingContainer>
          <p>Loading phones...</p>
        </LoadingContainer>
      ) : (
        <ProductGrid>
          {displayedPhones.map((phone) => (
            <ProductCard key={phone.id} phone={phone} />
          ))}
        </ProductGrid>
      )}
    </PageContainer>
  );
}
