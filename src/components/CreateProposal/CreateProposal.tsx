'use client';

import { useState } from 'react';
import { useSendAndConfirmTransaction } from 'thirdweb/react';
import { votingContract } from '@/lib/voting';
import { prepareContractCall } from 'thirdweb';

export default function CreateProposal() {
  const [description, setDescription] = useState('');

  const { mutate: sendTx, data: txReceipt } = useSendAndConfirmTransaction();

  async function handleCreateProposal() {
    // TODO
    const tx = prepareContractCall({
      contract: votingContract,
      method: 'function createProposal(string _description)',
      params: [description],
    });
    console.log({ tx });
    console.log({ txReceipt });
    const receipt = sendTx(tx);
    console.log({ txReceipt });
    console.log({ receipt });
  }

  console.log({ txReceipt });

  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='flex min-h-[20rem] w-[50rem] flex-col justify-between rounded-lg border border-violet-500 bg-violet-950 p-8'>
        <input
          type='text'
          className='w-full rounded-md border border-violet-500 bg-violet-800 px-4 py-2 text-white placeholder:text-violet-200'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Proposal description...'
        />
        <button
          className='rounded-md bg-indigo-500 px-4 py-2 text-gray-50 duration-150 hover:bg-indigo-400'
          onClick={handleCreateProposal}
        >
          Create proposal
        </button>
      </div>
    </div>
  );
}
