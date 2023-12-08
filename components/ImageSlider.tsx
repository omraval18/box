import React, { useState, useRef, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";

type ImageSliderProps = {
    images: string[];
    loopInterval?: number;
    showController?: boolean;
};

const { width } = Dimensions.get("window");

const ImageSlider: React.FC<ImageSliderProps> = ({
    images,
    loopInterval = 2000,
    showController = false,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        // Automatically loop through images with a delay
        const loopImages = () => {
            const nextIndex = (currentIndex + 1) % images.length;
            handleDotPress(nextIndex);
        };

        const loopTimeout = setTimeout(loopImages, loopInterval);

        return () => clearTimeout(loopTimeout);
    }, [currentIndex, images, loopInterval]);

    const handleDotPress = (index: number) => {
        setCurrentIndex(index);
        scrollViewRef.current?.scrollTo({ x: width * index, animated: true });
    };

    const handleScroll = (event: any) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(newIndex);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                onScroll={handleScroll} // Add the onScroll event
            >
                {images.map((imageUrl, index) => (
                    <Image key={index} source={{ uri: imageUrl }} style={styles.image} />
                ))}
            </ScrollView>

            {showController && (
                <View style={styles.dotsContainer}>
                    {images.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleDotPress(index)}
                            style={[
                                styles.dot,
                                { backgroundColor: index === currentIndex ? "#F9B023" : "#C4C4C4" },
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 200, // Set the height you want for the image slider
    },
    image: {
        width: width,
        height: "100%",
        resizeMode: "cover",
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "flex-start", // Align dots to the left
        position: "absolute",
        bottom: 10,
        width: "100%",
        paddingLeft: 16, // Add padding to the left
    },
    dot: {
        width: 30,
        height: 6,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});

export default ImageSlider;
