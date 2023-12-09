import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { styles } from "@/styles/CategoryPageStyles";
import { SvgXml } from "react-native-svg";
import { BackIcon } from "@/icons/NavbarIcons";
import * as Crypto from "expo-crypto";

const category = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <ScrollView style={{ flex: 1 }} scrollEventThrottle={16} decelerationRate="fast">
                <View style={styles.headerContainer}>
                    <Pressable onPress={() => router.back()}>
                        <SvgXml xml={BackIcon} />
                    </Pressable>
                    <Text style={styles.headerTitle}>Categories</Text>
                </View>
                <View>
                    <View style={styles.categoryGrid}>
                        {[
                            "https://ik.imagekit.io/omraval/Get%20Comfiy%20with%20Comfortable%20Chair%20and%20More%20this%20Diwali.%20(1)_kOAipI6zN.png?updatedAt=1702068879499",
                            "https://ik.imagekit.io/omraval/Get%20Comfiy%20with%20Comfortable%20Chair%20and%20More%20this%20Diwali._4LWtCAYCR.png?updatedAt=1702068882254",
                            "https://ik.imagekit.io/omraval/Get%20Comfiy%20with%20Comfortable%20Chair%20and%20More%20this%20Diwali.%20(2)_Z6eCqUykLE.png?updatedAt=1702068882459",
                            "https://ik.imagekit.io/omraval/Get%20Comfiy%20with%20Comfortable%20Chair%20and%20More%20this%20Diwali.%20(4)_VjtjNrg_D.png?updatedAt=1702068877319",
                            "https://ik.imagekit.io/omraval/Get%20Comfiy%20with%20Comfortable%20Chair%20and%20More%20this%20Diwali.%20(3)_Mc851lGUJ.png?updatedAt=1702068882643",
                        ].map((imgUrl) => (
                            <Image
                                key={Crypto.randomUUID()}
                                source={{
                                    uri: imgUrl,
                                }}
                                style={styles.categoryImg}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default category;
