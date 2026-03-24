import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from './src/screens/signin-screen';
import MainNavigator from './src/screens/navigator/main-navigator'
import { Provider } from 'react-redux';
import store from './src/stores/store';
import { ActivityIndicator, View } from 'react-native';
import { useAppDispatch, useAppSelector } from './src/stores/store';
import { useEffect } from 'react';
import { initAuth } from './src/slices/auth-slice';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const isInitializing = useAppSelector((state) => state.auth.isInitializing);

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  if (isInitializing) {
    console.log('Initializing auth...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0df2f2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token == null ? (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;