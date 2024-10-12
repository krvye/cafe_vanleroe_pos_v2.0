import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useBranches } from "../context/BranchContext";
import { StatusBar } from "expo-status-bar";
import imageBG from "../assets/bg4.jpg";

export default function SplashScreen({ navigation }) {
  // Available branches from context
  const { branches, selectedBranch, selectBranch } = useBranches();

  const handleSelectBranch = (branchCode) => {
    selectBranch(branchCode);
    navigation.navigate("SignInScreen", { branchCode });
  };

  // Realtime TIME
  const [time, setTime] = useState({ hours: "", amOrPM: "" });
  const [date, setDate] = useState("");

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

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.welcomeText}>Cafe Vanleroe!</Text>
          </View>

          {/* Updated Select Branch Container */}
          <View style={styles.selectBranchCon}>
            <Text style={styles.selectBranchText}>Select a branch</Text>
          </View>

          {/* Updated Branch Container */}
          <View style={styles.branchContainer}>
            {branches.map((branch) => (
              <TouchableOpacity
                key={branch.branchCode}
                onPress={() => handleSelectBranch(branch.branchCode)}
                style={styles.branchButton}
              >
                <Text style={styles.branchText}>{branch.branchDesc}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    height: 700,
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
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 100,
    color: "white",
    fontWeight: 300,
    textAlign: "center",
  },
  selectBranchCon: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  selectBranchText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: 400,
    color: "white",
  },
  branchContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  branchButton: {
    backgroundColor: "#F9BC4D",
    height: 50,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 10,
  },
  branchText: {
    fontSize: 18,
    color: "#B66619",
    fontWeight: 500,
  },
});
