import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { BackIcon } from "@/icons/NavbarIcons";
import { styles } from "@/styles/FavouritePageStyles";

import { Stack, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { allProducts, cartItems, favouriteItems } from "@/store/atoms";
import ProductCard from "@/components/ProductCard";

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    quantity?: number;
};

export default function Favourite() {
    const router = useRouter();
    const [favourite] = useAtom(favouriteItems);
    const [productList, setProductList] = useState<Product[] | null>([]);
    const [products] = useAtom(allProducts);
    const [cart, setCart] = useAtom(cartItems);

    useEffect(() => {
        const fetchProductDetails = () => {
            try {
                // Check if 'products' is not empty
                const productDetails = favourite
                    .map((favouriteItem) => {
                        const productData = products.find(
                            (product) => product.id === favouriteItem
                        );
                        if (productData) {
                            return { ...productData };
                        }
                        return null;
                    })
                    .filter(Boolean);

                setProductList(productDetails);
            } catch (error) {
                console.error("Error retrieving product details from state:", error);
            }
        };

        fetchProductDetails();
    }, [favourite, products]);

    useEffect(() => {
        console.log(favourite);
        console.log(productList);
    }, [favourite, productList]);

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

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            {favourite.length > 0 ? (
                <ScrollView style={{ flex: 1 }} scrollEventThrottle={16} decelerationRate="fast">
                    <View style={styles.headerContainer}>
                        <Pressable onPress={() => router.back()}>
                            <SvgXml xml={BackIcon} />
                        </Pressable>
                        <Text style={styles.headerTitle}>Your Favourites</Text>
                    </View>
                    <View style={styles.productsGrid}>
                        {productList.length > 0 &&
                            productList.map((product) => (
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
                </ScrollView>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.headerTitle}>Empty! Add Items to Favourites</Text>
                </View>
            )}
        </View>
    );
}
