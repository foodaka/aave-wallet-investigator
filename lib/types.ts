// Base token information
export interface TokenInfo {
  address: string;
  chainId?: number;
  name: string;
  imageUrl: string;
  symbol: string;
  decimals: number;
}

// Amount information
export interface AmountInfo {
  raw?: string;
  value: string;
  decimals?: number;
}

export interface USDAmountInfo {
  amount: AmountInfo;
  usd: string;
  usdPerToken?: string;
}

// Chain information
export interface ChainInfo {
  name: string;
  icon: string;
  chainId: number;
  explorerUrl: string;
  isTestnet: boolean;
  nativeWrappedToken?: string;
}

// Market information
export interface MarketInfo {
  name: string;
  chain?: ChainInfo;
  address: string;
  icon: string;
}

// Reserve information
export interface ReserveInfo {
  market: MarketInfo;
  underlyingToken: TokenInfo;
  aToken: TokenInfo;
  vToken?: TokenInfo;
  usdExchangeRate?: string;
  permitSupported?: boolean;
}

// Base transaction interface
export interface BaseTransaction {
  blockExplorerUrl: string;
  txHash: string;
  timestamp: string;
}

// Supply transaction
export interface UserSupplyTransaction extends BaseTransaction {
  amount: USDAmountInfo;
  reserve: ReserveInfo;
}

// Withdraw transaction
export interface UserWithdrawTransaction extends BaseTransaction {
  amount: USDAmountInfo;
  reserve: ReserveInfo;
}

// Borrow transaction
export interface UserBorrowTransaction extends BaseTransaction {
  amount: USDAmountInfo;
  reserve: ReserveInfo;
}

// Repay transaction
export interface UserRepayTransaction extends BaseTransaction {
  amount: USDAmountInfo;
  reserve: ReserveInfo;
}

// Collateral transaction
export interface UserUsageAsCollateralTransaction extends BaseTransaction {
  enabled: boolean;
  reserve: ReserveInfo;
}

// Liquidation transaction
export interface LiquidationAmount {
  reserve: ReserveInfo;
  amount: USDAmountInfo;
}

export interface UserLiquidationCallTransaction extends BaseTransaction {
  collateral: LiquidationAmount;
  debtRepaid: LiquidationAmount;
}

// Union type for all transaction types
export type UserTransaction = 
  | UserSupplyTransaction
  | UserWithdrawTransaction
  | UserBorrowTransaction
  | UserRepayTransaction
  | UserUsageAsCollateralTransaction
  | UserLiquidationCallTransaction;

// GraphQL query request
export interface UserTransactionHistoryRequest {
  user: string;
}

// GraphQL response
export interface UserTransactionHistoryResponse {
  userTransactionHistory: {
    items: UserTransaction[];
  };
}

// Normalized transaction for display
export interface NormalizedTransaction {
  id: string;
  type: 'Supply' | 'Withdraw' | 'Borrow' | 'Repay' | 'Collateral' | 'Liquidation';
  tokenSymbol: string;
  tokenImageUrl: string;
  amount?: string;
  usdAmount?: string;
  marketName: string;
  marketIcon: string;
  chainName: string;
  chainIcon: string;
  timestamp: string;
  txHash: string;
  blockExplorerUrl: string;
  enabled?: boolean; // For collateral transactions
}

// Query variables
export interface QueryVariables {
  request: UserTransactionHistoryRequest;
}
