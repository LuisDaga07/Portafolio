import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';

const FooterWrapper = styled.footer`
  background: ${(props) => props.theme.footerBg || '#0d0d0d'};
  color: #a3a3a3;
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 2rem;
`;

const BrandSection = styled.div`
  max-width: 320px;
`;

const Slogan = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.3;
  margin: 1rem 0 0;
  letter-spacing: -0.02em;
`;

const LinksSection = styled.div`
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ColumnTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0 0 0.5rem;
`;

const FooterLink = styled.a`
  color: #a3a3a3;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

const FooterNavLink = styled.span`
  color: #a3a3a3;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: #737373;
`;

function Footer() {
  const theme = useContext(ThemeContext);
  const history = useHistory();

  const navigate = (path) => () => history.push(path);

  return (
    <FooterWrapper theme={theme}>
      <FooterContainer>
        <TopSection>
          <BrandSection>
            <Slogan>Un portafolio hace tus ideas realidad</Slogan>
          </BrandSection>
          <LinksSection>
            <LinkColumn>
              <ColumnTitle>Navegación</ColumnTitle>
              <FooterNavLink onClick={navigate('/Sobre mí')}>Sobre mí</FooterNavLink>
              <FooterNavLink onClick={navigate('/Proyectos')}>Proyectos</FooterNavLink>
              <FooterNavLink onClick={navigate('/Habilidades')}>Habilidades</FooterNavLink>
            </LinkColumn>
            <LinkColumn>
              <ColumnTitle>Experiencia</ColumnTitle>
              <FooterNavLink onClick={navigate('/Experiencia')}>Experiencia</FooterNavLink>
              <FooterNavLink onClick={navigate('/Educación')}>Educación</FooterNavLink>
              <FooterNavLink onClick={navigate('/Certificaciones')}>Certificaciones</FooterNavLink>
            </LinkColumn>
            <LinkColumn>
              <ColumnTitle>Contacto</ColumnTitle>
              <FooterLink href="mailto:luisgarciah2010@hotmail.com">Email</FooterLink>
              <FooterLink
                href="https://www.linkedin.com/in/luis-garcia-84028b250/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </FooterLink>
              <FooterLink
                href="https://github.com/LuisDaga07"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </FooterLink>
            </LinkColumn>
          </LinksSection>
        </TopSection>
        <BottomSection>
          <span>© 2025 Luis García. Todos los derechos reservados.</span>
        </BottomSection>
      </FooterContainer>
    </FooterWrapper>
  );
}

export default Footer;
