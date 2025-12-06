import React, { FC, useCallback } from 'react';

import { ListRenderItem, StyleSheet, ViewProps } from 'react-native';
import { Spacings, View } from 'react-native-ui-lib';

import { Wrapper } from '@/components';
import { FList } from '@/components/common';
import { HeaderHome, MovieCard } from '@/components/movie';
import { useMovieList } from '@/hooks/api/useMovies';
import { t } from '@/lang';
import Navigator, { Screens } from '@/navigations/Navigator';
import { Movie } from '@/types/movie';

const Separator: FC<ViewProps> = () => <View height={Spacings.xx} />;

const MovieHome: React.FC = () => {
  const {
    selectedCategory,
    sortBy,
    searchText,
    setSelectedCategory,
    setSortBy,
    setSearchText,
    handleSearch,
    ...movieList
  } = useMovieList();

  const handleMoviePress = useCallback((movie: Movie) => {
    Navigator.navigate(Screens.MovieDetails, { movieId: movie.id });
  }, []);

  const renderMovie = useCallback<ListRenderItem<Movie>>(
    ({ item }) => <MovieCard movie={item} onPress={handleMoviePress} />,
    [handleMoviePress]
  );

  return (
    <Wrapper>
      <HeaderHome
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
      />
      <FList
        {...movieList}
        renderItem={renderMovie}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={Separator}
        textEmpty={t('movie.no_movies_found')}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacings.xxx,
    paddingBottom: Spacings.lg
  }
});

export default MovieHome;
