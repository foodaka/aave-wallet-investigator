'use client';

import { useState, useMemo } from 'react';
import { 
  useUserTransactionHistory, 
  useAaveChains, 
  useAaveMarkets,
  type EvmAddress 
} from '@aave/react';
import { isAddress } from 'viem';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Search, ExternalLink, TrendingUp, TrendingDown, RefreshCw, Play } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { normalizeTransaction, getTransactionTypeColor } from '@/lib/formatters';
import { NormalizedTransaction } from '@/lib/types';


export default function WalletInvestigator() {
  const [walletAddress, setWalletAddress] = useState('');

  const isValidAddress = isAddress(walletAddress);
  
  // Get all supported Aave chains
  const { data: chains } = useAaveChains({});

  console.log('Chains:', chains);
  
  // Get mainnet chains
  const mainnetChains = useMemo(() => {
    if (!chains) return [];
    
    // Filter for mainnet chains only (exclude testnets)
    return chains.filter(chain => !chain.isTestnet);
  }, [chains]);

  // Get all chain IDs for fetching markets
  const mainnetChainIds = useMemo(() => {
    return mainnetChains.map(chain => chain.chainId);
  }, [mainnetChains]);

  // Fetch all markets for all mainnet chains
  const { data: allMarkets, loading: marketsLoading } = useAaveMarkets({
    chainIds: mainnetChainIds,
  });

  // Create hooks for each market to fetch transaction history, supplies, and borrows
  // Note: We need to create individual hooks for each known major chain due to React's rules of hooks
  
  
  // Helper to get market address for a chain from fetched markets
  const getMarketForChain = (chainId: number): string => {
    if (!allMarkets) return '';
    const market = allMarkets.find(m => m.chain.chainId === chainId);
    return market?.address || '';
  };

  // Transaction history hooks for each supported chain
  const ethTxs = useUserTransactionHistory({
    market: getMarketForChain(1) as EvmAddress,
    user: isValidAddress ? (walletAddress as EvmAddress) : ('' as EvmAddress),
    chainId: 1,
  });

  const polygonTxs = useUserTransactionHistory({
    market: getMarketForChain(137) as EvmAddress,
    user: isValidAddress ? (walletAddress as EvmAddress) : ('' as EvmAddress),
    chainId: 137,
  });

  const arbitrumTxs = useUserTransactionHistory({
    market: getMarketForChain(42161) as EvmAddress,
    user: isValidAddress ? (walletAddress as EvmAddress) : ('' as EvmAddress),
    chainId: 42161,
  });

  const optimismTxs = useUserTransactionHistory({
    market: getMarketForChain(10) as EvmAddress,
    user: isValidAddress ? (walletAddress as EvmAddress) : ('' as EvmAddress),
    chainId: 10,
  });

  const avalancheTxs = useUserTransactionHistory({
    market: getMarketForChain(43114) as EvmAddress,
    user: isValidAddress ? (walletAddress as EvmAddress) : ('' as EvmAddress),
    chainId: 43114,
  });

  const baseTxs = useUserTransactionHistory({
    market: getMarketForChain(8453) as EvmAddress,
    user: isValidAddress ? (walletAddress as EvmAddress) : ('' as EvmAddress),
    chainId: 8453,
  });

  const bscTxs = useUserTransactionHistory({
    market: getMarketForChain(56) as EvmAddress,
    user: isValidAddress ? (walletAddress as EvmAddress) : ('' as EvmAddress),
    chainId: 56,
  });



  // Aggregate data and loading states from all mainnet chains
  const allData = [
    ...(ethTxs.data?.items || []),
    ...(polygonTxs.data?.items || []),
    ...(arbitrumTxs.data?.items || []),
    ...(optimismTxs.data?.items || []),
    ...(avalancheTxs.data?.items || []),
    ...(baseTxs.data?.items || []),
    ...(bscTxs.data?.items || []),
  ];
  
  const loading = marketsLoading || ethTxs.loading || polygonTxs.loading || arbitrumTxs.loading || 
                  optimismTxs.loading || avalancheTxs.loading || baseTxs.loading || bscTxs.loading;
  const error = ethTxs.error; // Focus on main chain error for now

  const handleSearch = () => {
    if (!walletAddress.trim() || !isValidAddress) return;
    // Search will automatically trigger when wallet address changes
  };

  const handleDemo = () => {
    // Use a well-known Aave wallet for demo
    setWalletAddress('0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922');
  };

  // Debug: Let's see what the actual data structure is
  console.log('Aave chains:', chains);
  console.log('Mainnet chains:', mainnetChains);
  console.log('All markets:', allMarkets);
  console.log('Chain transaction data:', {
    ethereum: ethTxs.data,
    polygon: polygonTxs.data,
    arbitrum: arbitrumTxs.data,
    optimism: optimismTxs.data,
    avalanche: avalancheTxs.data,
    base: baseTxs.data,
    bsc: bscTxs.data,
  });
  console.log('All aggregated transaction data:', allData);

  const normalizedTransactions: NormalizedTransaction[] = 
    (isValidAddress && allData.length > 0) 
      ? allData
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // Sort raw transactions by latest first
          .map((tx: any, index: number) => normalizeTransaction(tx, index))
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Aave Wallet Investigator
              </h1>
              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 font-medium px-2 py-1 text-xs">
                BETA
              </Badge>
            </div>
        </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Explore Aave transaction history across all chains and markets
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8 shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Wallet Address
              </CardTitle>
              <CardDescription>
                Enter an Ethereum wallet address to view its Aave transaction history across all supported mainnet chains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className={`text-sm font-mono ${
                      walletAddress && !isValidAddress 
                        ? 'border-red-300 focus-visible:ring-red-500' 
                        : ''
                    }`}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  {walletAddress && !isValidAddress && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      Please enter a valid Ethereum address
                    </p>
                  )}
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={!walletAddress.trim() || !isValidAddress || loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  Fetch
                </Button>
                <Button 
                  onClick={handleDemo}
                  variant="outline"
                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Try Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && isValidAddress && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <div className="flex items-center gap-3">
                <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                <span className="text-lg text-slate-600 dark:text-slate-400">
                  Fetching transaction history across all mainnet chains...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && !loading && isValidAddress && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Alert className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
                <AlertDescription className="text-red-800 dark:text-red-200">
                  Error fetching transaction history: {String(error) || 'Unknown error'}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {normalizedTransactions.length > 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
            >
              {/* Desktop Table View */}
              <Card className="hidden lg:block shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Transaction History ({normalizedTransactions.length})
                  </CardTitle>
                  <CardDescription>
                    Aave protocol interactions for {walletAddress} across all mainnet chains
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Token</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Market</TableHead>
                        <TableHead>Chain</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Tx</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {normalizedTransactions.map((tx, index) => (
                        <motion.tr
                          key={tx.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <TableCell>
                            <Badge className={getTransactionTypeColor(tx.type)}>
                              {tx.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <img 
                                src={tx.tokenImageUrl} 
                                alt={tx.tokenSymbol}
                                className="w-6 h-6 rounded-full"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder-token.png';
                                }}
                              />
                              <span className="font-semibold">{tx.tokenSymbol}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {tx.type === 'Collateral' ? (
                              <Badge variant={tx.enabled ? 'default' : 'secondary'}>
                                {tx.enabled ? 'Enabled' : 'Disabled'}
                              </Badge>
                            ) : (
                              <div>
                                <div className="font-semibold">{tx.usdAmount}</div>
                                <div className="text-sm text-slate-500">{tx.amount} {tx.tokenSymbol}</div>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <img 
                                src={tx.marketIcon} 
                                alt={tx.marketName}
                                className="w-5 h-5 rounded-full"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder-market.png';
                                }}
                              />
                              <span className="text-sm">{tx.marketName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <img 
                                src={tx.chainIcon} 
                                alt={tx.chainName}
                                className="w-5 h-5 rounded-full"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder-chain.png';
                                }}
                              />
                              <span className="text-sm">{tx.chainName}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                            {tx.timestamp}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                            >
                              <a
                                href={tx.blockExplorerUrl}
          target="_blank"
          rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {normalizedTransactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <Badge className={getTransactionTypeColor(tx.type)}>
                            {tx.type}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <a
                              href={tx.blockExplorerUrl}
          target="_blank"
          rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <img 
                            src={tx.tokenImageUrl} 
                            alt={tx.tokenSymbol}
                            className="w-8 h-8 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-token.png';
                            }}
                          />
                          <div>
                            <div className="font-semibold">{tx.tokenSymbol}</div>
                            {tx.type !== 'Collateral' && (
                              <div className="text-sm text-slate-500">{tx.amount} {tx.tokenSymbol}</div>
                            )}
                          </div>
                        </div>

                        {tx.type === 'Collateral' ? (
                          <div className="mb-3">
                            <Badge variant={tx.enabled ? 'default' : 'secondary'}>
                              {tx.enabled ? 'Enabled' : 'Disabled'}
                            </Badge>
                          </div>
                        ) : (
                          <div className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">
                            {tx.usdAmount}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <img 
                              src={tx.chainIcon} 
                              alt={tx.chainName}
                              className="w-4 h-4 rounded-full"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-chain.png';
                              }}
                            />
                            <span>{tx.chainName}</span>
                          </div>
                          <span>{tx.timestamp}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        <AnimatePresence>
          {isValidAddress && normalizedTransactions.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <TrendingDown className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                No transactions found
              </h3>
              <p className="text-slate-500 dark:text-slate-500">
                This wallet has no Aave transaction history or the address might be invalid.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}