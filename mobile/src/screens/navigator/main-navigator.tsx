import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../home-screen';
import { ProfileScreen } from '../profile-screen';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from '../../hooks/use-auth';
import { SignInScreen } from '../signin-screen';
import { ProductDetailsScreen } from '../product-details-screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface IMainNavigator {
    navigation: any
}

const TabNavigator = () => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0DF2F2',
        tabBarInactiveTintColor: 'gray',
    }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({ color, size }) => (
                <Image
                    source={require('../../assets/images/home.png')}
                    style={{ width: size, height: size, tintColor: color }}
                    resizeMode="contain"
                />
            ),
        }} />
        {/* <Tab.Screen name="List" component={ListScreen} /> */}
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon: ({ color, size }) => (
                <Image
                    source={require('../../assets/images/person.png')}
                    style={{ width: size, height: size, tintColor: color }}
                    resizeMode="contain"
                />
            ),
        }} />
    </Tab.Navigator>
);

const MainNavigator: React.FC<IMainNavigator> = ({ navigation }) => {
    const { token, isInitializing } = useAuth();

    if (isInitializing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0df2f2" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {token == null ? (
                <Stack.Screen name="SignIn" component={SignInScreen} />
            ) : (
                <>
                    <Stack.Screen name="MainTabs" component={TabNavigator} />
                    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default MainNavigator;