import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Text, Platform} from 'react-native';
import {SafeViewComponent} from '../../../components/UI/SafeViewComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchBarComponent} from '../components/search-bar.component';
import {Character} from '../components/character.component';
import {DataTable} from 'react-native-paper';
import {useQuery} from 'react-query';
import {ActivityIndicatorComponent} from '../../../components/UI/ActivityIndicator.component';

Icon.loadFont();

export const getId = str => {
  if (!str) {
    return null;
  }
  const arr = str?.split('/');
  return arr[arr?.length - 2];
};

const fetchCharacters = async (page, searchQuery) => {
  const response = await fetch(
    `https://swapi.dev/api/people/?page=${page + 1}&search=${searchQuery}`,
  );
  return response.json();
};

export const CharactersScreen = () => {
  const [page, setPage] = React.useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const {isLoading, isError, error, data} = useQuery(
    ['characters', page, searchQuery],
    () => fetchCharacters(page, searchQuery),
    {
      keepPreviousData: true,
      select: data => {
        data?.results.map(result => (result.id = getId(result?.url)));
        return data;
      },
    },
  );

  const numberOfItemsPerPage = 10;
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data?.count);

  const onSearchHandler = query => {
    setSearchQuery(query);
    setPage(0);
  };

  if (isLoading) {
    return <ActivityIndicatorComponent />;
  }

  return (
    <SafeViewComponent>
      <View style={styles.container}>
        <SearchBarComponent onSearch={onSearchHandler} />
        {!data?.results.length && !isError && (
          <View style={styles.noData}>
            <Text>No Data Found.</Text>
          </View>
        )}
        {isError && (
          <View style={styles.noData}>
            <Text style={styles.error}>
              Something went wrong. Please try again
            </Text>
          </View>
        )}
        {!isError && !isLoading && (
          <>
            <FlatList
              contentContainerStyle={styles.flatList}
              data={data?.results}
              renderItem={({item}) => <Character character={item} />}
              keyExtractor={item => item.name}
            />
            <DataTable style={styles.dataTable}>
              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(data?.count / numberOfItemsPerPage)}
                onPageChange={page => setPage(page)}
                label={`${from + 1}-${to} of ${data?.count}`}
                showFastPaginationControls
              />
            </DataTable>
          </>
        )}
      </View>
    </SafeViewComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flexGrow: 1,
  },
  dataTable: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? -10 : 0,
    backgroundColor: 'white',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
});
