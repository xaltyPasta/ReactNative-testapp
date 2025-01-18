import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ReimbursementScreen } from '../screens/ReimbursementScreen';
import { BillListScreen } from '../screens/BillListScreen';

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
                <Stack.Screen
                    name="BillLists"
                    component={BillListScreen} // Add BillLists screen here
                    options={{ title: 'My Invoices' }}
                />
                <Stack.Screen
                    name="ReimbursementScreen"
                    component={ReimbursementScreen} // Add ReimbursementScreen here
                    options={{ title: 'Reimbursements' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
