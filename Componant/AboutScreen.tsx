import React, { useState } from "react";
import { View, Image, Dimensions, FlatList, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");
const _itemSize = width * 0.24;
const _spacing = 12;
const _itemTotalsize = _itemSize + _spacing;

// Sample image URLs
const Images = [
  "https://eloking.com/storage/blog-images/ZS3jIrfzdOGHycSdPJNUJ5mi9S52qYpRLlFetzAx.jpg",
  "https://i.pinimg.com/736x/90/c0/f2/90c0f23fd8c038a177f4ef2860031887.jpg",
  "https://i.pinimg.com/originals/53/ca/5d/53ca5d3fffcb69dd11396d3086f2e337.jpg",
  "https://i.pinimg.com/originals/3d/d8/3a/3dd83ad0e8bac1354698395cd939dcf3.jpg",
  "https://rare-gallery.com/mocahbig/1397613-Valorant-Video-Game-Sova.jpg",
  "https://www.techspot.com/images2/news/ts3_thumbs/2022/01/2022-01-19-ts3_thumbs-8bf.jpg",
  "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2023/02/valorant-new-agents-class-2023-riot-fps-game-killjoy.jpg",
  "https://th.bing.com/th/id/R.bad5200fe0991ab26dd70261598d76ab?rik=dEJKSEprz0inHw&pid=ImgRaw&r=0",
  "https://images.hdqwalls.com/download/league-of-legends-wild-rift-s9-1920x1200.jpg",
  "https://cdna.artstation.com/p/assets/images/images/013/096/234/large/kienan-lafferty-always-wanted-to-do-that-by-knockwurst-d7a3luv.jpg?1538030494"


];

function CarouselItem({
  imageUri,
  index,
  scrollx,
}: {
  imageUri: string;
  index: number;
  scrollx: Animated.SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollx.value,
            [index - 1, index, index + 1],
            [_itemSize / 3, 0, _itemSize / 3]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[stylez, { width: _itemSize, height: _itemSize }]}>
      <Image source={{ uri: imageUri }} style={{ flex: 1, borderRadius: _itemSize / 2 }} />
    </Animated.View>
  );
}

export function AboutScreen() {
  const scrollx = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const onscroll = useAnimatedScrollHandler((e) => {
    scrollx.value = e.contentOffset.x / _itemTotalsize;

    // Calculate the new active index and update state
    const newActiveIndex = Math.round(scrollx.value);
    if (activeIndex !== newActiveIndex) {
      runOnJS(setActiveIndex)(newActiveIndex);
    }
  });

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <View style={StyleSheet.absoluteFillObject}>
        <Image source={{ uri: Images[activeIndex] }} style={styles.backgroundImage} />
      </View>

      {/* Image Carousel */}
      <Animated.FlatList
        style={{ flexGrow: 0, paddingBottom: _itemSize }}
        contentContainerStyle={{
          paddingHorizontal: (width - _itemSize) / 2,
          gap: _spacing,
        }}
        data={Images}
        keyExtractor={(_, index) => String(index)} // Use index if no unique key is available
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
        renderItem={({ item, index }) => <CarouselItem imageUri={item} index={index} scrollx={scrollx} />}
        onScroll={onscroll}
        scrollEventThrottle={16} // Smoother updates
        snapToInterval={_itemTotalsize}
        decelerationRate={"fast"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: _spacing,
    justifyContent: "flex-end",
  },
  absoluteFillObject: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.5, // Makes background dimmer for better visibility
  },
  image: {
    flex: 1,
    borderRadius: _itemSize / 2,
  },
});

export default AboutScreen;
