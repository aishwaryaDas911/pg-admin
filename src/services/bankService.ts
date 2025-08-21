import { bankMockData } from '@/components/admin/Manage/Bank/bankFormConfig';

export interface BankSearchFilters {
  bankName?: string;
  bankCode?: string;
  emailAddress?: string;
  status?: string;
  recordsPerPage?: string;
}

export interface Bank {
  id: number;
  bankName: string;
  bankCode: string;
  emailAddress: string;
  status: string;
  settlementRoutingNumber: string;
  settlementAccountNumber: string;
  address1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  primaryContactName: string;
  contactPhoneNumber: string;
  localCurrency: string;
}

class BankService {
  async searchBanks(filters: BankSearchFilters): Promise<Bank[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredData = [...bankMockData];

    // Apply filters
    if (filters.bankName) {
      filteredData = filteredData.filter(bank =>
        bank.bankName.toLowerCase().includes(filters.bankName!.toLowerCase())
      );
    }

    if (filters.bankCode) {
      filteredData = filteredData.filter(bank =>
        bank.bankCode.toLowerCase().includes(filters.bankCode!.toLowerCase())
      );
    }

    if (filters.emailAddress) {
      filteredData = filteredData.filter(bank =>
        bank.emailAddress.toLowerCase().includes(filters.emailAddress!.toLowerCase())
      );
    }

    if (filters.status) {
      filteredData = filteredData.filter(bank =>
        bank.status === filters.status
      );
    }

    // Apply records per page limit
    const recordsPerPage = parseInt(filters.recordsPerPage || '10');
    return filteredData.slice(0, recordsPerPage);
  }

  async createBank(bankData: Partial<Bank>): Promise<Bank> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBank: Bank = {
      id: Math.max(...bankMockData.map(b => b.id)) + 1,
      bankName: bankData.bankName || '',
      bankCode: bankData.bankCode || '',
      emailAddress: bankData.emailAddress || '',
      status: bankData.status || 'pending',
      settlementRoutingNumber: bankData.settlementRoutingNumber || '',
      settlementAccountNumber: bankData.settlementAccountNumber || '',
      address1: bankData.address1 || '',
      city: bankData.city || '',
      state: bankData.state || '',
      zipCode: bankData.zipCode || '',
      country: bankData.country || '',
      primaryContactName: bankData.primaryContactName || '',
      contactPhoneNumber: bankData.contactPhoneNumber || '',
      localCurrency: bankData.localCurrency || 'USD',
    };

    return newBank;
  }

  async updateBank(id: number, bankData: Partial<Bank>): Promise<Bank> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingBank = bankMockData.find(b => b.id === id);
    if (!existingBank) {
      throw new Error('Bank not found');
    }

    return { ...existingBank, ...bankData };
  }

  async deleteBank(id: number): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = bankMockData.findIndex(b => b.id === id);
    if (index === -1) {
      throw new Error('Bank not found');
    }
  }

  async getBankById(id: number): Promise<Bank | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return bankMockData.find(b => b.id === id) || null;
  }
}

export const bankService = new BankService();