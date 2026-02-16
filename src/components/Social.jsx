import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';

const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const IconWrapper = styled.div`
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const getNetworkName = (network) => {
  const names = {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    instagram: 'Instagram',
    facebook: 'Facebook',
    youtube: 'YouTube',
    email: 'Email',
  };
  return names[network] || network;
};

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <SocialContainer>
      {data?.social?.map((social) => (
        <IconWrapper key={social.network} title={getNetworkName(social.network)}>
          <SocialIcon
            url={social.href}
            network={social.network}
            bgColor={theme.socialIconBgColor}
            target="_blank"
            rel="noopener"
            fgColor={theme.background === '#0d0d0d' ? '#0d0d0d' : '#1a1a1a'}
            style={{ width: 40, height: 40 }}
          />
        </IconWrapper>
      ))}
    </SocialContainer>
  );
}

export default Social;
