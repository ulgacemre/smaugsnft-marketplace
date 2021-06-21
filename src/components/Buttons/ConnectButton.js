import React, { useState, useRef } from 'react';
import Link from '../Link';
import Button from './Button'
import Switch from '../Input/Switch'
import Popup from '../Popup'
import Icon from '../Icon'
import { shortenWallet } from '../../helper/utils'
import useWeb3 from '../../shared/hooks/useWeb3'
import { connect } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';

//import bnbImg from '../../assets/images/bnb.png'
import coinLogo from '../../assets/images/coin-logo.png'



import imgMark from '../../assets/images/mark.png'
import Divider from '../Divider';
import { toggleTheme } from '../../store/actions/Setting';


import defaultAvatar from '../../assets/images/avatar/default.png';
import { DOWNLOAD_USERS_URL } from '../../utils/Api';
import { CLIENT_URL } from '../../constants/config';

const ConnectButton = function ({ className, user_info, theme, toggleTheme, style }) {
    const [popupShow, setPopupShow] = useState(false)
    const elementButton = useRef(null);

    const { connected, walletAddress, handleDisconnect, walletSMGBalance, handleConnect } = useWeb3();

    const setConnect = () => {
        localStorage.clear();
        setTimeout(() => {
            handleConnect();
        }, 500);
    };

    //console.log("wallet", useWeb3());

    return (
        <>
            <ToastContainer />
            {connected ? (
                <div
                    className={"button-connected pointer " + className} style={style}
                    onClick={() => setPopupShow(!popupShow)}>

                    <img
                        src={user_info.imageUrl === "" ? DOWNLOAD_USERS_URL + 'default.png' : user_info.avatar}
                        className="avatar"
                        ref={elementButton}
                    />
                    <div className="text-button-2 ml-12 d-none d-lg-block">
                        <span>{parseInt(walletSMGBalance)}</span>
                        <span className="text-button-2 primary-4 ml-1">SMG</span>
                    </div>

                    <Popup
                        className="user-popup"
                        target={elementButton.current}
                        show={popupShow}
                        onClose={() => setPopupShow(false)}
                    >
                        <div className="">
                            <div className="text-body-1-bold">{user_info.displayName}</div>
                            <div className="mb-2">
                                <span className="text-caption-bold neutral-4 mr-2">
                                    {shortenWallet(walletAddress)}
                                </span>
                                <Icon onClick={() => navigator.clipboard.writeText(`${CLIENT_URL}profile/${walletAddress}`).then(() => {
                                    toast.info('Wallet address copied.', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });

                                })} style={{ cursor: "pointer" }} icon="coins-fill" className="svg-primary-1" size="xs" />
                            </div>
                            <div className="user-balance-card mb-4">
                                <div className="d-flex align-items-center">
                                    <img src={coinLogo} className="size-40 rounded-circle mr-3"></img>
                                    <div>
                                        <div className="text-caption-2 neutral-4">
                                            Balance
                                        </div>
                                        <div className="text-body-1-bold neutral-1" style={{ marginBottom: '10px' }}>
                                            {parseInt(walletSMGBalance)} SMG
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="user-menu">
                                <div className="d-flex align-items-center mb-12">
                                    <Icon icon="user" />
                                    <Link href={"/profile/" + walletAddress} className="text-button-2 neutral-4 ml-2">
                                        My profile
                                    </Link>
                                </div>
                                <Divider className="mb-3" />
                                <div className="d-flex align-items-center mb-12">
                                    <Icon icon="edit" />
                                    <Link href={"/profile/edit"} className="text-button-2 neutral-4 ml-2">
                                        Edit profile
                                    </Link>
                                </div>
                                <Divider className="mb-3" />
                                <div className="d-flex align-items-center mb-12">
                                    <Icon icon="image" />
                                    <Link href={"/profile/" + walletAddress} className="text-button-2 neutral-4 ml-2">
                                        My items
                                    </Link>
                                </div>
                                <Divider className="mb-3" />
                                <div className="d-flex align-items-center mb-12">
                                    <Icon icon="wallet" />
                                    <Link href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=0x6bfd576220e8444ca4cc5f89efbd7f02a4c94c16" target="_blank" className="text-button-2 neutral-4 ml-2">
                                        Buy SMG Token
                                    </Link>
                                </div>
                                <Divider className="mb-3" />
                                <div className="d-flex align-items-center mb-12">
                                    <Icon icon="light-bulb" />
                                    <div className="text-button-2 neutral-4 ml-2">
                                        {theme === "white" ? "Dark theme" : "White theme"}
                                    </div>
                                    <Switch className="ml-auto small"
                                        value={theme === "dark"}
                                        onChange={() => toggleTheme()} />
                                </div>
                                <Divider className="mb-3" />
                                <div className="d-flex align-items-center">
                                    <Icon icon="sign-out" />
                                    <Link href="#" className="text-button-2 neutral-4 ml-2" onClick={handleDisconnect}>
                                        Disconnect
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </div>
            ) : <Button onClick={setConnect} className={[className, " d-none d-lg-block normal"]} >
                Connect Wallet
            </Button>}
        </>
    );
}

const mapStateToProps = ({ user, setting }) => {
    const { user_info } = user;
    const { theme } = setting;
    return { user_info, theme }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleTheme: () => dispatch(toggleTheme()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectButton);
