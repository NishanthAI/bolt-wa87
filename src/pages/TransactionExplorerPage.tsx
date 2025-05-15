import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Clock, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';

// Sample transaction data
const transactions = [
  {
    hash: '0xabc123def456789abcdef0123456789abcdef0123456789abcdef0123456789',
    blockNumber: 15485867,
    from: '0x1234567890123456789012345678901234567890',
    to: '0x0987654321098765432109876543210987654321',
    value: '1.25 ETH',
    gasUsed: 21000,
    timestamp: new Date().getTime() - 1000 * 60 * 5, // 5 minutes ago
    status: 'success',
    network: 'Ethereum'
  },
  {
    hash: '0xdef456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
    blockNumber: 15485866,
    from: '0x2345678901234567890123456789012345678901',
    to: '0x1098765432109876543210987654321098765432',
    value: '0.5 ETH',
    gasUsed: 35000,
    timestamp: new Date().getTime() - 1000 * 60 * 10, // 10 minutes ago
    status: 'success',
    network: 'Ethereum'
  },
  {
    hash: '0x789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012345',
    blockNumber: 15485865,
    from: '0x3456789012345678901234567890123456789012',
    to: '0x2109876543210987654321098765432109876543',
    value: '0.1 ETH',
    gasUsed: 240000,
    timestamp: new Date().getTime() - 1000 * 60 * 12, // 12 minutes ago
    status: 'success',
    network: 'Ethereum'
  },
  {
    hash: '0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567',
    blockNumber: 115485864,
    from: '0x4567890123456789012345678901234567890123',
    to: '0x3210987654321098765432109876543210987654',
    value: '2.0 ETH',
    gasUsed: 21000,
    timestamp: new Date().getTime() - 1000 * 60 * 15, // 15 minutes ago
    status: 'success',
    network: 'Ethereum'
  },
  {
    hash: '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd',
    blockNumber: 15485863,
    from: '0x5678901234567890123456789012345678901234',
    to: '0x4321098765432109876543210987654321098765',
    value: '0.05 ETH',
    gasUsed: 150000,
    timestamp: new Date().getTime() - 1000 * 60 * 20, // 20 minutes ago
    status: 'failed',
    network: 'Ethereum'
  },
  {
    hash: '0x56789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012',
    blockNumber: 22485864,
    from: '0x6789012345678901234567890123456789012345',
    to: '0x5432109876543210987654321098765432109876',
    value: '10.0 SOL',
    gasUsed: 5000,
    timestamp: new Date().getTime() - 1000 * 60 * 25, // 25 minutes ago
    status: 'success',
    network: 'Solana'
  },
  {
    hash: '0x3456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0',
    blockNumber: 22485863,
    from: '0x7890123456789012345678901234567890123456',
    to: '0x6543210987654321098765432109876543210987',
    value: '5.5 SOL',
    gasUsed: 4500,
    timestamp: new Date().getTime() - 1000 * 60 * 30, // 30 minutes ago
    status: 'success',
    network: 'Solana'
  },
  {
    hash: '0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcde',
    blockNumber: 7654321,
    from: '0x8901234567890123456789012345678901234567',
    to: '0x7654321098765432109876543210987654321098',
    value: '100 MATIC',
    gasUsed: 21000,
    timestamp: new Date().getTime() - 1000 * 60 * 35, // 35 minutes ago
    status: 'success',
    network: 'Polygon'
  },
  {
    hash: '0xf0123456789abcdef0123456789abcdef0123456789abcdef0123456789abc',
    blockNumber: 7654320,
    from: '0x9012345678901234567890123456789012345678',
    to: '0x8765432109876543210987654321098765432109',
    value: '50 MATIC',
    gasUsed: 35000,
    timestamp: new Date().getTime() - 1000 * 60 * 40, // 40 minutes ago
    status: 'failed',
    network: 'Polygon'
  }
];

// Network filters
const networks = ['All Networks', 'Ethereum', 'Solana', 'Polygon'];

const formatAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} min ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hr ago`;
  } else {
    return date.toLocaleDateString();
  }
};

const TransactionExplorerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('All Networks');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [selectedTx, setSelectedTx] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    document.title = 'Transaction Explorer - BlockchainHub';
  }, []);

  useEffect(() => {
    const filtered = transactions.filter(tx => {
      const matchesNetwork = selectedNetwork === 'All Networks' || tx.network === selectedNetwork;
      const matchesSearch = tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tx.to.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesNetwork && matchesSearch;
    });
    setFilteredTransactions(filtered);
  }, [selectedNetwork, searchQuery]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const toggleTransaction = (hash: string) => {
    if (selectedTx === hash) {
      setSelectedTx(null);
    } else {
      setSelectedTx(hash);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Transaction Explorer</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Monitor and analyze blockchain transactions across multiple networks in real-time.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-grow">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by transaction hash, address..."
                    className="input pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    className="input appearance-none pr-8"
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                  >
                    {networks.map(network => (
                      <option key={network} value={network}>{network}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
                
                <button
                  className="btn btn-primary flex items-center"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw size={16} className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">Latest Transactions</h2>
            </div>
            
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No transactions found matching your criteria.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map(tx => (
                  <div key={tx.hash}>
                    <div
                      className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={() => toggleTransaction(tx.hash)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${tx.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <div className="font-mono text-sm text-gray-500 dark:text-gray-400 truncate">
                              {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 6)}
                            </div>
                          </div>
                          <div className="mt-1 flex items-center text-sm">
                            <span className="text-gray-600 dark:text-gray-400 mr-1">From</span>
                            <span className="font-medium">{formatAddress(tx.from)}</span>
                            <ArrowRight size={14} className="mx-2 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400 mr-1">To</span>
                            <span className="font-medium">{formatAddress(tx.to)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-2 md:mt-0 space-x-4">
                          <div className="text-right">
                            <div className="font-medium">{tx.value}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-end">
                              <Clock size={12} className="mr-1" /> {formatTimestamp(tx.timestamp)}
                            </div>
                          </div>
                          
                          <div className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                            {tx.network}
                          </div>
                          
                          <div>
                            {selectedTx === tx.hash ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Transaction Details */}
                    {selectedTx === tx.hash && (
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="mb-4">
                              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                                Transaction Hash
                              </h3>
                              <div className="flex items-center">
                                <span className="font-mono text-sm truncate">{tx.hash}</span>
                                <button className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" title="Copy to clipboard">
                                  <Copy size={14} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                                Block
                              </h3>
                              <div className="text-sm">
                                {tx.blockNumber.toLocaleString()}
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                                From
                              </h3>
                              <div className="flex items-center">
                                <span className="font-mono text-sm truncate">{tx.from}</span>
                                <button className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" title="Copy to clipboard">
                                  <Copy size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="mb-4">
                              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                                Status
                              </h3>
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                tx.status === 'success' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              }`}>
                                {tx.status === 'success' ? 'Success' : 'Failed'}
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                                Timestamp
                              </h3>
                              <div className="text-sm">
                                {new Date(tx.timestamp).toLocaleString()}
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                                To
                              </h3>
                              <div className="flex items-center">
                                <span className="font-mono text-sm truncate">{tx.to}</span>
                                <button className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" title="Copy to clipboard">
                                  <Copy size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-right">
                          <a
                            href="#"
                            className="btn btn-secondary inline-flex items-center text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View on {tx.network} Explorer <ExternalLink size={14} className="ml-1" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Network Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Ethereum</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Current Gas Price</div>
                  <div className="text-2xl font-bold">45 Gwei</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Latest Block</div>
                  <div className="text-2xl font-bold">15,485,867</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Transactions (24h)</div>
                  <div className="text-2xl font-bold">1.2M</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Solana</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Transaction Fee</div>
                  <div className="text-2xl font-bold">0.000005 SOL</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Latest Slot</div>
                  <div className="text-2xl font-bold">22,485,864</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Transactions (24h)</div>
                  <div className="text-2xl font-bold">25.7M</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Polygon</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Current Gas Price</div>
                  <div className="text-2xl font-bold">80 Gwei</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Latest Block</div>
                  <div className="text-2xl font-bold">7,654,321</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Transactions (24h)</div>
                  <div className="text-2xl font-bold">3.5M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TransactionExplorerPage;