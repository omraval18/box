import React, { useEffect, useState } from "react";
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
} from "react-native";
import { SvgXml } from "react-native-svg";
import { CartIcon, CartWhiteIcon, SearchIcon } from "@/icons/NavbarIcons";

import ProductCard from "@/components/ProductCard";
import { Link, Stack, useRouter } from "expo-router";
import axios from "axios";
import { cartItems, allProducts } from "@/store/atoms";
import { useAtom, useAtomValue } from "jotai";

export default function index() {
    const [products, setProducts] = useAtom(allProducts);
    const cartItemsCount = useAtomValue(cartItems);
    const [cart, setCart] = useAtom(cartItems);
    const [location, setLocation] = useState(null);

    const router = useRouter();

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
                .get("https://dummyjson.com/products")
                .then((res) => {
                    setProducts(res.data.products);
                })
                .catch((error) => console.error("Error fetching products:", error));
        }
    }, []);

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
                            <ScrollView
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                snapToAlignment="start"
                                decelerationRate="fast"
                                snapToOffsets={Array.from({ length: 6 }, (v, i) => i * (250 + 15))}
                            >
                                {[
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com_fOFqJSIMJ.png?updatedAt=1702067282781",
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com%20(1)_KpCVEhY5N.png?updatedAt=1702067295776",
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com%20(5)_Uzp1NdqeJ.png?updatedAt=1702068033274",
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com%20(3)_nhn4-XWAf.png?updatedAt=1702067307066",
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com%20(2)_0JkzCCFY9.png?updatedAt=1702067346623",
                                    "https://ik.imagekit.io/omraval/For%20more%20exclusive%20deals%20and%20discounts,%20site.com%20(4)_niW48Dkz7.png?updatedAt=1702067348059",
                                ].map((imageUrl, index) => (
                                    <View key={index} style={{ marginRight: 25 }}>
                                        <Image
                                            source={{ uri: imageUrl }}
                                            style={{
                                                aspectRatio: 2,
                                                width: 300,
                                                height: 120,
                                                borderRadius: 16,
                                            }}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
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

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#2A4BA0",
    },
    headerBar: {
        // paddingLeft: 20,
        // marginTop: 52,
        // flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "space-between",
        // paddingRight: 17,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 48,
        paddingLeft: 20,
        paddingRight: 16,
    },
    headerBarName: {
        color: "white",
        fontSize: 22,
    },
    iconBox: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 16,
    },
    badge: {
        position: "absolute",
        top: -5,
        right: -8,
        backgroundColor: "#F9B023",
        borderRadius: 100,
        borderColor: "#2A4BA0",
        borderWidth: 1,
        paddingHorizontal: 6,
        paddingVertical: 1.5,
    },
    badgeText: {
        color: "#fff",
        fontSize: 8,
        fontFamily: "Manrope_700Bold",
        fontWeight: "700",
    },
    searchBar: {
        backgroundColor: "#153075",
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 32,
        paddingLeft: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingVertical: 18,
        marginTop: 54,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    searchBarInput: {
        color: "white",
    },

    deliveryDetails: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "space-between",
    },
    deliveryAddr: {
        gap: 4,
    },
    deliveryTime: {
        gap: 4,
    },
    deliveryTitle: {
        color: "#F8F9FB",
        fontSize: 11,
        fontWeight: "800",
        fontFamily: "Manrope_800ExtraBold",
        opacity: 0.5,
    },
    deliveryInfo: {
        color: "#F8F9FB",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "Manrope_500Medium",
    },

    bannersContainer: {
        width: "100%",

        marginLeft: 20,
        marginTop: 28,
    },
    recommendTxt: {
        paddingLeft: 20,
        marginTop: 28,
        fontSize: 30,
    },
    productGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: Platform.OS === "ios" ? 0 : 20,
        marginTop: 12,
        paddingBottom: 100,
    },
});
