import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {Avatar, Card} from 'react-native-paper';

export const Character = ({character}) => {
  const navigation = React.useContext(NavigationContext);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('detail', {id: character.id})}>
      <Card elevation={5} style={styles.card}>
        <Card.Title
          title={character.name}
          subtitle={character.gender.toUpperCase()}
          leftStyle={styles.avatarStyle}
          left={props => (
            <Avatar.Image
              {...props}
              size={60}
              source={require('../../../../assets/imgs/starwars.png')}
            />
          )}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    padding: 8,
    marginHorizontal: 24,
  },
  avatarStyle: {
    marginRight: 40,
  },
});
