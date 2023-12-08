import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        marginTop: 48,
        paddingLeft: 24,
        gap: 24,
        alignItems: "center",
    },
    headerTitle: {
        color: "#1B262E",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Manrope_600SemiBold",
    },
    productsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: Platform.OS === "ios" ? 0 : 20,
        marginTop: 24,
        paddingBottom: 100,
    },
});
