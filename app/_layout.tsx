import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { Suspense, useEffect } from "react";
import "react-native-reanimated";
import "react-native-gesture-handler";

import {
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Manrope_200ExtraLight,
        Manrope_300Light,
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_800ExtraBold,
    });

    // if (!loaded) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //             <ActivityIndicator size="large" color="#2A4BA0" />
    //         </View>
    //     );
    // }
    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: "white",
                    },
                }}
            >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="cart" />
                <Stack.Screen name="products/[slug]" />
            </Stack>
        </>
    );
}
