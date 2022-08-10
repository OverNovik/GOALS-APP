import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  const startAddGoalHandler = () => setModalIsVisible(true);

  const endAddGoalHandler = () => setModalIsVisible(false);

  const addGoalHandler = (enteredGoalText) => {
    setGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  };

  const deleteGoalHandler = (id) =>
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add new Goal"
        color="#5e0acc"
        onPress={startAddGoalHandler}
      />
      {modalIsVisible && (
        <GoalInput
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
          onAddGoal={addGoalHandler}
        />
      )}
      <View style={styles.goalsContainer}>
        <Text>List of goals...</Text>
        <FlatList
          data={goals}
          alwaysBounceVertical={false}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
