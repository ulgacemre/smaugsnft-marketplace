import React, { useCallback, useEffect, useState } from 'react'
import abis from '../../abis'
import useWeb3 from '../../hooks/useWeb3'
import { Contract } from 'ethers'

import Context from './Context'
import addresses from '../../addresses'

const Provider = ({ children }) => {
  const [nfts, setNfts] = useState([])
  const [ERC721, setERC721] = useState(
    new Contract(addresses.ERC721, abis.ERC721)
  )
  const { wallet, walletAddress } = useWeb3()

  useEffect(() => {
    if (!!wallet && !ERC721.signer) {
      setERC721(ERC721.connect(wallet))

      console.log("CONTRACT  ===> ", ERC721.connect(wallet));

    }
  }, [wallet, setERC721, ERC721])


  const ERC721ForUser = useCallback(
    async (userAddress) => {
      const address = userAddress || walletAddress
      if (!address || !ERC721.signer) return []
      const userERC721 = []

      const balance = (await ERC721.balanceOf(address)).toNumber()

      for (let index = 0; index < balance; index++) {
        const id = (await ERC721.tokenOfOwnerByIndex(address, index)).toNumber()

        // userERC721.push({ token: await ERC721.draw(id), id })
      }

      return userERC721
    },
    [ERC721, walletAddress]
  )

  const totalSupplyERC721 = useCallback(async () => {
    if (!walletAddress || !ERC721.signer) return []

    const newTotalSupply = (await ERC721.totalSupply()).toNumber()

    return newTotalSupply
  }, [ERC721, walletAddress])

  const mintERC721 = async (tokenId, fees, tokenURI) => {
    if (!walletAddress || !ERC721.signer) return;

    const res = await ERC721.mint(tokenId, fees, tokenURI);
    return res;
  }

  const approveERC721 = async (tokenId) => {
    if (!walletAddress || !ERC721.signer) return;

    await ERC721.approve(walletAddress, tokenId);
  }

  const transferFromERC721 = async (from, to, uint) => {
    const contract = ERC721.connect(wallet);
    const res = await contract.transferFrom(from, to, uint);
    return res;
  }

  const burnERC721 = async (tokenId) => {
    if (!walletAddress || !ERC721.signer) return;

    const res = await ERC721.burn(tokenId);
    return res;
  }

  return (
    <Context.Provider
      value={{
        nfts,
        ERC721ForUser,
        totalSupplyERC721,
        mintERC721,
        approveERC721,
        burnERC721,
        transferFromERC721
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
