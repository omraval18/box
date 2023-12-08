import React, { useState } from "react";
import { View, Text, Image, Pressable, Animated } from "react-native";
import { SvgXml } from "react-native-svg";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { FavouriteIcon } from "@/icons/NavbarIcons";
import { favouriteItems } from "@/store/atoms";
import { styles } from "@/styles/ProductCardStyles";
import changeStrokeColor from "@/utils/StrokeChange";
const ProductCard = ({ imageUri, title, price, addToCart, slug }) => {
    const router = useRouter();
    const [favourite, setFavourite] = useAtom(favouriteItems);
    const isFavourite = favourite.includes(parseInt(slug));
    const [fadeAnim] = useState(new Animated.Value(1));

    const addToFavourite = () => {
        const id = parseInt(slug);

        if (isFavourite) {
            // Animated.timing(fadeAnim, {
            //     toValue: 0, // Fade out
            //     duration: 500, // Animation duration in milliseconds
            //     useNativeDriver: false, // Make sure to set this to false for non-native animations
            // }).start(() => {
            setFavourite((favs) => favs.filter((favId) => favId !== id));

            //     fadeAnim.setValue(1);
            // });
        } else {
            setFavourite((favs) => [...favs, id]);
        }
    };

    return (
        <Pressable style={styles.card} onPress={() => router.push(`/products/${slug}`)}>
            <View style={styles.imageContainer}>
                <Pressable style={styles.favouriteIconContainer} onPress={addToFavourite}>
                    <SvgXml
                        xml={isFavourite ? changeStrokeColor(FavouriteIcon, "red") : FavouriteIcon}
                        width={24}
                        height={24}
                        fill={isFavourite ? "red" : "white"}
                    />
                </Pressable>
                <Image style={styles.image} source={{ uri: imageUri }} resizeMode="cover" />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{price}</Text>
                    <Pressable style={styles.addToCartButton} onPress={addToCart}>
                        <Text style={styles.addToCartButtonText}>+</Text>
                    </Pressable>
                </View>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
            </View>
        </Pressable>
    );
};

export default ProductCard;
