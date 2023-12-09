import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    ActivityIndicator,
    Platform,
    FlatList,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { CartIcon, CartWhiteIcon, SearchIcon } from "@/icons/NavbarIcons";
import { styles } from "@/styles/HomePageStyles";

import ProductCard from "@/components/ProductCard";
import { Link, Stack, useRouter } from "expo-router";
import axios from "axios";
import { cartItems, allProducts } from "@/store/atoms";
import { useAtom, useAtomValue } from "jotai";
import * as Crypto from "expo-crypto";
import * as Location from "expo-location";
import { getGeocodedAddressFromCoords } from "@/utils/getGeocodedAddress";

export default function index() {
    const [products, setProducts] = useAtom(allProducts);
    const cartItemsCount = useAtomValue(cartItems);
    const [cart, setCart] = useAtom(cartItems);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState<string | null>("Mumbai");
    const sliderRef = useRef<FlatList>(null);
    const [index, setIndex] = useState(0);
    const autoplaySliderRef = useRef<NodeJS.Timeout | null>(null); // Adjust the type to NodeJS.Timeout
    const base = process.env.EXPO_PUBLIC_BASE_URL;

    const router = useRouter();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            const geocodedAddress = await getGeocodedAddressFromCoords(location);
            setAddress(geocodedAddress as string);
        })();
    }, []);

    const addToCart = (id) => {
        const productId = `${id}`;
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

    useEffect(() => {
        if (products.length === 0) {
            axios
                .get(`${base}/products`)
                .then((res) => {
                    setProducts(res.data.products);
                })
                .catch((error) => console.error("Error fetching products:", error));
        }
    }, []);

    useEffect(() => {
        const handleInterval = () => {
            if (index < 5) {
                setIndex(index + 1);
            } else if (index === 5) {
                setIndex(0);
            }
        };

        autoplaySliderRef.current = setInterval(() => {
            handleInterval();
        }, 2000);

        return () => {
            if (autoplaySliderRef.current) {
                clearInterval(autoplaySliderRef.current);
            }
        };
    }, [index]);

    useEffect(() => {
        sliderRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
        });
    }, [index]);

    if (products.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                />
                <ActivityIndicator size="large" color="#2A4BA0" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <ScrollView style={{ flex: 1 }} scrollEventThrottle={16} decelerationRate="fast">
                <View style={{ flex: 1 }}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerBar}>
                            <Text style={styles.headerBarName}>Hey, Rahul</Text>
                            <Pressable onPress={() => router.push("/cart")}>
                                <View style={styles.iconBox}>
                                    <SvgXml xml={CartWhiteIcon} width={20} height={20} />
                                    {cartItemsCount.length > 0 && (
                                        <View style={styles.badge}>
                                            <Text style={styles.badgeText}>
                                                {cartItemsCount.length}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.searchBar}>
                            <SvgXml xml={SearchIcon} />
                            <TextInput
                                placeholder="Search Products or Store"
                                placeholderTextColor="#8891A5"
                                style={styles.searchBarInput}
                            />
                        </View>
                        <View style={styles.deliveryDetails}>
                            <View style={styles.deliveryAddr}>
                                <Text style={styles.deliveryTitle}>DELIVERY TO</Text>
                                <Text style={styles.deliveryInfo}>Green Way 3000, Sylhet</Text>
                            </View>
                            <View style={styles.deliveryTime}>
                                <Text style={styles.deliveryTitle}>WITHIN</Text>
                                <Text style={styles.deliveryInfo}>1 Hour</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.bannersContainer}>
                            <FlatList
                                data={[
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com_fOFqJSIMJ.png?updatedAt=1702067282781",
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com%20(1)_KpCVEhY5N.png?updatedAt=1702067295776",
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com%20(5)_Uzp1NdqeJ.png?updatedAt=1702068033274",
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com%20(3)_nhn4-XWAf.png?updatedAt=1702067307066",
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com%20(2)_0JkzCCFY9.png?updatedAt=1702067346623",
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com%20(4)_niW48Dkz7.png?updatedAt=1702067348059",
                                ]}
                                renderItem={({ item }) => (
                                    <View key={Crypto.randomUUID()} style={{ marginRight: 25 }}>
                                        <Image
                                            source={{ uri: item }}
                                            style={{
                                                aspectRatio: 2,
                                                width: 300,
                                                height: 120,
                                                borderRadius: 16,
                                            }}
                                        />
                                    </View>
                                )}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                snapToAlignment="start"
                                decelerationRate="fast"
                                ref={sliderRef}
                                initialScrollIndex={index}
                                onScrollToIndexFailed={(info) => {
                                    console.log("failed");
                                }}
                                snapToOffsets={Array.from({ length: 6 }, (v, i) => i * (250 + 15))}
                            />
                        </View>
                        <View>
                            <Text style={styles.recommendTxt}>Recommended</Text>
                            <View style={styles.productGrid}>
                                {products.length > 0 &&
                                    products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            imageUri={product.thumbnail}
                                            title={product.title}
                                            price={`$${product.price}`}
                                            addToCart={() => addToCart(product.id)}
                                            slug={product.id}
                                        />
                                    ))}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
