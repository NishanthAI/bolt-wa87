import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold">BlockchainHub</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showcasing the future of blockchain technology and its applications across industries.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">GitHub</span>
                <Github size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">Home</Link></li>
              <li><Link to="/use-cases" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">Use Cases</Link></li>
              <li><Link to="/dapps" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">DApp Directory</Link></li>
              <li><Link to="/smart-contracts" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">Smart Contracts</Link></li>
              <li><Link to="/explorer" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">Explorer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">Documentation</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">API Reference</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">Blog</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">Tutorials</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} BlockchainHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;