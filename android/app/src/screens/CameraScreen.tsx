import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
    Image,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button } from '../components/Button';
import { useDispatch } from 'react-redux';
import { addBill } from '../store/billsSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
    navigation: NativeStackNavigationProp<any>;
};

export const CameraScreen: React.FC<Props> = ({ navigation }) => {
    const [image, setImage] = useState<string | null>(null);
    const [amount, setAmount] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [description, setDescription] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const dispatch = useDispatch();

    const handleImageSelection = async (type: 'camera' | 'gallery') => {
        const result =
            type === 'camera'
                ? await launchCamera({ mediaType: 'photo', quality: 0.8 })
                : await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });

        if (result.assets && result.assets[0]?.uri) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!image || !amount || !transactionDate || !description) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        const newBill = {
            id: Date.now().toString(),
            image,
            amount: parseFloat(amount),
            date: transactionDate,
            description,
            invoiceNumber: invoiceNumber || null, // Optional field
            status: 'pending' as const,
        };

        dispatch(addBill(newBill));
        navigation.goBack();
    };

    const handleDateConfirm = (date: Date) => {
        setTransactionDate(date.toISOString().split('T')[0]); 
        setDatePickerVisible(false);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.preview} />
                ) : (
                    <TouchableOpacity
                        style={styles.uploadContainer}
                        onPress={() =>
                            Alert.alert('Upload Image', 'Choose an option', [
                                { text: 'Take Photo', onPress: () => handleImageSelection('camera') },
                                { text: 'Select from Gallery', onPress: () => handleImageSelection('gallery') },
                                { text: 'Cancel', style: 'cancel' },
                            ])
                        }
                    >
                        <View style={styles.uploadTextContainer}>
                            <MaterialIcons name="cloud-upload" size={24} color="#32a852" style={styles.uploadIcon} />
                            <Text style={styles.uploadText}>Drag or Upload an Image</Text>
                        </View>
                    </TouchableOpacity>
                )}

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setDatePickerVisible(true)}
                    >
                        <Text style={transactionDate ? styles.dateText : styles.placeholderText}>
                            {transactionDate || 'Select Transaction Date'}
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Invoice # (Optional)"
                        value={invoiceNumber}
                        onChangeText={setInvoiceNumber}
                    />
                </View>

                <View style={styles.buttons}>
                    {image && <Button title="Retake Photo" onPress={() => setImage(null)} />}
                    <Button title="Submit" onPress={handleSubmit} disabled={!image || !amount || !transactionDate || !description} />
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={() => setDatePickerVisible(false)}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    preview: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
    },
    uploadContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 16,
    },
    uploadTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    uploadIcon: {
        marginRight: 8,
    },
    uploadText: {
        fontSize: 16,
        color: '#32a852',
    },
    form: {
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderColor: '#32a852',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
    },
    buttons: {
        gap: 16,
    },
    placeholderText: {
        color: '#32a852',
    },
    dateText: {
        color: '#000',
    },
});
