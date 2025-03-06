import * as React from "react";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { renderItem } from "@/utils/render-item";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { sliderImages } from "@/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function AnimatedCarousel() {
  const progress = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        autoPlay={true}
        autoPlayInterval={3000}
        data={sliderImages}
        height={210}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={wp(100)}
        mode={"parallax"}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={renderItem({ rounded: true })}
        onConfigurePanGesture={(gestureChain) =>
          gestureChain.activeOffsetX([-10, 10])
        }
      />
    </GestureHandlerRootView>
  );
}

export default AnimatedCarousel;
