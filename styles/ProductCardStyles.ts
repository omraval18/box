import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export const styles = StyleSheet.create({
    card: {
        width: "100%",
        ...Platform.select({
            ios: {
                maxWidth: 140,
                marginRight: 10,
            },
            android: {
                maxWidth: 160,
            },
        }),
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ECECEC",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 16,
    },
    imageContainer: {
        height: 100,
        padding: 10,
        borderRadius: Platform.OS === "ios" ? 100 : 40,
        overflow: "hidden",
    },
    image: {
        flex: 1,
        ...Platform.select({
            ios: {
                borderRadius: 18,
            },
            android: {
                objectFit: "contain",
                borderRadius: 8,
            },
        }),
    },
    contentContainer: {
        padding: 16,
        gap: 6,
    },
    title: {
        fontSize: 14,
        fontWeight: "400",
        color: "#333",
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    price: {
        fontSize: 16,
        color: "#2A4BA0",
        fontWeight: "600",
    },
    addToCartButton: {
        backgroundColor: "#2A4BA0",
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === "ios" ? 6 : 3,
    },
    addToCartButtonText: {
        fontSize: 14,
        color: "white",
        fontWeight: "normal",
    },
    favouriteIconContainer: {
        position: "absolute",
        top: 20,
        zIndex: 300,
        left: 20,
    },
});
