import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from '../features/auth/screens/signin-screen';
import MainTabs from './MainTabs';
import { ProductDetailsScreen } from '../features/products/screens/product-details-screen';
import useAuth from '../features/auth/hooks/use-auth';
import LoadingScreen from '../components/LoadingScreen';
import { stackScreenOptions } from './styles/main-navigator-styles';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
    const { token, isInitializing } = useAuth();

    if (isInitializing) {
        return <LoadingScreen />;
    }

    return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
            {!token ? (
                <Stack.Screen name="SignIn" component={SignInScreen} />
            ) : (
                <Stack.Group>
                    <Stack.Screen name="MainTabs" component={MainTabs} />
                    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
};

export default MainNavigator;