import ConnectWalletBtn from '../ConnectWalletBtn/ConnectWalletBtn';

export default async function Navbar() {
  return (
    <nav className='flex w-full items-center justify-between gap-2 bg-indigo-950 px-12 py-4 text-gray-100'>
      <h4>Voting Dapp</h4>
      <div>
        <ConnectWalletBtn />
      </div>
    </nav>
  );
}
