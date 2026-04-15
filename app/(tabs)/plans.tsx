import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { getPlans, subscribeToPlan, Plan } from '@/services/api';
import { COLORS } from '@/config/api';
import { Ionicons } from '@expo/vector-icons';

export default function PlansScreen() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subscribingTo, setSubscribingTo] = useState<number | null>(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (error) {
      console.error('Failed to load plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (plan: Plan) => {
    Alert.alert(
      'Subscribe to Plan',
      `Are you sure you want to subscribe to the ${plan.name} plan at R${plan.amount}/month?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Subscribe',
          onPress: async () => {
            setSubscribingTo(plan.id);
            try {
              await subscribeToPlan(plan.id);
              Alert.alert('Success', `You have subscribed to the ${plan.name} plan!`);
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to subscribe');
            } finally {
              setSubscribingTo(null);
            }
          }
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.skyBlue} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>
          Select a contribution plan that fits your budget and goals
        </Text>
      </View>

      <View style={styles.plansContainer}>
        {plans.map((plan, index) => {
          const isFeatured = plan.name === 'Standard';
          const isSubscribing = subscribingTo === plan.id;

          return (
            <View
              key={plan.id}
              style={[
                styles.planCard,
                isFeatured && styles.planCardFeatured
              ]}
            >
              {isFeatured && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Popular</Text>
                </View>
              )}

              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>
                R{plan.amount.toLocaleString()}
                <Text style={styles.planPeriod}>/month</Text>
              </Text>
              <Text style={styles.planGrowth}>
                {plan.growth_rate}% Monthly Growth
              </Text>

              <View style={styles.features}>
                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={COLORS.skyBlue}
                    />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.subscribeButton,
                  isFeatured && styles.subscribeButtonFeatured,
                  isSubscribing && styles.subscribeButtonDisabled
                ]}
                onPress={() => handleSubscribe(plan)}
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text
                    style={[
                      styles.subscribeButtonText,
                      isFeatured && styles.subscribeButtonTextFeatured
                    ]}
                  >
                    Select Plan
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={24} color={COLORS.skyBlue} />
        <Text style={styles.infoText}>
          You can change your plan at any time. Upgrades take effect immediately,
          while downgrades apply from the next billing cycle.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    padding: 24,
    backgroundColor: COLORS.white
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
    lineHeight: 22
  },
  plansContainer: {
    padding: 16,
    gap: 16
  },
  planCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  planCardFeatured: {
    borderColor: COLORS.skyBlue,
    backgroundColor: 'rgba(14, 165, 233, 0.03)'
  },
  badge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: COLORS.skyBlue,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600'
  },
  planName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.skyBlue,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8
  },
  planPrice: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.gray900
  },
  planPeriod: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.gray600
  },
  planGrowth: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 4,
    marginBottom: 20
  },
  features: {
    gap: 12,
    marginBottom: 24
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  featureText: {
    fontSize: 14,
    color: COLORS.gray800
  },
  subscribeButton: {
    backgroundColor: COLORS.gray100,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray200
  },
  subscribeButtonFeatured: {
    backgroundColor: COLORS.skyBlue,
    borderColor: COLORS.skyBlue
  },
  subscribeButtonDisabled: {
    opacity: 0.7
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800
  },
  subscribeButtonTextFeatured: {
    color: COLORS.white
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    margin: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    gap: 12
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.gray800,
    lineHeight: 20
  }
});
