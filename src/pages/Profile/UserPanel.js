import React, { useState, useMemo, useEffect, useRef } from 'react';
import Button from '../../components/Buttons/Button'
import Divider from '../../components/Divider'
import Icon from '../../components/Icon'
import { shortenWallet } from '../../helper/utils'
import Popup from '../../components/Popup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DOWNLOAD_USERS_URL } from '../../utils/Api';
import blueCheckmark from '../../assets/images/blue-checkmark.webp';
import { CLIENT_URL } from '../../constants/config';
import useWeb3 from '../../shared/hooks/useWeb3';
import axios from '../../utils/Api';



function UserPanel({ isFollowing, setIsFollowing, username, avatar, verified, walletAddress, description = '', url, createdOn, twitterUsername, facebookUsername, instagramUsername, website, bio }) {

    const context = useWeb3();


    const [sendFollowing, setSendFollowing] = useState(false);

    const moreButton = useRef(null);
    const memberSince = useMemo(() => {
        let date = new Date(createdOn);
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    }, [createdOn]);

    const [popupShow, setPopupShow] = useState(false);
    const [popupArrowLeft, setPopupArrowLeft] = useState(0)
    const PopupMenu = () => (
        <>
            <div className="item-popup-item d-flex align-items-center mb-12 primary-3 svg-primary-3">
                <Icon icon="close-circle-fill" size="sm" />
                <div className="ml-2">Report</div>
            </div>
        </>
    )
    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    const follow = () => {
        setSendFollowing(true);
        axios.post('Followingusers', {
            followeeId: walletAddress,
            followerId: context.walletAddress
        }).then((response) => {
            setSendFollowing(false);
            setIsFollowing(!isFollowing);
            console.log("FollowingUsers Post Result => ", response.data);
        }).catch(error => {
            toast.error('Something went error!');
            setSendFollowing(false);
            console.log("error => ", error);
        })
    };
    const unFollow = () => {
        setSendFollowing(true);
        axios.delete(`Users/${context.walletAddress}/followee/rel/${walletAddress}`).then((response) => {
            setSendFollowing(false);
            setIsFollowing(!isFollowing);
            console.log("FollowingUsers Delete Result => ", response.data);
        }).catch(error => {
            toast.error('Something went error!');
            setSendFollowing(false);
            console.log("error => ", error);
        })
    };

    useEffect(() => {
        resizeHandler();
    }, [popupShow])
    const resizeHandler = () => {
        const arrowWidth = 32;
        const popupDlg = document.getElementsByClassName('item-popup')
        if (popupDlg.length === 1) {
            setTimeout(() => {
                const rectButton = moreButton.current.getBoundingClientRect()
                const rectPopup = popupDlg[0].getBoundingClientRect()
                const actualPos = rectButton.x + (rectButton.width / 2)
                let leftPos = actualPos - rectPopup.x - arrowWidth / 2;
                if (leftPos > rectPopup.width - 56)
                    leftPos = rectPopup.width - 56
                setPopupArrowLeft(leftPos);
            }, 30);
        }
    }

    return (
        <div className="userinfo-panel">
            <ToastContainer />

            <div>
                <img className="profile-photo" src={avatar} />
                {verified ? <div style={{ display: "flex", width: 100 + '%', height: 50, marginTop: -60, justifyContent: "center" }}>
                    <img
                        src={blueCheckmark}
                        width={30}
                        height={30}
                        style={{ marginRight: -95 }}
                    />
                </div> : null}
            </div>
            <div className="d-block description mb-5">
                <div className="text-body-1-bold mb-1">
                    {username}
                </div>
                <div className="text-button-2" style={{ marginBottom: '20px' }}>
                    <span className="mr-2">{shortenWallet(walletAddress)}</span>
                    <a href="javascript:void(0);" onClick={() => navigator.clipboard.writeText(`${CLIENT_URL}profile/${walletAddress}`).then(() => {
                        toast.info('Wallet address copied.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                    })}><Icon icon="coins-fill" className="svg-primary-1" size="xs" /></a>
                </div>
                <div className="text-caption-2 neutral-4" style={{ marginBottom: '20px' }}>
                    {bio}
                </div>
                {website ? <div className="text-button-2 d-flex align-items-center justify-content-center">
                    <Icon icon="globe" size="xs" className="mr-2" />
                    <a href={website} target="_blank" className="text-decoration-none neutral-2" >{website}</a>
                </div> : null}
            </div>
            <div className="action d-flex justify-content-center mb-5">
                {walletAddress !== context.walletAddress ? (
                    <>
                        {
                            !isFollowing ? <Button disabled={sendFollowing ? true : false} style={{ cursor: sendFollowing ? "not-allowed" : "pointer" }} onClick={() => follow()} className="primary normal">Follow</Button> : (
                                <Button disabled={sendFollowing ? true : false} style={{ cursor: sendFollowing ? "not-allowed" : "pointer" }} onClick={() => unFollow()} className="normal">Unfollow</Button>
                            )
                        }
                    </>
                ) : null}
                <Button className="normal ml-2" icon="share-square" circle={true}></Button>
                <Button
                    childRef={moreButton}
                    onClick={() => setPopupShow(true)}
                    className="normal ml-2"
                    icon="more"
                    circle={true}
                ></Button>
                <Popup
                    className="item-popup"
                    target={moreButton.current}
                    show={popupShow}
                    arrowStyle={{ left: `${popupArrowLeft}px` }}
                    onClose={() => setPopupShow(false)}
                >
                    <PopupMenu />
                </Popup>
            </div>
            <div className="link mb-5">
                {twitterUsername ? <a target="_blank" href={`https://twitter.com/${twitterUsername}`}>
                    <Icon icon="twitter" size="sm" className="mr-4" />
                </a> : null}
                {instagramUsername ? <a target="_blank" href={`https://instagram.com/${instagramUsername}`}>
                    <Icon icon="instagram" size="sm" className="mr-4" />
                </a> : null}
                {facebookUsername ? <a target="_blank" href={`https://facebook.com/${facebookUsername}`}>
                    <Icon icon="facebook" size="sm" />
                </a> : null}
            </div>
            <Divider />
            <div className="text-caption-2 neutral-4 mt-5">
                Member since {memberSince}
            </div>
        </div>
    );
}

export default UserPanel;
