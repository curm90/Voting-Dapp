'use client';

import { ethers, type Signer } from 'ethers';
import { createContext, ReactNode, useContext, useState } from 'react';

interface WalletContextType {
  provider: ethers.providers.Web3Provider | null;
  signer: Signer | null;
  account: string | null;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export default function WalletProvider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      await web3Provider.send('eth_requestAccounts', []);
      const signer = web3Provider.getSigner();

      await signer.signMessage('Welcome to Voting Dapp.');

      setProvider(web3Provider);
      setSigner(signer);
      setAccount(await signer.getAddress());
    } else {
      alert('Please install MetaMask');
    }
  }

  return (
    <WalletContext.Provider value={{ provider, account, signer, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
