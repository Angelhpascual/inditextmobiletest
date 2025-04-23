import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';

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

const CartLayout = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 380px;
    align-items: start;
    gap: 3rem;
  }
`;

const Title = styled.h1`
  margin: 0 0 2rem;
  font-size: 1.75rem;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin: 0 0 3rem;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h2 {
    margin: 0 0 1.5rem;
    font-size: 1.75rem;
  }

  p {
    color: #666;
    margin: 0 0 2rem;
    font-size: 1.125rem;
  }
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #000;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #222;
    transform: translateY(-1px);
  }
`;

const CartItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

const CartItemCard = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  @media (min-width: 768px) {
    grid-template-columns: 140px 1fr auto;
    padding: 2rem;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: contain;
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 0.75rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    height: 140px;
    padding: 1rem;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ItemSpecs = styled.p`
  margin: 0;
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
`;

const ItemPrice = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const RemoveButton = styled.button`
  padding: 0.5rem;
  background: none;
  border: none;
  color: #ff0000;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  transition: color 0.2s ease;
  height: fit-content;

  &:hover {
    color: #cc0000;
  }
`;

const OrderSummary = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 2rem;

  @media (min-width: 1024px) {
    padding: 2.5rem;
  }
`;

const SummaryTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.125rem;

  &:last-child {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 2px solid #eee;
    font-weight: 600;
    font-size: 1.375rem;
  }
`;

export function CartPage() {
  const { cart, removeFromCart, totalPrice } = useCart();
  const items = cart.getItems();

  if (items.length === 0) {
    return (
      <PageContainer>
        <EmptyCart>
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart to continue shopping</p>
          <ContinueShoppingButton to="/">Continue Shopping</ContinueShoppingButton>
        </EmptyCart>
      </PageContainer>
    );
  }

  const subtotal = totalPrice;
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <PageContainer>
      <Title>Shopping Cart ({items.length} items)</Title>

      <CartLayout>
        <CartItemList>
          {items.map((item) => (
            <CartItemCard
              key={`${item.phone.id}-${item.selectedColor}-${item.selectedStorage.size}`}
            >
              <ItemImage src={item.phone.image} alt={`${item.phone.brand} ${item.phone.model}`} />
              <ItemInfo>
                <ItemTitle>
                  {item.phone.brand} {item.phone.model}
                </ItemTitle>
                <ItemSpecs>
                  Color: {item.selectedColor} | Storage: {item.selectedStorage.size}
                </ItemSpecs>
                <ItemPrice>€{item.phone.getFullPrice(item.selectedStorage).toFixed(2)}</ItemPrice>
                <ItemSpecs>Quantity: {item.quantity}</ItemSpecs>
              </ItemInfo>
              <RemoveButton
                onClick={() =>
                  removeFromCart(item.phone.id, item.selectedColor, item.selectedStorage.size)
                }
              >
                Remove
              </RemoveButton>
            </CartItemCard>
          ))}
        </CartItemList>

        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryRow>
            <span>Subtotal</span>
            <span>€{subtotal.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </SummaryRow>
          <ContinueShoppingButton to="/" style={{ width: '100%', textAlign: 'center' }}>
            Continue Shopping
          </ContinueShoppingButton>
        </OrderSummary>
      </CartLayout>
    </PageContainer>
  );
}
