import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import imageBG from "../assets/bg4.jpg";
import alexia from "../assets/alexia.jpg";
import kurt from "../assets/kurt.jpg";
import jane from "../assets/jane.jpg";
import cj from "../assets/cj.jpg";
import mika from "../assets/mika.jpg";
import { StatusBar } from "expo-status-bar";

export default function SignInScreen({ navigation }) {
  const [time, setTime] = useState({ hours: "", amOrPM: "" });
  const [date, setDate] = useState("");
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const amOrPM = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12;

      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      setTime({
        hours: `${formattedHours}:${formattedMinutes}`,
        amOrPM: amOrPM,
      });

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const formattedDay = days[date.getDay()];
      const formattedDate =
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const formattedMonth = months[date.getMonth()];
      const formattedYear = date.getFullYear();

      setDate(
        `${formattedDay}, ${formattedDate} ${formattedMonth} ${formattedYear}`
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogIn = () => {
    navigation.navigate("TabNavigator");
  };

  const images = [
    { source: mika, name: "Mika" },
    { source: alexia, name: "Alexia" },
    { source: kurt, name: "Kurt" },
    { source: jane, name: "Jane" },
    { source: cj, name: "CJ" },
  ];

  const handleToggleAvatarSize = (index) => {
    setSelectedAvatarIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground
        source={imageBG}
        resizeMode="cover"
        style={styles.imgBackground}
      >
        <View style={styles.overlay} />
        <View>
          <View style={styles.datetimeContainer}>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{time.hours}</Text>
              <Text style={styles.amOrPM}>{time.amOrPM}</Text>
            </View>
            <Text style={styles.date}>{date}</Text>
          </View>

          <View style={styles.avatarContainer}>
            {images.map((image, index) => (
              <View key={index} style={styles.avatarAndNameContainer}>
                <TouchableOpacity
                  style={[
                    styles.avatarPicture,
                    selectedAvatarIndex === index && {
                      height: 120,
                      width: 120,
                    },
                  ]}
                  onPress={() => handleToggleAvatarSize(index)}
                >
                  <Image
                    source={image.source}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <Text style={styles.name}>{image.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonsContainer}>
            <View style={styles.timeInAndOutContainer}>
              <TouchableOpacity
                style={[
                  styles.timeInAndOutButton,
                  { backgroundColor: "#B66619" },
                ]}
              >
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>Time In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timeInAndOutButton, { backgroundColor: "#FFF", borderColor: "#B66619", borderWidth: 2 }]}
              >
                <Text style={{ color: "#B66619", fontSize: 16, fontWeight: 500 }}>Time Out</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.breakInAndOutContainer}>
              <TouchableOpacity
                style={[
                  styles.breakInAndOutButton,
                  { backgroundColor: "#B66619" },
                ]}
              >
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>Break In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.breakInAndOutButton,
                  { backgroundColor: "#FFF",
                    borderColor: "#B66619", 
                    borderWidth: 2,
                   },
                ]}
              >
                <Text style={{ color: "#B66619", fontSize: 16, fontWeight: 500 }}>
                  Break Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handleLogIn}>
            <Text style={styles.signInText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  imgBackground: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  datetimeContainer: {
    flexDirection: "column",
    marginBottom: 15,
  },
  timeContainer: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    gap: 5,
  },
  time: {
    fontSize: 120,
    color: "white",
    fontWeight: "300",
  },
  amOrPM: {
    fontSize: 40,
    marginTop: 85,
    fontWeight: "300",
    color: "white",
  },
  date: {
    fontSize: 22,
    color: "white",
    fontWeight: "300",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: -25,
  },
  avatarContainer: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 20,
  },
  avatarAndNameContainer: {
    justifyContent: "center",
    alignSelf: "center",
    height: 150,
  },
  avatarPicture: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignSelf: "center",
  },
  avatarImage: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
  },
  name: {
    color: "#FFF",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  signInButton: {
    height: 45,
    width: 400,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#F9BC4D",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#F9BC4D",
    marginTop: 10,
  },
  signInText: {
    fontSize: 16,
    color: "#0e0e0e",
    textAlign: "center",
    fontWeight: 500
  },
  buttonsContainer: {
    justifyContent: "center",
    flexDirection: "column",
    alignSelf: "center",
    marginTop: 10,
  },
  timeInAndOutContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  timeInAndOutButton: {
    height: 40,
    width: 190,
    borderRadius: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  breakInAndOutContainer: {
    flexDirection: "row",
  },
  breakInAndOutButton: {
    height: 40,
    width: 190,
    borderRadius: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
