import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import MacroContainer from "./MacroContainer";
import StepsContainer from "./StepsContainer";

const HomeSwiper = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const data = [
    { id: 1, Component: MacroContainer },
    { id: 2, Component: StepsContainer },
  ];

  const renderItem = ({ item }: any) => {
    const { Component } = item;
    return (
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Component />
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        data={data}
        height={300}
        width={wp(100)}
        loop={false}
        pagingEnabled={true}
        snapEnabled={true}
        onProgressChange={progress}
        renderItem={renderItem}
        onConfigurePanGesture={(gestureChain) =>
          gestureChain.activeOffsetX([-10, 10])
        }
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{
          borderWidth: 1,
          borderColor: "#D7D7D7",
          backgroundColor: "white",
          borderRadius: 50,
        }}
        containerStyle={{ gap: 5, marginTop: 14 }}
        onPress={onPressPagination}
      />
    </GestureHandlerRootView>
  );
};

export default HomeSwiper;
