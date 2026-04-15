// ============================================
// API CONFIGURATION
// Update these URLs when connecting to your backend
// ============================================

export const API_CONFIG = {
  baseURL: '', // TODO: Set your API base URL (e.g., 'https://api.legaupeople.co.za')
  endpoints: {
    // Auth
    register: '/api/register',
    login: '/api/login',
    user: '/api/user',
    
    // Plans
    plans: '/api/plans',
    subscribe: '/api/subscribe',
    
    // Contributions
    contributions: '/api/contributions',
    pay: '/api/pay',
    
    // Dashboard
    dashboard: '/api/dashboard',
    
    // Loans
    loanApply: '/api/loan/apply',
    loanStatus: '/api/loan/status'
  }
};

// ============================================
// BLESTA API CONFIGURATION
// Billing & Subscription Management Integration
// ============================================
export const BLESTA_CONFIG = {
  baseURL: '', // TODO: Set Blesta API URL (e.g., 'https://billing.legaupeople.co.za/api')
  apiUser: '', // TODO: Set Blesta API username
  apiKey: '',  // TODO: Set Blesta API key
  companyId: 1,
  
  endpoints: {
    // Clients
    clients: {
      getAll: '/clients/getall',
      get: '/clients/get',
      create: '/clients/create',
      edit: '/clients/edit',
      delete: '/clients/delete'
    },
    // Packages (Plans)
    packages: {
      getAll: '/packages/getall',
      get: '/packages/get'
    },
    // Services (Subscriptions)
    services: {
      getAll: '/services/getall',
      get: '/services/get',
      add: '/services/add',
      cancel: '/services/cancel',
      suspend: '/services/suspend',
      unsuspend: '/services/unsuspend',
      getByClient: '/services/getbyclient'
    },
    // Invoices
    invoices: {
      getAll: '/invoices/getall',
      get: '/invoices/get',
      create: '/invoices/create',
      getByClient: '/invoices/getbyclient'
    },
    // Transactions (Payments)
    transactions: {
      getAll: '/transactions/getall',
      get: '/transactions/get',
      create: '/transactions/create',
      getByClient: '/transactions/getbyclient'
    },
    // Payment Gateways
    gateways: {
      getAll: '/gateways/getall',
      getMerchant: '/gateways/getmerchant'
    }
  },
  
  webhookEvents: [
    'Clients.create',
    'Services.add',
    'Services.cancel',
    'Services.suspend',
    'Services.unsuspend',
    'Invoices.closed',
    'Transactions.add'
  ]
};

// Color theme matching website
export const COLORS = {
  white: '#ffffff',
  skyBlue: '#0ea5e9',
  skyBlueLight: '#38bdf8',
  brown: '#92400e',
  brownLight: '#b45309',
  gray50: '#f8fafc',
  gray100: '#f1f5f9',
  gray200: '#e2e8f0',
  gray600: '#475569',
  gray800: '#1e293b',
  gray900: '#0f172a',
  success: '#22c55e',
  warning: '#f97316',
  error: '#ef4444'
};
