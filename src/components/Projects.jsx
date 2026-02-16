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

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textSecondary};
  text-align: center;
  margin: 0 auto 2rem;
  max-width: 600px;
  line-height: 1.65;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
`;

const getFilterButtonColor = (isActive, theme) => {
  if (!isActive) return theme.textSecondary;
  return theme.background === '#0d0d0d' ? '#0d0d0d' : '#1a1a1a';
};

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background: ${(props) => (props.$active ? props.theme.textPrimary : 'transparent')};
  color: ${(props) => getFilterButtonColor(props.$active, props.theme)};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    border-color: ${(props) => props.theme.textSecondary};
    color: ${(props) => props.theme.textPrimary};
  }
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
    color: ${(props) => (props.theme.background === '#0d0d0d' ? '#0d0d0d' : '#1a1a1a')};
  }
`;

const Projects = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState('web');

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const numberOfItems = showMore && data ? data.length : 6;

  const getFilteredProjects = () => {
    if (!data?.projects) return [];
    if (activeFilter === 'todos') return data.projects;
    return data.projects.filter((project) => {
      const filterLower = activeFilter.toLowerCase().replace(/\s/g, '');
      return project.tags?.some((tag) => {
        const tagNormalized = tag.toLowerCase().replace(/\s/g, '');
        return tagNormalized.includes(filterLower) || filterLower.includes(tagNormalized);
      });
    });
  };

  const filteredProjects = getFilteredProjects();

  return (
    <>
      <Header title={header} />
      {data ? (
        <SectionWrapper className="section-content-container">
          <Container>
            <Subtitle theme={theme}>
              Explora mi portafolio de proyectos desarrollados con las últimas tecnologías.
            </Subtitle>
            <FilterContainer>
              {['todos', 'web', 'mobile', 'fullstack', 'python', 'react'].map((filter) => (
                <FilterButton
                  key={filter}
                  type="button"
                  $active={activeFilter === filter}
                  theme={theme}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </FilterButton>
              ))}
            </FilterContainer>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {filteredProjects.slice(0, numberOfItems).map((project, index) => (
                <Fade key={project.title} delay={index * 80}>
                  <ProjectCard project={project} />
                </Fade>
              ))}
            </Row>
            {!showMore && filteredProjects.length > 6 && (
              <div style={{ textAlign: 'center' }}>
                <ShowMoreButton theme={theme} onClick={() => setShowMore(true)}>
                  Ver más proyectos
                </ShowMoreButton>
              </div>
            )}
            {filteredProjects.length === 0 && (
              <p style={{ textAlign: 'center', color: theme.textSecondary, padding: '3rem 0' }}>
                No se encontraron proyectos con el filtro seleccionado.
              </p>
            )}
          </Container>
        </SectionWrapper>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
