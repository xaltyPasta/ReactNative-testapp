import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { HomeScreen } from '../screens/HomeScreen'; 

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                {/* HomeScreen replaces BillListScreen after login */}
                <Stack.Screen
                    name="Home"
                    component={HomeScreen} 
                    options={{ headerShown: false }}  
                />
                <Stack.Screen
                    name="Camera"
                    component={CameraScreen}
                    options={{ title: 'Submit Reimbursement' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
