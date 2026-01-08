import { Pressable, Text, TouchableOpacity, View } from "react-native";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import { Workout } from "@/types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  deleteWorkout,
  editWorkoutSets,
} from "@/store/workoutPlan/workoutSlice";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import WorkoutSetComp from "./editWorkout/WorkoutSetComp";

interface DraggableProps {
  selectedDay: string;
  onReordered: (updatedData: Workout[]) => void;
}

export default function DraggableList({
  selectedDay,
  onReordered,
}: DraggableProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const workoutList = useSelector((state: RootState) => state.workout);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function keyExtractor(item: Workout) {
    return item.id;
  }

  // Only render workout with selected day
  const filteredWorkouts = workoutList.filter((item) =>
    item.day.includes(selectedDay)
  );

  function renderItem(info: DragListRenderItemInfo<Workout>) {
    const { item, onDragStart, onDragEnd } = info;
    const isOpen = expandedId === item.id;

    const handleUpdateRedux = (action: any) => {
      const updatedWorkout =
        typeof action === "function"
          ? action(item) // if function, pass the current item as 'prev'
          : action; // if object, use it directly

      dispatch(
        editWorkoutSets({
          workoutId: item.id,
          sets: updatedWorkout.sets,
        })
      );
    };

    const workoutComplete = () => {
      return item.sets.every((set) => set.done === true);
    };

    return (
      <View
        className="my-1 border-[1px] bg-white border-[#A9A9A9] rounded-lg overflow-hidden"
        style={workoutComplete() && { backgroundColor: "#D0F0C0" }}
      >
        <Pressable
          key={item.id}
          onPress={() => setExpandedId(isOpen ? null : item.id)}
          onLongPress={() => {
            onDragStart();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          onPressOut={onDragEnd}
          className="p-3"
        >
          <View
            className="w-full flex flex-row justify-between items-center"
            style={isOpen && { marginBottom: 10 }}
          >
            <View className="flex">
              <Text className="font-semibold text-[16px] capitalize mb-1">
                {item.name}
              </Text>
              <Text className="text-[#636363]">
                {item.sets.length} sets &bull;{" "}
                {item.sets.filter((set) => set.done).length} completed
              </Text>
            </View>

            <View className="flex flex-row gap-4">
              <TouchableOpacity
                style={{ height: hp(4), width: hp(4) }}
                className="bg-[#999] rounded-full items-center justify-center"
                onPress={() =>
                  router.push({
                    pathname: "/editWorkout",
                    params: { ...item, sets: JSON.stringify(item.sets) },
                  })
                }
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
          </View>
        </Pressable>

        {isOpen && (
          <View className="px-3 pb-3">
            <WorkoutSetComp
              workout={item}
              nested={true}
              setWorkout={handleUpdateRedux}
            />
          </View>
        )}
      </View>
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
