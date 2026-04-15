import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { COLORS } from '@/config/api';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/');
          }
        }
      ]
    );
  };

  const menuItems = [
    {
      icon: 'person-outline',
      label: 'Edit Profile',
      onPress: () => Alert.alert('Coming Soon', 'Profile editing will be available soon')
    },
    {
      icon: 'card-outline',
      label: 'Payment Methods',
      onPress: () => Alert.alert('Coming Soon', 'Payment methods will be available soon')
    },
    {
      icon: 'notifications-outline',
      label: 'Notifications',
      onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon')
    },
    {
      icon: 'document-text-outline',
      label: 'Transaction History',
      onPress: () => Alert.alert('Coming Soon', 'Transaction history will be available soon')
    },
    {
      icon: 'help-circle-outline',
      label: 'Help & Support',
      onPress: () => Alert.alert('Contact Us', 'Email: support@legaupeople.co.za\nPhone: 012 345 6789')
    },
    {
      icon: 'information-circle-outline',
      label: 'About',
      onPress: () => Alert.alert('About', 'Legau People Society v1.0.0\n\nA community stokvel for growing wealth together.')
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Member'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.memberBadge}>
          <Ionicons name="star" size={14} color={COLORS.brown} />
          <Text style={styles.memberBadgeText}>Standard Member</Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>6</Text>
          <Text style={styles.statLabel}>Months Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>R15,000</Text>
          <Text style={styles.statLabel}>Total Saved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>R1,200</Text>
          <Text style={styles.statLabel}>Growth Earned</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuCard}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index < menuItems.length - 1 && styles.menuItemBorder
            ]}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon as any} size={22} color={COLORS.skyBlue} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray600} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={styles.version}>Version 1.0.0</Text>
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.white
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 4
  },
  email: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 12
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.brown}15`,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6
  },
  memberBadgeText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.brown
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 4
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.gray600,
    textAlign: 'center'
  },
  menuCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${COLORS.skyBlue}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  menuLabel: {
    fontSize: 15,
    color: COLORS.gray900
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.error
  },
  version: {
    textAlign: 'center',
    color: COLORS.gray600,
    fontSize: 12,
    marginBottom: 32
  }
});
