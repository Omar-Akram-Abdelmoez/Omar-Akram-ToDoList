import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [goals, setGoals] = useState([]);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  function goalInputHandler(text) {
    setEnteredGoal(text);
  }

  function addGoalHandler() {
    if (enteredGoal.trim().length === 0) {
      Alert.alert("Invalid Input", "Please enter a goal first!");
      return;
    }

    setGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoal, id: Math.random().toString() },
    ]);

    setEnteredGoal("");
  }

  function deleteGoalHandler(id) {
    Alert.alert("Delete Goal", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setGoals((currentGoals) =>
            currentGoals.filter((goal) => goal.id !== id)
          );
        },
      },
    ]);
  }

  return (
    <View style={styles.appContainer}>
      <Text style={styles.title}>My To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your goal..."
          value={enteredGoal}
          onChangeText={goalInputHandler}
        />

        <TouchableOpacity style={styles.addButton} onPress={addGoalHandler}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {goals.length === 0 ? (
          <Text style={styles.emptyText}>No goals yet 👀</Text>
        ) : (
          <FlatList
            data={goals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => deleteGoalHandler(item.id)}
              >
                <View style={styles.goalItem}>
                  <Text style={styles.goalText}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#F8F9FA",
  },

  title: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#1E3A8A",
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    borderRadius: 10,
    padding: 12,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
    fontFamily: "Poppins_400Regular",
  },

  addButton: {
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontFamily: "Poppins_700Bold",
  },

  listContainer: {
    flex: 1,
  },

  goalItem: {
    backgroundColor: "#3B82F6",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
  },

  goalText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#6B7280",
    fontFamily: "Poppins_400Regular",
  },
});