import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

// Industry types for filtering
const industries = ['All', 'Finance', 'Supply Chain', 'Healthcare', 'Real Estate', 'Identity', 'Government', 'Entertainment'];

// Sample use case data
const useCases = [
  {
    id: 1,
    title: 'Decentralized Finance (DeFi) Platforms',
    description: 'Platforms that provide financial services like lending, borrowing, and trading without traditional intermediaries.',
    industry: 'Finance',
    image: 'https://images.pexels.com/photos/7821485/pexels-photo-7821485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: ['Lower fees', 'Global accessibility', 'No intermediaries', 'Automated execution'],
    challenges: ['Regulatory uncertainties', 'Smart contract vulnerabilities', 'User experience'],
    examples: ['Uniswap', 'Aave', 'Compound']
  },
  {
    id: 2,
    title: 'Supply Chain Tracking & Provenance',
    description: 'End-to-end tracking systems that provide complete visibility into product journeys from manufacturer to consumer.',
    industry: 'Supply Chain',
    image: 'https://images.pexels.com/photos/6169133/pexels-photo-6169133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: ['Transparency', 'Fraud reduction', 'Quality assurance', 'Ethical sourcing verification'],
    challenges: ['Integration with legacy systems', 'Data standardization', 'Stakeholder adoption'],
    examples: ['VeChain', 'IBM Food Trust', 'TradeLens']
  },
  {
    id: 3,
    title: 'Medical Records Management',
    description: 'Secure, patient-controlled health record systems that improve data accessibility while maintaining privacy.',
    industry: 'Healthcare',
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: ['Patient data ownership', 'Interoperability', 'Secure data sharing', 'Improved accuracy'],
    challenges: ['Regulatory compliance', 'Legacy system integration', 'Data standardization'],
    examples: ['MedRec', 'Patientory', 'BurstIQ']
  },
  {
    id: 4,
    title: 'Real Estate Tokenization',
    description: 'Fractional ownership of real estate assets through blockchain tokens, enabling more liquid and accessible property investment.',
    industry: 'Real Estate',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: ['Fractional ownership', 'Increased liquidity', 'Lower entry barriers', 'Streamlined transactions'],
    challenges: ['Regulatory frameworks', 'Market adoption', 'Technical complexity'],
    examples: ['RealT', 'Harbor', 'Propy']
  },
  {
    id: 5,
    title: 'Self-Sovereign Identity',
    description: 'User-controlled digital identity systems that allow selective disclosure of personal information while maintaining privacy.',
    industry: 'Identity',
    image: 'https://images.pexels.com/photos/2882552/pexels-photo-2882552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: ['User control', 'Privacy preservation', 'Reduced fraud', 'Simplified verification'],
    challenges: ['Standardization', 'Recovery mechanisms', 'Regulatory acceptance'],
    examples: ['Sovrin', 'uPort', 'Civic']
  },
  {
    id: 6,
    title: 'Voting Systems',
    description: 'Transparent and secure voting platforms that ensure vote integrity while maintaining voter privacy.',
    industry: 'Government',
    image: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: ['Transparency', 'Tamper resistance', 'Audit capability', 'Accessibility'],
    challenges: ['Scalability', 'Digital divide', 'Voter education'],
    examples: ['Voatz', 'Follow My Vote', 'Agora']
  },
  {
    id: 7,
    title: 'NFT Marketplaces',
    description: 'Platforms for creating, buying, and selling unique digital assets with verifiable ownership and provenance.',
    industry: 'Entertainment',
    image: 'https://images.pexels.com/photos/8369590/pexels-photo-8369590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: ['Digital scarcity', 'Creator royalties', 'Ownership proof', 'Transferability'],
    challenges: ['Environmental concerns', 'IP rights', 'Market volatility'],
    examples: ['OpenSea', 'Rarible', 'Foundation']
  },
  {
    id: 8,
    title: 'Cross-Border Payments',
    description: 'Fast, low-cost international payment solutions that bypass traditional banking systems and reduce settlement times.',
    industry: 'Finance',
    image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: ['Lower fees', 'Faster settlement', 'Transparency', 'Financial inclusion'],
    challenges: ['Regulatory compliance', 'Exchange rate volatility', 'Integration'],
    examples: ['Ripple', 'Stellar', 'Celo']
  }
];

const UseCasesPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUseCases, setFilteredUseCases] = useState(useCases);

  useEffect(() => {
    document.title = 'Blockchain Use Cases - BlockchainHub';
  }, []);

  useEffect(() => {
    const filtered = useCases.filter(useCase => {
      const matchesIndustry = selectedIndustry === 'All' || useCase.industry === selectedIndustry;
      const matchesSearch = useCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           useCase.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesIndustry && matchesSearch;
    });
    setFilteredUseCases(filtered);
  }, [selectedIndustry, searchQuery]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blockchain Use Cases</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover how blockchain technology is transforming industries and creating new possibilities.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg shadow-sm w-full md:w-96">
              <div className="pl-4 pr-2 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search use cases..."
                className="py-2 px-2 w-full bg-transparent border-none focus:outline-none focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300 mr-2">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {industries.map(industry => (
                  <button
                    key={industry}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedIndustry === industry
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedIndustry(industry)}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredUseCases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">No use cases found matching your criteria.</p>
              <button 
                className="mt-4 btn btn-primary"
                onClick={() => {
                  setSelectedIndustry('All');
                  setSearchQuery('');
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUseCases.map(useCase => (
                <div key={useCase.id} className="card overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={useCase.image} 
                      alt={useCase.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/80 rounded-full">
                        {useCase.industry}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {useCase.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                        Benefits
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.benefits.map((benefit, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                        Challenges
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.challenges.map((challenge, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full">
                            {challenge}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                        Examples
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.examples.map((example, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                            {example}
                          </span>
                        ))}
                      </div>
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

export default UseCasesPage;