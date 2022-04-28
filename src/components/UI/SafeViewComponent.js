import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';

export const SafeViewComponent = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
});
