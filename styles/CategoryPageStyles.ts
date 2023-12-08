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

    categoryImg: {
        maxWidth: 360,
        height: 180,
        aspectRatio: 2,
        borderRadius: 30,
        objectFit: Platform.OS === "ios" ? "fill" : "contain",
    },
    categoryGrid: {
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: 10,
        marginTop: 36,
        alignItems: "center",
        gap: 15,
        marginBottom: 48,
    },
});
