import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {IconButton, Avatar, List, Card} from 'react-native-paper';
import {useQuery} from 'react-query';

import {SafeViewComponent} from '../../../components/UI/SafeViewComponent';
import {getId} from './characters.screen';
import {ActivityIndicatorComponent} from '../../../components/UI/ActivityIndicator.component';

const fetchCharacterDetail = async id => {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);
  return response.json();
};

const fetchHomePlanet = async planetId => {
  console.log(planetId, 'planet id');
  const response = await fetch(`https://swapi.dev/api/planets/${planetId}`);
  return response.json();
};

export const CharacterDetail = ({navigation, route}) => {
  //const [characterDetail, setCharacterDetail] = useState('');
  const {id} = route.params;

  const {
    isLoading,
    isError,
    data: characterDetail,
  } = useQuery(['character-detail', id], () => fetchCharacterDetail(id), {});

  const planetId = getId(characterDetail?.homeworld);

  const {data: homePlanet} = useQuery(
    ['home-planet', planetId],
    () => fetchHomePlanet(planetId),
    {
      enabled: !!planetId,
      select: data => data.name,
    },
  );

  if (isLoading) {
    return <ActivityIndicatorComponent />;
  }
  return (
    <SafeViewComponent>
      <IconButton
        icon="arrow-left"
        size={30}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.avatarWrapper}>
          <Avatar.Image
            size={180}
            source={require('../../../../assets/imgs/starwars.png')}
          />
        </View>
        <Text style={styles.name}>{characterDetail?.name}</Text>
      </View>
      <Card style={styles.card} elevation={5}>
        <ScrollView>
          {isError && (
            <View style={styles.noData}>
              <Text style={styles.error}>
                Something went wrong. Please try again
              </Text>
            </View>
          )}
          <List.Item
            description="Gender"
            title={characterDetail?.gender?.toUpperCase()}
            left={props => <List.Icon {...props} icon="human-male-female" />}
          />
          <List.Item
            description="Birth Year"
            title={characterDetail?.birth_year}
            left={props => <List.Icon {...props} icon="calendar" />}
          />
          <List.Item
            description="Eye Color"
            title={characterDetail?.eye_color?.toUpperCase()}
            left={props => <List.Icon {...props} icon="eye" />}
          />
          <List.Item
            description="Height"
            title={characterDetail?.height + 'cm'}
            left={props => <List.Icon {...props} icon="human-male-height" />}
          />
          <List.Item
            description="Mass"
            title={characterDetail?.mass}
            left={props => <List.Icon {...props} icon="weight" />}
          />
          <List.Item
            description="Home Planet"
            title={homePlanet}
            left={props => <List.Icon {...props} icon="home-group" />}
          />
        </ScrollView>
      </Card>
    </SafeViewComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {padding: 10, paddingBottom: 30},
  name: {fontWeight: '600', fontSize: 23},
  card: {margin: 16, flex: 1},
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
});
