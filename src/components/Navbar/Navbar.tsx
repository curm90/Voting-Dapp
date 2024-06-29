'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import ConnectWalletBtn from '../ConnectWalletBtn/ConnectWalletBtn';
import { votingContract } from '@/lib/voting';

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
    <nav className='flex w-full items-center justify-between gap-2 bg-violet-950 px-12 py-4 text-gray-100'>
      <h4>Voting Dapp</h4>
      <div className='flex items-center gap-8'>
        <Link className='text-violet-200 underline duration-100 hover:text-violet-50' href='/'>
          Home
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
