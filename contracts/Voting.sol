// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    struct Proposal {
        uint256 voteCount;
        string description;
    }

    Proposal[] public proposals;

    function createProposal(string memory _description) public onlyOwner {
        proposals.push(Proposal({description: _description, voteCount: 0}));
    }

    function vote(uint256 proposalId) public {
        proposals[proposalId].voteCount += 1;
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }
}
