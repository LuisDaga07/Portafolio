import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const MainContainer = styled.div`
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem;
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
`;

const Name = styled.h1`
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 1rem 0;
  letter-spacing: -0.03em;
  line-height: 1.15;
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0 0 2rem 0;
  line-height: 1.65;
  max-width: 560px;
`;

const Divider = styled.div`
  width: 64px;
  height: 1px;
  background: ${(props) => props.theme.textMuted};
  margin: 0 auto 2rem;
  opacity: 0.6;
`;

const TypewriterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 2rem;
`;

const TypewriterLabel = styled.span`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};
`;

const CTAButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.75rem;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.textPrimary};
  background: ${(props) => props.theme.textPrimary};
  color: ${(props) => (props.theme.background === '#0f172a' ? '#0f172a' : '#fff')};
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

function Home() {
  const theme = useContext(ThemeContext);
  const history = useHistory();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const goToAbout = () => {
    history.push('/Sobre mí');
  };

  return data ? (
    <Fade duration={800}>
      <MainContainer>
        <Name theme={theme}>{data?.name}</Name>
        <Subtitle theme={theme}>
          Desarrollador Full Stack apasionado por crear soluciones digitales innovadoras
          y experiencias de usuario excepcionales.
        </Subtitle>
        <Divider theme={theme} />
        <TypewriterRow>
          <TypewriterLabel theme={theme}>Soy</TypewriterLabel>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles || [],
              wrapperClassName: 'Typewriter__wrapper',
              cursorClassName: 'Typewriter__cursor',
            }}
          />
        </TypewriterRow>
        <Social />
        <CTAButton theme={theme} onClick={goToAbout}>
          Conoce más sobre mí
        </CTAButton>
      </MainContainer>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
