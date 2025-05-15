import React, { useState, useEffect } from 'react';
import { Play, Copy, Save, Info } from 'lucide-react';

const solidity = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    
    event DataChanged(uint256 newValue);
    
    function set(uint256 x) public {
        storedData = x;
        emit DataChanged(x);
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}`;

const SmartContractPage: React.FC = () => {
  const [contractCode, setContractCode] = useState(solidity);
  const [contractName, setContractName] = useState('SimpleStorage');
  const [deployStatus, setDeployStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
  const [outputLogs, setOutputLogs] = useState<Array<{type: 'info' | 'success' | 'error', message: string}>>([]);
  const [contractValue, setContractValue] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');

  useEffect(() => {
    document.title = 'Smart Contract Sandbox - BlockchainHub';
  }, []);

  const addLog = (type: 'info' | 'success' | 'error', message: string) => {
    setOutputLogs(prev => [...prev, { type, message }]);
  };

  const handleDeploy = () => {
    setDeployStatus('deploying');
    addLog('info', `Deploying ${contractName} contract to test network...`);
    
    // Simulate deployment
    setTimeout(() => {
      const address = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      setDeployedAddress(address);
      setDeployStatus('success');
      addLog('success', `Contract deployed successfully at ${address}`);
    }, 3000);
  };

  const handleGetValue = () => {
    addLog('info', 'Calling get() function...');
    
    // Simulate get call
    setTimeout(() => {
      // Get a random value if not set yet
      const value = contractValue || Math.floor(Math.random() * 100).toString();
      setContractValue(value);
      addLog('success', `Current value: ${value}`);
    }, 1000);
  };

  const handleSetValue = () => {
    if (!newValue) {
      addLog('error', 'Please enter a value to set');
      return;
    }
    
    addLog('info', `Calling set(${newValue}) function...`);
    
    // Simulate set call
    setTimeout(() => {
      setContractValue(newValue);
      addLog('success', `Value updated to: ${newValue}`);
      setNewValue('');
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addLog('info', 'Copied to clipboard!');
  };

  const clearLogs = () => {
    setOutputLogs([]);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContractCode(e.target.value);
  };

  const getLogColor = (type: 'info' | 'success' | 'error') => {
    switch (type) {
      case 'info': return 'text-blue-600 dark:text-blue-400';
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-600 to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Contract Playground</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Write, deploy, and interact with smart contracts in a safe sandbox environment.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Editor */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold">Contract Editor</h3>
                    <div className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                      Solidity
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(contractCode)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      title="Copy code"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      title="Save contract"
                    >
                      <Save size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <label htmlFor="contractName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contract Name
                    </label>
                    <input
                      type="text"
                      id="contractName"
                      className="input"
                      value={contractName}
                      onChange={(e) => setContractName(e.target.value)}
                    />
                  </div>
                  <div>
                    <textarea
                      id="codeEditor"
                      className="input font-mono text-sm h-96"
                      value={contractCode}
                      onChange={handleCodeChange}
                    ></textarea>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      className={`btn btn-primary flex items-center ${deployStatus === 'deploying' ? 'opacity-70 cursor-not-allowed' : ''}`}
                      onClick={handleDeploy}
                      disabled={deployStatus === 'deploying'}
                    >
                      {deployStatus === 'deploying' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Play size={16} className="mr-1" /> Deploy Contract
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold">Contract Interaction</h3>
                </div>
                
                <div className="p-4">
                  {!deployedAddress ? (
                    <div className="flex items-center justify-center p-8 text-center">
                      <div>
                        <Info size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-400">
                          Deploy your contract to interact with it
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Contract Address
                          </label>
                          <button
                            onClick={() => copyToClipboard(deployedAddress)}
                            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
                          >
                            <Copy size={12} className="mr-1" /> Copy
                          </button>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 rounded p-2 text-xs font-mono break-all">
                          {deployedAddress}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Read Contract</h4>
                          <div className="flex space-x-2">
                            <button
                              className="btn btn-secondary flex-grow"
                              onClick={handleGetValue}
                            >
                              get()
                            </button>
                            {contractValue && (
                              <div className="bg-gray-100 dark:bg-gray-700 rounded p-2 min-w-[80px] text-center">
                                {contractValue}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">Write Contract</h4>
                          <div className="flex space-x-2">
                            <input
                              type="number"
                              className="input flex-grow"
                              placeholder="New value"
                              value={newValue}
                              onChange={(e) => setNewValue(e.target.value)}
                            />
                            <button
                              className="btn btn-primary whitespace-nowrap"
                              onClick={handleSetValue}
                            >
                              set()
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Logs */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold">Output Logs</h3>
                  <button
                    onClick={clearLogs}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Clear
                  </button>
                </div>
                <div className="p-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-3 h-60 overflow-y-auto font-mono text-sm">
                    {outputLogs.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-center italic">No logs to display</p>
                    ) : (
                      <div className="space-y-1">
                        {outputLogs.map((log, index) => (
                          <div key={index} className={`${getLogColor(log.type)}`}>
                            &gt; {log.message}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Resources & Documentation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#" className="block group">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-200 group-hover:shadow-md">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">Solidity Documentation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn about Solidity programming language and smart contract development.
                </p>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-200 group-hover:shadow-md">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">Smart Contract Patterns</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Common design patterns and best practices for secure smart contract development.
                </p>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-200 group-hover:shadow-md">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">Security Guidelines</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Security considerations and auditing processes for blockchain applications.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmartContractPage;