import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
    navigation: NativeStackNavigationProp<any>;
};

export const BillListScreen: React.FC<Props> = ({ navigation }) => {
    const bills = useSelector((state: RootState) => state.bills.bills);

    return (
        <View style={styles.container}>
            {/* Header Section */}
            {/* <View style={styles.header}>
                <MaterialIcons name="person" size={40} color="#555" />
                <Text style={styles.greeting}>Hello, User</Text>
            </View> */}

            {/* Bill List */}
            <FlatList
                data={bills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.billItem}>
                        <MaterialIcons name="receipt" size={50} color="#007AFF" />
                        <View style={styles.billInfo}>
                            <Text style={styles.amount}>${item.amount}</Text>
                            <Text style={styles.date}>
                                {new Date(item.date).toLocaleDateString()}
                            </Text>
                            <Text style={styles.status}>{item.status}</Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No bills submitted yet</Text>
                }
            />

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('Camera')}
            >
                <MaterialIcons name="add" size={32} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        marginBottom: 12,
    },
    greeting: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
    },
    billItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    billInfo: {
        marginLeft: 16,
        flex: 1,
    },
    amount: {
        fontSize: 18,
        fontWeight: '600',
    },
    date: {
        color: '#666',
        marginTop: 4,
    },
    status: {
        color: '#007AFF',
        marginTop: 4,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 32,
        color: '#666',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#32a852',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
});
