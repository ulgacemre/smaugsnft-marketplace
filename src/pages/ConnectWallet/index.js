import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Layout from '../../components/Layout'
import Icon from '../../components/Icon'
import Divider from '../../components/Divider';
import { connect } from "react-redux";
import imgPlaceholder from '../../assets/images/connect/main.png'
import imgQRCode from '../../assets/images/connect/qrcode.png'
import imgTOS from '../../assets/images/connect/tos.png'
import Button from '../../components/Buttons/Button';
import CheckBox from '../../components/Input/CheckBox';

import useWeb3 from '../../shared/hooks/useWeb3'
import Modal from '../../components/Modal';

const ConnectWallet = function (props) {
    const { connected, handleConnect } = useWeb3()
    const [wallet, setWallet] = useState('');
    const [isScan, setScanned] = useState(false);
    const [chkNotChild, setChkNotChild] = useState(false);
    const [chkTOS, setChkTOS] = useState(false);
    const [enableConnect, setEnableConnect] = useState(false);
    const [web3Error, setWeb3Error] = useState("false");
    let history = useHistory();

    useEffect(() => {
        if (chkTOS && chkNotChild) {
            setEnableConnect(true);
        } else {
            setEnableConnect(false);
        }
    }, [chkTOS, chkNotChild])

    useEffect(() => {
        if (connected) {
            history.push('/profile/edit')
        }
    }, [connected])

    const goToPreviousPath = () => {
        history.goBack()
    }

    const dataList = [
        { title: 'MetaMask', color: 'bg-primary-3' },
        { title: 'Formatic', color: 'bg-primary-2' },
        { title: 'Coinbase Wallet', color: 'bg-primary-1' },
        { title: 'MyEtherWallet', color: 'bg-primary-4' },
        { title: 'Wallet Connect', color: 'bg-primary-3' }
    ];

    const handleSelectWallet = (idx) => {
        setWallet(idx);
        if (idx === 0) {
            setScanned(true);
        } else {
            setScanned(false);
        }
    }

    const gotoConnect = () => {
        setScanned(true);
    }

    const onConnect = () => {
        //setScanned( true );
        if (window.web3) {
            setWeb3Error("false");
            handleConnect();
        } else {
            setWeb3Error("true");
        }
    }

    const closeWeb3ErrorModal = () => {
        setWeb3Error("false");
    }

    return (
        <Layout page="connect-wallet">
            {web3Error ? <Modal
                show={web3Error === "true" ? true : false}
                closeBtn={true}
                onClose={closeWeb3ErrorModal}
                title="Web3 not supported!"
            >
                <p>
                    This browser does not support web3.
            </p>
            </Modal> : null}
            <div className="container content">
                <div className="section">
                    <div className="d-flex align-items-center pointer">
                        <Icon icon="arrow-left" size="xl" className="svg-neutral-2 mr-3" onClick={goToPreviousPath} />
                        <h2 className="d-none d-lg-block">Connect your wallet</h2>
                        <div className="d-block d-lg-none text-body-1-bold">Connect your wallet</div>
                    </div>
                </div>

                <Divider className="top-divider" />

                <div className="d-flex justify-content-between align-items-center flex-lg-row flex-column">
                    <div className={"wallet-list w-100 " + (wallet !== '' ? 'd-none d-lg-block' : '')} >
                        {dataList.map((item, idx) => (
                            <div className={"wallet-list-item" + (wallet === idx ? " selected" : "")} key={idx} onClick={() => handleSelectWallet(idx)}>
                                <div className={"avatar " + (wallet === idx ? "bg-neutral-8" : item.color)}>
                                    {wallet === idx ? (
                                        <Icon icon="check" className="svg-primary-1" />
                                    ) : (
                                        <Icon icon="wallet" className="svg-neutral-8" />
                                    )}
                                </div>
                                <div className="text-body-1-bold ml-32">
                                    {item.title}
                                </div>
                                { wallet === idx &&
                                    <Icon icon="arrow-right" className="svg-neutral-2 ml-auto" />
                                }
                            </div>
                        ))}
                    </div>
                    <div className="right-panel w-100">
                        {wallet === '' &&
                            <img src={imgPlaceholder} className="connect-placeholder w-100" />
                        }
                        {(wallet !== '' && !isScan) &&
                            <>
                                <h3 className="mb-2">Scan to connect</h3>
                                <div className="text-caption-2 neutral-4 mb-4">Powered by UI8.Wallet</div>
                                <div className="qrcode-panel bg-neutral-7 mb-4">
                                    <img src={imgQRCode} />
                                </div>

                                <Button className="d-none d-lg-block large small-font" onClick={gotoConnect} >Don’t have a wallet app?</Button>
                                <Button className="d-block d-lg-none large small-font w-100" onClick={gotoConnect} >Don’t have a wallet app?</Button>
                            </>
                        }
                        {(wallet !== '' && isScan) &&
                            <>
                                <h3 className="mb-2">Terms of service</h3>
                                <div className="text-caption-2 neutral-4" style={{ marginBottom: '40px' }}>
                                    Please take a few minutes to read and understand <b>Stacks Terms of Service</b>. To continue, you’ll need to accept the terms of services by checking the boxes.
                                </div>
                                <div className="tos-panel" style={{ marginBottom: '40px' }}>
                                    <img src={imgTOS} />
                                </div>

                                <div style={{ marginBottom: '40px' }}>
                                    <CheckBox
                                        title="I am at least 13 year old"
                                        className="mb-12"
                                        value={chkNotChild}
                                        onChange={(val) => setChkNotChild(val)}
                                    />
                                    <CheckBox
                                        title="I agree Stack terms of service"
                                        value={chkTOS}
                                        onChange={(val) => setChkTOS(val)}
                                    />
                                </div>

                                <div className="d-none d-lg-flex">
                                    <Button className="large mr-2" >Cancel</Button>
                                    <Button className="primary large" disabled={!enableConnect} onClick={onConnect}>Get started now</Button>
                                </div>
                                <div className="d-block d-lg-none">
                                    <Button className="large w-100 mb-2" >Cancel</Button>
                                    <Button className="primary large w-100" disabled={!enableConnect} onClick={onConnect} >Get started now</Button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
}
const mapStateToProps = ({ setting }) => {
    const { theme } = setting;
    return { theme }
};
export default connect(mapStateToProps)(ConnectWallet);
