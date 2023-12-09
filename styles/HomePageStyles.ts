import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#2A4BA0",
    },
    headerBar: {
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
