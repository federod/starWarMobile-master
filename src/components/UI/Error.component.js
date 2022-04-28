import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeViewComponent} from './SafeViewComponent';

export const ErrorComponent = () => {
  return (
    <SafeViewComponent>
      <View style={styles.container}>
        <Text style={styles.error}>
          Something went wrong. Please try again.
        </Text>
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
  error: {
    color: 'red',
    fontSize: 20,
  },
});
