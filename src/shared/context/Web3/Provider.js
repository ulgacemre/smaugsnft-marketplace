import React, { useCallback, useEffect, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers, Contract } from 'ethers'
import useWeb3 from '../../hooks/useWeb3'
import abis from '../../abis/'
import Web3Modal from 'web3modal'
import Context from './Context'
import addresses from '../../addresses'
import { useRef } from 'react'
import { useHistory } from 'react-router-dom';

const Web3 = require('web3')

const Provider = ({ children }) => {
    const [web3Modal, setWeb3Modal] = useState(undefined)
    const [connected, setConnected] = useState(JSON.parse(localStorage.getItem('wallet_connect')))
    const [walletAddress, setWalletAddress] = useState(undefined)
    const [wallet, setWallet] = useState(undefined)
    const [walletBalance, setWalletBalance] = useState(undefined)
    const [walletSMGBalance, setSMGWalletBalance] = useState(undefined)
    const [connecting, setConnecting] = useState(true)
    const [SMG, setSMG] = useState(new Contract(addresses.SMG, abis.SMG));

    const history = useHistory();



    const [networkError, setNetworkError] = useState({
        loading: true,
        status: false
    });


    const approveSMG = async (amount) => {
        const contract = SMG.connect(wallet);

        await contract.approve(walletAddress, amount);

    }

    const transferFromSMG = async (from, to, uint) => {
        const contract = SMG.connect(wallet);
        const res = await contract.transferFrom(from, to, uint);
        return res;
    }

    const transfer = async (to, quantity) => {
        const contract = SMG.connect(wallet);
        const res = await contract.transfer(to, quantity);
        return res;
    };

    const networkIdControl = () => {
        return new Promise((resolve, reject) => {
            window.addEventListener("load", async () => {
                if (window.ethereum) {
                    const web3 = new Web3(window.ethereum);
                    try {
                        resolve(web3);
                    } catch (error) {
                        reject(error);
                    }
                } else if (window.web3) {
                    const web3 = window.web3;
                    resolve(web3);
                } else {
                    const provider = new Web3.providers.HttpProvider("http://localhost:8080/");
                    const web3 = new Web3(provider);
                    resolve(web3);
                }
            });
        });
    };



    const handleConnect = useCallback(async () => {
        const provider = await web3Modal?.connect();
        if (provider) {
            const newWeb3 = new ethers.providers.Web3Provider(provider)
            const accounts = await newWeb3.listAccounts()

            let balance = await newWeb3.getBalance(accounts[0])



            setNetworkError({
                loading: false,
                status: false
            });




            setWalletBalance(ethers.utils.formatEther(balance));
            setWalletAddress(accounts[0]);
            setWallet(newWeb3.getSigner());
            setConnected(true);

            setConnecting(false);

            const contract = SMG.connect(newWeb3.getSigner());
            let balanceOf = (await contract.balanceOf(accounts[0]));

            const unit = 8;
            const lastBalance = ethers.utils.formatUnits(balanceOf, [unit]);
            setSMGWalletBalance(lastBalance);


            localStorage.setItem("wallet_connect", true);


            provider.on('accountsChanged', (newAccounts) => {
                if (Array.isArray(newAccounts) && newAccounts.length) {
                    setWalletAddress(newAccounts[0])
                }
            })
        }
    }, [setWalletAddress, setWallet, web3Modal, setConnected])



    const handleDisconnect = useCallback(async () => {
        setConnected(false)
        setWalletAddress(undefined)
        setWallet(undefined)
        localStorage.setItem("wallet_connect", false);
        window.location.reload();


    }, [setConnected, setWalletAddress, setWallet])

    useEffect(() => {
        async function initWeb3Modal() {
            try {
                if (!web3Modal) {
                    const providerOptions = {
                        metamask: {
                            id: "injected",
                            name: "MetaMask",
                            type: "injected",
                            check: "isMetaMask",
                        },
                        walletconnect: {
                            package: WalletConnectProvider, // required
                            options: {
                                rpc: {
                                    56: "https://bsc-dataseed.binance.org/",
                                },
                                qrcodeModalOptions: {
                                    mobileLinks: ["metamask", "trust"],
                                },
                            },
                        },
                    };

                    const web3Modal = new Web3Modal({
                        network: "binance",
                        cacheProvider: true,
                        providerOptions,
                        theme: 'dark',
                    })

                    setWeb3Modal(web3Modal)
                }
            } catch (e) {
                console.log(e)
            }
        }
        initWeb3Modal()
        if (connected)
            handleConnect()

    }, [setWeb3Modal, web3Modal])

    return (
        <Context.Provider
            value={{
                handleConnect,
                handleDisconnect,
                connected,
                walletAddress,
                walletBalance,
                walletSMGBalance,
                wallet,
                approveSMG,
                transferFromSMG,
                transfer,
                connecting,
                networkError,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider
