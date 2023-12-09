import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
    ActivityIndicator,
    LayoutAnimation,
    ScrollView,
} from "react-native";
import { BackIcon, CartIcon, EmptyCart, MinusIcon, PlusIcon } from "@/icons/NavbarIcons";
import { SvgXml } from "react-native-svg";
import {
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import { useFonts } from "expo-font";
import { useAtom, useAtomValue } from "jotai";
import { allProducts, cartItems } from "@/store/atoms";
import axios from "axios";
import { Stack, useRouter } from "expo-router";
import { styles } from "@/styles/CartPageStyles";
import truncateMiddle from "@/utils/TrucatText";

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

export default function cart() {
    const router = useRouter();

    const [productList, setProductList] = useState<Product[] | null>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [products, setProducts] = useAtom(allProducts);
    const [cart, setCart] = useAtom(cartItems);

    // old logic of fetching products from api instead we're using global state for it now
    // useEffect(() => {
    //     const fetchProductDetails = async () => {
    //         try {
    //             const productDetailsPromises = cart.map(async (cartItem) => {
    //                 const response = await axios.get(
    //                     `base/products/${cartItem.id}`
    //                 );
    //                 const productData = response.data;
    //                 return { ...productData, quantity: cartItem.quantity };
    //             });

    //             const fetchedProductDetails = await Promise.all(productDetailsPromises);
    //             setProductList(fetchedProductDetails);
    //         } catch (error) {
    //             console.error("Error fetching product details:", error);
    //         }
    //     };

    //     fetchProductDetails();
    // }, [cart]);

    useEffect(() => {
        const fetchProductDetails = () => {
            try {
                const productDetails = cart
                    .map((cartItem) => {
                        const productData = products.find(
                            (product) => product.id.toString() === cartItem.id
                        );
                        if (productData) {
                            return { ...productData, quantity: cartItem.quantity };
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
    }, [cart, products]);

    useEffect(() => {
        setTotalAmount(0);
        productList.map((product) => {
            const quantity = product.quantity;
            const price = product.price;
            const total = quantity * price;
            console.log(total);
            setTotalAmount((totalAmount) => total + totalAmount);
        });
    }, [cart, productList]);

    const addToCart = (id: number) => {
        const productId = id.toString();
        const existingProductIndex = cart.findIndex((item) => item.id === productId);

        if (existingProductIndex !== -1) {
            // Product already exists in the cart, then update its quantity
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            setCart(updatedCart);
        }
    };

    const removeFromCart = (id: number) => {
        const productId = id.toString();
        const existingProductIndex = cart.findIndex((item) => item.id === productId);

        if (existingProductIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity -= 1;
            if (updatedCart[existingProductIndex].quantity === 0) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

                updatedCart.splice(existingProductIndex, 1);
            }
            setCart(updatedCart);
        }
    };

    if (false) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#2A4BA0" />
            </View>
        );
    }
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            {cart.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 250 }}
                        scrollEventThrottle={16}
                        decelerationRate="fast"
                    >
                        <View style={styles.headerBar}>
                            <TouchableOpacity onPress={() => router.back()}>
                                <View>
                                    <SvgXml xml={BackIcon} width={40} height={40} />
                                </View>
                            </TouchableOpacity>
                            <Text>Shopping Cart ({cart.length})</Text>
                        </View>

                        <View style={{ marginTop: 36 }}>
                            {productList.map((product) => (
                                <View key={product.id} style={styles.orderWrapper}>
                                    <View style={styles.orderContainer}>
                                        <View style={styles.orderLeft}>
                                            <Image
                                                source={{
                                                    uri: product.thumbnail,
                                                }}
                                                style={styles.orderImg}
                                            />
                                            <View>
                                                <Text numberOfLines={1} ellipsizeMode="tail">
                                                    {truncateMiddle(product.title, 16)}
                                                </Text>
                                                <Text numberOfLines={1} ellipsizeMode="tail">
                                                    ${product.price}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.orderRight}>
                                            <TouchableOpacity
                                                onPress={() => removeFromCart(product.id)}
                                            >
                                                <SvgXml xml={MinusIcon} />
                                            </TouchableOpacity>
                                            <Text style={styles.orderNumberText}>
                                                {product.quantity}
                                            </Text>
                                            <TouchableOpacity onPress={() => addToCart(product.id)}>
                                                <SvgXml xml={PlusIcon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <View style={styles.billingContainer}>
                        <View style={styles.billingRow}>
                            <Text style={styles.billingTitle}>Subtotal</Text>
                            <Text style={styles.billingValue}>${totalAmount}</Text>
                        </View>
                        <View style={styles.billingRow}>
                            <Text style={styles.billingTitle}>Delivery</Text>
                            <Text style={styles.billingValue}>$2.00</Text>
                        </View>
                        <View style={styles.billingRow}>
                            <Text style={styles.billingTitle}>Total</Text>
                            <Text style={styles.billingValue}>${totalAmount + 2}</Text>
                        </View>
                        <View>
                            <TouchableOpacity activeOpacity={0.9}>
                                <View style={styles.checkoutBtn}>
                                    <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20 }}>
                    <SvgXml xml={EmptyCart} width={300} height={300}></SvgXml>
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: "Manrope_700Bold",
                            fontWeight: "700",
                            color: "#1B262E",
                        }}
                    >
                        Oops! Your Cart is Empty!
                    </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={{ color: "#2A4BA0" }}>Go Shopping</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
}
