import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { applyForLoan } from '@/services/api';
import { COLORS } from '@/config/api';
import { Ionicons } from '@expo/vector-icons';

export default function LoansScreen() {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    { icon: 'flash-outline', text: 'Quick Approval (24-48 hours)' },
    { icon: 'trending-down-outline', text: 'Low Interest Rates' },
    { icon: 'calendar-outline', text: 'Flexible Repayment Terms' },
    { icon: 'shield-checkmark-outline', text: 'No Hidden Fees' },
    { icon: 'wallet-outline', text: 'Based on Contribution History' }
  ];

  const handleApply = async () => {
    if (!amount || !purpose) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const loanAmount = parseFloat(amount);
    if (isNaN(loanAmount) || loanAmount < 500) {
      Alert.alert('Error', 'Minimum loan amount is R500');
      return;
    }

    setIsLoading(true);
    try {
      // Calculate repayment date (30 days from now)
      const repaymentDate = new Date();
      repaymentDate.setDate(repaymentDate.getDate() + 30);

      await applyForLoan({
        amount: loanAmount,
        purpose,
        repayment_date: repaymentDate.toISOString().split('T')[0]
      });

      Alert.alert(
        'Application Submitted',
        'Your loan application has been submitted. You will receive a response within 24-48 hours.',
        [{ text: 'OK', onPress: () => {
          setShowForm(false);
          setAmount('');
          setPurpose('');
        }}]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to submit application');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Loan Info Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="cash-outline" size={40} color={COLORS.skyBlue} />
        </View>
        <Text style={styles.title}>Loan Facility</Text>
        <Text style={styles.subtitle}>
          Access funds when you need them. Apply for a loan based on your contribution history.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresCard}>
        <Text style={styles.featuresTitle}>Loan Benefits</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons name={feature.icon as any} size={20} color={COLORS.skyBlue} />
            </View>
            <Text style={styles.featureText}>{feature.text}</Text>
          </View>
        ))}
      </View>

      {/* Loan Status Card */}
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Your Loan Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Current Loan</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>No Active Loan</Text>
          </View>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Eligible Amount</Text>
          <Text style={styles.statusValue}>R5,000</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Interest Rate</Text>
          <Text style={styles.statusValue}>5% per month</Text>
        </View>
      </View>

      {/* Apply Button or Form */}
      {!showForm ? (
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => setShowForm(true)}
        >
          <Ionicons name="add-circle-outline" size={24} color={COLORS.white} />
          <Text style={styles.applyButtonText}>Apply for Loan</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Loan Application</Text>
            <TouchableOpacity onPress={() => setShowForm(false)}>
              <Ionicons name="close" size={24} color={COLORS.gray600} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Loan Amount (R)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount (min R500)"
              placeholderTextColor={COLORS.gray600}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Purpose</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What is the loan for?"
              placeholderTextColor={COLORS.gray600}
              multiline
              numberOfLines={4}
              value={purpose}
              onChangeText={setPurpose}
            />
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color={COLORS.skyBlue} />
            <Text style={styles.infoText}>
              Repayment is due 30 days from approval. Interest rate: 5% per month.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleApply}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.submitButtonText}>Submit Application</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Past Loans */}
      <View style={styles.historyCard}>
        <Text style={styles.historyTitle}>Loan History</Text>
        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={40} color={COLORS.gray200} />
          <Text style={styles.emptyText}>No loan history</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 32,
    alignItems: 'center'
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${COLORS.skyBlue}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 22
  },
  featuresCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 16
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${COLORS.skyBlue}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  featureText: {
    fontSize: 14,
    color: COLORS.gray800
  },
  statusCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 16
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100
  },
  statusLabel: {
    fontSize: 14,
    color: COLORS.gray600
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray900
  },
  statusBadge: {
    backgroundColor: `${COLORS.success}20`,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.success
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.skyBlue,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white
  },
  formCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray900
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray800,
    marginBottom: 8
  },
  input: {
    backgroundColor: COLORS.gray50,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: COLORS.gray900
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: `${COLORS.skyBlue}10`,
    padding: 12,
    borderRadius: 10,
    gap: 8,
    marginBottom: 16
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.gray800,
    lineHeight: 18
  },
  submitButton: {
    backgroundColor: COLORS.skyBlue,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  submitButtonDisabled: {
    opacity: 0.7
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white
  },
  historyCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    marginBottom: 32,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 16
  },
  emptyState: {
    alignItems: 'center',
    padding: 24
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 8
  }
});
