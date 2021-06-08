import React, { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Modal from '../../components/Modal'
import Icon from '../../components/Icon';
import './share-links.scss';
import { toast, ToastContainer } from 'react-toastify';

import axios from '../../utils/Api';
import Link from '../../components/Link';

function ModalShareLinks({ show, onClose, nft }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const myClose = () => {
        onClose();
        setLoading(false);
        setError(false);
        setSuccess(false);
    }

    return (
        <Modal
            show={show}
            onClose={myClose}
            title="Share this token"
            className="remove-sale-modal"
        >

            <ToastContainer />

            <div className="social">
                <div className="item">
                    <Link
                        href={`http://twitter.com/share?url=http://157.90.232.140/assets/0xff506c7e01a03bb97e3318f28254cb6ef8fe8621/${nft.id}&text=The Best Ever collectible &hashtags=#smaugsnft,#nft,#bsc,#digitalasset,@smaugsnft`}
                        target="_blank"
                    >
                        <i className="fab fa-twitter"></i>
                    </Link>

                    <span>Twitter</span>
                </div>
                <div className="item">
                    <Link target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=http://157.90.232.140/assets/0xff506c7e01a03bb97e3318f28254cb6ef8fe8621/${nft.id}`}>
                        <i className="fab fa-facebook"></i>
                    </Link>
                    <span>Facebook</span>
                </div>
                <div className="item">
                    <Link target="_blank" href={`https://telegram.me/share/?url=http://157.90.232.140/assets/0xff506c7e01a03bb97e3318f28254cb6ef8fe8621/${nft.id}`}><i className="fab fa-telegram"></i></Link>
                    <span>Telegram</span>
                </div>
                <div className="item">
                    <i onClick={() => navigator.clipboard.writeText(`http://157.90.232.140/assets/0xff506c7e01a03bb97e3318f28254cb6ef8fe8621/${nft.id}`).then(() => {
                        toast.info('NFT token link copied.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                    })} className="fas fa-clipboard"></i>
                    <span>Copy link</span>
                </div>
            </div>
        </Modal>
    );
}

export default ModalShareLinks;
