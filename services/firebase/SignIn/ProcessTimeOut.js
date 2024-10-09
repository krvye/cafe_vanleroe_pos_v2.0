import app from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import moment from "moment-timezone";
import { Alert } from "react-native";

export default async function processTimeOut(currentUserEmail) {
  console.log("Current User Email: ", currentUserEmail);
  // Get current date and time
  const currentDate = moment().tz("Asia/Manila");
  const formattedDateAdded = currentDate.format("YYYY-MM-DD");
  const formattedDateTime = currentDate.format("HH:mm:ss");
  console.log(`Time Out Date: ${formattedDateAdded}, Time: ${formattedDateTime}`);

  const db = getFirestore(app);

  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, "EMPLOYEE_INFORMATION"),
        where("emailAddress", "==", currentUserEmail)
      )
    );
    let employeeId = "";
    querySnapshot.forEach((doc) => {
      employeeId = doc.id;
    });

    const scheduleCollection = collection(db, "EMPLOYEE_SCHEDULE");
    const scheduleQuery = query(
      scheduleCollection,
      where("employeeId", "==", employeeId),
      where("shiftDate", "==", formattedDateAdded)
    );
    const scheduleSnapshot = await getDocs(scheduleQuery);

    for (const scheduleDoc of scheduleSnapshot.docs) {
      const scheduleData = scheduleDoc.data();

      const timeEntryQuery = query(
        collection(db, "TIME_IN_OUT"),
        where("employeeId", "==", employeeId),
        where("timeEntryDate", "==", formattedDateAdded)
      );
      const timeEntrySnapshot = await getDocs(timeEntryQuery);

      for (const doc of timeEntrySnapshot.docs) {
        const timeEntryRef = doc.ref;
        const timeEntryData = doc.data();
        const timeIn = timeEntryData.timeIn;
        let timeOut = timeEntryData.timeOut;
        const breakHours = timeEntryData.breakHours || 0;
        let lateHours = timeEntryData.lateHours || 0;
        let overtimeHours = timeEntryData.overtimeHours || 0;
        let totalHours = timeEntryData.totalHours || 0;
        let payrollHours = timeEntryData.payrollHours || 0;
        const predefinedOvertimeHours =
          timeEntryData.predefinedOvertimeHours || 0;

        try {
          const timeInParts = timeIn.split(":");
          const timeOutParts = formattedDateTime.split(":");

          const timeInMilliseconds =
            (+timeInParts[0] * 60 * 60 +
              +timeInParts[1] * 60 +
              +timeInParts[2]) *
            1000;
          const timeOutMilliseconds =
            (+timeOutParts[0] * 60 * 60 +
              +timeOutParts[1] * 60 +
              +timeOutParts[2]) *
            1000;

          const timeDifferenceMilliseconds =
            timeOutMilliseconds - timeInMilliseconds;

          const diffHours = timeDifferenceMilliseconds / (1000 * 60 * 60);

          let cumulativeHours = Math.floor(diffHours);
          let remainingMinutes = diffHours % 1;

          if (remainingMinutes >= 0.5) {
            cumulativeHours += 0.5;
          }

          console.log("diffHours: ", diffHours);

          let overtimeHours = 0;
          let hourDifferential = cumulativeHours - breakHours;
          console.log("hourDifferential: ", hourDifferential);

          if (hourDifferential === 8.5) {
            overtimeHours = 1;
          } else if (hourDifferential > 8.5) {
            overtimeHours = 1;
            let additionalTime = hourDifferential - 8.5;
            if (additionalTime >= 1) {
              overtimeHours += Math.floor(additionalTime);
            }
            console.log("additionalTime: ", additionalTime);
          }
          console.log("overtimeHours: ", overtimeHours);

          let totalHours = Math.min(
            Math.floor(cumulativeHours - breakHours, 8)
          );

          totalHours = Math.max(totalHours, 0);
          console.log("totalHours: ", totalHours);

          let payrollHours = Math.min(totalHours - lateHours, 8);
          payrollHours = Math.max(payrollHours, 0);
          console.log("payrollHours: ", payrollHours);

          await updateDoc(timeEntryRef, {
            overtimeHours: overtimeHours,
            totalHours: totalHours,
            payrollHours: payrollHours,
            timeOut: formattedDateTime,
            payrollOvertimeHours:
              predefinedOvertimeHours === overtimeHours ? overtimeHours : 0,
          });

          const employeeScheduleDoc = scheduleDoc.ref;
          const employeeScheduleData = scheduleDoc.data();
          const unauthorizedOvertime =
            employeeScheduleData.unauthorizedOvertime;

          if (predefinedOvertimeHours !== overtimeHours) {
            await updateDoc(employeeScheduleDoc, {
              unauthorizedOvertime: "Y",
            });
            const overtimeNotesQuery = query(
              collection(db, "OVERTIME_NOTES"),
              where("noteCode", "==", "pendingApproval")
            );
            const overtimeNotesSnapshot = await getDocs(overtimeNotesQuery);

            if (!overtimeNotesSnapshot.empty) {
              const noteDoc = overtimeNotesSnapshot.docs[0];
              const noteData = noteDoc.data();
              const noteCode = noteData.noteCode;
              const noteDetails = noteData.noteDetails;

              await updateDoc(timeEntryRef, {
                notes: noteDetails,
                noteCode: noteCode,
              });
            } else {
            }
          }
        } catch (error) {
          console.log("Error processing time out: ", error);
        }
      }
    }
  } catch (error) {
    console.log("Error processing time out: ", error);
  }
  Alert.alert("Success", "Time out successful!");
}
