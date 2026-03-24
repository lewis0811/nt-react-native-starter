import * as React from 'react';
import { Text, View } from 'react-native';
import Button from '../components/Button';
import useAuth from '../hooks/use-auth';

interface HomeScreenProps {
    navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const { user } = useAuth();

    return (
        <View style={{ margin: 10, flex: 1, flexDirection: 'column' }}>
            {user ? (
                <>
                    <Text style={{ flex: 1 }}>Welcome, {user.username}!</Text>
                    <View>
                        <Button onPress={() => navigation.navigate('Profile')}>
                            <Text>View Profile</Text>
                        </Button>
                    </View>

                </>
            ) : (
                <>
                    <Text style={{ flex: 1 }}>Welcome Guest</Text>
                    <Button title="Sign In" onPress={() => navigation.navigate('SignIn')}>
                        <Text>Sign in</Text>
                    </Button>
                </>
            )}
        </View>
    );
};

export { HomeScreen };