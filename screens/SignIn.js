import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import { employeeInformation } from "../services/firebase/SignIn/RetrieveEmployees";
import { employeeDocuments } from "../services/firebase/SignIn/RetrieveEmployeeDocuments";
import processTimeIn from "../services/firebase/SignIn/ProcessTimeIn";
import processTimeOut from "../services/firebase/SignIn/ProcessTimeOut";
import processBreakIn from "../services/firebase/SignIn/ProcessBreakIn";
import processBreakOut from "../services/firebase/SignIn/ProcessBreakOut";
import { employeeSched } from "../services/firebase/SignIn/RetrieveEmpSched";
import { timeInOut } from "../services/firebase/SignIn/RetrieveTimeInOut";

import imageBG from "../assets/bg4.jpg";
import imagePRF from "../assets/prf.png";
import { StatusBar } from "expo-status-bar";

export default function SignInScreen({ navigation }) {
  // Retrieve employee information, documents, schedule, and holiday
  const employeeInfo = employeeInformation();
  const empDocuInfo = employeeDocuments();
  const empSchedInfo = employeeSched();
  const timeInOutInfo = timeInOut();

  // Find employee name
  const getFirstName = (employeeId) => {
    const empData = employeeInfo.find((emp) => emp.employeeId === employeeId);
    return empData ? empData.firstName : " ";
  };

  // Find employee email
  const getCurrentUserEmail = (employeeId) => {
    const empData = employeeInfo.find((emp) => emp.employeeId === employeeId);
    return empData ? empData.emailAddress : " ";
  };

  // Find schedule
  const getSchedule = (employeeId) => {
    const empData = empSchedInfo.find((emp) => emp.employeeId === employeeId);
    return empData ? empData.shiftDate : " ";
  };

  // Find Employee Time Entry Date
  const getEmpTimeEntryData = (employeeId) => {
    const timeEntryData = timeInOutInfo.find(
      (emp) =>
        emp.employeeId === employeeId && emp.timeEntryDate === currentDate
    );
    return timeEntryData ? timeEntryData : "No data found";
  };

  // Realtime TIME
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

  // Login
  const handleLogIn = () => {
    if (selectedEmp) {
      if (getEmpTimeEntryData(selectedEmp.employeeId) === "No data found") {
        console.log("You must clock in before proceeding with login.");
        Alert.alert(
          "Notice",
          "You must clock in before proceeding with login."
        );
      } else {
        navigation.navigate("TabNavigator");
      }
    } else {
      Alert.alert("Notice", "Select your profile.");
      console.log("Select your profile.");
    }
  };

  // Handle Avatar Size
  const handleToggleAvatarSize = (emp, index) => {
    setSelectedAvatarIndex((prevIndex) => (prevIndex === index ? null : index));
    console.log(
      `EMPLOYEE ID: ${emp.employeeId} \n EMAIL ADDRESS: ${getCurrentUserEmail(
        emp.employeeId
      )}`
    );
  };

  // useState for handling TIME ENTRIES
  const [timeOutButtonClick, setTimeOutButtonClick] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null); // Select the employee clicked on the avatar

  // current date
  const currentDate = new Date().toISOString().split("T")[0];

  // Handler for time in
  const handleTimeIn = () => {
    if (selectedEmp) {
      setTimeOutButtonClick(false);
      const currentUserEmail = getCurrentUserEmail(selectedEmp.employeeId);
      const userSched = getSchedule(selectedEmp.employeeId);
      const empTimeInDate = getEmpTimeEntryData(selectedEmp.employeeId);

      // Check if user sched is equal to current date
      if (userSched === currentDate) {
        console.log("Time entry Data: ", empTimeInDate);
        // Check if user already time in
        if (empTimeInDate === "No data found") {
          processTimeIn(currentUserEmail);
        } else {
          Alert.alert("Notice", "You have already punched in for today.");
          console.log("You have already punched in for today.");
        }
      } else {
        Alert.alert(
          "Notice",
          `No schedule found for ${getFirstName(selectedEmp.employeeId)}`
        );
        console.log("No schedule found for EMPLOYEE: ", selectedEmp.employeeId);
      }
    } else {
      Alert.alert("Notice", "Select your profile.");
      console.log("Select your profile.");
    }
  };

  // Handler time out
  const handleTimeOut = () => {
    if (selectedEmp) {
      const userSched = getSchedule(selectedEmp.employeeId);
      const currentUserEmail = getCurrentUserEmail(selectedEmp.employeeId);
      const employeeTimeOut = getEmpTimeEntryData(
        selectedEmp.employeeId
      )?.timeOut;
      const employeeTimeIn = getEmpTimeEntryData(
        selectedEmp.employeeId
      )?.timeIn;

      setTimeOutButtonClick(true);
      if (userSched === currentDate) {
        if (employeeTimeOut === "0" && employeeTimeIn !== "0") {
          console.log("Time Out!");
          processTimeOut(currentUserEmail);
        } else if (!employeeTimeIn || employeeTimeIn === "0") {
          Alert.alert("Time in time has not been logged yet.");
          console.log("Time in time has not been logged yet.");
        } else {
          Alert.alert("Notice", "Time out already punched.");
          console.log("Time out already punched.");
        }
      } else {
        Alert.alert(
          "Notice",
          `No schedule found for ${getFirstName(selectedEmp.employeeId)}`
        );
        console.log("No schedule found for EMPLOYEE: ", selectedEmp.employeeId);
      }
    } else {
      Alert.alert("Notice", "Select your profile.");
      console.log("Select your profile.");
    }
  };

  // Handler break in
  const handleBreakIn = () => {
    if (selectedEmp) {
      const userSched = getSchedule(selectedEmp.employeeId);
      const currentUserEmail = getCurrentUserEmail(selectedEmp.employeeId);
      const employeeTimeIn = getEmpTimeEntryData(
        selectedEmp.employeeId
      )?.timeIn;
      const employeeBreakIn = getEmpTimeEntryData(
        selectedEmp.employeeId
      )?.breakIn;

      if (userSched === currentDate) {
        if (!employeeTimeIn || employeeTimeIn === "0") {
          Alert.alert("Notice", "You need to log your time in first.");
          console.log("Log your time in first.");
        } else if (employeeTimeIn !== "0" && employeeBreakIn === "0") {
          // break time logic here
          processBreakIn(currentUserEmail);
        } else {
          Alert.alert("Notice", "You've already logged your break time.");
          console.log("You have already logged your break time.");
        }
      } else {
        Alert.alert(
          "Notice",
          `No schedule found for ${getFirstName(selectedEmp.employeeId)}`
        );
        console.log("No schedule found for EMPLOYEE: ", selectedEmp.employeeId);
      }
    } else {
      Alert.alert("Notice", "Select your profile.");
      console.log("Select your profile.");
    }
  };

  const handleBreakOut = () => {
    if (selectedEmp) {
      const userSched = getSchedule(selectedEmp.employeeId);
      const currentUserEmail = getCurrentUserEmail(selectedEmp.employeeId);
      const employeeTimeIn = getEmpTimeEntryData(
        selectedEmp.employeeId
      )?.timeIn;
      const employeeBreakIn = getEmpTimeEntryData(
        selectedEmp.employeeId
      )?.breakIn;
      const employeeBreakOut = getEmpTimeEntryData(
        selectedEmp.employeeId
      )?.breakOut;
      console.log("employee break out: ", employeeBreakOut);

      if (userSched === currentDate) {
        if (!employeeTimeIn || employeeTimeIn === "0") {
          Alert.alert("Notice", "You need to log your time in first.");
          console.log("Log your time in first.");
        } else if (employeeBreakIn === "0") {
          console.log("You need to log your break time first.");
          Alert.alert("Notice", "You need to log your break time first.");
        } else if (employeeBreakOut === "0") {
          // break out logic here
          processBreakOut(currentUserEmail);
        } else {
          console.log("You've already logged your break out.");
          Alert.alert("You've already logged your break out.");
        }
      } else {
        Alert.alert(
          "Notice",
          `No schedule found for ${getFirstName(selectedEmp.employeeId)}`
        );
        console.log("No schedule found for EMPLOYEE: ", selectedEmp.employeeId);
      }
    } else {
      Alert.alert("Notice", "Select your profile.");
      console.log("Select your profile.");
    }
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

          <ScrollView
            horizontal
            contentContainerStyle={styles.avatarContainer}
            showsHorizontalScrollIndicator={false}
          >
            {empDocuInfo.map((image, index) => (
              <View key={index} style={styles.avatarAndNameContainer}>
                <TouchableOpacity
                  style={[
                    styles.avatarPicture,
                    selectedAvatarIndex === index && {
                      height: 120,
                      width: 120,
                    },
                  ]}
                  onPress={() => {
                    setSelectedEmp(image), handleToggleAvatarSize(image, index);
                  }}
                >
                  <Image
                    source={image.document === "" ? imagePRF : image.document}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <Text style={styles.name}>
                  {getFirstName(image.employeeId)}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.buttonsContainer}>
            <View style={styles.timeInAndOutContainer}>
              <TouchableOpacity
                style={[
                  styles.timeInAndOutButton,
                  { backgroundColor: "#B66619" },
                ]}
                onPress={handleTimeIn}
              >
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
                  Time In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.timeInAndOutButton,
                  {
                    backgroundColor: "#FFF",
                    borderColor: "#B66619",
                    borderWidth: 2,
                  },
                ]}
                onPress={handleTimeOut}
              >
                <Text
                  style={{ color: "#B66619", fontSize: 16, fontWeight: 500 }}
                >
                  Time Out
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.breakInAndOutContainer}>
              <TouchableOpacity
                style={[
                  styles.breakInAndOutButton,
                  { backgroundColor: "#B66619" },
                ]}
                onPress={handleBreakIn}
              >
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
                  Break In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.breakInAndOutButton,
                  {
                    backgroundColor: "#FFF",
                    borderColor: "#B66619",
                    borderWidth: 2,
                  },
                ]}
                onPress={handleBreakOut}
              >
                <Text
                  style={{ color: "#B66619", fontSize: 16, fontWeight: 500 }}
                >
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
    alignItems: "center",
    width: "100%",
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
    fontWeight: 500,
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
  cameraContainer: {
    flex: 1,
    width: "100%",
  },
});
