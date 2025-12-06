import React, { FC, memo } from 'react';

import { Pressable, StyleSheet } from 'react-native';
import { Colors, Spacings, Text, View } from 'react-native-ui-lib';

import { FImage, Shadow } from '@/components';
import { Movie } from '@/types/movie';
import { getPosterUrl } from '@/utils/movie';

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  onDelete?: (movieId: number) => void;
}

const MovieCard: FC<MovieCardProps> = ({ movie, onPress, onDelete }) => {
  const imageUrl = getPosterUrl(movie.poster_path);

  return (
    <Pressable onPress={() => onPress(movie)}>
      <Shadow bg-subWhite dropShadow radius={Spacings.v} border>
        <View row>
          <View width={95} height={141}>
            <FImage url={imageUrl} style={styles.avatar} />
          </View>
          <View flex paddingH-xiv centerV>
            <View row spread>
              <Text numberOfLines={2} bold mdText>
                {movie.title}
              </Text>
              {onDelete && (
                <Pressable
                  onPress={() => onDelete(movie.id)}
                  style={styles.deleteButton}>
                  <Text color={Colors.red}>✕</Text>
                </Pressable>
              )}
            </View>
            <Text marginT-i subGray>
              {movie.release_date}
            </Text>
            <Text marginT-md numberOfLines={2}>
              {movie.overview}
            </Text>
          </View>
        </View>
      </Shadow>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    padding: Spacings.vi
  },
  avatar: {
    borderTopLeftRadius: Spacings.v,
    borderBottomLeftRadius: Spacings.v
  }
});

export default memo(MovieCard);
