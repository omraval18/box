import React, { useEffect, useState } from "react";
import { Stack, Tabs, usePathname } from "expo-router";
import { View } from "react-native";
import { Navbar } from "@/components/Navbar";
import { SvgUri, SvgXml } from "react-native-svg";
import { HomeIcon } from "@/icons/NavbarIcons";
import changeStrokeColor from "@/utils/StrokeChange";

export default function Layout() {
    const route = usePathname();
    const [showNavbar, setShowNavbar] = useState(false);

    const showNavbarRoutes = ["/", "/favourite", "/category", "/more"];

    useEffect(() => {
        if (showNavbarRoutes.includes(route)) {
            setShowNavbar(true);
        } else {
            setShowNavbar(false);
        }
    }, [route]);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        borderRadius: 20,
                        height: 80,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "500",
                        fontFamily: "Manrope_500Medium",
                        paddingBottom: 20,
                    },
                    tabBarIconStyle: {
                        marginTop: 10,
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color }) => (
                            <SvgUri
                                uri="https://api.iconify.design/akar-icons/home.svg"
                                height={24}
                                width={24}
                                color={color}
                            />
                        ),

                        tabBarActiveTintColor: "#153075",
                        tabBarInactiveTintColor: "#8891A5",
                    }}
                />
                <Tabs.Screen
                    name="category"
                    options={{
                        tabBarLabel: "Category",
                        tabBarIcon: ({ color }) => (
                            <SvgUri
                                uri="https://api.iconify.design/ph/circles-four-light.svg"
                                height={24}
                                width={24}
                                color={color}
                                fill={color}
                            />
                        ),
                        tabBarActiveTintColor: "#153075",
                    }}
                />
                <Tabs.Screen
                    name="favourite"
                    options={{
                        tabBarLabel: "Favourite",
                        tabBarIcon: ({ color }) => (
                            <SvgUri
                                uri="https://api.iconify.design/gridicons/heart.svg"
                                height={24}
                                width={24}
                                color={color}
                            />
                        ),
                        tabBarActiveTintColor: "#153075",
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        tabBarLabel: "More",
                        tabBarIcon: ({ color }) => (
                            <SvgUri
                                uri="https://api.iconify.design/mingcute/more-2-fill.svg"
                                height={24}
                                width={24}
                                color={color}
                            />
                        ),
                        tabBarActiveTintColor: "#153075",
                    }}
                />
            </Tabs>
        </View>
    );
}
