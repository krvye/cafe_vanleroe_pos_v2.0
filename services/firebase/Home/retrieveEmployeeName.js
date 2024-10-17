import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

export function retrieveEmployeeName(employeeId) {
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    const EMPLOYEE_INFORMATION_COLLECTION = collection(
      db,
      "EMPLOYEE_INFORMATION"
    );

    const queryEmployeeInformation = query(
      EMPLOYEE_INFORMATION_COLLECTION,
      where("employeeId", "==", employeeId)
    );

    const subscribeEmployeeName = onSnapshot(
      queryEmployeeInformation,
      (snapshot) => {
        snapshot.forEach((doc) => {
          // Ensure that the document data contains the name
          if (doc.exists()) {
            const data = doc.data();
            if (data && data.name) {
              setEmployeeName(data.name); // Assuming name is a single value
            }
          }
        });
      }
    );

    return () => subscribeEmployeeName();
  }, [employeeId]); // Ensure the effect depends on employeeId

  return employeeName;
}
