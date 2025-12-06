import { View } from 'react-native-ui-lib';

import {
  CATEGORY_MOVIE_OPTIONS,
  SORT_MOVIE_OPTIONS
} from '@/configs/constants/options/movie';
import { t } from '@/lang';
import { MovieCategory, SortBy } from '@/types/movie';

import { Button, Logo } from '../common';
import { Select, TextInput } from '../form';

interface HeaderHomeProps {
  selectedCategory: MovieCategory | null;
  setSelectedCategory: (category: MovieCategory | null) => void;
  sortBy: SortBy | null;
  setSortBy: (sort: SortBy | null) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  handleSearch: () => void;
}

export const HeaderHome = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  searchText,
  setSearchText,
  handleSearch
}: HeaderHomeProps) => {
  return (
    <View marginB-xxxx>
      <Logo />
      <View paddingH-xxx paddingT-md>
        <Select
          label={t('movie.category')}
          placeholder={t('movie.category_placeholder')}
          options={CATEGORY_MOVIE_OPTIONS}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          keyId="id"
          keyLabel="label"
        />
        <View marginT-sm>
          <Select
            label={t('movie.sort_by')}
            placeholder={t('movie.sort_placeholder')}
            options={SORT_MOVIE_OPTIONS}
            selected={sortBy}
            onSelect={setSortBy}
            keyId="id"
            keyLabel="label"
          />
        </View>
        <View marginT-sm>
          <TextInput
            placeholder={t('movie.search_placeholder')}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>
        <View marginT-sm>
          <Button
            label={t('movie.search')}
            disabled={!searchText}
            onPress={handleSearch}
          />
        </View>
      </View>
    </View>
  );
};
