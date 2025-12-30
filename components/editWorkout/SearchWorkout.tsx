import { dummyExercises } from "@/constants";
import { Workout } from "@/types";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface SearchWorkoutProps {
  workout: Workout;
  showDropdown: boolean;
  error: string;
  setWorkout: (workout: Workout) => void;
  setShowDropdown: (show: boolean) => void;
  onSelectDay: () => void;
}

const SearchWorkout = ({
  workout,
  showDropdown,
  error,
  setWorkout,
  setShowDropdown,
  onSelectDay,
}: SearchWorkoutProps) => {
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState(dummyExercises);

  const handleSelect = (selectedItem: string) => {
    setSearchText(selectedItem);
    setWorkout({ ...workout, name: selectedItem });
    setShowDropdown(false);
  };

  //   TODO: add debounce
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredList(dummyExercises);
    } else {
      const filtered = dummyExercises.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [searchText]);

  return (
    <View className="px-6">
      <Text className="mt-4 mb-2 font-semibold text-[18px] text-gray-500">
        Name
      </Text>

      <TextInput
        className="w-full p-3 rounded-lg border-[1px] border-[#D7D7D7] bg-white capitalize"
        style={error && workout.name === "" && { borderColor: "red" }}
        placeholder="Search workout"
        placeholderTextColor="#999"
        value={workout.name}
        onChangeText={(text) => {
          setSearchText(text);
          setWorkout({ ...workout, name: text });
          setShowDropdown(true);
        }}
      />

      {showDropdown && (
        <FlatList
          style={{ width: "100%", maxHeight: hp(30) }}
          data={filteredList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleSelect(item.name)}
            >
              <Text className="capitalize">{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text className="mt-4 mb-2 font-semibold text-[18px] text-gray-500">
        Day
      </Text>
      <TouchableOpacity
        className="w-full p-3 rounded-lg border-[1px] border-[#D7D7D7] bg-white"
        style={error && workout.day === "" && { borderColor: "red" }}
        onPress={onSelectDay}
      >
        <Text style={workout.day === "" && { color: "#999" }}>
          {workout.day ? workout.day : "Select Workout Day"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fefefd",
  },
});

export default SearchWorkout;
