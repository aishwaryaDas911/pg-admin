// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  version?: number;
  isActive?: boolean;
}

// Bank entity
export interface Bank extends BaseEntity {
  bankName: string;
  bankCode: string;
  settlementRoutingNumber: string;
  settlementAccountNumber: string;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  primaryContactName: string;
  contactMobileNumber?: string;
  contactPhoneNumber: string;
  extension?: string;
  fax?: string;
  emailAddress: string;
  localCurrency: string;
}

// Merchant entity
export interface Merchant extends BaseEntity {
  merchantName: string;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  fax?: string;
  emailId: string;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  applicationMode: string;
  businessUrl: string;
  lookingFor?: string;
  businessType?: string;
  userName: string;
  dccEnable: boolean;
  dccSupportedCurrency: string[];
  bankName: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
  bankType: string;
  bankAddress1: string;
  bankAddress2?: string;
  bankCity: string;
  bankCountry: string;
  bankState: string;
  bankZipCode?: string;
  nameOnAccount: string;
  currency: string;
  iso?: string;
  merchantType: string;
  category: string;
  autoTransferLimit?: string;
  autoPaymentMethod: string;
  autoTransferPeriod?: string;
  bank: string;
  mccName: string;
  feeProgram: string;
  routingProfileName: string;
  localCurrency: string;
  virtualTerminalOptions: {
    sale: boolean;
    refund: boolean;
    preAuth: boolean;
    void: boolean;
  };
  online: boolean;
}

// Sub-Merchant entity
export interface SubMerchant extends BaseEntity {
  companyName: string;
  subMerchantCode: string;
  firstName: string;
  lastName: string;
  phone: string;
  fax?: string;
  emailId: string;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  lookingFor?: string;
  businessType?: string;
  merchantCode: string;
  businessUrl: string;
  userName: string;
  bankName: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
  bankType: string;
  bankAddress1: string;
  bankAddress2?: string;
  bankCity: string;
  bankCountry: string;
  bankState: string;
  bankZipCode?: string;
  nameOnAccount: string;
  currency: string;
  category: string;
  autoTransferLimit?: string;
  autoPaymentMethod: string;
  autoTransferPeriod?: string;
  virtualTerminalOptions: {
    sale: boolean;
    refund: boolean;
    preAuth: boolean;
    void: boolean;
  };
  online: boolean;
}

// Merchant Group entity
export interface MerchantGroup extends BaseEntity {
  merchantGroupName: string;
  corporateLegalName: string;
  address1: string;
  address2: string;
  address3?: string;
  pinCode: string;
  country: string;
  state: string;
  city: string;
  contactName: string;
  contactPhone: string;
  contactEmailId: string;
  routingProfileName: string;
  paymentType: string;
  bankName: string;
  branchName: string;
  nameOnAccount: string;
  accountType: string;
  accountNumber: string;
  bankCode: string;
  bankState: string;
  bankCity: string;
}

// ISO entity
export interface ISO extends BaseEntity {
  programManager: string;
  isoName: string;
  businessEntityName: string;
  contactPerson: string;
  currency: string;
  processor: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  extension?: string;
  emailId: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankRoutingNumber?: string;
  isoLogo?: File | string;
  panRanges: Array<{
    id: string;
    panLow: string;
    panHigh: string;
  }>;
}

// Program Manager entity
export interface ProgramManager extends BaseEntity {
  programManagerName: string;
  companyName: string;
  businessEntityName: string;
  contactPerson: string;
  phoneNumber: string;
  extension?: string;
  emailId: string;
  currency: string;
  country: string;
  state: string;
  programManagerTimeZone: string;
  batchPrefix: string;
  schedulerRunTime: string;
  associatedBankNames: string[];
  programManagerLogo?: File | string;
}

// Fee Program entity
export interface FeeProgram extends BaseEntity {
  feeProgramName: string;
  programManagerName: string;
  isoName: string;
  mcc: string;
  feeType: string;
  configurations: Array<{
    id: string;
    scheme: string;
    txnType: string;
    txnVolume: string;
    pmShare: string;
    mspShare: string;
    slabRanges: Array<{
      id: string;
      slabFrom: string;
      slabTo: string;
      totalFee: string;
    }>;
  }>;
}

// Acquirer Protocol entity
export interface AcquirerProtocol extends BaseEntity {
  acquirerProtocolParamName: string;
  acquirerId: string;
  applicationId: string;
  financialAuthorization: string;
  financialReversalAdvice: string;
  cancellationRequest: string;
  cancellationAdvice: string;
  completionAdvice: string;
  diagnosticRequest: string;
  financialCompletionAdvice: string;
  reversalAdvice: string;
  reconciliationRequest: string;
  timeoutCompletionAdvice: string;
  schedulerStartup: string;
  keepAlive: string;
  startTime: string;
  timeInterval: string;
  currencyConversionRequest: string;
  financialCapture: string;
  exchangePolicy: string;
  maximumNumber: string;
  maximumAmount: string;
  retryDelay: string;
  retryMaximumNumber: string;
  period: string;
}

// Union type for all entities
export type Entity = Bank | Merchant | SubMerchant | MerchantGroup | ISO | ProgramManager | FeeProgram | AcquirerProtocol;

// Create/Update types (omit computed fields)
export type CreateBank = Omit<Bank, keyof BaseEntity>;
export type UpdateBank = Partial<CreateBank>;

export type CreateMerchant = Omit<Merchant, keyof BaseEntity>;
export type UpdateMerchant = Partial<CreateMerchant>;

export type CreateSubMerchant = Omit<SubMerchant, keyof BaseEntity>;
export type UpdateSubMerchant = Partial<CreateSubMerchant>;

export type CreateMerchantGroup = Omit<MerchantGroup, keyof BaseEntity>;
export type UpdateMerchantGroup = Partial<CreateMerchantGroup>;

export type CreateISO = Omit<ISO, keyof BaseEntity>;
export type UpdateISO = Partial<CreateISO>;

export type CreateProgramManager = Omit<ProgramManager, keyof BaseEntity>;
export type UpdateProgramManager = Partial<CreateProgramManager>;

export type CreateFeeProgram = Omit<FeeProgram, keyof BaseEntity>;
export type UpdateFeeProgram = Partial<CreateFeeProgram>;

export type CreateAcquirerProtocol = Omit<AcquirerProtocol, keyof BaseEntity>;
export type UpdateAcquirerProtocol = Partial<CreateAcquirerProtocol>;
