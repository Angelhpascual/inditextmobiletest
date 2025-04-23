import styled from 'styled-components';
import { Phone } from '../../../../domain/entities/Phone';

interface ProductCardProps {
  phone: Phone;
}

const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const ImageContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  border-radius: 16px 16px 0 0;

  img {
    max-width: 200px;
    height: auto;
    object-fit: contain;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
`;

const Description = styled.p`
  margin: 0 0 1rem;
  color: #666;
  font-size: 0.875rem;
  line-height: 1.5;
  flex-grow: 1;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const AddToCartButton = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background: #0052a3;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

export function ProductCard({ phone }: ProductCardProps) {
  return (
    <Card>
      <ImageContainer>
        <img src={phone.image} alt={`${phone.brand} ${phone.model}`} />
      </ImageContainer>
      <Content>
        <Title>
          {phone.brand} {phone.model}
        </Title>
        <Description>{phone.description}</Description>
        <Price>€{phone.price.toFixed(2)}</Price>
        <AddToCartButton>Add to Cart</AddToCartButton>
      </Content>
    </Card>
  );
}
