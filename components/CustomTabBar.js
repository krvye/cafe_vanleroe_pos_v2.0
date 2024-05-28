// React Native Core Components
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

// Expo Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Custom Profile Picture
import DefaultProfilePicture from "../assets/default-profile-picture.jpg";

export default function CustomTabBar({ state, descriptors, navigation }) {
  // Get device window dimensions
  const { width, scale, fontScale } = useWindowDimensions();

  // Get styles
  const styles = makeStyles(scale);

  // Declaring icon size responsive to device dimensions
  const baseIconSize = 30;
  const iconSize = baseIconSize;

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="arrow-left-thin-circle-outline"
          size={iconSize}
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
                  size={iconSize}
                  color={color}
                />
              )}
              {route.name === "Queue" && (
                <MaterialCommunityIcons
                  name="clipboard-list-outline"
                  size={iconSize}
                  color={color}
                />
              )}
              {route.name === "History" && (
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={iconSize}
                  color={color}
                />
              )}
              {route.name === "Inventory" && (
                <MaterialIcons name="inventory" size={iconSize} color={color} />
              )}
              {route.name === "Customers" && (
                <MaterialIcons name="person" size={iconSize} color={color} />
              )}

              <Text style={{ color, fontSize: 16 * fontScale }}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <Image source={DefaultProfilePicture} style={styles.profilePicture} />
    </View>
  );
}

const makeStyles = (scale) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10 * scale,
      borderBottomWidth: 1,
      borderBottomColor: "#FF5C00",
      paddingVertical: 10,
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "white",
    },
    backButton: {},
    tabButton: {},
    tabButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    profilePicture: {
      height: 18 * scale,
      width: 18 * scale,
      borderRadius: (18 * scale) / 2,
    },
  });
