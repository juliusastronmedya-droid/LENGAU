import { API_CONFIG, BLESTA_CONFIG } from '@/config/api';
import * as SecureStore from 'expo-secure-store';
import { encode as btoa } from 'base-64';

const TOKEN_KEY = 'legau_token';

// ============================================
// MAIN API HELPER
// ============================================

async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = API_CONFIG.baseURL + endpoint;
  const token = await getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ============================================
// AUTH API
// ============================================

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: string;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  plan_id?: number;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  // TODO: Replace with actual API call when backend is ready
  // return apiRequest<LoginResponse>(API_CONFIG.endpoints.login, {
  //   method: 'POST',
  //   body: JSON.stringify({ email, password })
  // });

  // Mock response for development
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    token: 'mock_jwt_token_' + Date.now(),
    user: {
      id: 1,
      name: 'Test User',
      email: email,
      role: 'member'
    }
  };
}

export async function register(data: RegisterData): Promise<LoginResponse> {
  // TODO: Replace with actual API call
  // return apiRequest<LoginResponse>(API_CONFIG.endpoints.register, {
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // });

  // Mock response
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    token: 'mock_jwt_token_' + Date.now(),
    user: {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'member'
    }
  };
}

// ============================================
// DASHBOARD API
// ============================================

export interface DashboardData {
  total_members: number;
  total_revenue: number;
  monthly_growth: number[];
  user_contributions: number[];
  user_stats: {
    total_contributions: number;
    current_growth: number;
    loan_status: string;
    current_plan: string;
  };
  plan_distribution: {
    starter: number;
    standard: number;
    premium: number;
  };
}

export async function getDashboard(): Promise<DashboardData> {
  // TODO: Replace with actual API call
  // return apiRequest<DashboardData>(API_CONFIG.endpoints.dashboard);

  // Mock data
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    total_members: 120,
    total_revenue: 45000,
    monthly_growth: [5000, 7000, 9000, 12000, 15000, 18000],
    user_contributions: [500, 1000, 1500, 2000, 2500, 3000],
    user_stats: {
      total_contributions: 15000,
      current_growth: 1200,
      loan_status: 'No Active Loan',
      current_plan: 'Standard'
    },
    plan_distribution: {
      starter: 30,
      standard: 60,
      premium: 30
    }
  };
}

// ============================================
// PLANS API
// ============================================

export interface Plan {
  id: number;
  name: string;
  amount: number;
  growth_rate: number;
  features: string[];
}

export async function getPlans(): Promise<Plan[]> {
  // TODO: Replace with actual API call
  // return apiRequest<Plan[]>(API_CONFIG.endpoints.plans);

  return [
    {
      id: 1,
      name: 'Starter',
      amount: 500,
      growth_rate: 3,
      features: ['Monthly contributions', '3% growth rate', 'Basic support', 'Mobile access']
    },
    {
      id: 2,
      name: 'Standard',
      amount: 1000,
      growth_rate: 5,
      features: ['Monthly contributions', '5% growth rate', 'Priority support', 'Mobile access', 'Loan eligibility']
    },
    {
      id: 3,
      name: 'Premium',
      amount: 2000,
      growth_rate: 7,
      features: ['Monthly contributions', '7% growth rate', '24/7 support', 'Mobile access', 'Priority loans', 'Investment options']
    }
  ];
}

export async function subscribeToPlan(planId: number): Promise<{ success: boolean; message: string }> {
  // TODO: Replace with actual API call
  // return apiRequest(API_CONFIG.endpoints.subscribe, {
  //   method: 'POST',
  //   body: JSON.stringify({ plan_id: planId })
  // });

  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: 'Successfully subscribed to plan' };
}

// ============================================
// LOANS API
// ============================================

export interface LoanApplication {
  amount: number;
  purpose: string;
  repayment_date: string;
}

export async function applyForLoan(data: LoanApplication): Promise<{ success: boolean; message: string }> {
  // TODO: Replace with actual API call
  // return apiRequest(API_CONFIG.endpoints.loanApply, {
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // });

  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: 'Loan application submitted successfully' };
}

// ============================================
// BLESTA API HELPER
// ============================================

export async function blestaRequest<T>(
  endpoint: string,
  method: string = 'GET',
  data: Record<string, any> | null = null
): Promise<T> {
  const url = `${BLESTA_CONFIG.baseURL}${endpoint}.json`;

  const headers: HeadersInit = {
    'Authorization': 'Basic ' + btoa(`${BLESTA_CONFIG.apiUser}:${BLESTA_CONFIG.apiKey}`),
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const options: RequestInit = { method, headers };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = new URLSearchParams(data as Record<string, string>).toString();
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.errors) throw new Error(JSON.stringify(result.errors));
    return result.response;
  } catch (error) {
    console.error('Blesta API Error:', error);
    throw error;
  }
}

// ============================================
// BLESTA HELPER FUNCTIONS
// ============================================

export async function syncUserToBlesta(user: { id: number; name: string; email: string; phone?: string }) {
  const nameParts = user.name.split(' ');
  const clientData = {
    company_id: String(BLESTA_CONFIG.companyId),
    user_id: String(user.id),
    first_name: nameParts[0] || '',
    last_name: nameParts.slice(1).join(' ') || '',
    email: user.email,
    country: 'ZA',
    phone: user.phone || ''
  };

  return await blestaRequest(
    BLESTA_CONFIG.endpoints.clients.create,
    'POST',
    clientData
  );
}

export async function getBlestaPackages() {
  return await blestaRequest(
    BLESTA_CONFIG.endpoints.packages.getAll,
    'GET',
    { company_id: String(BLESTA_CONFIG.companyId) }
  );
}

export async function subscribeToBlestaPackage(clientId: number, pricingId: number) {
  return await blestaRequest(
    BLESTA_CONFIG.endpoints.services.add,
    'POST',
    { client_id: String(clientId), pricing_id: String(pricingId), status: 'pending' }
  );
}

export async function getClientInvoices(clientId: number, status?: string) {
  const params: Record<string, string> = { client_id: String(clientId) };
  if (status) params.status = status;
  return await blestaRequest(BLESTA_CONFIG.endpoints.invoices.getByClient, 'GET', params);
}

export async function getClientTransactions(clientId: number) {
  return await blestaRequest(
    BLESTA_CONFIG.endpoints.transactions.getByClient,
    'GET',
    { client_id: String(clientId) }
  );
}

export async function getClientServices(clientId: number, status: string = 'active') {
  return await blestaRequest(
    BLESTA_CONFIG.endpoints.services.getByClient,
    'GET',
    { client_id: String(clientId), status }
  );
}

export async function cancelBlestaService(serviceId: number) {
  return await blestaRequest(
    BLESTA_CONFIG.endpoints.services.cancel,
    'POST',
    { service_id: String(serviceId) }
  );
}

export async function recordBlestaPayment(
  clientId: number,
  amount: number,
  currency: string = 'ZAR',
  invoiceId?: number
) {
  const data: Record<string, string> = {
    client_id: String(clientId),
    amount: String(amount),
    currency,
    type: 'other',
    status: 'approved'
  };
  if (invoiceId) data.invoice_id = String(invoiceId);
  return await blestaRequest(BLESTA_CONFIG.endpoints.transactions.create, 'POST', data);
}
