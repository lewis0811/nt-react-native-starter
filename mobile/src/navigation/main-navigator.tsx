import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../features/products/screens/home-screen';
import { ProfileScreen } from '../features/profile/screens/profile-screen';
import { ActivityIndicator, Image, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from '../features/auth/hooks/use-auth';
import { SignInScreen } from '../features/auth/screens/signin-screen';
import { ProductDetailsScreen } from '../features/products/screens/product-details-screen';
import { styles } from './styles/main-navigator-styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface IMainNavigator {
    navigation: any
}

const tabScreenOptions = {
    headerShown: false,
    tabBarActiveTintColor: "#0DF2F2",
    tabBarInactiveTintColor: "gray",
};

const TabNavigator = () => (
    <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({ color, size }) => (
                <Image
                    source={require('../assets/images/home.png')}
                    style={{ width: size, height: size, tintColor: color }}
                    resizeMode="contain"
                />
            ),
        }} />
        <Tab.Screen name="Profile" component={ProfileScreen as React.ComponentType<any>} options={{
            tabBarIcon: ({ color, size }) => (
                <Image
                    source={require('../assets/images/person.png')}
                    style={{ width: size, height: size, tintColor: color }}
                    resizeMode="contain"
                />
            ),
        }} />
    </Tab.Navigator>
);

const MainNavigator: React.FC<IMainNavigator> = () => {
    const { token, isInitializing } = useAuth();

    if (isInitializing) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator testID="loading-indicator" />
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