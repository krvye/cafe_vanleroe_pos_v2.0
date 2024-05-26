// React Native Core Components
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

// Expo Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Custom Profile Picture
import DefaultProfilePicture from "../assets/default-profile-picture.jpg";

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="arrow-left-thin-circle-outline"
          size={24}
          color="#FF5C00"
        />
      </TouchableOpacity>

      {/* Custom Tab */}
      {state.routes.map((route, index) => {
        // Declaring tab labels, colors, and actions
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const color = isFocused ? "#FF5C00" : "#828487";

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <View style={styles.tabButtonContainer}>
              {route.name === "Home" && (
                <MaterialCommunityIcons
                  name="home-variant"
                  size={24}
                  color={color}
                />
              )}
              {route.name === "Queue" && (
                <MaterialCommunityIcons
                  name="clipboard-list-outline"
                  size={24}
                  color={color}
                />
              )}
              {route.name === "History" && (
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={24}
                  color={color}
                />
              )}
              {route.name === "Inventory" && (
                <MaterialIcons name="inventory" size={24} color={color} />
              )}
              {route.name === "Customers" && (
                <MaterialIcons name="person" size={24} color={color} />
              )}

              <Text style={{ color }}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <Image source={DefaultProfilePicture} style={styles.profilePicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#FF5C00",
    paddingBottom: 10,
  },
  backButton: { marginLeft: 30 },
  tabButton: { flex: 1, marginLeft: 40 },
  tabButtonContainer: { flexDirection: "row", alignItems: "center", gap: 5 },
  profilePicture: {
    borderRadius: 300,
    height: 30,
    width: 30,
    marginRight: 30,
  },
});
