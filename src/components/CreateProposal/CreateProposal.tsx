'use client';

import { useWallet } from '@/contexts/WalletProvider';
import { getContract } from '@/lib/voting';
import { useState } from 'react';

export default function CreateProposal() {
  const [inputVal, setInputVal] = useState('');
  const { provider, signer } = useWallet();

  console.log({ inputVal });

  async function handleCreateProposal() {
    if (!provider || !signer) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const contract = await getContract();
      const tx = await contract.connect(signer).createProposal(inputVal);
      await tx.wait();

      setInputVal('');
      alert('Proposal created successfully');
    } catch (error) {
      console.log({ error });
      alert('Something went wrong');
    }
  }

  return (
    <div>
      <input
        type='text'
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        placeholder='Proposal description...'
      />
      <button
        className='rounded-md bg-indigo-500 px-4 py-2 text-gray-50 duration-150 hover:bg-indigo-400'
        onClick={handleCreateProposal}
      >
        Create proposal
      </button>
    </div>
  );
}
