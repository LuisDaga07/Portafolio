import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import endpoints from './constants/endpoints';

const SectionsWrapper = styled.div`
  flex: 1;
  min-height: calc(100vh - 96px);
  background: ${(props) => props.$sectionBg};
  background-image: ${(props) => props.$bgImage};
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
`;

function MainApp() {
  const location = useLocation();
  const theme = useTheme();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const isHome = location.pathname === '/';
  const sectionBg = theme?.sectionBg || '#161618';
  const hasBgImage = theme?.sectionBgImage && theme.sectionBgImage !== 'none';
  const bgImage = hasBgImage
    ? `linear-gradient(rgba(22, 22, 24, 0.82), rgba(22, 22, 24, 0.88)), ${theme.sectionBgImage}`
    : 'none';

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        {isHome ? (
          <Switch>
            <Suspense fallback={<FallbackSpinner />}>
              <Route exact path="/" component={Home} />
            </Suspense>
          </Switch>
        ) : (
          <SectionsWrapper $sectionBg={sectionBg} $bgImage={bgImage}>
            <Switch>
              <Suspense fallback={<FallbackSpinner />}>
                {data?.sections?.map((route) => {
                  const SectionComponent = React.lazy(
                    () => import(`./components/${route.component}`),
                  );
                  return (
                    <Route
                      key={route.headerTitle}
                      path={route.path}
                      component={() => (
                        <SectionComponent header={route.headerTitle} />
                      )}
                    />
                  );
                })}
              </Suspense>
            </Switch>
          </SectionsWrapper>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default MainApp;
