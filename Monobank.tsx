import React from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Ionicons } from "@expo/vector-icons";

import { CreditCard } from "./assets/CreditCard";

const { width, height } = Dimensions.get("window");
const black = "#000";

export default function App() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const [fadeValue, setFadeValue] = React.useState(new Animated.Value(0));
  const [xValue, setXValue] = React.useState(new Animated.Value(0));
  const [springValue, setSpringValue] = React.useState(new Animated.Value(0.3));

  const animation = (toValue) =>
  Animated.timing(animatedValue, {
    toValue,
    duration: 1000,
    useNativeDriver: false,
  });

  const onPress = () => {
    console.log("12est");
    animation(1).start()
  };

  const fadeAnimation = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const moveAnimation = () => {
    Animated.timing(xValue, {
      // toValue: 250,
      toValue: width - 100,
      duration: 800,
      // easing: Easing.linear,
      easing: Easing.cubic,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(xValue, {
        toValue: width / 2 - 50,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        moveAnimation();
      });
    });
  };

  const springAnimation = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: false,
    }).start(() => {
      Animated.spring(springValue, {
        toValue: 0.35,
        friction: 1,
        useNativeDriver: false,
      }).start(() => {
        springAnimation();
      });
    });
  };

  const btnSize = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 3],
  });

  return (
    <LinearGradient
      colors={["#d99c9d", "#8677d9", "#6072cc"]}
      style={styles.container}
    >
      <View style={{ alignItems: "center" }}>
        <Animated.View style={[{ alignItems: "center",
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, .999, 1],
              outputRange: [1, 2, 1111111132],
            })
          },
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, .1, 1],
              outputRange: [0, 20, 20],
            })
          },
        ]}
      ]}>
        <CardsButton animatedValue={animatedValue} onPress={onPress}/>
        <Entypo name="chevron-thin-down" size={24} color="white" />
        </Animated.View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text style={{ color: "#fff", fontSize: 39, fontWeight: "700" }}>
              31 241
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 29,
                fontWeight: "500",
                paddingLeft: 13,
              }}
            >
              ₴
            </Text>
          </View>
          <View style={{ marginVertical: 18 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Kредитний ліміт</Text>
              <Text>100 000 ₴</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Використано кредиту</Text>
              <Text>68 759 ₴</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 10,
              paddingHorizontal: 8,
              paddingVertical: 8,
            }}
          >
            <View
              style={{
                backgroundColor: black,
                borderRadius: 50,
                paddingHorizontal: 7,
                paddingVertical: 5,
              }}
            >
              <Ionicons name="ios-checkmark-circle" size={18} color="green" />
            </View>
            <Text style={{ paddingLeft: 10 }}>
              Мінімальний платіж зараховано
            </Text>
          </View>
        </View>
        <View style={{ position: "relative", right: -50 }}>
          <LinearGradient
            colors={["#333", "#000"]}
            style={{ borderRadius: 15, width: 300, height: 200, padding: 16 }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ color: "#fff", fontWeight: "900", paddingRight: 8 }}
              >
                monobank
              </Text>
              <Text style={{ color: "#fff" }}>|</Text>
              <Text style={{ color: "#fff", paddingLeft: 8 }}>
                Univarsal Bank
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 20, color: "#fff", fontWeight: "700" }}>
                5375 4141 0647 5899
              </Text>
              <Text style={{ fontSize: 20, color: "#fff", fontWeight: "700" }}>
                10/24
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "red",
                  zIndex: 1,
                  opacity: 0.6,
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                }}
              />
              <View
                style={{
                  position: "relative",
                  left: -15,
                  zIndex: 0,
                  backgroundColor: "orange",
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                }}
              />
            </View>
          </LinearGradient>
        </View>
      </View>
      <Animated.View
        style={[
          styles.animationView,
          {
            opacity: fadeValue,
            left: xValue,
            transform: [{ scale: springValue }],
          },
        ]}
      ></Animated.View>
      <TouchableOpacity
        onPress={() => {
          fadeAnimation();
          moveAnimation();
          springAnimation();
        }}
        style={{
          backgroundColor: "yellow",
          alignSelf: "center",
          alignItems: "center",
          marginTop: 100,
          paddingHorizontal: 20,
          paddingVertical: 20,
          width: 200,
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        <Text>Animate</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  animationView: {
    width: 100,
    height: 100,
    backgroundColor: "skyblue",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});

const CardsButton = ({ animatedValue, onPress }) => {


  const btnOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: black,
          opacity: btnOpacity,
          width: 40,
          height: 40,
          borderRadius: 50,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CreditCard width="22" height="22" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
