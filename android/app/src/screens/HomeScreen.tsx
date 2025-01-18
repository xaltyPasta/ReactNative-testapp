import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    navigation: NativeStackNavigationProp<any>;
};

const { height } = Dimensions.get('window');
const headerHeight = height * 0.2; // 20% of screen height

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
    const [showUsername, setShowUsername] = useState<boolean>(true);

    const bills = useSelector((state: RootState) => state.bills.bills);
    const filteredBills = bills.filter(bill => bill.status === activeTab);

    return (
        <View style={styles.container}>
            {/* Header Section with User Icon and Username */}
            <View style={[styles.header, { height: headerHeight }]}>
                {/* Left Half: User Icon and Username with Dropdown Arrow */}
                <View style={styles.userContainer}>
                    <MaterialIcons name="account-circle" size={90} color="#32a852" />
                    <TouchableOpacity onPress={() => setShowUsername(!showUsername)}>
                        <Text style={styles.headerText}>
                            {showUsername ? 'User Name' : <MaterialIcons name="arrow-drop-down" size={24} color="#32a852" />}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Right Half: Empty space to take up remaining space */}
                <View style={styles.emptyColumn}></View>
            </View>

            {/* Greeting Text */}
            <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Hello Devyanshi</Text>
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
                <View style={styles.bottomTabButton}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.tabContent}>
                        <MaterialIcons name="home" size={24} color="#32a852" />
                        <Text style={styles.bottomTabText}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomTabButton}>
                    <TouchableOpacity onPress={() => navigation.navigate('BillLists')} style={styles.tabContent}>
                        <MaterialIcons name="article" size={24} color="#32a852" />
                        <Text style={styles.bottomTabText}>My Invoices</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomTabButton}>
                    <TouchableOpacity onPress={() => navigation.navigate('ReimbursementScreen')} style={styles.tabContent}>
                        <MaterialIcons name="redo" size={24} color="#32a852" />
                        <Text style={styles.bottomTabText}>Reimbursements</Text>
                    </TouchableOpacity>
                </View>
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
        width: '100%',
        paddingHorizontal: 10,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%', // Taking up half the screen
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    emptyColumn: {
        flex: 1, // Empty column to take the rest of the space
    },
    greetingContainer: {
        marginBottom: 16,
    },
    greetingText: {
        fontSize: 26,
        color: 'black',
        fontWeight: 'bold',
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
        bottom: 80, // Adjusted position
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
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 10,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomTabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    tabContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomTabText: {
        fontSize: 12,
        color: '#555',
    },
});
