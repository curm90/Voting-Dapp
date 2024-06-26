'use client';

import { useState } from 'react';

export default function CreateProposal() {
  const [inputVal, setInputVal] = useState('');

  // async function handleCreateProposal() {
  //   // TODO
  // }

  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='flex min-h-[20rem] w-[50rem] flex-col justify-between rounded-lg border border-violet-500 bg-violet-950 p-8'>
        <input
          type='text'
          className='w-full rounded-md border border-violet-500 bg-violet-800 px-4 py-2 text-white placeholder:text-violet-200'
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder='Proposal description...'
        />
        <button
          className='rounded-md bg-indigo-500 px-4 py-2 text-gray-50 duration-150 hover:bg-indigo-400'
          // onClick={handleCreateProposal}
        >
          Create proposal
        </button>
      </div>
    </div>
  );
}
