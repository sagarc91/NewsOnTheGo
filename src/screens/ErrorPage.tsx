import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorPageProps {
  errorMessage: string 
}

const ErrorPage = ({ errorMessage }: ErrorPageProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ErrorPage;