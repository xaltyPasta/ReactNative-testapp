import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    navigation: NativeStackNavigationProp<any>;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');

    const bills = useSelector((state: RootState) => state.bills.bills);
    const filteredBills = bills.filter(bill => bill.status === activeTab);

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <MaterialIcons name="account-circle" size={40} color="#32a852" />
                <Text style={styles.headerText}>Hello, User</Text>
            </View>

            {/* Toggle Buttons */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'pending' && styles.activeTab]}
                    onPress={() => setActiveTab('pending')}
                >
                    <Text style={styles.tabText}>Pending Bills</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'approved' && styles.activeTab]}
                    onPress={() => setActiveTab('approved')}
                >
                    <Text style={styles.tabText}>Approved Bills</Text>
                </TouchableOpacity>
            </View>

            {/* Bills List */}
            <FlatList
                data={filteredBills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.billItem}>
                        <Image source={{ uri: item.image }} style={styles.thumbnail} />
                        <View style={styles.billInfo}>
                            <Text style={styles.amount}>${item.amount}</Text>
                            <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
                            <Text style={[styles.status, item.status === 'approved' && styles.approvedStatus]}>
                                {item.status.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No {activeTab} bills yet</Text>}
            />

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Camera')}>
                <MaterialIcons name="add" size={30} color="#fff" />
            </TouchableOpacity>

            {/* Bottom Navigation Tabs */}
            <View style={styles.bottomTabs}>
                <TouchableOpacity
                    style={[styles.bottomTabButton, activeTab === 'pending' && styles.activeBottomTab]}
                    onPress={() => navigation.navigate('Home')}
                >
                    <MaterialIcons name="home" size={24} color={activeTab === 'pending' ? '#32a852' : '#555'} />
                    <Text style={[styles.bottomTabText, activeTab === 'pending' && styles.activeBottomTabText]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.bottomTabButton, activeTab === 'approved' && styles.activeBottomTab]}
                    onPress={() => navigation.navigate('Invoices')}
                >
                    <MaterialIcons name="file-invoice" size={24} color={activeTab === 'approved' ? '#32a852' : '#555'} />
                    <Text style={[styles.bottomTabText, activeTab === 'approved' && styles.activeBottomTabText]}>My Invoices</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.bottomTabButton, activeTab === 'approved' && styles.activeBottomTab]}
                    onPress={() => navigation.navigate('Reimbursements')}
                >
                    <MaterialIcons name="redo" size={24} color={activeTab === 'approved' ? '#32a852' : '#555'} />
                    <Text style={[styles.bottomTabText, activeTab === 'approved' && styles.activeBottomTabText]}>Reimbursements</Text>
                </TouchableOpacity>
            </View>
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
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    tabButton: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: 'transparent',
    },
    activeTab: {
        borderColor: '#32A852',
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    billItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#32A852',
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
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
        color: '#32A852',
        marginTop: 4,
    },
    status: {
        color: '#FF6347',
        marginTop: 4,
        fontWeight: 'bold',
    },
    approvedStatus: {
        color: '#28A745',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 32,
        color: '#666',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 100,
        backgroundColor: '#32A852',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    bottomTabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        width:'110%',
        backgroundColor: '#fff',
    },
    bottomTabButton: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    activeBottomTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#32A852',
    },
    bottomTabText: {
        fontSize: 12,
        color: '#555',
    },
    activeBottomTabText: {
        color: '#32A852',
        fontWeight: 'bold',
    },
});
