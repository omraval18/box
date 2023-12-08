import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { styles } from "@/styles/SettingsPageStyles";
import { SvgXml } from "react-native-svg";
import { BackIcon } from "@/icons/NavbarIcons";

const settings = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <Pressable onPress={() => router.back()}>
                        <SvgXml xml={BackIcon} />
                    </Pressable>
                    <Text style={styles.headerTitle}>More Settings</Text>
                </View>
                <View style={styles.settingsContainer}>
                    <Text style={styles.settingsText}>We're Working on Settings</Text>
                    <Image
                        source={{
                            uri: "https://ik.imagekit.io/omraval/Untitled%20design%20(3)_LND-I1ouz.png?updatedAt=1702070418307",
                        }}
                        style={styles.settingsImg}
                    />
                </View>
            </View>
        </View>
    );
};

export default settings;
