import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export const InvoicesScreen = () => {
    const invoices = [
        { id: '1', date: '2024-01-15', amount: 250, status: 'Pending' },
        { id: '2', date: '2024-01-10', amount: 480, status: 'Approved' },
        { id: '3', date: '2024-01-05', amount: 320, status: 'Rejected' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return '#4CAF50';
            case 'Rejected': return '#F44336';
            default: return '#FFC107';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryTitle}>Total Invoices</Text>
                    <Text style={styles.summaryValue}>$1,050</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryTitle}>Pending</Text>
                    <Text style={styles.summaryValue}>$250</Text>
                </View>
            </View>

            <FlatList
                data={invoices}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.invoiceItem}>
                        <MaterialIcons name="receipt" size={24} color="#666" />
                        <View style={styles.invoiceInfo}>
                            <Text style={styles.invoiceDate}>{item.date}</Text>
                            <Text style={styles.invoiceAmount}>${item.amount}</Text>
                        </View>
                        <Text style={[styles.invoiceStatus, { color: getStatusColor(item.status) }]}>
                            {item.status}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    summary: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    summaryItem: {
        alignItems: 'center',
    },
    summaryTitle: {
        color: '#666',
        fontSize: 14,
    },
    summaryValue: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
    },
    invoiceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 1,
    },
    invoiceInfo: {
        flex: 1,
        marginLeft: 15,
    },
    invoiceDate: {
        fontSize: 16,
        color: '#000',
    },
    invoiceAmount: {
        color: '#666',
        marginTop: 4,
    },
    invoiceStatus: {
        fontWeight: '500',
    },
});