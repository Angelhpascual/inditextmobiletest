import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createGlobalStyle } from 'styled-components';
import { CartProvider } from './presentation/context/CartContext';
import { Header } from './presentation/components/common/Header/Header';
import { PhoneListPage } from './presentation/pages/PhoneListPage/PhoneListPage';
import { PhoneDetailPage } from './presentation/pages/PhoneDetailPage/PhoneDetailPage';
import { CartPage } from './presentation/pages/CartPage/CartPage';

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --max-width: 1400px;
    --header-height: 72px;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main {
    min-height: calc(100vh - var(--header-height));
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 1rem;
    
    @media (min-width: 768px) {
      padding: 2rem;
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <GlobalStyle />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<PhoneListPage />} />
            <Route path="/phone/:id" element={<PhoneDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
