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

    mapping(address => bool) public hasVoted;

    function createProposal(string memory _description) public onlyOwner {
        proposals.push(Proposal({description: _description, voteCount: 0}));
    }

    function vote(uint256 proposalId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(proposalId < proposals.length, "Invalid proposal");
        proposals[proposalId].voteCount += 1;
        hasVoted[msg.sender] = true;
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }
}
