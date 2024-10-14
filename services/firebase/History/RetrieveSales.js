import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";
import { useBranches } from "../../../context/BranchContext"; 

export const SalesInformation = () => {
  const { selectedBranch } = useBranches(); 
  const branchCode = selectedBranch ? selectedBranch.branchCode : null; 
  console.log("Daily Sales in Branch: ", branchCode);
  
  const [salesData, setSalesData] = useState([]);

  // For computations
  const [totalSales, setTotalSales] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [gcashSales, setGcashSales] = useState(0);
  const [gcashCount, setGcashCount] = useState(0);
  const [cashOnHandSales, setCashOnHandSales] = useState(0);
  const [cashOnHandCount, setCashOnHandCount] = useState(0);
  const [mayaSales, setMayaSales] = useState(0);
  const [mayaCount, setMayaCount] = useState(0);
  const [grabCount, setGrabCount] = useState(0);
  const [grabSales, setGrabSales] = useState(0);
  const [fpCount, setFpCount] = useState(0);
  const [fpSales, setFpSales] = useState(0);
  const [onsiteSales, setOnsiteSales] = useState(0);
  const [onsiteCount, setOnsiteCount] = useState(0);
  const [fbSales, setFbSales] = useState(0);
  const [fbCount, setFbCount] = useState(0);

  useEffect(() => {
    const db = getFirestore(app);
    const DAILY_SALES_COLLECTION = collection(db, "DAILY_SALES");

    const subscribeDailySales = onSnapshot(
      DAILY_SALES_COLLECTION,
      (snapshot) => {
        const dailySalesInfo = [];
        snapshot.forEach((doc) => {
          dailySalesInfo.push({ doc_id: doc.id, ...doc.data() });
        });

        // Filter sales data based on current date
        const dailySalesData = dailySalesInfo.filter((sale) => {
          const currDate = new Date().toISOString().split("T")[0];
          console.log("Current Date: ", currDate);
          return (sale.orderDate === currDate && sale.orderStatus === "DONE" && sale.branchCode === branchCode);
        });

        setSalesData(dailySalesData);
        console.log("Daily Sales: ", dailySalesData);

        // Total sales
        const totSales = dailySalesData.reduce(
          (acc, curr) => acc + curr.totalAmount,
          0
        );
        setTotalSales(totSales);
        console.log("Total Sales: ", totSales);

        // Order count
        const ordCount = dailySalesData.reduce((acc, curr) => {
          return (
            acc +
            Object.values(curr.orderItems).reduce(
              (sum, orderItem) => sum + orderItem.itemQuantity,
              0
            )
          );
        }, 0);
        setOrderCount(ordCount);
        console.log("Order Count: ", ordCount);

        // Total customers
        const mapCustomerNames = new Set(
          dailySalesData.map((customers) => customers.orderTakenBy)
        );
        const customerCount = mapCustomerNames.size;
        setTotalCustomers(customerCount);
        console.log("Total customers: ", customerCount);

        // Gcash
        const gcashData = dailySalesData.filter((sale) =>
          sale.paymentMethods.some(
            (paymentMethod) => paymentMethod.modeOfPayment === "GCAS"
          )
        );
        const gcashTotalSales = gcashData.reduce(
          (acc, curr) => acc + curr.totalAmount,
          0
        );
        setGcashSales(gcashTotalSales);
        console.log("Gcash Total Sales: ", gcashTotalSales);

        const gcashCount = new Set(
          gcashData.map((customers) => customers.orderTakenBy)
        );
        const gcashCustomers = gcashCount.size;
        setGcashCount(gcashCustomers);
        console.log("Total Gcash Customers: ", gcashCustomers);

        // Cash on Hand
        const cashOnHandData = dailySalesData.filter((sale) =>
          sale.paymentMethods.some(
            (paymentMethod) => paymentMethod.modeOfPayment === "CASH"
          )
        );

        const cashOnHandTotalAmount = cashOnHandData.reduce(
          (acc, curr) => acc + curr.totalAmount,
          0
        );
        setCashOnHandSales(cashOnHandTotalAmount);
        console.log("Cash On Hand Total: ", cashOnHandTotalAmount);

        const cashCount = new Set(
          cashOnHandData.map((customers) => customers.orderTakenBy)
        );
        const cashCustomers = cashCount.size;
        setCashOnHandCount(cashCustomers);
        console.log("Cash On Hand COunt: ", cashCustomers);

        // Pay maya
        const mayaData = dailySalesData.filter((sale) =>
          sale.paymentMethods.some(
            (paymentMethod) => paymentMethod.modeOfPayment === "MAYA"
          )
        );
        const mayaTotalSales = mayaData.reduce(
          (acc, curr) => acc + curr.totalAmount,
          0
        );
        setMayaSales(mayaTotalSales);
        console.log("Paymaya Total Sales: ", mayaTotalSales);

        const mayaCount = new Set(
          mayaData.map((customers) => customers.orderTakenBy)
        );
        const mayaCustomers = mayaCount.size;
        setMayaCount(mayaCustomers);
        console.log("Maya Count: ", mayaCustomers);

        // Grab
        const grabData = dailySalesData.filter(
          (sale) => sale.orderMode === "GB"
        );
        const grabTotalAmount = grabData.reduce(
          (acc, curr) => acc + curr.totalAmount,
          0
        );
        setGrabSales(grabTotalAmount);
        console.log("Grab Total Amount: ", grabTotalAmount);

        const grabCount = new Set(
          grabData.map((customers) => customers.orderTakenBy)
        );
        const grabCustomers = grabCount.size;
        setGrabCount(grabCustomers);
        console.log("Grab Count: ", grabCustomers);

        // Food Panda
        const fpData = dailySalesData.filter((sale) => sale.orderMode === "FP");
        const fpTotalAmount = fpData.reduce(
          (acc, curr) => acc + curr.totalAmount,
          0
        );
        setFpSales(fpTotalAmount);
        console.log("Food Panda Total Amount: ", fpTotalAmount);

        const fpCount = new Set(
          fpData.map((customers) => customers.orderTakenBy)
        );
        const fpCustomers = fpCount.size;
        setFpCount(fpCustomers);
        console.log("Food Panda Count: ", fpCustomers);

        // Onsite
        const onsiteData = dailySalesData.filter(
          (sale) => sale.orderMode === "OS"
        );
        const onsiteTotalAmount = onsiteData.reduce(
          (acc, curr) => acc + curr.totalAmount,
          0
        );
        setOnsiteSales(onsiteTotalAmount);
        console.log("Onsite Total Amount: ", onsiteTotalAmount);

        const onsiteCount = new Set(
          onsiteData.map((customers) => customers.orderTakenBy)
        );
        const onsiteCustomers = onsiteCount.size;
        setOnsiteCount(onsiteCustomers);
        console.log("Onsite Count: ", onsiteCustomers);

        // Facebook
        const facebookData = dailySalesData.filter(
          (sale) => sale.orderMode === "FB"
        );
        const facebookTotalAmount = facebookData.reduce(
          (acc, curr) => acc + curr.totalAmount,
          0
        );
        setFbSales(facebookTotalAmount);
        console.log("Facebook Sales: ", facebookTotalAmount);

        const facebookCount = new Set(
          facebookData.map((customers) => customers.orderTakenBy)
        );
        const facebookCustomers = facebookCount.size;
        setFbCount(facebookCustomers);
        console.log("Facebook Count: ", facebookCustomers);
      }
    );

    return () => subscribeDailySales();
  }, []);

  return {
    salesData,
    totalSales,
    orderCount,
    totalCustomers,
    gcashSales,
    gcashCount,
    cashOnHandSales,
    cashOnHandCount,
    mayaSales,
    mayaCount,
    grabSales,
    grabCount,
    fpCount,
    fpSales,
    onsiteSales,
    onsiteCount,
    fbSales,
    fbCount,
  };
};
