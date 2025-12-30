import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";
import Swiper from "react-native-swiper";

interface DateItem {
  weekday: string;
  date: Date;
}

export default function Schedule({
  value,
  setValue,
}: {
  value: Date;
  setValue: (date: Date) => void;
}) {
  const swiper = useRef<Swiper | null>(null);

  const [week, setWeek] = useState(0);

  const weeks = useMemo(() => {
    const base = moment().add(week, "weeks").startOf("week"); // anchor = today

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(base).add(adj, "week").add(index, "day");
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
      return (
        <TouchableWithoutFeedback key={idx} onPress={() => setValue(item.date)}>
          <View style={[styles.item, isActive && styles.activeItem]}>
            <Text style={[styles.itemWeekday, isActive && styles.activeText]}>
              {item.weekday}
            </Text>
            <Text style={[styles.itemDate, isActive && styles.activeText]}>
              {item.date.getDate()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [value]
  );

  return (
    <View>
      <Text className="text-left text-[26px] font-semibold text-neutral-700 mb-3 pl-6">
        My Schedule
      </Text>

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
      <View className="pl-6">
        <Text style={styles.contentText}>{value.toDateString()}</Text>
      </View>
    </View>
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
    color: "#999",
    marginBottom: 12,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "column",
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: 500,
    color: "#737373",
    marginBottom: 1,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: 600,
    color: "#111",
  },
  activeItem: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  activeText: {
    color: "#fff",
  },
});
