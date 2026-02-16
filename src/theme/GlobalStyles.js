import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    transition: background 0.3s ease, color 0.3s ease;
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.65;
    letter-spacing: 0.01em;
    margin: 0;
    padding: 0;
  }
  
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => (theme.background === '#f8f7f4' ? '#e5e5e0' : '#1a1a1a')};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.textMuted};
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.textSecondary};
  }
  
  ::selection {
    background: rgba(15, 23, 42, 0.15);
    color: inherit;
  }
  
  *:focus {
    outline: 2px solid ${({ theme }) => theme.textSecondary};
    outline-offset: 2px;
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .btn {
    transition: all 0.2s ease;
    border-radius: 6px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }
  
  .btn:hover {
    transform: none;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
  }
  
  .card {
    transition: all 0.2s ease;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 16px;
    overflow: hidden;
  }
  
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.shadowColor};
  }
  
  /* Override Bootstrap navbar for theme consistency */
  .navbar-dark .navbar-toggler {
    border-color: rgba(255,255,255,0.3);
  }
  
  .navbar-light .navbar-toggler {
    border-color: rgba(0,0,0,0.1);
  }
  
  @media (max-width: 768px) {
    body {
      font-size: 15px;
    }
    
    .container {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }
  }
`;

export default GlobalStyles;
