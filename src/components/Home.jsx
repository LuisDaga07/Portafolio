import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const HeroWrapper = styled.section`
  min-height: calc(100vh - 96px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem 6rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${(props) => (props.$dark
    ? 'radial-gradient(ellipse at 50% 0%, rgba(45, 45, 45, 0.4) 0%, transparent 60%)'
    : 'radial-gradient(ellipse at 50% 0%, rgba(26, 26, 26, 0.03) 0%, transparent 60%)')};
  pointer-events: none;
`;

const MainContainer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textSecondary};
  margin: 0 0 1.5rem;
  font-weight: 500;
`;

const Name = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.05;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: ${(props) => props.theme.textSecondary};
  margin: 0 0 2.5rem;
  line-height: 1.7;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.button`
  padding: 1rem 2.25rem;
  border-radius: 100px;
  border: none;
  background: ${(props) => props.theme.textPrimary};
  color: ${(props) => (props.$dark ? '#0d0d0d' : '#ffffff')};
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }
`;

const TypewriterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 2.5rem 0 1.5rem;
`;

const TypewriterLabel = styled.span`
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};
`;

const CategoryPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
`;

const Pill = styled.span`
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  background: ${(props) => props.theme.pillBg || 'rgba(0,0,0,0.06)'};
  color: ${(props) => props.theme.textSecondary};
  border: 1px solid ${(props) => props.theme.borderColor};
`;

function Home() {
  const theme = useContext(ThemeContext);
  const history = useHistory();
  const [data, setData] = useState(null);
  const isDark = theme.background === '#0d0d0d';

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
      <HeroWrapper>
        <HeroOverlay $dark={isDark} />
        <MainContainer>
          <Eyebrow theme={theme}>Desarrollador & Analista de Datos</Eyebrow>
          <Name theme={theme}>{data?.name}</Name>
          <Subtitle theme={theme}>
            Desarrollador Full Stack apasionado por crear soluciones digitales
            innovadoras y experiencias de usuario excepcionales.
          </Subtitle>
          <CTAButton theme={theme} $dark={isDark} onClick={goToAbout}>
            Conoce más sobre mí
          </CTAButton>
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
          <CategoryPills>
            <Pill theme={theme}>Web</Pill>
            <Pill theme={theme}>Full Stack</Pill>
            <Pill theme={theme}>Análisis de Datos</Pill>
            <Pill theme={theme}>ETL</Pill>
          </CategoryPills>
        </MainContainer>
      </HeroWrapper>
    </Fade>
  ) : (
    <FallbackSpinner />
  );
}

export default Home;
