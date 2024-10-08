import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";

export const employeeInformation = () => {
  const [employeeInfo, setEmployeeInfo] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const EMPLOYEE_INFORMATION_COLLECTION = collection(
      db,
      "EMPLOYEE_INFORMATION"
    );

    const subscribeEmployeeInfo = onSnapshot(
      EMPLOYEE_INFORMATION_COLLECTION,
      (snapshot) => {
        const employeeInfoData = [];
        snapshot.forEach((doc) => {
          employeeInfoData.push({ doc_id: doc.id, ...doc.data() });
        });
        setEmployeeInfo(employeeInfoData);
        console.log("EMPLOYEE INFORMATION: ", employeeInfoData);
      }
    );
    return () => subscribeEmployeeInfo();
  }, []);
  return employeeInfo;
};
