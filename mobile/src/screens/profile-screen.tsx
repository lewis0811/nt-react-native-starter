import React from 'react';
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';
import useAuth from '../hooks/use-auth';
import { styles } from './styles/profile-screen-styles';

interface ProfileScreenProps {
    navigation: any;
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

    const handleGoBack = () => {
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={handleGoBack} style={styles.headerButton}>
                        <Image
                            source={require('../assets/images/arrow_back.png')}
                            style={[styles.headerIconImage, { tintColor: '#0F172A' }]}
                            resizeMode="contain"
                        />
                    </Pressable>
                    <Text style={styles.headerTitle}>Profile Settings</Text>
                    <Pressable style={styles.headerButton}>
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
                            <Pressable>
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
                        <Pressable
                            style={styles.actionCard}
                        >
                            <View style={styles.actionLeft}>
                                <View style={styles.orderIconBackground}>
                                    <Image
                                        source={require('../assets/images/lock_icon.png')}
                                        style={styles.orderIcon}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={styles.actionLabel}>Order History</Text>
                            </View>
                            <Image
                                source={require('../assets/images/chevron_icon.png')}
                                style={styles.chevronIcon}
                                resizeMode="contain"
                            />
                        </Pressable>

                        <Pressable
                            style={styles.actionCard}
                            onPress={async () => {
                                try {
                                    await signOut();
                                } catch (e) {
                                    // ignore
                                }
                            }}
                        >
                            <View style={styles.actionLeft}>
                                <View style={styles.logoutIconBackground}>
                                    <Image
                                        source={require('../assets/images/logout_icon.png')}
                                        style={styles.logoutIcon}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={styles.logoutLabel}>Logout</Text>
                            </View>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export { ProfileScreen };