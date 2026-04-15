import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { COLORS } from '@/config/api';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to dashboard if authenticated
  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/(tabs)/dashboard');
    }
  }, [isAuthenticated, isLoading]);

  const howItWorks = [
    {
      icon: 'person-add-outline',
      title: 'Join a Plan',
      description: 'Choose a contribution plan that suits your financial goals.'
    },
    {
      icon: 'wallet-outline',
      title: 'Contribute Monthly',
      description: 'Make regular contributions and watch your savings grow.'
    },
    {
      icon: 'trending-up-outline',
      title: 'Earn Growth',
      description: 'Your contributions earn competitive monthly growth rates.'
    }
  ];

  const plans = [
    { name: 'Starter', amount: 500, growth: 3 },
    { name: 'Standard', amount: 1000, growth: 5, featured: true },
    { name: 'Premium', amount: 2000, growth: 7 }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.logo}>
            Legau<Text style={styles.logoAccent}>People</Text>
          </Text>
          <Text style={styles.heroTitle}>Grow Your Money Together</Text>
          <Text style={styles.heroSubtitle}>
            Join our community stokvel and watch your contributions grow with competitive monthly rates.
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text style={styles.btnPrimaryText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnOutline}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.btnOutlineText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* How It Works */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.sectionSubtitle}>
          Simple steps to start growing your money
        </Text>
        <View style={styles.cardsContainer}>
          {howItWorks.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardIcon}>
                <Ionicons name={item.icon as any} size={28} color={COLORS.white} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Pricing Plans */}
      <View style={[styles.section, { backgroundColor: COLORS.white }]}>
        <Text style={styles.sectionTitle}>Choose Your Plan</Text>
        <Text style={styles.sectionSubtitle}>
          Select a contribution plan that fits your budget
        </Text>
        <View style={styles.plansContainer}>
          {plans.map((plan, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.planCard,
                plan.featured && styles.planCardFeatured
              ]}
              onPress={() => router.push('/(auth)/register')}
            >
              {plan.featured && (
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>Popular</Text>
                </View>
              )}
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>
                R{plan.amount.toLocaleString()}
                <Text style={styles.planPeriod}>/month</Text>
              </Text>
              <Text style={styles.planGrowth}>{plan.growth}% Monthly Growth</Text>
              <View style={styles.planButton}>
                <Text style={styles.planButtonText}>Select Plan</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Loan Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need a Loan?</Text>
        <Text style={styles.sectionSubtitle}>
          Access funds when you need them most
        </Text>
        <View style={styles.loanCard}>
          <Ionicons name="cash-outline" size={48} color={COLORS.skyBlue} />
          <Text style={styles.loanTitle}>Quick Loan Facility</Text>
          <Text style={styles.loanDescription}>
            Active members can apply for loans based on their contribution history. Competitive rates and flexible repayment terms.
          </Text>
          <View style={styles.loanFeatures}>
            <View style={styles.loanFeature}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.skyBlue} />
              <Text style={styles.loanFeatureText}>Low interest rates</Text>
            </View>
            <View style={styles.loanFeature}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.skyBlue} />
              <Text style={styles.loanFeatureText}>Quick approval</Text>
            </View>
            <View style={styles.loanFeature}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.skyBlue} />
              <Text style={styles.loanFeatureText}>Flexible terms</Text>
            </View>
          </View>
        </View>
      </View>

      {/* About */}
      <View style={[styles.section, { backgroundColor: COLORS.white }]}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.aboutText}>
          Legau People Society is a modern stokvel designed to help our community grow wealth together. Through collective savings and smart investment practices, we provide our members with competitive growth rates and access to emergency loans when needed.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerLogo}>
          Legau<Text style={styles.logoAccent}>People</Text> Society
        </Text>
        <Text style={styles.footerText}>
          Growing Together, Building Futures
        </Text>
        <Text style={styles.footerCopyright}>
          2024 Legau People Society. All rights reserved.
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
  hero: {
    backgroundColor: COLORS.skyBlue,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24
  },
  heroContent: {
    alignItems: 'center'
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 20
  },
  logoAccent: {
    color: COLORS.brown
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 12
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12
  },
  btnPrimary: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12
  },
  btnPrimaryText: {
    color: COLORS.skyBlue,
    fontWeight: '600',
    fontSize: 16
  },
  btnOutline: {
    borderWidth: 2,
    borderColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12
  },
  btnOutlineText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16
  },
  section: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: COLORS.gray50
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gray900,
    textAlign: 'center',
    marginBottom: 8
  },
  sectionSubtitle: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
    marginBottom: 32
  },
  cardsContainer: {
    gap: 16
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: COLORS.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 8
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 22
  },
  plansContainer: {
    gap: 16
  },
  planCard: {
    backgroundColor: COLORS.gray50,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray200
  },
  planCardFeatured: {
    borderColor: COLORS.skyBlue,
    backgroundColor: 'rgba(14, 165, 233, 0.05)'
  },
  planBadge: {
    backgroundColor: COLORS.skyBlue,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12
  },
  planBadgeText: {
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
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.gray900
  },
  planPeriod: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.gray600
  },
  planGrowth: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 8,
    marginBottom: 20
  },
  planButton: {
    backgroundColor: COLORS.skyBlue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10
  },
  planButtonText: {
    color: COLORS.white,
    fontWeight: '600'
  },
  loanCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  loanTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.gray900,
    marginTop: 16,
    marginBottom: 12
  },
  loanDescription: {
    fontSize: 14,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20
  },
  loanFeatures: {
    gap: 12,
    width: '100%'
  },
  loanFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  loanFeatureText: {
    fontSize: 14,
    color: COLORS.gray800,
    fontWeight: '500'
  },
  aboutText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 26
  },
  footer: {
    backgroundColor: COLORS.gray900,
    padding: 32,
    alignItems: 'center'
  },
  footerLogo: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8
  },
  footerText: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 16
  },
  footerCopyright: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)'
  }
});
