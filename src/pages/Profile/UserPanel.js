import React, { useState, useMemo, useEffect, useRef } from 'react';
import Button from '../../components/Buttons/Button'
import Divider from '../../components/Divider'
import Icon from '../../components/Icon'
import { shortenWallet } from '../../helper/utils'
import Popup from '../../components/Popup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function UserPanel({ username, avatar, walletAddress, description = '', url, createdOn, twitterUsername, facebookUsername, instagramUsername, website, bio }) {
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
    }, [])

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
            <img className="profile-photo" src={avatar} />
            <div className="description mb-5">
                <div className="text-body-1-bold mb-1">
                    {username}
                </div>
                <div className="text-button-2" style={{ marginBottom: '20px' }}>
                    <span className="mr-2">{shortenWallet(walletAddress)}</span>
                    <a href="javascript:void(0);" onClick={() => navigator.clipboard.writeText(`http://157.90.232.140/profile/${walletAddress}`).then(() => {
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
                <Button className="primary normal">Follow</Button>
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
