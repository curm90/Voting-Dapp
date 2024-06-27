'use client';

import { votingContract } from '@/lib/voting';
import { useReadContract } from 'thirdweb/react';

export default function Proposals() {
  const {
    data: proposals,
    isLoading,
    isError,
  } = useReadContract({
    contract: votingContract,
    method: 'getProposals',
    params: [],
  });

  console.log({ isLoading, isError });

  if (isLoading) return <span>Loading...</span>;

  return (
    <section className='h-minus-header flex items-center justify-center'>
      <div className='flex flex-col gap-2'>
        <h1 className='mb-2 text-2xl'>Proposals</h1>
        {/* @ts-ignore */}
        {proposals?.map(({ description, voteCount }) => (
          <div
            key={description}
            className='flex justify-between gap-8 rounded-lg border border-violet-600 bg-violet-100 px-4 py-2'
          >
            <div className='flex gap-2'>
              <p>{description}</p>
              <span>{voteCount}</span>
            </div>

            <div>
              <span>Cast vote</span>
              <div className='flex items-center gap-4'>
                <button className='rounded-md bg-green-400 px-3 py-1 text-white'>Yes</button>
                <button className='rounded-md bg-red-400 px-3 py-1 text-white'>No</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
