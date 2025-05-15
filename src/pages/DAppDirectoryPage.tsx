import React, { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink, Star, Users, ArrowUpDown } from 'lucide-react';

// Categories for filtering
const categories = ['All', 'Finance', 'Gaming', 'Social', 'Marketplace', 'Utility', 'Governance'];

// Blockchain platforms for filtering
const platforms = ['All', 'Ethereum', 'Solana', 'Polkadot', 'Avalanche', 'Polygon', 'Cardano'];

// Ordering options
const sortOptions = [
  { id: 'popular', label: 'Most Popular', icon: <Star size={16} /> },
  { id: 'users', label: 'Active Users', icon: <Users size={16} /> },
  { id: 'newest', label: 'Newest First', icon: <ArrowUpDown size={16} /> }
];

// Sample DApp data
const dapps = [
  {
    id: 1,
    name: 'UniSwap',
    description: 'A decentralized exchange protocol that facilitates automated trading of decentralized finance tokens.',
    category: 'Finance',
    platform: 'Ethereum',
    url: 'https://uniswap.org',
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 120000,
    rating: 4.8,
    createdAt: '2018-11-02'
  },
  {
    id: 2,
    name: 'Axie Infinity',
    description: 'A blockchain-based game where players collect, breed, and battle fantasy creatures called Axies.',
    category: 'Gaming',
    platform: 'Ethereum',
    url: 'https://axieinfinity.com',
    image: 'https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 300000,
    rating: 4.5,
    createdAt: '2018-03-15'
  },
  {
    id: 3,
    name: 'Audius',
    description: 'A decentralized music streaming platform that connects artists directly with fans.',
    category: 'Social',
    platform: 'Solana',
    url: 'https://audius.co',
    image: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 75000,
    rating: 4.3,
    createdAt: '2020-09-24'
  },
  {
    id: 4,
    name: 'OpenSea',
    description: 'A decentralized marketplace for buying, selling, and discovering rare digital items and collectibles.',
    category: 'Marketplace',
    platform: 'Ethereum',
    url: 'https://opensea.io',
    image: 'https://images.pexels.com/photos/4201358/pexels-photo-4201358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 250000,
    rating: 4.6,
    createdAt: '2017-12-20'
  },
  {
    id: 5,
    name: 'Aave',
    description: 'A decentralized lending protocol where users can lend and borrow cryptocurrency without going through a centralized intermediary.',
    category: 'Finance',
    platform: 'Ethereum',
    url: 'https://aave.com',
    image: 'https://images.pexels.com/photos/6770609/pexels-photo-6770609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 85000,
    rating: 4.7,
    createdAt: '2020-01-08'
  },
  {
    id: 6,
    name: 'Rarible',
    description: 'A community-owned NFT marketplace where users can create, sell, or collect digital items secured on blockchain.',
    category: 'Marketplace',
    platform: 'Ethereum',
    url: 'https://rarible.com',
    image: 'https://images.pexels.com/photos/11105678/pexels-photo-11105678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 65000,
    rating: 4.2,
    createdAt: '2020-01-30'
  },
  {
    id: 7,
    name: 'Star Atlas',
    description: 'A grand strategy game of space exploration, territorial conquest, and political domination set in the year 2620.',
    category: 'Gaming',
    platform: 'Solana',
    url: 'https://staratlas.com',
    image: 'https://images.pexels.com/photos/6758691/pexels-photo-6758691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 45000,
    rating: 4.1,
    createdAt: '2021-09-14'
  },
  {
    id: 8,
    name: 'Compound',
    description: 'An algorithmic, autonomous interest rate protocol built for developers, to unlock a universe of open financial applications.',
    category: 'Finance',
    platform: 'Ethereum',
    url: 'https://compound.finance',
    image: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 70000,
    rating: 4.4,
    createdAt: '2018-09-27'
  },
  {
    id: 9,
    name: 'Decentraland',
    description: 'A virtual reality platform powered by the Ethereum blockchain that allows users to create, experience, and monetize content and applications.',
    category: 'Social',
    platform: 'Ethereum',
    url: 'https://decentraland.org',
    image: 'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 95000,
    rating: 4.0,
    createdAt: '2020-02-20'
  },
  {
    id: 10,
    name: 'Brave Browser',
    description: 'A privacy-focused browser that blocks ads and trackers, and rewards users with Basic Attention Token (BAT) for viewing opt-in ads.',
    category: 'Utility',
    platform: 'Ethereum',
    url: 'https://brave.com',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 500000,
    rating: 4.5,
    createdAt: '2017-05-30'
  },
  {
    id: 11,
    name: 'Snapshot',
    description: 'A decentralized voting system that allows DAO communities to vote on proposals off-chain to save gas costs.',
    category: 'Governance',
    platform: 'Ethereum',
    url: 'https://snapshot.org',
    image: 'https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 25000,
    rating: 4.3,
    createdAt: '2020-08-27'
  },
  {
    id: 12,
    name: 'Serum',
    description: 'A decentralized exchange (DEX) and ecosystem that brings unprecedented speed and low transaction costs to decentralized finance.',
    category: 'Finance',
    platform: 'Solana',
    url: 'https://projectserum.com',
    image: 'https://images.pexels.com/photos/5980856/pexels-photo-5980856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    users: 55000,
    rating: 4.2,
    createdAt: '2020-08-11'
  }
];

const DAppDirectoryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDapps, setFilteredDapps] = useState(dapps);

  useEffect(() => {
    document.title = 'DApp Directory - BlockchainHub';
  }, []);

  useEffect(() => {
    let filtered = dapps.filter(dapp => {
      const matchesCategory = selectedCategory === 'All' || dapp.category === selectedCategory;
      const matchesPlatform = selectedPlatform === 'All' || dapp.platform === selectedPlatform;
      const matchesSearch = dapp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           dapp.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPlatform && matchesSearch;
    });

    // Sort the results
    switch (selectedSort) {
      case 'popular':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'users':
        filtered = filtered.sort((a, b) => b.users - a.users);
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }

    setFilteredDapps(filtered);
  }, [selectedCategory, selectedPlatform, selectedSort, searchQuery]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-yellow-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Decentralized Application Directory</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover and explore the growing ecosystem of blockchain-powered applications.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <div className="pl-4 pr-2 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search DApps by name or description..."
                className="py-3 px-2 w-full bg-transparent border-none focus:outline-none focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedCategory === category
                          ? 'bg-primary text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Platform:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {platforms.map(platform => (
                    <button
                      key={platform}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedPlatform === platform
                          ? 'bg-secondary text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedPlatform(platform)}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <ArrowUpDown size={18} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                        selectedSort === option.id
                          ? 'bg-accent text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedSort(option.id)}
                    >
                      <span className="mr-1">{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DApps Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredDapps.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">No DApps found matching your criteria.</p>
              <button 
                className="mt-4 btn btn-primary"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedPlatform('All');
                  setSelectedSort('popular');
                  setSearchQuery('');
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDapps.map(dapp => (
                <div key={dapp.id} className="card overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={dapp.image} 
                      alt={dapp.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                    <div className="absolute top-0 right-0 p-4">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/80 rounded-full text-white">
                        {dapp.platform}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <span className="px-2 py-1 text-xs font-medium bg-secondary/80 rounded-full">
                        {dapp.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{dapp.name}</h3>
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
                        <span className="text-sm font-medium">{dapp.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {dapp.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Users size={16} className="text-gray-500 mr-1" />
                        <span className="text-sm text-gray-500">
                          {dapp.users.toLocaleString()} users
                        </span>
                      </div>
                      
                      <a 
                        href={dapp.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary flex items-center"
                      >
                        Visit <ExternalLink size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DAppDirectoryPage;