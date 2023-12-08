import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    headerBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 24,
        marginTop: 48,
        gap: 24,
    },
    headerBarText: {
        color: "#1E222B",
        fontSize: 16,
        fontWeight: "400",
        fontFamily: "Manrope_400Regular",
    },
    orderWrapper: {
        paddingVertical: 16,
        marginLeft: 24,
        marginRight: 24,
        borderColor: "#EBEBFB",
        borderBottomWidth: 0.5,
        marginBottom: 20,
    },
    orderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    orderImg: {
        width: 40,
        height: 40,

        ...Platform.select({
            ios: {
                borderRadius: 10,
            },
            android: {
                objectFit: "contain",
                borderRadius: 15,
            },
        }),
    },

    orderLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 0.7,
        gap: 24,
        overflow: "hidden",
    },
    orderRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 0.3,
        justifyContent: "flex-end",
        paddingHorizontal: 10,
    },
    orderNumberText: {
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "Manrope_500Medium",
    },
    billingContainer: {
        marginHorizontal: 12,
        backgroundColor: "#F8F9FB",
        position: "absolute",
        bottom: -5,
        borderRadius: 30,
        right: 0,
        left: 0,
        paddingBottom: 24,
    },
    billingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 36,
        paddingRight: 36,
        marginTop: 16,
    },
    billingTitle: {
        color: "#616A7D",
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Manrope_400Regular",
    },
    billingValue: {
        color: "#1E222B",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "Manrope_500Medium",
    },
    checkoutBtn: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "#2A4BA0",
        marginHorizontal: 20,
        borderRadius: 20,
        marginTop: 36,

        marginBottom: 28,
    },
    checkoutBtnText: {
        color: "white",
        textAlign: "center",
    },
});
