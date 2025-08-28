import { format } from 'date-fns';
import { UserTransaction, NormalizedTransaction } from './types';

/**
 * Formats a number with commas for thousands separators
 */
export function formatNumber(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  }).format(num);
}

/**
 * Formats a USD amount with $ symbol
 */
export function formatUSD(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '$0';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Formats a timestamp to human-readable date
 */
export function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return format(date, 'MMM dd, yyyy HH:mm \'UTC\'');
  } catch (error) {
    return 'Invalid date';
  }
}

/**
 * Gets transaction type based on the transaction data structure
 */
function getTransactionType(transaction: UserTransaction): NormalizedTransaction['type'] {
  if ('amount' in transaction && 'reserve' in transaction) {
    // Check if it's a supply transaction (has aToken in reserve)
    if ('aToken' in transaction.reserve && transaction.reserve.aToken) {
      // Check the structure to differentiate between supply/withdraw/borrow/repay
      if ('usdPerToken' in transaction.amount && transaction.amount.amount?.raw) {
        return 'Withdraw'; // Withdraw transactions typically have raw amount and usdPerToken
      }
      return 'Supply'; // Supply transactions have simpler amount structure
    }
    return 'Borrow'; // Fallback for borrow/repay
  }
  
  if ('enabled' in transaction) {
    return 'Collateral';
  }
  
  if ('collateral' in transaction && 'debtRepaid' in transaction) {
    return 'Liquidation';
  }
  
  return 'Supply'; // Default fallback
}

/**
 * Determines transaction type based on GraphQL __typename field
 */
function determineTransactionType(transaction: any): NormalizedTransaction['type'] {
  // Use GraphQL __typename field for accurate type detection
  if (transaction.__typename) {
    switch (transaction.__typename) {
      case 'UserSupplyTransaction':
        return 'Supply';
      case 'UserWithdrawTransaction':
        return 'Withdraw';
      case 'UserBorrowTransaction':
        return 'Borrow';
      case 'UserRepayTransaction':
        return 'Repay';
      case 'UserUsageAsCollateralTransaction':
        return 'Collateral';
      case 'UserLiquidationCallTransaction':
        return 'Liquidation';
      default:
        console.warn('Unknown transaction type:', transaction.__typename);
        break;
    }
  }

  // Fallback to old logic if __typename is not available
  // Check for liquidation first (most specific)
  if ('collateral' in transaction && 'debtRepaid' in transaction) {
    return 'Liquidation';
  }
  
  // Check for collateral transaction
  if ('enabled' in transaction) {
    return 'Collateral';
  }
  
  // For amount-based transactions, use more specific detection
  if ('amount' in transaction) {
    const hasRawAmount = transaction.amount.amount?.raw;
    const hasUsdPerToken = 'usdPerToken' in transaction.amount;
    
    // Transactions with raw amounts and usdPerToken are typically withdrawals
    if (hasRawAmount && hasUsdPerToken) {
      return 'Withdraw';
    }
    
    // Check if this looks like a borrow transaction (has vToken)
    if ('reserve' in transaction && transaction.reserve.vToken) {
      return hasRawAmount ? 'Repay' : 'Borrow';
    }
    
    // Default to supply for simple amount transactions
    return 'Supply';
  }
  
  return 'Supply'; // Fallback
}

/**
 * Normalizes a transaction for consistent display
 */
export function normalizeTransaction(transaction: any, index: number): NormalizedTransaction {
  const type = determineTransactionType(transaction);
  
  // Debug log to verify transaction type detection
  if (transaction.__typename) {
    console.log(`Transaction ${index}: ${transaction.__typename} -> ${type}`);
  }
  
  const baseData = {
    id: `${transaction.txHash}-${index}`,
    type,
    timestamp: formatTimestamp(transaction.timestamp),
    txHash: transaction.txHash,
    blockExplorerUrl: transaction.blockExplorerUrl,
  };

  if (type === 'Collateral') {
    const collateralTx = transaction as any;
    return {
      ...baseData,
      tokenSymbol: collateralTx.reserve.underlyingToken.symbol,
      tokenImageUrl: collateralTx.reserve.underlyingToken.imageUrl,
      marketName: collateralTx.reserve.market.name,
      marketIcon: collateralTx.reserve.market.icon,
      chainName: collateralTx.reserve.market.chain?.name || 'Unknown',
      chainIcon: collateralTx.reserve.market.chain?.icon || '',
      enabled: collateralTx.enabled,
    };
  }

  if (type === 'Liquidation') {
    const liquidationTx = transaction as any;
    return {
      ...baseData,
      tokenSymbol: liquidationTx.collateral.reserve.underlyingToken.symbol,
      tokenImageUrl: liquidationTx.collateral.reserve.underlyingToken.imageUrl,
      amount: formatNumber(liquidationTx.collateral.amount.amount.value),
      usdAmount: formatUSD(liquidationTx.collateral.amount.usd),
      marketName: liquidationTx.collateral.reserve.market.name,
      marketIcon: liquidationTx.collateral.reserve.market.icon,
      chainName: liquidationTx.collateral.reserve.market.chain?.name || 'Unknown',
      chainIcon: liquidationTx.collateral.reserve.market.chain?.icon || '',
    };
  }

  // For all other transaction types (Supply, Withdraw, Borrow, Repay)
  const amountTx = transaction as any;
  return {
    ...baseData,
    tokenSymbol: amountTx.reserve.underlyingToken.symbol,
    tokenImageUrl: amountTx.reserve.underlyingToken.imageUrl,
    amount: formatNumber(amountTx.amount.amount.value),
    usdAmount: formatUSD(amountTx.amount.usd),
    marketName: amountTx.reserve.market.name,
    marketIcon: amountTx.reserve.market.icon,
    chainName: amountTx.reserve.market.chain?.name || 'Unknown',
    chainIcon: amountTx.reserve.market.chain?.icon || '',
  };
}

/**
 * Gets color scheme for transaction type badges
 */
export function getTransactionTypeColor(type: NormalizedTransaction['type']): string {
  switch (type) {
    case 'Supply':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Withdraw':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'Borrow':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'Repay':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'Collateral':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Liquidation':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
}
