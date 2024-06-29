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
        <div className='flex min-h-[15rem] w-[50rem] flex-col justify-between rounded-lg border border-violet-600 bg-violet-100 p-8'>
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
            className='flex w-fit items-center justify-end rounded-md bg-violet-400 px-3 py-1 text-white duration-150 hover:bg-violet-300 disabled:cursor-not-allowed'
            onClick={handleCreateProposal}
          >
            {loading || isPending ? (
              <>
                <span className='animate-spinner mr-2 h-5 w-5 rounded-full border-2 border-white border-b-transparent'></span>
                <span>Sending tx...</span>
              </>
            ) : (
              'Create proposal'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
