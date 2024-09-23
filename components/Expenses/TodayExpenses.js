import {
  View,
  StyleSheet,
  Text,
  Pressable,
  // ImageBackground,
} from "react-native";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import expensesBg from "@assets/expensesBg.svg";

export default function TodayExpenses({ setOpenAddExpense }) {
  const handleOpenAddExpense = () => {
    setOpenAddExpense(true);
    console.log("Add Item!");
  };

  return (
    <View style={styles.expMainContainer}>
      <View style={styles.expenseDetailsContainer}>
        <View style={styles.expenseIcon}>
          <ShoppingCartIcon style={{color: "#FFFFFF"}}/>
        </View>
        <Text style={styles.amountText}>TOTAL EXPENSES: </Text>
        <Text style={styles.expenseText}>₱ 20000.00</Text>
        {/* <View style={styles.expenseDetails}>
          <View style={styles.expenseIconCon}>
            <View style={styles.expenseIcon}>
              <ShoppingCartIcon />
            </View>
          </View>
          <View style={styles.branchCon}>
            <Text style={styles.branchText}>WALTERMART TAYTAY</Text>
          </View>
          <View style={styles.amountCon}>
            <Text style={styles.amountText}>₱ 200.00</Text>
            <Text style={styles.expenseText}>Total Expense</Text>
          </View>
        </View> */}

        {/* <View style={styles.expenseDetails}>
          <View style={styles.expenseIconCon}>
            <View style={styles.expenseIcon}>
              <ShoppingCartIcon />
            </View>
          </View>
          <View style={styles.branchCon}>
            <Text style={styles.branchText}>AYALA MALLS FELIZ</Text>
          </View>
          <View style={styles.amountCon}>
            <Text style={styles.amountText}>₱ 200.00</Text>
            <Text style={styles.expenseText}>Total Expense</Text>
          </View>
        </View> */}

        {/* <View style={styles.expenseDetails}>
          <View style={styles.expenseIconCon}>
            <View style={styles.expenseIcon}>
              <ShoppingCartIcon />
            </View>
          </View>
          <View style={styles.branchCon}>
            <Text style={styles.branchText}>ANY BRANCH</Text>
          </View>
          <View style={styles.amountCon}>
            <Text style={styles.amountText}>₱ 200.00</Text>
            <Text style={styles.expenseText}>Total Expense</Text>
          </View>
        </View> */}
      </View>

      {/* Today Expenses */}
      <View style={styles.addAndTodayExpCon}>
        <Pressable style={styles.addExpCon} onPress={handleOpenAddExpense}>
          <Text style={styles.buttonText}>Add Expenses</Text>
        </Pressable>
        {/* <ImageBackground
          style={styles.todayExpensesContainer}
          source={expensesBg}
          resizeMode="cover"
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.todayExpTextCon}>
            <Text style={styles.todayExpText}>Today's Expenses</Text>
          </View>
          <View style={styles.expAmountCon}>
            <Text style={styles.expAmountText}>₱ 200.00</Text>
          </View>
        </ImageBackground> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  expMainContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "1%",
    // backgroundColor: "red",
  },
  expenseDetailsContainer: {
    height: "100%",
    width: "40%",
    // borderRadius: 10,
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 4,
    marginRight: "2%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  // expenseDetails: {
  //   height: "90%",
  //   width: "31%",
  //   backgroundColor: "#f7c56a93",
  //   marginRight: "1%",
  //   marginLeft: "1%",
  //   display: "flex",
  //   flexDirection: "column",
  //   borderRadius: 5,
  // },
  // expenseIconCon: {
  //   marginTop: "2%",
  //   height: "20%",
  //   width: "100%",
  //   // backgroundColor: "pink",
  // },
  expenseIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#FF6600",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "2%",
    marginRight: "2%",
  },
  // branchCon: {
  //   marginTop: "10%",
  //   height: "20%",
  //   width: "100%",
  //   // backgroundColor: "pink",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // amountCon: {
  //   marginTop: "10%",
  //   height: "30%",
  //   width: "100%",
  //   // backgroundColor: "pink",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  amountText: {
    fontWeight: "bold",
    fontSize: 23,
  },
  expenseText: {
    fontSize: 25,
  },
  // branchText: {
  //   fontWeight: "bold",
  //   fontSize: 16,
  //   textAlign: "center",
  // },
  addAndTodayExpCon: {
    height: "100%",
    width: "50%",
    // backgroundColor: "pink",
  },
  addExpCon: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    shadowColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "3%",
    borderRadius: 5,
  },
  // todayExpensesContainer: {
  //   height: "75%",
  //   width: "100%",
  //   borderRadius: 5,
  //   backgroundColor: "#FFFFFF",
  //   shadowColor: "#000000",
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 4,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  // todayExpTextCon: {
  //   height: "20%",
  //   width: "100%",
  //   marginTop: "5%",
  //   marginBottom: "5%",
  //   // backgroundColor: "pink",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // todayExpText: {
  //   fontSize: 20,
  //   textAlign: "center",
  // },
  // expAmountCon: {
  //   height: "20%",
  //   width: "100%",
  //   // backgroundColor: "pink",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // expAmountText: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  // },
  // backgroundImage: {
  //   flex: 1,
  //   alignSelf: "flex-end",
  // },
});
