import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [fadeValue, setFadeValue] = React.useState(new Animated.Value(0))
 
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      <Animated.View style={styles.animationView}> </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationView: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue'
  }
});
