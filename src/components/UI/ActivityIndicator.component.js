import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {SafeViewComponent} from './SafeViewComponent';

export const ActivityIndicatorComponent = () => {
  return (
    <SafeViewComponent>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    </SafeViewComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
