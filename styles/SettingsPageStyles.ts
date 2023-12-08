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

    settingsImg: {
        width: 200,
        height: 200,
    },
    settingsContainer: {
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        gap: 30,
    },
    settingsText: {
        color: "#1B262E",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Manrope_600SemiBold",
    },
});
