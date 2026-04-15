import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Dimensions
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { getDashboard, DashboardData } from '@/services/api';
import { COLORS } from '@/config/api';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');
const chartWidth = width - 48;

export default function DashboardScreen() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboardData = await getDashboard();
      setData(dashboardData);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  };

  const summaryCards = data ? [
    {
      label: 'Total Contributions',
      value: `R${data.user_stats.total_contributions.toLocaleString()}`,
      icon: 'wallet',
      color: COLORS.skyBlue
    },
    {
      label: 'Current Growth',
      value: `R${data.user_stats.current_growth.toLocaleString()}`,
      icon: 'trending-up',
      color: COLORS.success
    },
    {
      label: 'Loan Status',
      value: data.user_stats.loan_status,
      icon: 'cash',
      color: COLORS.warning
    },
    {
      label: 'Current Plan',
      value: data.user_stats.current_plan,
      icon: 'ribbon',
      color: COLORS.brown
    }
  ] : [];

  const chartConfig = {
    backgroundGradientFrom: COLORS.white,
    backgroundGradientTo: COLORS.white,
    color: (opacity = 1) => `rgba(14, 165, 233, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 12
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'Member'}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryGrid}>
        {summaryCards.map((card, index) => (
          <View key={index} style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: `${card.color}20` }]}>
              <Ionicons name={card.icon as any} size={22} color={card.color} />
            </View>
            <Text style={styles.summaryValue}>{card.value}</Text>
            <Text style={styles.summaryLabel}>{card.label}</Text>
          </View>
        ))}
      </View>

      {/* Monthly Growth Chart */}
      {data && (
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Growth</Text>
          <LineChart
            data={{
              labels: months,
              datasets: [{ data: data.monthly_growth }]
            }}
            width={chartWidth}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      )}

      {/* Contributions Chart */}
      {data && (
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Your Contributions</Text>
          <BarChart
            data={{
              labels: months,
              datasets: [{ data: data.user_contributions }]
            }}
            width={chartWidth}
            height={200}
            chartConfig={chartConfig}
            style={styles.chart}
            yAxisLabel="R"
            yAxisSuffix=""
          />
        </View>
      )}

      {/* Recent Activity */}
      <View style={styles.activityCard}>
        <Text style={styles.chartTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: `${COLORS.success}20` }]}>
              <Ionicons name="arrow-down" size={16} color={COLORS.success} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Contribution</Text>
              <Text style={styles.activityDate}>15 Mar 2024</Text>
            </View>
            <Text style={[styles.activityAmount, { color: COLORS.success }]}>+R1,000</Text>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: `${COLORS.skyBlue}20` }]}>
              <Ionicons name="trending-up" size={16} color={COLORS.skyBlue} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Growth Credited</Text>
              <Text style={styles.activityDate}>01 Mar 2024</Text>
            </View>
            <Text style={[styles.activityAmount, { color: COLORS.skyBlue }]}>+R50</Text>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: `${COLORS.success}20` }]}>
              <Ionicons name="arrow-down" size={16} color={COLORS.success} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Contribution</Text>
              <Text style={styles.activityDate}>15 Feb 2024</Text>
            </View>
            <Text style={[styles.activityAmount, { color: COLORS.success }]}>+R1,000</Text>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.white
  },
  greeting: {
    fontSize: 14,
    color: COLORS.gray600
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.gray900
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.skyBlue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600'
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    width: (width - 48) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 4
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.gray600
  },
  chartCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    margin: 12,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 16
  },
  chart: {
    borderRadius: 12
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    margin: 12,
    marginTop: 0,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  activityList: {
    gap: 16
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityContent: {
    flex: 1,
    marginLeft: 12
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray900
  },
  activityDate: {
    fontSize: 12,
    color: COLORS.gray600,
    marginTop: 2
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: '600'
  }
});
