import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from './src/features/auth/screens/signin-screen';
import MainNavigator from './src/navigation/main-navigator';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { setupApiInterceptors } from './src/services/api/api-service';
import { logout } from './src/features/auth/store/auth-slice';
import { ActivityIndicator, View } from 'react-native';
import { useAppDispatch, useAppSelector } from './src/store/store';
import { useEffect } from 'react';
import { initAuth } from './src/features/auth/store/auth-slice';
import { theme } from './src/assets/styles';
import { appStyles, stackScreenOptions } from './src/styles/app-styles';

const Stack = createNativeStackNavigator();

const App = () => {
  setupApiInterceptors({ getState: store.getState, onAuthFailed: () => store.dispatch(logout() as any) });
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
    return (
      <View style={appStyles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.brand.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackScreenOptions}>
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