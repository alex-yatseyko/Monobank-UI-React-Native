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

const { width, height } = Dimensions.get("window");

export default function App() {
  const [fadeValue, setFadeValue] = React.useState(new Animated.Value(0));
  const [xValue, setXValue] = React.useState(new Animated.Value(0));
  const [springValue, setSpringValue] = React.useState(new Animated.Value(0.3));

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

  return (
    <LinearGradient
      colors={["#d99c9d", "#8677d9", "#6072cc"]}
      style={styles.container}
    >
      {/* <View style={styles.container}> */}
      {/* 242deg, #d99c9d, #8677d9 51%, #6072cc */}
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
        <View style={{ flexDirection: "row" }}>
          <Text>Kредитний ліміт</Text>
          <Text>100 000 ₴</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Використано кредиту</Text>
          <Text>68 759 ₴</Text>
        </View>
        <View>
          <LinearGradient
            colors={["#333", "#000"]}
            style={{borderRadius: 15, width: 300, height: 200, padding: 16}}
          >
            <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#fff', fontWeight: '900', paddingRight: 8}}>monobank</Text>
            <Text style={{color: '#fff'}}>|</Text>
            <Text style={{color: '#fff', paddingLeft: 8}}>Univarsal Bank</Text>
            </View>
          <View>
            <Text style={{fontSize: 20, color: '#fff', fontWeight: '700'}}>5375 4141 0647 5899</Text>
            <Text style={{fontSize: 20, color: '#fff', fontWeight: '700'}}>10/24</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{backgroundColor: 'red', zIndex: 1, opacity: .6, width: 40, height: 40, borderRadius: 50}}/>
            <View style={{position: 'relative', left: -15, zIndex: 0,backgroundColor: 'orange', width: 40, height: 40, borderRadius: 50}}/>
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

      {/* <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={{ padding: 15, alignItems: "center", borderRadius: 5 }}
      >
        <Text
          style={{
            backgroundColor: "transparent",
            fontSize: 15,
            color: "#fff",
          }}
        >
          Sign in with Facebook
        </Text>
      </LinearGradient> */}

      {/* </View> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000",
    justifyContent: "center",
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
