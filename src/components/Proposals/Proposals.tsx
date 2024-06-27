'use client';

import { votingContract } from '@/lib/voting';
import { useState } from 'react';
import { prepareContractCall } from 'thirdweb';
import { useReadContract, useSendAndConfirmTransaction } from 'thirdweb/react';

export default function Proposals() {
  const [loading, setLoading] = useState(false);

  const {
    data: proposals,
    isLoading,
    isError,
  } = useReadContract({
    contract: votingContract,
    method: 'getProposals',
    params: [],
  });

  const { mutate: sendTx, isPending, data: txReceipt } = useSendAndConfirmTransaction();

  const handleVote = async (proposalId: number) => {
    console.log({ proposalId });

    if (typeof proposalId !== 'number') return;

    try {
      const tx = prepareContractCall({
        contract: votingContract,
        method: 'function vote(uint256 proposalId)',
        params: [BigInt(proposalId)],
      });

      console.log({ tx });

      sendTx(tx);
      console.log({ tx });
    } catch (error) {
      console.log({ error });
    }
  };
  console.log({ txReceipt, isPending });

  if (isLoading) return <span>Loading...</span>;

  return (
    <section className='h-minus-header flex items-center justify-center'>
      <div className='flex flex-col gap-2'>
        <h1 className='mb-2 text-2xl'>Proposals</h1>
        {/* @ts-ignore */}
        {proposals?.map(({ description, voteCount }, index) => (
          <div
            key={description}
            className='flex items-center justify-between gap-8 rounded-lg border border-violet-600 bg-violet-100 px-4 py-2'
          >
            <div className='flex gap-2'>
              <p>{description}</p>
              <span>{voteCount}</span>
            </div>

            <div className='flex items-center gap-4'>
              <button
                className='rounded-md bg-green-400 px-3 py-1 text-white'
                onClick={() => handleVote(index)}
              >
                Vote
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
