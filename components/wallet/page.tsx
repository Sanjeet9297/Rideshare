import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideMenu from '../SideMenu/page';
import { BottomNavigation } from '../shared';

const COLORS = {
    primary: '#008955',
    text: '#1F2937',
    textSecondary: '#6B7280',
    background: '#FFFFFF',
    border: '#E5E7EB',
    lightGreen: '#D1F4E8',
    green: '#34D399',
    red: '#EF4444',
    lightRed: '#FEE2E2',
    lightPink: '#FCE7F3',
};

interface Transaction {
    id: string;
    name: string;
    time: string;
    amount: number;
    type: 'credit' | 'debit';
}

interface Props {
    onMenuClick?: () => void;
    onNavClick?: (page: string) => void;
}

const transactions: Transaction[] = [
    { id: '1', name: 'Welton', time: 'Today at 09:20 am', amount: -570.00, type: 'debit' },
    { id: '2', name: 'Nathsam', time: 'Today at 09:20 am', amount: 570.00, type: 'credit' },
    { id: '3', name: 'Welton', time: 'Today at 09:20 am', amount: -570.00, type: 'debit' },
    { id: '4', name: 'Nathsam', time: 'Today at 09:20 am', amount: 570.00, type: 'credit' },
    { id: '5', name: 'Nathsam', time: 'Today at 09:20 am', amount: 570.00, type: 'credit' },
];

export default function WalletPage({ onMenuClick, onNavClick }: Props) {
    const [sideMenuVisible, setSideMenuVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} activeOpacity={0.7} onPress={() => setSideMenuVisible(true)}>
                    <View style={styles.menuIconContainer}>
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
                    <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Add Money Button */}
                <View style={styles.addMoneyContainer}>
                    <TouchableOpacity style={styles.addMoneyButton} activeOpacity={0.7}>
                        <Text style={styles.addMoneyText}>Add Money</Text>
                    </TouchableOpacity>
                </View>

                {/* Balance Cards */}
                <View style={styles.balanceCards}>
                    <View style={styles.balanceCard}>
                        <Text style={styles.balanceAmount}>$500</Text>
                        <Text style={styles.balanceLabel}>Available Balance</Text>
                    </View>
                    <View style={styles.balanceCard}>
                        <Text style={styles.balanceAmount}>$200</Text>
                        <Text style={styles.balanceLabel}>Total Expend</Text>
                    </View>
                </View>

                {/* Transactions Section */}
                <View style={styles.transactionsSection}>
                    <View style={styles.transactionsHeader}>
                        <Text style={styles.transactionsTitle}>Transactions</Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Transaction List */}
                    <View style={styles.transactionList}>
                        {transactions.map((transaction) => (
                            <View key={transaction.id} style={styles.transactionItem}>
                                <View style={[
                                    styles.transactionIcon,
                                    transaction.type === 'credit' ? styles.transactionIconCredit : styles.transactionIconDebit
                                ]}>
                                    {transaction.type === 'credit' ? (
                                        <Ionicons name="checkmark" size={20} color={COLORS.green} />
                                    ) : (
                                        <MaterialCommunityIcons name="minus" size={20} color={COLORS.red} />
                                    )}
                                </View>
                                <View style={styles.transactionDetails}>
                                    <Text style={styles.transactionName}>{transaction.name}</Text>
                                    <Text style={styles.transactionTime}>{transaction.time}</Text>
                                </View>
                                <Text style={[
                                    styles.transactionAmount,
                                    transaction.type === 'debit' && styles.transactionAmountDebit
                                ]}>
                                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <BottomNavigation
                activeTab="wallet"
                onTabPress={(tab) => onNavClick?.(tab)}
            />

            {/* Side Menu */}
            <SideMenu
                visible={sideMenuVisible}
                onClose={() => setSideMenuVisible(false)}
                onMenuItemPress={(item) => {
                    console.log('Menu item pressed:', item);
                    if (item === 'logout') {
                        onMenuClick?.();
                    }
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    menuButton: {
        padding: 8,
        backgroundColor: COLORS.lightGreen,
        borderRadius: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIconContainer: {
        width: 20,
        height: 16,
        justifyContent: 'space-between',
    },
    menuLine: {
        width: 20,
        height: 2,
        backgroundColor: COLORS.primary,
        borderRadius: 1,
    },
    bellButton: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    addMoneyContainer: {
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    addMoneyButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.background,
    },
    addMoneyText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.primary,
    },
    balanceCards: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 28,
    },
    balanceCard: {
        flex: 1,
        backgroundColor: COLORS.lightGreen,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#B8E9D9',
    },
    balanceAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    balanceLabel: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    transactionsSection: {
        marginTop: 8,
    },
    transactionsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    transactionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    seeAllText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '500',
    },
    transactionList: {
        gap: 12,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    transactionIconCredit: {
        backgroundColor: '#D1FAE5',
    },
    transactionIconDebit: {
        backgroundColor: COLORS.lightPink,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },
    transactionTime: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    transactionAmountDebit: {
        color: COLORS.text,
    },
});
