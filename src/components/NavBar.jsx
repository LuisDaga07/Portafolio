import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

const StyledNavbar = styled(Navbar)`
  background: ${(props) => props.theme.navbarTheme.bgColor} !important;
  border: none;
  padding: 0.75rem 0;
  transition: all 0.3s ease;

  .navbar > .container {
    position: relative;
  }

  .navbar-nav-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .navbar-nav-right {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  @media (max-width: 767px) {
    .navbar-nav-center {
      position: static;
      transform: none;
      flex-direction: column;
      align-items: flex-start;
      margin: 1rem 0;
    }

    .navbar-nav-right {
      margin-left: 0;
    }
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: ${(props) => props.theme.navbarTheme.linkColor} !important;
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.5rem 1rem !important;
  margin: 0 0.15rem;
  border-radius: 100px;
  transition: all 0.25s ease;
  text-decoration: none !important;

  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor} !important;
    background: ${(props) => props.theme.navbarTheme.linkHoverBg} !important;
  }

  &.navbar__link--active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor} !important;
    background: ${(props) => props.theme.navbarTheme.linkActiveBg} !important;
  }
`;

const ExternalLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor} !important;
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.5rem 1rem !important;
  margin: 0 0.15rem;
  border-radius: 100px;
  transition: all 0.25s ease;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor} !important;
    background: ${(props) => props.theme.navbarTheme.linkHoverBg} !important;
  }
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.25rem;
  background: #ffffff;
  color: #1a1a1a !important;
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: 100px;
  text-decoration: none !important;
  transition: all 0.25s ease;

  &:hover {
    background: #f0f0f0;
    transform: translateY(-1px);
    color: #1a1a1a !important;
  }
`;

const LogoImage = styled.img`
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const BrandText = styled.span`
  color: #ffffff !important;
  font-weight: 500;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-left: 0.75rem;
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const navbarVariant = 'dark';

  return (
    <StyledNavbar
      fixed="top"
      expand="md"
      variant={navbarVariant}
      expanded={expanded}
    >
      <Container>
        {data?.logo && (
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <LogoImage
              src={data?.logo?.source}
              alt="Logo"
              style={data?.logo?.height && data?.logo?.width
                ? { height: data.logo.height, width: data.logo.width }
                : { width: 40, height: 40 }}
            />
            <BrandText>Luis García</BrandText>
          </Navbar.Brand>
        )}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          style={{
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '0.35rem 0.5rem',
            borderRadius: '100px',
          }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar-nav navbar-nav-center">
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
          </Nav>
          <Nav className="navbar-nav navbar-nav-right">
            <CTAButton
              href="mailto:luisgarciah2010@hotmail.com"
              onClick={() => setExpanded(false)}
            >
              Contáctame
            </CTAButton>
            <ThemeToggler onClick={() => setExpanded(false)} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

const NavBarWithRouter = withRouter(NavBar);
export default NavBarWithRouter;
