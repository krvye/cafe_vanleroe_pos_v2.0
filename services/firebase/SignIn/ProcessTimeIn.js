import app from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  addDoc,
} from "firebase/firestore";
import { Alert } from "react-native";
import moment from "moment-timezone";

export default async function processTimeIn(currentUserEmail) {
  console.log("Current User Email: ", currentUserEmail);
  console.log("Time In!");

  // Get current date and time
  const currentDate = moment().tz("Asia/Manila");
  const formattedDateAdded = currentDate.format("YYYY-MM-DD");
  const formattedDateTime = currentDate.format("HH:mm:ss");
  console.log(`Date: ${formattedDateAdded}, Time: ${formattedDateTime}`);

  // Initialize Firestore
  const db = getFirestore(app);

  try {
    // EMPLOYEE_INFORMATION Query
    const empInfoQuerySnapshot = await getDocs(
      query(
        collection(db, "EMPLOYEE_INFORMATION"),
        where("emailAddress", "==", currentUserEmail)
      )
    );

    let employeeId = "";
    empInfoQuerySnapshot.forEach((doc) => {
      employeeId = doc.id;
    });

    if (!employeeId) {
      console.log("No employee found for the given email.");
      return;
    }

    console.log("EMPLOYEE INFO: ", empInfoQuerySnapshot);

    // EMPLOYEE_SCHEDULE Query
    const scheduleQuerySnapshot = await getDocs(
      query(
        collection(db, "EMPLOYEE_SCHEDULE"),
        where("employeeId", "==", employeeId),
        where("shiftDate", "==", formattedDateAdded)
      )
    );

    let shiftDate = "";
    let shiftStartTime = "";
    let branchCode = "";
    let predefinedOvertimeHours = "";

    scheduleQuerySnapshot.forEach((doc) => {
      const data = doc.data();
      shiftDate = data.shiftDate;
      shiftStartTime = data.shiftStartTime;
      branchCode = data.branchCode;
      predefinedOvertimeHours = data.predefinedOvertimeHours;
    });

    console.log("EMPLOYEE SCHEDULE: ", {
      shiftDate,
      shiftStartTime,
      branchCode,
      predefinedOvertimeHours,
    });

    // HOLIDAY CALENDAR Query
    const holidayCalendarQuerySnapshot = await getDocs(
        query(collection(db, "HOLIDAY_CALENDAR"))
      );

      let holidayType = "";

      holidayCalendarQuerySnapshot.forEach((doc) => {
        const holidayData = doc.data();
        const holidays = Object.values(holidayData).flat();

        for (const holiday of holidays) {
          if (holiday.holidayDate === formattedDateAdded) {
            holidayType = holiday.holidayType;
            break;
          }
        }
      });

    const currentDateTime = `${formattedDateAdded}, ${formattedDateTime}`;
    const shiftDateTime = `${shiftDate}, ${shiftStartTime}`;

    const currentMoment = moment(currentDateTime, "YYYY-MM-DD, HH:mm:ss");
    const shiftMoment = moment(shiftDateTime, "YYYY-MM-DD, HH:mm:ss");

    const timeDifference = currentMoment.diff(shiftMoment, "minutes");

    console.log("TIME DIFFERENCE: ", timeDifference); 

    if (timeDifference >= -30 && timeDifference <= 30) {
        const timeEntryData = {
          employeeId: employeeId,
          timeEntryDate: shiftDate,
          branchCode: branchCode,
          timeIn: shiftStartTime,
          timeOut: "0",
          breakIn: "0",
          breakOut: "0",
          overBreakTime: "0",
          predefinedOvertimeHours: predefinedOvertimeHours,
          lateHours: 0,
          totalHours: 0,
          breakHours: 0,
          payrollHours: 0,
          overtimeHours: 0,
          payrollOvertimeHours: 0,
          holidayType: holidayType,
        };

        const timeEntryRef = collection(db, "TIME_IN_OUT");
        await addDoc(timeEntryRef, timeEntryData);

      } else if (timeDifference > 30) {

        let lateHours = 0;
        if (timeDifference <= 60) {
          lateHours = 1;
        } else if (timeDifference <= 120) {
          lateHours = 2;
        } else {
          lateHours = Math.floor((timeDifference - 1) / 60) + 1;
        }

        const nextHour = moment(shiftStartTime, "HH:mm:ss")
          .add(lateHours, "hours")
          .format("HH:mm:ss");

        const timeEntryData = {
          employeeId: employeeId,
          timeEntryDate: shiftDate,
          branchCode: branchCode,
          timeIn: nextHour,
          timeOut: "0",
          breakIn: "0",
          breakOut: "0",
          overBreakTime: "0",
          predefinedOvertimeHours: predefinedOvertimeHours,
          lateHours: lateHours,
          totalHours: 0,
          breakHours: 0,
          payrollHours: 0,
          overtimeHours: 0,
          payrollOvertimeHours: 0,
          holidayType: holidayType,
        };

        const timeEntryRef = collection(db, "TIME_IN_OUT");
        await addDoc(timeEntryRef, timeEntryData);
      }

      Alert.alert("Success", "Time in successful!");
      console.log("Time in sucessful");
  } catch (error) {
    console.error("Error processing time-in: ", error);
  }
}
