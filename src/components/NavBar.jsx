import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

const StyledNavbar = styled(Navbar)`
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: ${(props) => props.theme.navbarTheme.bgColor};
  border-bottom: 1px solid ${(props) => props.theme.navbarTheme.borderColor};
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  &.scrolled {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15),
      0 2px 4px -2px rgba(0, 0, 0, 0.1),
      0 0 0 1px ${(props) => props.theme.navbarTheme.borderColor};
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: ${(props) => props.theme.navbarTheme.linkColor} !important;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  padding: 0.5rem 0.9rem !important;
  margin: 0 0.1rem;
  border-radius: 8px;
  transition: all 0.25s ease;
  text-decoration: none !important;
  
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor} !important;
    background: ${(props) => props.theme.navbarTheme.linkHoverBg} !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  &.navbar__link--active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor} !important;
    background: ${(props) => props.theme.navbarTheme.linkActiveBg} !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
`;

const ExternalLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor} !important;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  padding: 0.5rem 0.9rem !important;
  margin: 0 0.1rem;
  border-radius: 8px;
  transition: all 0.25s ease;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor} !important;
    background: ${(props) => props.theme.navbarTheme.linkHoverBg} !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const LogoImage = styled.img`
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.85;
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarVariant = theme.background === '#0f172a' ? 'dark' : 'light';

  return (
    <StyledNavbar
      fixed="top"
      expand="md"
      variant={navbarVariant}
      className={isScrolled ? 'scrolled' : ''}
      expanded={expanded}
    >
      <Container>
        {data?.logo && (
          <Navbar.Brand href="/">
            <LogoImage
              src={data?.logo?.source}
              className="d-inline-block align-top"
              alt="Logo"
              style={data?.logo?.height && data?.logo?.width
                ? { height: data.logo.height, width: data.logo.width }
                : { width: 48, height: 40 }}
            />
          </Navbar.Brand>
        )}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          style={{
            border: `1px solid ${theme.borderColor}`,
            padding: '0.35rem 0.5rem',
            borderRadius: '6px',
          }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav className="align-items-center gap-1">
            {data?.sections?.map((section, index) => (section?.type === 'link' ? (
              <ExternalLink
                key={section.title}
                href={section.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setExpanded(false)}
                theme={theme}
              >
                {section.title}
              </ExternalLink>
            ) : (
              <NavLinkStyled
                key={section.title}
                onClick={() => setExpanded(false)}
                exact={index === 0}
                activeClassName="navbar__link--active"
                to={section.href}
                theme={theme}
              >
                {section.title}
              </NavLinkStyled>
            )))}
            <ThemeToggler onClick={() => setExpanded(false)} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

const NavBarWithRouter = withRouter(NavBar);
export default NavBarWithRouter;
