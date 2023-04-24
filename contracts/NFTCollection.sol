//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTCollection is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event TokenCreated(
        string ipfsURL,
        uint256 tokenId
    );

    constructor(
        string memory marketplace_name,
        string memory marketplace_symbol
        ) ERC721(marketplace_name, marketplace_symbol){}

    
    function createToken(string memory tokenURI) public payable returns (uint256) {
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _tokenIds.increment();

        emit TokenCreated(
            tokenURI,
            newTokenId
        );
        return newTokenId;
    }

}