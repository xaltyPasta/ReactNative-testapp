import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ReimbursementScreen: React.FC = () => {
    const approvedBills = useSelector((state: RootState) =>
        state.bills.bills.filter(bill => bill.status === 'approved')
    );

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <MaterialIcons name="assignment" size={30} color="#007AFF" />
                <Text style={styles.headerText}>Reimbursement</Text>
            </View>

            {/* List of Approved Bills */}
            <FlatList
                data={approvedBills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.billItem}>
                        <MaterialIcons name="check-circle" size={40} color="#28A745" />
                        <View style={styles.billInfo}>
                            <Text style={styles.amount}>${item.amount}</Text>
                            <Text style={styles.date}>
                                {new Date(item.date).toLocaleDateString()}
                            </Text>
                            <Text style={styles.description}>Description not available</Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No approved bills yet</Text>
                }
            />
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
        marginBottom: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
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
    description: {
        color: '#555',
        marginTop: 4,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 32,
        color: '#666',
    },
});
