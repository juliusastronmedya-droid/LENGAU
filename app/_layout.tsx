import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/context/AuthContext';
import { COLORS } from '@/config/api';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.white
          },
          headerTintColor: COLORS.gray900,
          headerTitleStyle: {
            fontWeight: '600'
          },
          contentStyle: {
            backgroundColor: COLORS.gray50
          }
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(auth)/login"
          options={{
            title: 'Sign In',
            presentation: 'modal'
          }}
        />
        <Stack.Screen
          name="(auth)/register"
          options={{
            title: 'Create Account',
            presentation: 'modal'
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="loan-apply"
          options={{
            title: 'Apply for Loan',
            presentation: 'modal'
          }}
        />
        <Stack.Screen
          name="plan-details"
          options={{
            title: 'Plan Details',
            presentation: 'modal'
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
