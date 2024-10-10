import app from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  //   addDoc,
  updateDoc,
} from "firebase/firestore";
import { Alert } from "react-native";
import moment from "moment-timezone";


export default async function processBreakOut(currentUserEmail) {
  console.log("Current user email: ", currentUserEmail);
  console.log("Break out!");

  const db = getFirestore(app);

  const today = new Date();
  const localTime = today.toLocaleString("en-US", { timeZone: "Asia/Manila" });
  const dateParts = localTime.split(", ")[0].split("/");
  const year = dateParts[2];
  const month = String(dateParts[0]).padStart(2, "0");
  const day = String(dateParts[1]).padStart(2, "0");

  const todayDate = `${year}-${month}-${day}`;

  console.log(todayDate);

  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  const currentDateTime = `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`;
  console.log("Current date and time:", currentDateTime);

  try {
    const employeeInfoCollection = collection(db, "EMPLOYEE_INFORMATION");
    const employeeQuery = query(
      employeeInfoCollection,
      where("emailAddress", "==", currentUserEmail)
    );
    const employeeSnapshot = await getDocs(employeeQuery);

    for (const doc of employeeSnapshot.docs) {
      const employeeId = doc.id;
      // let foundShiftToday = false;

      const scheduleCollection = collection(db, "EMPLOYEE_SCHEDULE");
      const scheduleQuery = query(
        scheduleCollection,
        where("employeeId", "==", employeeId),
        where("shiftDate", "==", `${year}-${month}-${day}`)
      );
      const scheduleSnapshot = await getDocs(scheduleQuery);

      for (const scheduleDoc of scheduleSnapshot.docs) {
        const scheduleData = scheduleDoc.data();
        let timeIn = scheduleData.timeIn;
        let shiftDate = scheduleData.shiftDate;

        const timeEntryQuery = query(
          collection(db, "TIME_IN_OUT"),
          where("employeeId", "==", employeeId),
          where("timeEntryDate", "==", shiftDate)
        );
        const timeEntrySnapshot = await getDocs(timeEntryQuery);

        const hours = String(today.getHours()).padStart(2, "0");
        const minutes = String(today.getMinutes()).padStart(2, "0");
        const seconds = String(today.getSeconds()).padStart(2, "0");
        const currentTime = `${hours}:${minutes}:${seconds}`;

        console.log("Current time:", currentTime);

        for (const doc of timeEntrySnapshot.docs) {
          const timeEntryRef = doc.ref;
          const timeEntryData = doc.data();
          const breakIn = timeEntryData.breakIn;
          const breakOut = timeEntryData.breakOut;

          // Calculate break duration
          const breakInTime = moment(breakIn, "HH:mm:ss");
          console.log("Break In Time:", breakInTime.format("HH:mm:ss"));
          const breakOutTime = moment(currentTime.trim(), "HH:mm:ss");
          const breakDuration = moment.duration(breakOutTime.diff(breakInTime));
          const breakMinutes = breakDuration.asMinutes();

          let breakHours = 0;

          if (breakMinutes <= 60) {
            console.log("Break duration less than 1 hour.");
            breakHours = 1;
            console.log("Break Hours: ", breakHours);
          } else if (breakMinutes >= 61 && breakMinutes < 179) {
            breakHours = 2;
            console.log("Break Hours: ", breakHours);
          } else {
            console.log("Break duration beyond 3 hours.");
            const excessMinutes = breakMinutes - 180;
            breakHours = Math.floor(excessMinutes / 60) + 3;
            console.log("Break Hours: ", breakHours);
          }

          await updateDoc(timeEntryRef, {
            breakOut: currentTime.trim(),
            breakHours: breakHours
          });

          console.log("Break out time updated.");
          Alert.alert("Break Out Successful!");
        }
      }
    }
  } catch (error) {
    console.error("Error processing break out time:", error);
  }
}
