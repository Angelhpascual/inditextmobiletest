import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../../context/CartContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 1.25rem 2rem;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
  color: #000;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CartButton = styled(Link)`
  position: relative;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  color: #000;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 1.125rem;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff0000;
  color: white;
  border-radius: 50%;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  min-width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export function Header() {
  const { itemCount } = useCart();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">Mobile Catalog</Logo>
        <CartButton to="/cart">
          🛒 Cart
          {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
        </CartButton>
      </HeaderContent>
    </HeaderContainer>
  );
}
