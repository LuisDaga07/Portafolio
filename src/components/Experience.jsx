import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

const styles = {
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 8,
    marginBottom: 8,
  },
  subtitleStyle: {
    display: 'inline-block',
  },
  inlineChild: {
    display: 'inline-block',
  },
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container>
            <Timeline lineColor={theme.timelineLineColor}>
              {data.map((item) => (
                <Fade key={item.title + item.dateText}>
                  <TimelineItem
                    dateText={item.dateText}
                    dateInnerStyle={{
                      background: theme.textPrimary,
                      color: theme.background === '#0d0d0d' ? '#0d0d0d' : '#1a1a1a',
                    }}
                    bodyContainerStyle={{ color: theme.color }}
                  >
                    <h2
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: theme.textPrimary,
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </h2>
                    <div style={styles.subtitleContainerStyle}>
                      <h4
                        style={{
                          ...styles.subtitleStyle,
                          color: theme.textSecondary,
                          fontSize: '1rem',
                          fontWeight: 500,
                        }}
                      >
                        {item.subtitle}
                      </h4>
                      {item.workType && (
                        <h5 style={{ ...styles.inlineChild, color: theme.textMuted, fontSize: '0.9rem' }}>
                          {' · '}
                          {item.workType}
                        </h5>
                      )}
                    </div>
                    <ul style={{ ...styles.ulStyle, color: theme.textSecondary }}>
                      {(item.workDescription || []).map((point) => (
                        <li key={point}>
                          <ReactMarkdown components={{ p: 'span' }}>
                            {point || ''}
                          </ReactMarkdown>
                        </li>
                      ))}
                    </ul>
                  </TimelineItem>
                </Fade>
              ))}
            </Timeline>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
