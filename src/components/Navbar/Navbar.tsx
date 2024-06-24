import ConnectWalletBtn from '../ConnectWalletBtn/ConnectWalletBtn';

// only show create proposal btn if the connected account address is the same as the owner of the contract
// if the button is shown
// when its clicked it should go to the create proposal page
// where the admin (owner) can create a proposal
// The page should show a simple input field for the proposal description and a button
// When clicking the button we should send a tx to the contract with that description
// Should show a feedback text when trying to send a tx with no description
// on successful creation it should alert the owner the proposal was created and then show a button to link to the proposal page
// If there was an error alert the user something went wrong

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
