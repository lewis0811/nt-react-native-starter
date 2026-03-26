import React, { useCallback } from 'react';
import OrderHistoryAction from '../components/OrderHistoryAction';
import LogoutAction from '../components/LogoutAction';
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import useAuth from '../hooks/use-auth';
import { styles } from './styles/profile-screen-styles';

type RootStackParamList = {
    Profile: undefined;
    Home: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

interface ProfileScreenProps {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const { user, signOut } = useAuth();

    const firstName = user?.firstName || 'John';
    const lastName = user?.lastName || 'Doe';
    const username = user?.username || 'johndoe_official';
    const displayName = `${firstName} ${lastName}`.trim() || 'John Doe';
    const email = user?.email || 'john.doe@example.com';
    const age = user?.age ?? 28;
    const role = user?.role || 'user';

    const handleGoBack = useCallback(() => {
        navigation.navigate('Home');
    }, [navigation]);

    const handleSignOut = useCallback(async () => {
        try {
            await signOut();
        } catch (e) {
        }
    }, [signOut]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable testID="back-button" onPress={handleGoBack} style={styles.headerButton}>
                        <Image
                            source={require('../assets/images/arrow_back.png')}
                            style={[styles.headerIconImage, { tintColor: '#0F172A' }]}
                            resizeMode="contain"
                        />
                    </Pressable>
                    <Text style={styles.headerTitle}>Profile Settings</Text>
                    <Pressable testID="setting-button" style={styles.headerButton}>
                        <Image
                            source={require('../assets/images/setting_icon.png')}
                            style={[styles.headerIconImage, { tintColor: '#0F172A' }]}
                            resizeMode="contain"
                        />
                    </Pressable>
                </View>

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.identityCard}>
                        <View style={styles.avatarWrapper}>
                            <View style={styles.avatarInner}>
                                <Image
                                    source={require('../assets/images/user_avatar.png')}
                                    style={styles.avatarImage}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.editAvatarBadge}>
                                <Image
                                    source={require('../assets/images/edit_icon.png')}
                                    style={styles.editAvatarImage}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        <Text style={styles.nameText}>{displayName}</Text>
                        <Text style={styles.usernameText}>@{username}</Text>

                        <View style={styles.memberBadge}>
                            <Text style={styles.memberBadgeText}>{role === 'user' ? 'PREMIUM MEMBER' : 'ADMIN'}</Text>
                        </View>
                    </View>

                    <View style={styles.detailsCard}>
                        <View style={styles.detailsHeader}>
                            <Text style={styles.detailsTitle}>Account Details</Text>
                            <Pressable testID="edit-details-button">
                                <Text style={styles.editDetailsText}>Edit Details</Text>
                            </Pressable>
                        </View>

                        <View style={styles.fieldBlock}>
                            <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
                            <View style={styles.emailFieldContainer}>
                                <Text style={styles.emailFieldValue}>{email}</Text>
                            </View>
                        </View>

                        <View style={styles.fieldBlock}>
                            <Text style={styles.fieldLabel}>FIRST NAME</Text>
                            <Text style={styles.fieldValue}>{firstName}</Text>
                        </View>

                        <View style={styles.fieldBlock}>
                            <Text style={styles.fieldLabel}>LAST NAME</Text>
                            <Text style={styles.fieldValue}>{lastName}</Text>
                        </View>

                        <View style={styles.fieldBlock}>
                            <Text style={styles.fieldLabel}>AGE</Text>
                            <Text style={styles.fieldValue}>{age}</Text>
                        </View>
                    </View>

                    <View style={styles.actionsContainer}>
                        <OrderHistoryAction />
                        <LogoutAction onSignOut={handleSignOut} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export { ProfileScreen };