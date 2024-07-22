'use client';

import { useWallet } from '@/contexts/WalletProvider';

export default function ConnectWalletBtn() {
  const { account, connectWallet } = useWallet();

  function formatAddress(address: string, startLength: number = 4, endLength: number = 4) {
    if (!address) return '';

    return `${address.substring(0, startLength + 2)}...${address.substring(address.length - endLength)}`;
  }

  return (
    <button
      className='rounded-md bg-indigo-500 px-4 py-2 duration-150 hover:bg-indigo-400'
      onClick={connectWallet}
    >
      {account ? `${formatAddress(account)}` : 'Connect Wallet'}
    </button>
  );
}
