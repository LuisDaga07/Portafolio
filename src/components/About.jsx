import React, { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import styled, { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const SectionWrapper = styled.div`
  padding: 2rem 0 4rem;
`;

const IntroText = styled.div`
  font-size: 1.05rem;
  line-height: 1.85;
  color: ${(props) => props.theme.textSecondary};
  white-space: pre-wrap;
  text-align: left;

  p {
    margin-bottom: 1.25rem;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
`;

const ProfileImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.borderColor};
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 8px 24px ${(props) => props.theme.shadowColor};
  }
`;

function About(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => <ReactMarkdown>{text || ''}</ReactMarkdown>;

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div data-section="about">
      <Header title={header} />
      <SectionWrapper>
        <Container>
          {data ? (
            <Fade duration={800}>
              <Row className="align-items-center">
                <Col lg={7}>
                  <IntroText theme={theme}>
                    {parseIntro(data.about)}
                  </IntroText>
                </Col>
                <Col lg={5}>
                  <ImageWrapper>
                    <ProfileImage
                      src={data?.imageSource}
                      alt="Perfil"
                      theme={theme}
                    />
                  </ImageWrapper>
                </Col>
              </Row>
            </Fade>
          ) : <FallbackSpinner />}
        </Container>
      </SectionWrapper>
    </div>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
