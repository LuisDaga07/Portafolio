// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { Card, Badge, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styled, { ThemeContext } from 'styled-components';

const StyledCard = styled(Card)`
  height: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 12px;
  overflow: hidden;
  background: ${(props) => props.theme.cardBackground};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 8px 24px ${(props) => props.theme.shadowColor};
    transform: translateY(-2px);
  }
`;

const CardImage = styled(Card.Img)`
  height: 200px;
  object-fit: cover;
  transition: transform 0.2s ease;
  
  ${StyledCard}:hover & {
    transform: scale(1.02);
  }
`;

const CardBody = styled(Card.Body)`
  padding: 1.5rem;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme.textMuted};
`;

const TypeBadge = styled.span`
  background: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textSecondary};
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
`;

const CardTitle = styled(Card.Title)`
  font-size: 1.15rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 0.75rem;
`;

const CardText = styled(Card.Text)`
  font-size: 0.95rem;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const LinkButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background: transparent;
  color: ${(props) => props.theme.textPrimary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${(props) => props.theme.textPrimary};
    color: ${(props) => (props.theme.background === '#0d0d0d' ? '#0d0d0d' : '#1a1a1a')};
    border-color: ${(props) => props.theme.textPrimary};
  }
`;

const CardFooter = styled(Card.Footer)`
  padding: 1rem 1.5rem;
  background: ${(props) => props.theme.cardFooterBackground};
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const Tag = styled(Badge)`
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 500;
  background: ${(props) => props.theme.borderColor} !important;
  color: ${(props) => props.theme.textSecondary} !important;
  border-radius: 4px;
`;

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const { project } = props;

  const parseBodyText = (text) => <ReactMarkdown>{text || ''}</ReactMarkdown>;

  return (
    <Col>
      <StyledCard theme={theme}>
        <div style={{ overflow: 'hidden' }}>
          <CardImage
            variant="top"
            src={project?.image}
            alt={project?.title}
          />
        </div>
        <CardBody>
          <MetaRow theme={theme}>
            <TypeBadge theme={theme}>{project?.type || 'Proyecto'}</TypeBadge>
            <span>{project?.date || '2024'}</span>
          </MetaRow>
          <CardTitle theme={theme}>{project.title}</CardTitle>
          <CardText theme={theme}>
            {parseBodyText(project.bodyText)}
          </CardText>
          <ButtonGroup>
            {project?.links?.map((link) => (
              <LinkButton
                key={link.href}
                theme={theme}
                type="button"
                onClick={() => window.open(link.href, '_blank')}
              >
                {link.text}
              </LinkButton>
            ))}
          </ButtonGroup>
        </CardBody>
        {project.tags && (
          <CardFooter theme={theme}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {project.tags.map((tag) => (
                <Tag key={tag} theme={theme}>
                  {tag}
                </Tag>
              ))}
            </div>
          </CardFooter>
        )}
      </StyledCard>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    type: PropTypes.string,
    date: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
