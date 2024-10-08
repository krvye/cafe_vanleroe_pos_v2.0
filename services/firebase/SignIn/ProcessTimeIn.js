// import moment from "moment-timezone";
import app from "../firebaseConfig";
import { collection, query, where, addDoc, getDocs, getFirestore } from "firebase/firestore";

export default function processTimeIn(currentUserEmail, callback) {
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

  const db = getFirestore(app);
  const employeeInfoCollection = collection(db, "EMPLOYEE_INFORMATION");
  const employeeQuery = query(
    employeeInfoCollection,
    where("emailAddress", "==", currentUserEmail)
  );

  getDocs(employeeQuery)
    .then(async (employeeSnapshot) => {
      if (employeeSnapshot.empty) {
        console.log("No documents found with the email:", currentUserEmail);
        callback("No employee found with this email", null);
      } else {
        employeeSnapshot.forEach(async (doc) => {
          const employeeId = doc.id;
          let foundShiftToday = false;

          const scheduleCollection = collection(db, "EMPLOYEE_SCHEDULE");
          const scheduleQuery = query(
            scheduleCollection,
            where("employeeId", "==", employeeId),
            where("shiftDate", "==", `${year}-${month}-${day}`)
          );

          try {
            const scheduleSnapshot = await getDocs(scheduleQuery);

            if (scheduleSnapshot.empty) {
              console.log("No schedule found for employee ID:", employeeId);
            } else {
              for (const scheduleDoc of scheduleSnapshot.docs) {
                const scheduleData = scheduleDoc.data();
                let shiftStartTime = scheduleData.shiftStartTime;
                let shiftDate = scheduleData.shiftDate;

                if (!shiftStartTime.includes(":")) {
                  shiftStartTime += ":00";
                }

                console.log("Employee ID:", employeeId);
                console.log("Time in:", shiftStartTime);

                const timeInOutCollection = collection(db, "TIME_IN_OUT");
                const timeInOutQuery = query(
                  timeInOutCollection,
                  where("employeeId", "==", employeeId),
                  where("timeEntryDate", "==", shiftDate)
                );

                const timeInOutSnapshot = await getDocs(timeInOutQuery);

                if (!timeInOutSnapshot.empty) {
                  console.log("Notice: You have already punched in for today.");
                  callback("You have already punched in for today.", null);
                  return;
                }

                const currentDateTime = new Date();
                const shiftDateTime = new Date(
                  `${shiftDate}T${shiftStartTime}`
                );
                const timeDifference =
                  (currentDateTime - shiftDateTime) / (1000 * 60);

                console.log("Time difference in minutes:", timeDifference);

                if (timeDifference < -30) {
                  console.log("Too early for time in.");
                  callback("Too early for time in", null);
                  return;
                } else if (timeDifference >= -30 && timeDifference <= 30) {
                  console.log(
                    "Less than 30mins and After 30 mins, opening camera..."
                  );
                  callback(null, { openCamera: true });
                  foundShiftToday = true;
                  return;
                } else if (timeDifference > 30) {
                  console.log("You are late.");
                  console.log("Late from shift, opening camera...");
                  callback(null, { openCamera: true });
                  foundShiftToday = true;
                  return;
                }
              }
            }

            if (!foundShiftToday) {
              console.log("No shift today for employee ID:", employeeId);
              callback("Oops! No shift today.", null);
            }
          } catch (error) {
            console.error("Error processing schedule:", error);
            callback(error, null);
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching employee information:", error);
      callback(error, null);
    });
}
