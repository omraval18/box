import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export const styles = StyleSheet.create({
    iconBox: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 16,
    },
    buttonShadow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
        backgroundColor: "red",
        opacity: 0,
        shadowColor: "white",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    navContainer: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 48,
        paddingLeft: 20,
        paddingRight: 16,
    },
    badge: {
        position: "absolute",
        top: -5,
        right: -8,
        backgroundColor: "#F9B023",
        borderRadius: 100,
        borderColor: "white",
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 1,
    },
    badgeText: {
        color: "#fff",
        fontSize: 8,
        fontFamily: "Manrope_700Bold",
        fontWeight: "700",
    },
    contentContainer: {
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#fff",
        marginTop: 16,
        paddingLeft: 20,
        paddingRight: 16,
    },

    productTitle: {
        fontSize: 50,
        fontWeight: "600",
        color: "#1E222B",
        fontFamily: "Manrope_600SemiBold",
        lineHeight: 60,
    },
    ratingStars: {
        marginTop: 12,
        flexDirection: "row",
        gap: 5,
    },
    ratingStarsText: {
        color: "#A1A1AB",
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 20,
        marginLeft: 5,
        fontFamily: "Manrope_400Regular",
    },

    sliderContainer: {
        marginTop: 16,
        position: "relative", // Set the position to relative
    },
    favButton: {
        position: "absolute",
        top: 16,
        right: 20,
        padding: 17,
        borderRadius: 20,
        backgroundColor: "white",
        zIndex: 300,
    },
    pricingContainer: {
        flexDirection: "row",
        marginTop: 16,
        paddingLeft: 20,
        gap: 16,
        alignItems: "center",
    },

    priceTag: {
        fontSize: 16,
        fontWeight: "700",
    },

    discountTag: {
        fontSize: 12,

        borderRadius: 70,
        backgroundColor: "#2A4BA0",
        color: "white",
        fontWeight: "400",
        fontFamily: "Manrope_400Regular",
    },

    discountTagContainer: {
        backgroundColor: "#2A4BA0",
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    bold: {
        fontWeight: "700",
        fontFamily: "Manrope_700Bold",
    },
    normal: {
        fontWeight: "400",
        fontFamily: "Manrope_400Regular",
    },
    actionBtnContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: Platform.OS === "ios" ? 24 : 36,
        paddingLeft: 20,
        marginTop: 24,
    },
    toCartBtn: {
        backgroundColor: "white",
        paddingHorizontal: 30,
        paddingVertical: 18,
        borderRadius: 20,
        borderColor: "#2A4BA0",
        borderWidth: 1,
        color: "#2A4BA0",
        fontFamily: "Manrope_600SemiBold",
        fontWeight: "600",
    },
    buyBtn: {
        backgroundColor: "#2A4BA0",
        paddingHorizontal: 30,
        paddingVertical: 18,
        borderRadius: 20,
    },
    buyBtnText: {
        fontFamily: "Manrope_600SemiBold",
        fontWeight: "600",
        color: "white",
    },
    detailsContainer: {
        paddingLeft: 24,
        marginTop: 30,
        gap: 5,
        marginBottom: 20,
    },
    detailsTitle: {
        color: "#1E222B",
        fontSize: 16,
        fontWeight: "400",
        fontFamily: "Manrope_400Regular",
    },
    detailsInfo: {
        color: "#8891A5",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24,
        fontFamily: "Manrope_400Regular",
    },
});
