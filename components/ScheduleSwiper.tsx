import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedDay } from "@/store/schedule/scheduleSlice";

interface DateItem {
  weekday: string;
  date: Date;
}

export default function ScheduleSwiper({ workout }: { workout: boolean }) {
  const swiper = useRef<Swiper | null>(null);
  const router = useRouter();

  const selectedDay = useSelector((state: RootState) => state.schedule);

  // TODO: set week to be global

  // const weekOffset = useSelector((state: RootState) => state.week);
  const weekOffset = 0;
  const dispatch = useDispatch();

  const today = moment().startOf("day");

  const weeks = useMemo(() => {
    const baseWeek = moment().add(weekOffset, "weeks").startOf("week");
    const baseWeekEnd = moment(baseWeek).endOf("week");

    // previous week always allowed
    const offsets = [-1, 0];

    // next week only if baseWeek fully in past
    if (today.isAfter(baseWeekEnd)) offsets.push(1);

    return offsets.map((adj) =>
      Array.from({ length: 7 }).map((_, i) => ({
        weekday: moment(baseWeek).add(adj, "week").add(i, "day").format("ddd"),
        date: moment(baseWeek).add(adj, "week").add(i, "day").toDate(),
      }))
    );
  }, [weekOffset, today]);

  const renderDay = useCallback(
    (item: DateItem, idx: number) => {
      const isActive = moment(item.date).isSame(moment(selectedDay), "day");
      const current = moment(item.date).isSame(today, "day");
      const isFutureDate = moment(item.date).isAfter(today, "day");

      return (
        <TouchableWithoutFeedback
          key={idx}
          disabled={isFutureDate}
          onPress={() => dispatch(setSelectedDay(item.date.toISOString()))}
        >
          <View
            style={[
              styles.item,
              isActive && styles.activeItem,
              current && !isActive && styles.currentItem,
              isFutureDate && styles.futureItem,
            ]}
          >
            <Text
              style={[
                styles.itemWeekday,
                (isActive || (current && !isActive)) && styles.activeText,
              ]}
            >
              {item.weekday}
            </Text>
            <View
              style={[
                styles.circle,
                current && styles.activeCircle,
                isFutureDate && styles.futureCircle,
              ]}
            >
              <Text
                style={[
                  styles.itemDate,
                  (isActive || (current && !isActive)) && styles.activeText,
                ]}
              >
                {item.date.getDate() < 10 && "0"}
                {item.date.getDate()}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [selectedDay, today]
  );

  // TODO: allow > 1 past weeks to be viewed
  const handleIndexChange = (index: number) => {
    // if (index === 1) return;
    // const delta = index - 1;
    // const nextWeek = weekOffset + delta;
    // dispatch(setWeek(nextWeek));
    // setTimeout(() => swiper.current?.scrollTo(1, false), 50);
  };

  return (
    <>
      <View className="max-h-[74px]">
        <Swiper
          index={1}
          ref={swiper}
          showsPagination={false}
          loop={false}
          onIndexChanged={handleIndexChange}
        >
          {weeks.map((dates, index) => (
            <View
              key={index}
              style={[
                styles.itemRow,
                { width: wp(100), paddingHorizontal: 16 },
              ]}
              className="flex flex-row items-start justify-between"
            >
              {dates.map((item, idx) => renderDay(item, idx))}
            </View>
          ))}
        </Swiper>
      </View>

      {workout && (
        <View className="px-6 mb-3 flex flex-row items-center justify-between">
          <Text className="text-gray-500" style={styles.contentText}>
            {new Date(selectedDay).toDateString()}
          </Text>

          <TouchableOpacity
            onPress={() => router.push({ pathname: "/editWorkout" })}
            className="w-[30px] h-[30px] p-1 border border-1 rounded-full items-center justify-center"
            style={styles.addWorkout}
          >
            <Ionicons name="add" size={wp(5)} color="#6b7280" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  contentText: {
    fontSize: 17,
    fontWeight: 600,
  },
  item: {
    flex: 1,
    height: 56,
    marginHorizontal: 3,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "column",
  },
  itemWeekday: {
    fontSize: 12,
    fontWeight: 500,
    color: "#737373",
    marginBottom: 1,
  },
  itemDate: {
    fontSize: 12,
    fontWeight: 600,
    color: "#737373",
  },
  circle: {
    marginTop: 4,
    borderWidth: 1,
    width: 24,
    height: 24,
    borderRadius: 100,
    borderColor: "#999",
    borderStyle: "dotted",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  activeCircle: {
    borderColor: "white",
    borderStyle: "solid",
  },
  futureCircle: {
    borderStyle: "solid",
    borderColor: "#c1c1c1",
  },
  activeItem: {
    backgroundColor: "#404040",
    borderColor: "#404040",
  },
  currentItem: {
    backgroundColor: "#7a7979",
  },
  futureItem: {
    backgroundColor: "#e3e3e3",
  },
  activeText: {
    color: "#fff",
  },
  addWorkout: {
    borderColor: "#6b7280",
  },
});
