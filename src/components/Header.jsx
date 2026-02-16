import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
`;

const HeaderTitle = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.025em;
  line-height: 1.3;
`;

const HeaderSubtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  font-weight: 400;
  line-height: 1.6;
`;

const HeaderDivider = styled.div`
  width: 48px;
  height: 2px;
  background: ${(props) => props.theme.textSecondary};
  margin: 1.5rem auto 0;
  border-radius: 1px;
  opacity: 0.5;
`;

const getSubtitle = (headerTitle) => {
  const subtitles = {
    Proyectos: 'Proyectos desarrollados con las últimas tecnologías',
    Habilidades: 'Tecnologías y herramientas con las que trabajo',
    Experiencia: 'Trayectoria profesional',
    Educación: 'Formación académica',
    Certificaciones: 'Acreditaciones profesionales',
    'Sobre Mí': 'Información sobre mi perfil y experiencia',
  };
  return subtitles[headerTitle] || 'Descubre más';
};

function Header(props) {
  const theme = useContext(ThemeContext);
  const { title } = props;

  return (
    <HeaderContainer>
      <HeaderTitle theme={theme}>{title}</HeaderTitle>
      <HeaderSubtitle theme={theme}>
        {getSubtitle(title)}
      </HeaderSubtitle>
      <HeaderDivider theme={theme} />
    </HeaderContainer>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
