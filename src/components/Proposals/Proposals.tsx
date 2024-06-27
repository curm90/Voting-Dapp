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

  console.log({ proposals, isLoading, isError });

  if (isLoading) return <span>Loading...</span>;

  return (
    <section className='h-[30rem] w-[20rem] rounded-md border border-gray-600'>
      <h1>Proposals</h1>
    </section>
  );
}
