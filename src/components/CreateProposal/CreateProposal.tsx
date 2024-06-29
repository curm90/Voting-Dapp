'use client';

import { useState } from 'react';
import { useSendAndConfirmTransaction } from 'thirdweb/react';
import { votingContract } from '@/lib/voting';
import { prepareContractCall } from 'thirdweb';

export default function CreateProposal() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { mutate: sendTx, data: txReceipt, isSuccess, isPending } = useSendAndConfirmTransaction();

  async function handleCreateProposal() {
    if (!description) return setError('Please enter a description');

    setLoading(true);

    try {
      const tx = prepareContractCall({
        contract: votingContract,
        method: 'function createProposal(string _description)',
        params: [description],
      });

      sendTx(tx);
      setDescription('');
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div>
        <div className='mb-2 flex gap-1 text-xl'>
          <h3 className='text-violet-500'>Owner</h3>
          <span>create proposal</span>
        </div>
        <div className='flex min-h-[20rem] w-[50rem] flex-col justify-between rounded-lg border border-violet-600 bg-violet-100 p-8'>
          <div className='flex flex-col gap-1'>
            <input
              type='text'
              className='w-full rounded-md border border-violet-500 bg-transparent px-4 py-2 placeholder:text-violet-400'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Proposal description...'
            />
            {error ? <span className='text-sm text-red-400'>{error}</span> : null}
            {isSuccess ? <span className='text-sm text-green-400'>Proposal created successfully</span> : null}
          </div>
          <button
            disabled={loading || isPending}
            className='rounded-md bg-violet-400 px-4 py-2 text-gray-50 duration-150 hover:bg-violet-300'
            onClick={handleCreateProposal}
          >
            {loading || isPending ? 'Sending tx...' : 'Create proposal'}
          </button>
        </div>
      </div>
    </div>
  );
}
