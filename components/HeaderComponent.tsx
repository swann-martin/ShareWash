import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useLaundry } from "../store/store";

const HeaderComponent = ({
  displayCurrentAdress,
}: {
  displayCurrentAdress: string;
}) => {
  const user = { image: "https://randomuser.me/api/portraits/women/60.jpg" };
  const totalClothes = useLaundry((state) => state.totalClothes);
  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons name="location-on" size={30} color="white" />
        <View>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            Home
          </Text>
          <Text style={styles.text}>{displayCurrentAdress}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="shopping-basket" size={24} color="white" />
          <Text style={{ color: "white", marginLeft: 2.5, fontSize: 14 }}>
            {totalClothes}
          </Text>
        </View>
        <Pressable
          onPress={() => console.log("pressed")}
          style={{ marginLeft: "auto" }}
        >
          <Image
            source={{ uri: user.image }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#55AFC0",
  },
  text: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
  },
  imageContainer: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  imageText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
  },
});
