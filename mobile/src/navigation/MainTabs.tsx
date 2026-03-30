import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../features/products/screens/home-screen';
import { ProfileScreen } from '../features/profile/screens/profile-screen';
import { HomeTabIcon, ProfileTabIcon } from '../components/TabIcons';
import { tabScreenOptions } from './styles/main-navigator-styles';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs: React.FC = () => (
    <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: HomeTabIcon }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ProfileTabIcon }} />
    </Tab.Navigator>
);

export default MainTabs;
