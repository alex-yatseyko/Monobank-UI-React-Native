import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const CIRCLE_SIZE = 100;

// https://github.com/catalinmiron/react-native-dot-inversion/blob/master/App.js

const Circle = ({ onPress, animatedValue }) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ["gold", "gold", "gold", "#444", "#444"],
  });
  const backgroundColor = animatedValue.interpolate({
    inputRange,
    outputRange: ["gold", "gold", "gold", "#444", "#444"],
  });
  const buttonBg = animatedValue.interpolate({
    inputRange,
    outputRange: ["#444", "#444", "#444", "gold", "gold"],
  });
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        styles.container,
        {
          // backgroundColor: buttonBg,
          // backgroundColor: containerBg,
          // backgroundColor: 'blue',
          // backgroundColor,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: buttonBg,
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0%", "50%", "0%"],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.button, styles.circleButton]}>
            <AntDesign name="arrowright" size="28" color={"white"} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default function App() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const animation = (toValue) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 1000,
      useNativeDriver: false,
    });

  const onPress = () => {
    // console.log('Animate')
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start();
  };

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <StatusBar style="auto" />
      <Circle onPress={onPress} animatedValue={animatedValue} />
      {/* <Animated.View style={styles.animationView}></Animated.View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 50,
  },
  paragraph: {
    margin: 12,
    fontSize: 24,
    // fontWeight: 'bold',
    textAlign: "center",
    fontFamily: "Menlo",
    color: "white",
  },
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "turquoise",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
