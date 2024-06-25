'use client';

import { useState } from 'react';

export default function CreateProposal() {
  const [inputVal, setInputVal] = useState('');

  // async function handleCreateProposal() {
  //   // TODO
  // }

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
        // onClick={handleCreateProposal}
      >
        Create proposal
      </button>
    </div>
  );
}
