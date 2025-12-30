import { Text, TouchableOpacity, View } from "react-native";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import { Workout } from "@/types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteWorkout } from "@/store/workoutPlan/workoutSlice";
import { useRouter } from "expo-router";

interface DraggableProps {
  selectedDay: string;
  data: Workout[];
  editModalVisible: boolean;
  setEditModalVisible: (visible: boolean) => void;
  setEditWorkout: (workout: Workout) => void;
  onReordered: (updatedData: Workout[]) => void;
}

export default function DraggableList({
  selectedDay,
  editModalVisible,
  setEditModalVisible,
  setEditWorkout,
  onReordered,
}: DraggableProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const workoutList = useSelector((state: RootState) => state.workout);

  function keyExtractor(item: Workout) {
    return item.id;
  }
  const toggleEditModal = (item: Workout) => {
    setEditWorkout(item);
    setEditModalVisible(!editModalVisible);
  };

  // Only render workout with selected day
  const filteredWorkouts = workoutList.filter((item) =>
    item.day.includes(selectedDay)
  );

  function renderItem(info: DragListRenderItemInfo<Workout>) {
    const { item, onDragStart, onDragEnd } = info;

    return (
      <TouchableOpacity
        key={item.id}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}
        className="w-full my-1 p-3 border-[1px] bg-white border-[#A9A9A9] rounded-lg flex flex-row justify-between items-center"
      >
        <View className="flex">
          <Text className="font-semibold text-[16px] capitalize mb-1">
            {item.name}
          </Text>
          <Text className="text-[#636363]">
            {item.sets} x {item.reps} reps ({item.weight}
            {item.weight && " "}
            {item.weight ? "kg" : "bodyweight"})
          </Text>
        </View>

        <View className="flex flex-row gap-4">
          {/* Opens edit modal */}
          <TouchableOpacity
            style={{ height: hp(4), width: hp(4) }}
            className="bg-[#999] rounded-full items-center justify-center"
            onPress={() => toggleEditModal(item)}
          >
            <Ionicons name="pencil" size={wp(4)} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ height: hp(4), width: hp(4) }}
            className="bg-rose-500 rounded-full items-center justify-center"
            onPress={() => {
              dispatch(deleteWorkout(item));
            }}
          >
            <Ionicons name="trash" size={hp(2.5)} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  function reorderWorkout(fromIndex: number, toIndex: number) {
    const reorderedList = [...workoutList]; // Make a copy of store data instead of modifying
    const [movedItem] = reorderedList.splice(fromIndex, 1);
    reorderedList.splice(toIndex, 0, movedItem); // Insert movedItem at new position to reorder
    onReordered(reorderedList);
  }

  return (
    <View className="px-6">
      <DragList
        data={filteredWorkouts}
        keyExtractor={(item) => keyExtractor(item)}
        onReordered={reorderWorkout}
        renderItem={renderItem}
      />
    </View>
  );
}
