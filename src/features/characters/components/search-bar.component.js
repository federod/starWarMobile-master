import React from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';

export const SearchBarComponent = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Searchbar
      style={styles.searchbar}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    marginHorizontal: 24,
  },
});
