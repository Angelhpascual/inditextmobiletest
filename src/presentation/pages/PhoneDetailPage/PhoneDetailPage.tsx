import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { usePhoneDetail, useSimilarPhones } from '../../hooks/usePhones';
import { useCart } from '../../context/CartContext';
import { StorageOption } from '../../../domain/entities/Phone';
import { ProductCard } from '../../components/phones/ProductCard/ProductCard';

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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }

  @media (min-width: 1024px) {
    gap: 6rem;
  }
`;

const ImageContainer = styled.div`
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  position: sticky;
  top: 2rem;

  @media (min-width: 1024px) {
    min-height: 600px;
    padding: 3rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 1024px) {
    max-height: 500px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    gap: 2.5rem;
    padding-top: 1rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  line-height: 1.2;

  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const Brand = styled.p`
  margin: 0;
  color: #666;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  margin: 1rem 0 0;
  font-size: 1.75rem;
  font-weight: bold;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const SelectionContainer = styled.div`
  margin: 0;
`;

const Label = styled.p`
  margin: 0 0 0.75rem;
  font-weight: 600;
  font-size: 1rem;

  @media (min-width: 1024px) {
    font-size: 1.125rem;
  }
`;

const Options = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Option = styled.button<{ selected?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${(props) => (props.selected ? '#000' : '#eee')};
  background: ${(props) => (props.selected ? '#000' : 'transparent')};
  color: ${(props) => (props.selected ? '#fff' : '#000')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;

  &:hover {
    border-color: #000;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (min-width: 1024px) {
    padding: 0.875rem 1.75rem;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #222;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (min-width: 1024px) {
    margin-top: 2rem;
    font-size: 1.25rem;
  }
`;

const SimilarProducts = styled.div`
  margin-top: 6rem;

  h2 {
    font-size: 1.75rem;
    margin-bottom: 2rem;
    text-align: center;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const SimilarProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 2rem;
  }
`;

export function PhoneDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: phone, isLoading, error } = usePhoneDetail(id);
  const { data: similarPhones } = useSimilarPhones(id);
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null);

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (error || !phone) {
    return <PageContainer>Error loading phone details.</PageContainer>;
  }

  const handleAddToCart = () => {
    if (selectedColor && selectedStorage) {
      addToCart(phone, selectedColor, selectedStorage);
      navigate('/cart');
    }
  };

  const canAddToCart = selectedColor && selectedStorage;

  return (
    <PageContainer>
      <ContentGrid>
        <ImageContainer>
          <Image src={phone.image} alt={`${phone.brand} ${phone.model}`} />
        </ImageContainer>
        <Details>
          <div>
            <Brand>{phone.brand}</Brand>
            <Title>{phone.model}</Title>
            <Price>
              €
              {selectedStorage
                ? phone.getFullPrice(selectedStorage).toFixed(2)
                : phone.price.toFixed(2)}
            </Price>
          </div>

          <SelectionContainer>
            <Label>Color</Label>
            <Options>
              {phone.colors.map((color) => (
                <Option
                  key={color}
                  selected={color === selectedColor}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Option>
              ))}
            </Options>
          </SelectionContainer>

          <SelectionContainer>
            <Label>Storage</Label>
            <Options>
              {phone.storageOptions.map((option) => (
                <Option
                  key={option.size}
                  selected={option === selectedStorage}
                  onClick={() => setSelectedStorage(option)}
                >
                  {option.size}
                </Option>
              ))}
            </Options>
          </SelectionContainer>

          <AddToCartButton disabled={!canAddToCart} onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
        </Details>
      </ContentGrid>

      {similarPhones && similarPhones.length > 0 && (
        <SimilarProducts>
          <h2>Similar Products</h2>
          <SimilarProductsGrid>
            {similarPhones.map((phone) => (
              <ProductCard key={phone.id} phone={phone} />
            ))}
          </SimilarProductsGrid>
        </SimilarProducts>
      )}
    </PageContainer>
  );
}
