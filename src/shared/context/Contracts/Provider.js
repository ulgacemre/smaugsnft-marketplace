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
  const [SMAUGSBUY, setSMAUGSBUY] = useState(
    new Contract(addresses.SMAUGSBUY, abis.SMAUGSBUY)
  )
  const [ERC1155, setERC1155] = useState(
    new Contract(addresses.ERC1155, abis.ERC1155)
  )
  const [SMG, setSMG] = useState(
    new Contract(addresses.SMG, abis.SMG)
  )
  const { wallet, walletAddress } = useWeb3()

  const [userInfoLoading, setUserInfoLoading] = useState(true);

  useEffect(() => {
    if (!!wallet && !ERC721.signer) {
      setERC721(ERC721.connect(wallet))

      //console.log("CONTRACT  ===> ", ERC721.connect(wallet));

    }
  }, [wallet, setERC721, ERC721])
  useEffect(() => {
    if (!!wallet && !SMAUGSBUY.signer) {
      setSMAUGSBUY(SMAUGSBUY.connect(wallet))
    }
  }, [wallet, setSMAUGSBUY, SMAUGSBUY])
  useEffect(() => {
    if (!!wallet && !SMG.signer) {
      setSMG(SMG.connect(wallet))
    }
  }, [wallet, setSMG, SMG])
  useEffect(() => {
    if (!!wallet && !ERC1155.signer) {
      setERC1155(ERC1155.connect(wallet))
    }
  }, [wallet, setERC1155, ERC1155])

  /*useEffect(() => {
    if (SMAUGSBUY) {
      buy();
    }
  }, [SMAUGSBUY]);

  const buy = async () => {
    try {
      const approveRes = await SMG.approve("0x285D3A994581CAc3457f8d24D05720A4fD004d09", 10000000000);

      const buyResponse = await SMAUGSBUY.buy("0x32c6AE9A47B91d073BF6FE0DFD3D15917E667D2c", "0x8De5021b533ef04C5f2e6875cd473223D42669b9", "0xfDCe6A128e22e0a4A98C16F02B3BCbF16f4D8945", 10000000000, 1000000000, 9000000000);
      console.log('buyResponse => ', buyResponse);
      console.log('approveResponse => ', approveRes);
      
    } catch (error) {
      console.log('error => ', error);
    }
  };
  */


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




  const multipleMintERC1155 = async (tokenId, fees, supply, tokenURI) => {
    if (!walletAddress || !ERC1155.signer) return;
    const res = await ERC1155.mint(tokenId, fees, supply, tokenURI);
    return res;
  }

  const multipleApproveERC1155 = async (tokenId) => {
    if (!walletAddress || !ERC1155.signer) return;

    await ERC1155.approve(walletAddress, tokenId);
  }

  const multipleTransferFromERC1155 = async (from, to, tokenId, quantity, other) => {
    const contract = ERC1155.connect(wallet);
    const res = await contract.safeTransferFrom(from, to, tokenId, quantity, other);
    return res;
  }

  const multipleBurnERC1155 = async (ownerId, tokenId, quantity) => {
    if (!walletAddress || !ERC1155.signer) return;

    const res = await ERC1155.burn(ownerId, tokenId, quantity);
    return res;
  }

  const multipleFunctions = {
    multipleMintERC1155: multipleMintERC1155,
    multipleApproveERC1155: multipleApproveERC1155,
    multipleTransferFromERC1155: multipleTransferFromERC1155,
    multipleBurnERC1155: multipleBurnERC1155,
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
        transferFromERC721,
        multipleFunctions,
        userInfoLoading,
        setUserInfoLoading,
      }}
    >
      { children}
    </Context.Provider >
  )
}

export default Provider
