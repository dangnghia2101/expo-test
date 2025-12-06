import React from 'react';

import { Text } from 'react-native-ui-lib';

import { Header, Wrapper } from '@/components';
import { t } from '@/lang';

interface MovieDetailsProps {
  route: {
    params: {
      movieId: number;
    };
  };
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ route }) => {
  const { movieId } = route.params;

  return (
    <Wrapper>
      <Header title={t('movie.details')} showBack />
      <Text>{t('movie.details_text')}</Text>
    </Wrapper>
  );
};

export default MovieDetails;
