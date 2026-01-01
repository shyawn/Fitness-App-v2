import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";
import Ionicons from "@react-native-vector-icons/ionicons";

interface DateItem {
  weekday: string;
  date: Date;
}

export default function ScheduleSwiper({
  workout,
  value,
  setValue,
}: {
  workout: boolean;
  value: Date;
  setValue: (date: Date) => void;
}) {
  const swiper = useRef<Swiper | null>(null);
  const router = useRouter();
  const [week, setWeek] = useState(0);

  const currentDate = new Date();

  const weeks = useMemo(() => {
    const today = moment().startOf("day");
    const baseWeek = moment().add(week, "weeks").startOf("week"); // anchor = today
    const baseWeekEnd = moment(baseWeek).endOf("week");

    // allow previous and current weeks
    const offsets: number[] = [-1, 0];

    // allow next week only if displayed week is fully in the past
    if (today.isAfter(baseWeekEnd, "day")) {
      offsets.push(1);
    }

    return offsets.map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(baseWeek).add(adj, "week").add(index, "day");
        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const renderDay = useCallback(
    (item: DateItem, idx: number) => {
      const isActive = value.toDateString() === item.date.toDateString();
      const current = currentDate.toDateString() === item.date.toDateString();
      const isFutureDate = currentDate < item.date;
      return (
        <TouchableWithoutFeedback
          key={idx}
          disabled={isFutureDate}
          onPress={() => setValue(item.date)}
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
    [value]
  );

  return (
    <>
      <View className="max-h-[74px]">
        <Swiper
          index={1}
          ref={swiper}
          showsPagination={false}
          loop={false}
          onIndexChanged={(ind) => {
            if (ind === 1) {
              return;
            }
            setTimeout(() => {
              const newIndex = ind - 1;
              const newWeek = week + newIndex;

              setWeek(newWeek);
              setValue(moment(value).add(newIndex, "week").toDate());
              swiper.current?.scrollTo(1, false);
            }, 100);
          }}
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
            {value.toDateString()}
          </Text>

          <TouchableOpacity
            onPress={() => router.push({ pathname: "/editWorkout" })}
            className="w-[30px] h-[30px] p-1 bg-[#A9A9A9] rounded-full items-center justify-center"
          >
            <Ionicons name="add" size={wp(5)} color="white" />
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
});
