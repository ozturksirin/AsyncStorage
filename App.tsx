import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserData = {
  name: string;
  surname: string;
  age: string;
  email: string;
};

export default function App() {
  const [userInfo, setUserInfo] = React.useState<UserData | null>();

  const userData: UserData = {
    name: "Öztürk",
    surname: "Şirin",
    age: "22",
    email: " ozturksirininfo@gmail.com",
  };

  const storeUserData = async (value: UserData) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@userData", jsonValue);
      setUserInfo(value);
    } catch (err) {
      console.log(err as string);
    }
  };

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@userData");
      console.log("jsonValue", jsonValue);
      setUserInfo(JSON.parse(jsonValue as string));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (err) {
      console.log(err as string);
    }
  };

  const removeUserData = async () => {
    try {
      await AsyncStorage.removeItem("@userData");
      setUserInfo(null);
    } catch (err) {
      console.log(err as string);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.log(err as string);
    }
  };
  useEffect(() => {
    getUserData();
  }, [setUserInfo]);

  return (
    <View style={styles.container}>
      {userInfo && (
        <View>
          <Text>Name: {userInfo.name}</Text>
          <Text>Surname: {userInfo.surname}</Text>
          <Text>Age: {userInfo.age}</Text>
          <Text>Email: {userInfo.email}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => storeUserData(userData)}>
        <Text>SET-DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => getUserData()}>
        <Text>GET-DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => removeUserData()}>
        <Text>REMOVE-DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => clearData()}>
        <Text>CLEAR-DATA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 34,
  },
  btn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});
