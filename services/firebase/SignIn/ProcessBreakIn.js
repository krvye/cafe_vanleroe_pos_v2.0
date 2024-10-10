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
// import moment from "moment-timezone";

export default async function processBreakIn(currentUserEmail) {
  console.log("Break time logged by: ", currentUserEmail);

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
    //   let foundShiftToday = false;

      const scheduleCollection = collection(db, "EMPLOYEE_SCHEDULE");
      const scheduleQuery = query(
        scheduleCollection,
        where("employeeId", "==", employeeId),
        where("shiftDate", "==", `${year}-${month}-${day}`)
      );
      const scheduleSnapshot = await getDocs(scheduleQuery);

      for (const scheduleDoc of scheduleSnapshot.docs) {
        const scheduleData = scheduleDoc.data();
        // let timeIn = scheduleData.timeIn;
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
            // const timeEntryData = doc.data();
            // const breakIn = timeEntryData.breakIn;

            await updateDoc(timeEntryRef, {
                breakIn: currentTime.trim(), 
            });
            console.log("Break-in time updated.");
            Alert.alert("Break in successful!");
        }
      }
    }
  } catch (error) {
    console.log("Error processing break time: ", error);
  }
}
