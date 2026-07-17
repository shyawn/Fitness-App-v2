import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import { Workout } from "@/types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@react-native-vector-icons/ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  deleteWorkout,
  editWorkoutSets,
} from "@/store/workoutPlan/workoutSlice";
import { startTimer } from "@/store/restTimer/restTimerSlice";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useMemo, useState } from "react";
import WorkoutSetComp from "./editWorkout/WorkoutSetComp";

const supersetColors: Record<string, string> = {
  A: "#f43f5e",
  B: "#3b82f6",
  C: "#22c55e",
  D: "#f59e0b",
};

const getSupersetColor = (group: string) => supersetColors[group] ?? "#a855f7";

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

  // Memoized so this only produces a new reference when the underlying data
  // actually changes — react-native-draglist remounts every row whenever
  // `data` changes reference, which would otherwise fire on every unrelated
  // local state change here (e.g. expandedId) and interrupt an in-progress
  // drag gesture.
  const filteredWorkouts = useMemo(
    () => workoutList.filter((item) => item.day.includes(selectedDay)),
    [workoutList, selectedDay]
  );

  function renderItem(info: DragListRenderItemInfo<Workout>) {
    const { item, onDragStart, onDragEnd, isActive: isDragging } = info;
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

    const workoutComplete =
      Array.isArray(item?.sets) &&
      item.sets.length > 0 &&
      item.sets.every((set) => set.done === true);

    const supersetColor = item.supersetGroup
      ? getSupersetColor(item.supersetGroup)
      : null;

    return (
      <View
        className="my-1 border-[1px] bg-white border-[#A9A9A9] rounded-lg overflow-hidden flex-row"
        style={workoutComplete && { backgroundColor: "#D0F0C0" }}
      >
        {supersetColor && (
          <View style={{ width: 4, backgroundColor: supersetColor }} />
        )}
        <View className="flex-1">
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
              <View className="flex flex-1 pr-2">
                <Animated.View
                  layout={LinearTransition.duration(150)}
                  className="flex-row flex-wrap items-center gap-2 mb-1"
                >
                  {isDragging && (
                    <Animated.View
                      entering={FadeIn.duration(150)}
                      exiting={FadeOut.duration(150)}
                    >
                      <MaterialIcons
                        name="drag-indicator"
                        size={18}
                        color="#999"
                      />
                    </Animated.View>
                  )}
                  <Text
                    className="font-semibold text-[16px] capitalize shrink"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  {item.supersetGroup && (
                    <View
                      style={[
                        styles.supersetPill,
                        { backgroundColor: supersetColor ?? "#a855f7" },
                      ]}
                    >
                      <Text className="text-white text-[10px] font-semibold">
                        Superset {item.supersetGroup}
                      </Text>
                    </View>
                  )}
                </Animated.View>
                <Text className="text-[#636363]">
                  {Array.isArray(item?.sets) ? item.sets.length : 0} sets &bull;{" "}
                  {Array.isArray(item?.sets)
                    ? item.sets.filter((set) => set.done).length
                    : 0}{" "}
                  completed
                </Text>
              </View>

              <View className="flex flex-row gap-4">
                <TouchableOpacity
                  style={{ height: hp(4), width: hp(4) }}
                  className="bg-[#404040] rounded-full items-center justify-center"
                  onPress={() =>
                    dispatch(
                      startTimer({
                        workoutId: item.id,
                        label: item.name,
                        totalSeconds: item.restSeconds || 60,
                      })
                    )
                  }
                >
                  <Ionicons name="timer-outline" size={wp(4.5)} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ height: hp(4), width: hp(4) }}
                  className="bg-[#999] rounded-full items-center justify-center"
                  onPress={() =>
                    router.push({
                      pathname: "/editWorkout",
                      params: {
                        ...item,
                        sets: JSON.stringify(item.sets),
                        priority: item.priority ? "true" : "",
                      },
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
      </View>
    );
  }

  function reorderWorkout(fromIndex: number, toIndex: number) {
    // Reorder within the filtered (today's) list, then splice the result
    // back into the full list at the original filtered-day positions —
    // reordering against the full list's indices was moving the wrong item
    // whenever other days had workouts in the store.
    const reorderedFiltered = [...filteredWorkouts];
    const [movedItem] = reorderedFiltered.splice(fromIndex, 1);
    reorderedFiltered.splice(toIndex, 0, movedItem);

    let cursor = 0;
    const reorderedList = workoutList.map((item) =>
      item.day.includes(selectedDay) ? reorderedFiltered[cursor++] : item
    );
    onReordered(reorderedList);
  }

  return (
    <DragList
      data={filteredWorkouts}
      keyExtractor={(item) => keyExtractor(item)}
      onReordered={reorderWorkout}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
    />
  );
}

const styles = StyleSheet.create({
  supersetPill: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexShrink: 0,
  },
});
