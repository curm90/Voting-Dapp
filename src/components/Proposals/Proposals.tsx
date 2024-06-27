'use client';

import { votingContract } from '@/lib/voting';
import { useState } from 'react';
import { prepareContractCall } from 'thirdweb';
import { useReadContract, useSendAndConfirmTransaction } from 'thirdweb/react';

export default function Proposals() {
  const [loading, setLoading] = useState(false);
  const [proposalVoteIndex, setProposalVoteIndex] = useState<number | null>(null);

  const { data: proposals, isLoading } = useReadContract({
    contract: votingContract,
    method: 'getProposals',
    params: [],
  });

  const {
    mutate: sendTx,
    isPending,
    isError,
    error: txError,
    data: txReceipt,
  } = useSendAndConfirmTransaction();

  const handleVote = async (proposalId: number) => {
    if (typeof proposalId !== 'number') return;

    setLoading(true);
    setProposalVoteIndex(null);

    try {
      const tx = prepareContractCall({
        contract: votingContract,
        method: 'function vote(uint256 proposalId)',
        params: [BigInt(proposalId)],
      });

      sendTx(tx, {
        onError: (error) => {
          console.log({ error });
          setProposalVoteIndex(proposalId);
        },
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <span>Loading...</span>;

  const parsedError = isError && txError?.message?.split('\n')[0];

  return (
    <section className='h-minus-header flex items-center justify-center'>
      <div className='flex flex-col gap-2'>
        <h1 className='mb-2 text-2xl'>Proposals</h1>
        {/* @ts-ignore */}
        {proposals?.map(({ description, voteCount }, index) => {
          return (
            <div
              key={description}
              className='flex items-center justify-between gap-8 rounded-lg border border-violet-600 bg-violet-100 px-4 py-2'
            >
              <div className='flex flex-col gap-2'>
                <p>{description}</p>
                <span className='text-violet-400'>{Number(voteCount)} Vote(s)</span>
              </div>

              <div className='flex flex-col items-end gap-2'>
                <button
                  disabled={isPending || loading}
                  className='w-fit rounded-md bg-violet-400 px-3 py-1 text-white disabled:cursor-not-allowed'
                  onClick={() => handleVote(index)}
                >
                  {isPending || isLoading ? 'Voting...' : 'Vote'}
                </button>
                {isError && proposalVoteIndex === index ? (
                  <span className='text-sm text-red-400'>{parsedError}</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
