import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, RefreshCw, Database, Lock } from 'lucide-react';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'BlockchainHub - Blockchain Applications Showcase';
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/90 to-primary text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>
        </div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover the Future of <span className="text-accent">Blockchain</span> Applications
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Explore specialized blockchain solutions across finance, supply chain, identity verification, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/use-cases" className="btn bg-white text-primary hover:bg-gray-100 font-semibold">
                Explore Use Cases
              </Link>
              <Link to="/dapps" className="btn border border-white text-white hover:bg-white/10 font-semibold">
                Browse DApps
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path 
              fill="currentColor" 
              fillOpacity="1" 
              className="text-background"
              d="M0,32L80,42.7C160,53,320,75,480,80C640,85,800,75,960,58.7C1120,43,1280,21,1360,10.7L1440,0L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unleashing Blockchain Potential
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover how blockchain technology is transforming industries with secure, transparent, and efficient solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-primary/10 text-primary rounded-full">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Immutable ledgers and cryptographic security ensure data integrity and protection.
              </p>
              <Link to="/use-cases" className="link mt-auto inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="card p-6 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-secondary/10 text-secondary rounded-full">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Public verification and auditable transactions create trust between participants.
              </p>
              <Link to="/use-cases" className="link mt-auto inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="card p-6 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-accent/10 text-accent rounded-full">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Decentralization</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Distribute control and eliminate single points of failure for robust systems.
              </p>
              <Link to="/use-cases" className="link mt-auto inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="card p-6 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-success/10 text-success rounded-full">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Contracts</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Self-executing contracts automate and enforce agreement terms reliably.
              </p>
              <Link to="/smart-contracts" className="link mt-auto inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Preview */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Blockchain Across Industries
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From finance to healthcare, blockchain is revolutionizing how businesses operate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-5xl text-white">💰</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Finance & Banking</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Streamlined transactions, reduced fraud, and new financial instruments through blockchain innovation.
                </p>
                <Link to="/use-cases" className="link inline-flex items-center">
                  Explore finance applications <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            <div className="card overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                <span className="text-5xl text-white">🔄</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Supply Chain</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  End-to-end transparency and traceability for products from manufacturer to consumer.
                </p>
                <Link to="/use-cases" className="link inline-flex items-center">
                  Explore supply chain solutions <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            <div className="card overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center">
                <span className="text-5xl text-white">🔐</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Identity Verification</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Secure, user-controlled digital identities that reduce fraud and simplify verification.
                </p>
                <Link to="/use-cases" className="link inline-flex items-center">
                  Explore identity solutions <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/use-cases" className="btn btn-primary">
              View All Use Cases
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore Blockchain Applications?
            </h2>
            <p className="text-xl mb-8">
              Create an account to interact with smart contracts and track blockchain transactions in real-time.
            </p>
            <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100 font-semibold">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;