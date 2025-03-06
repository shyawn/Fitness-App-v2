import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { dummyExercises } from "@/constants";
import { useDispatch } from "react-redux";
import { storeEditWorkout } from "@/store/workoutPlan/workoutSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { week } from "@/constants";

export default function EditWorkoutModal({
  editModalVisible,
  setEditModalVisible,
  editWorkout,
}) {
  const [filteredList, setFilteredList] = useState(dummyExercises);
  const [showEditDropdown, setShowEditDropdown] = useState(false);
  const [searchEditText, setSearchEditText] = useState("");
  const [weight, setEditWeight] = useState("");
  const [error, setError] = useState("");

  const [workout, setWorkout] = useState({
    id: editWorkout.id,
    name: editWorkout.name,
    day: editWorkout.day,
    sets: editWorkout.sets,
    weight: editWorkout.weight,
  });

  const dispatch = useDispatch();

  const toggleModal = () => {
    setEditModalVisible(false);
  };
  const saveWorkout = () => {
    if (
      workout.name === "" ||
      workout.day === "" ||
      workout.sets === "" ||
      workout.weight === ""
    ) {
      setError("Please enter required fields");
    } else {
      setError("");
      dispatch(storeEditWorkout(workout));
      //   console.log("edit workout: ", workout);
      toggleModal();
    }
  };
  const handleSelect = (selectedItem: string) => {
    setSearchEditText(selectedItem);
    setWorkout((prev) => ({ ...prev, name: selectedItem }));
    setShowEditDropdown(false);
  };

  useEffect(() => {
    if (searchEditText.trim() === "") {
      setFilteredList(dummyExercises);
    } else {
      const filtered = dummyExercises.filter((item) =>
        item.name.toLowerCase().includes(searchEditText.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [searchEditText]);

  return (
    <Modal animationType="fade" transparent={true} visible={editModalVisible}>
      <View style={styles.centeredView}>
        <View
          style={[styles.modalView, { width: wp(80) }]}
          className="bg-white rounded-xl p-[20px] pt-[50px] items-center"
        >
          <TextInput
            className="w-full rounded-lg border-[1px] border-[#A9A9A9]"
            placeholder="Search.."
            value={workout.name}
            onChangeText={(text) => {
              setSearchEditText(text);
              setWorkout((prev) => ({ ...prev, name: text }));
              setShowEditDropdown(true);
            }}
          />
          {showEditDropdown && (
            <FlatList
              style={{ width: "100%", maxHeight: hp(30) }}
              data={filteredList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => handleSelect(item.name)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          <View className="w-full mt-3 h-[100px]">
            <Text className="text-neutral-600">Select Date</Text>
            <ScrollPicker
              dataSource={week}
              selectedIndex={week.indexOf(workout.day)}
              renderItem={(data, index) => (
                <View key={index} className="items-center">
                  <Text className="">{data}</Text>
                </View>
              )}
              onValueChange={(data, selectedIndex) => {
                setWorkout((prev) => ({ ...prev, day: data }));
              }}
              wrapperHeight={90}
              wrapperBackground="#FFFFFF"
              itemHeight={40}
              highlightColor="#d8d8d8"
              highlightBorderWidth={2}
            />
          </View>

          <View className="flex flex-row justify-around mt-1 mb-3 gap-5">
            <TextInput
              className="w-1/2"
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderColor: "#A9A9A9",
              }}
              placeholder="Sets"
              value={workout.sets}
              keyboardType="numeric"
              onChangeText={(text) =>
                setWorkout((prev) => ({ ...prev, sets: text }))
              }
            />
            <View className="w-1/2 relative">
              <TextInput
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderColor: "#A9A9A9",
                }}
                placeholder="Weight"
                value={workout.weight}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setEditWeight(text);
                  setWorkout({ ...workout, weight: text });
                }}
              />
              {weight !== "" && (
                <Text className="absolute right-0 bottom-3 font-semibold text-[#A9A9A9]">
                  kg
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            onPress={toggleModal}
            className="absolute right-3 top-3"
          >
            <Ionicons name="close" size={hp(3)} color="gray" />
          </TouchableOpacity>

          {error && <Text className="text-red-500 mb-2">{error}</Text>}

          <TouchableOpacity
            onPress={saveWorkout}
            className="w-full bg-rose-500 p-2 rounded-lg flex items-center"
          >
            <Text className="font-semibold text-white">Save workout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fefefd",
  },
});
