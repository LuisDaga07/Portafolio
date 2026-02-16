import React, { useEffect, useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import {
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import styled, {
  keyframes,
  ThemeContext,
} from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SectionWrapper = styled.div`
  padding: 2rem 0 4rem;
`;

const IntroText = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: ${(props) => props.theme.textSecondary};
  text-align: center;
  margin-bottom: 3rem;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  
  p { margin: 0; }
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 2.5rem 0 1.25rem;
  text-align: center;
`;

const SkillCard = styled(Card)`
  height: 100%;
  text-align: center;
  padding: 1.25rem 1rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  background: ${(props) => props.theme.cardBackground};
  transition: all 0.2s ease;
  animation: ${fadeInUp} 0.4s ease-out;
  
  &:hover {
    border-color: ${(props) => props.theme.textSecondary};
    box-shadow: 0 4px 12px ${(props) => props.theme.shadowColor};
  }
`;

const SkillIcon = styled.img`
  height: 48px;
  width: 48px;
  margin: 0 auto 0.75rem;
  transition: all 0.2s ease;
  filter: grayscale(80%);
  
  ${SkillCard}:hover & {
    filter: grayscale(0%);
  }
`;

const SkillName = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
`;

const SkillLevel = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textMuted};
  margin-top: 0.35rem;
  display: block;
`;

function Skills(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <SectionWrapper className="section-content-container">
          <Container>
            <Fade duration={800}>
              <IntroText theme={theme}>
                <ReactMarkdown>{data.intro || ''}</ReactMarkdown>
              </IntroText>
            </Fade>
            {data.skills?.map((category, categoryIndex) => (
              <Fade key={category.title} delay={categoryIndex * 100}>
                <div>
                  <CategoryTitle theme={theme}>{category.title}</CategoryTitle>
                  <Row className="g-3" style={{ marginTop: '1rem' }}>
                    {category.items.map((item, itemIndex) => (
                      <Col xs={6} sm={4} md={3} lg={2} key={item.title}>
                        <Fade delay={itemIndex * 30}>
                          <SkillCard theme={theme}>
                            <SkillIcon src={item.icon} alt={item.title} />
                            <SkillName theme={theme}>{item.title}</SkillName>
                            {item.level && (
                              <SkillLevel theme={theme}>{item.level}</SkillLevel>
                            )}
                          </SkillCard>
                        </Fade>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Fade>
            ))}
          </Container>
        </SectionWrapper>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
