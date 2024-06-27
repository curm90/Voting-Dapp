'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import ConnectWalletBtn from '../ConnectWalletBtn/ConnectWalletBtn';
import { votingContract } from '@/lib/voting';

// only show create proposal btn if the connected account address is the same as the owner of the contract
// if the button is shown
// when its clicked it should go to the create proposal page
// where the admin (owner) can create a proposal
// The page should show a simple input field for the proposal description and a button
// When clicking the button we should send a tx to the contract with that description
// Should show a feedback text when trying to send a tx with no description
// on successful creation it should alert the owner the proposal was created and then show a button to link to the proposal page
// If there was an error alert the user something went wrong

export default function Navbar() {
  const [isOwner, setIsOwner] = useState(false);
  const wallet = useActiveAccount();
  const address = wallet?.address;

  const { data: owner } = useReadContract({ contract: votingContract, method: 'owner', params: [] });

  useEffect(() => {
    if (owner && typeof owner === 'string' && address) {
      if (owner === address) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } else {
      setIsOwner(false);
    }
  }, [owner, address]);

  return (
    <nav className='flex w-full items-center justify-between gap-2 bg-indigo-950 px-12 py-4 text-gray-100'>
      <h4>Voting Dapp</h4>
      <div className='flex items-center gap-8'>
        <Link className='text-violet-200 underline duration-100 hover:text-violet-50' href='/proposals'>
          Proposals
        </Link>

        {isOwner ? (
          <Link
            className='text-violet-200 underline duration-100 hover:text-violet-50'
            href='/create-proposal'
          >
            Create proposal
          </Link>
        ) : null}
        <ConnectWalletBtn />
      </div>
    </nav>
  );
}
