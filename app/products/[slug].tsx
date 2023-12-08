import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    ActivityIndicator,
    ScrollView,
    Pressable,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
// import { BackIcon, CartIcon, FavouriteIcon } from "@/icons/NavbarIcons";
import Rating from "@/components/Ratings";
import ImageSlider from "@/components/ImageSlider";
import { styles } from "@/styles/ProductPageStyles";

import axios from "axios";
import { cartItems, favouriteItems } from "@/store/atoms";
import { useAtom, useAtomValue } from "jotai";
import changeStrokeColor from "@/utils/StrokeChange";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackIcon, CartIcon, FavouriteIcon } from "@/icons/NavbarIcons";

export default function Product() {
    const router = useRouter();
    const { slug } = useLocalSearchParams();
    const [product, setProduct] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false);
    const [cart, setCart] = useAtom(cartItems);
    const [favourite, setFavourite] = useAtom(favouriteItems);

    const cartItemsCount = cart.length;
    console.log(slug);

    const addToCart = () => {
        const productId = `${slug}`;
        const existingProductIndex = cart.findIndex((item) => item.id === productId);

        if (existingProductIndex !== -1) {
            // Product already exists in the cart, then update its quantity
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            // Product does not exist in the cart, add it with quantity 1
            setCart((cart) => [...cart, { id: productId, quantity: 1 }]);
        }
    };

    const addToFavourite = () => {
        const id = parseInt(slug as string);
        const exists = favourite.includes(id);

        if (exists) {
            setFavourite((favourite) => favourite.filter((favId) => favId !== id));
            setIsFavourite(false);
        } else {
            setFavourite((favourite) => [...favourite, id]);
            setIsFavourite(true);
        }
    };

    useEffect(() => {
        const id = parseInt(slug as string);
        const exists = favourite.includes(id);

        if (exists) {
            setIsFavourite(true);
        }
    }, []);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${slug}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProductData();
    }, [slug]);

    function handleGoBack() {
        router.back();
    }

    if (!product) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#2A4BA0" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <ScrollView style={{ flex: 1 }} scrollEventThrottle={16} decelerationRate="fast">
                <View style={styles.navContainer}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <View style={styles.iconBox}>
                            <SvgXml xml={BackIcon} width={40} height={40} />
                            <View style={styles.buttonShadow}></View>
                        </View>
                    </TouchableOpacity>
                    <Pressable onPress={() => router.push("/cart")}>
                        <View style={styles.iconBox}>
                            <SvgXml xml={CartIcon} width={20} height={20} />
                            {cartItemsCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{cartItemsCount}</Text>
                                </View>
                            )}
                        </View>
                    </Pressable>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.productTitle}>{product.title}</Text>
                    <View style={styles.ratingStars}>
                        <Rating rating={4.69} />
                        <Text style={styles.ratingStarsText}>{`${product.rating} Reviews`}</Text>
                    </View>
                </View>
                <View style={styles.sliderContainer}>
                    <Pressable style={styles.favButton} onPress={addToFavourite}>
                        <View>
                            <SvgXml
                                xml={
                                    isFavourite
                                        ? changeStrokeColor(FavouriteIcon, "red")
                                        : FavouriteIcon
                                }
                                width={24}
                                height={24}
                                fill={isFavourite ? "red" : "none"}
                            />
                        </View>
                    </Pressable>
                    <ImageSlider images={product.images} showController />
                </View>
                <View style={styles.pricingContainer}>
                    <Text style={(styles.priceTag, styles.bold)}>
                        ${product.price.toFixed(2)}
                        <Text style={styles.normal}>/KG</Text>
                    </Text>
                    <View style={styles.discountTagContainer}>
                        <Text style={styles.discountTag}>{`$${(
                            product.price *
                            (product.discountPercentage / 100)
                        ).toFixed(2)} OFF`}</Text>
                    </View>
                </View>
                <View style={styles.actionBtnContainer}>
                    <TouchableOpacity onPress={addToCart}>
                        <Text style={styles.toCartBtn}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.buyBtn}>
                            <Text style={styles.buyBtnText}>Buy Now</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>Details</Text>
                    <Text style={styles.detailsInfo}>{product.description}</Text>
                </View>
            </ScrollView>
        </View>
    );
}
