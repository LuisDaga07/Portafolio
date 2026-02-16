import React, { useState, useEffect, useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import styled, { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const SectionWrapper = styled.div`
  padding: 2rem 0 4rem;
`;

const ShowMoreButton = styled.button`
  display: block;
  margin: 3rem auto 2rem;
  padding: 0.75rem 1.75rem;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.textPrimary};
  background: transparent;
  color: ${(props) => props.theme.textPrimary};
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: ${(props) => props.theme.textPrimary};
    color: ${(props) => (props.theme.background === '#0f172a' ? '#0f172a' : '#fff')};
  }
`;

const Certifications = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.certifications, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const numberOfItems = showMore && data ? data.length : 6;

  return (
    <>
      <Header title={header} />
      {data ? (
        <SectionWrapper className="section-content-container">
          <Container>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {(data.certifications || []).slice(0, numberOfItems).map((project, index) => (
                <Fade key={project.title} delay={index * 80}>
                  <ProjectCard project={project} />
                </Fade>
              ))}
            </Row>
            {!showMore && data.certifications?.length > 6 && (
              <div style={{ textAlign: 'center' }}>
                <ShowMoreButton theme={theme} onClick={() => setShowMore(true)}>
                  Ver más
                </ShowMoreButton>
              </div>
            )}
          </Container>
        </SectionWrapper>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

Certifications.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Certifications;
