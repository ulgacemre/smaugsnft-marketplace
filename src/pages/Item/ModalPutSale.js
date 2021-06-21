import React, { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Modal from '../../components/Modal'
import Icon from '../../components/Icon';
import Web3 from 'web3';
import axios from '../../utils/Api';

function ModalPutSale({ show, onClose, nft, fetchNftItem, multiple }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const myClose = () => {
        setError(false);
        setSuccess(false);
        setLoading(false);
        onClose();
    }

    const onPutOnSale = () => {
        const web3 = new Web3(window.ethereum);
        axios.patch(`${multiple ? 'multiple' : 'single'}/${nft.id}`, {
            putSale: true
        }).then((response) => {

            web3.eth.personal.sign('I want to put on sale '+ nft.itemName, nft.walletAddress)
            .then(() => {
            }).catch(error => {
                console.log("error**", error);
            });
            setLoading(false);
            setSuccess(true);
            fetchNftItem(nft.id);
            //console.log("patch_result ===> ", response);
        }).catch(error => {
            //console.log("PUT_SALE_PATCH_ERROR ===> ", error);
            setLoading(false);
            setError(true);
        });
    }

    return (
        <Modal
            show={show}
            onClose={myClose}
            title="Put on sale"
            className="remove-sale-modal"
        >
            {success ? (
                <div>
                    <h2 className="text-center mb-32">Success!</h2>
                    <div className="text-center text-body-2-bold mb-32">
                        You successfully put on sale this token
                    </div>
                </div>
            ) : <>
                <div className="text-body-2 neutral-4 mb-32">
                    Do you really want to put on sale?
            </div>
                {error ? <div className="purchase-caution p-4 mb-3 d-flex">
                    <Icon icon="circle-info" className="svg-primary-3 mr-3" size="lg" />
                    <div>
                        <div className="text-body-2-bold primary-3">
                            Error
                    </div>
                        <div className="text-caption-2 primary-3">
                            Something went error, please try again..
                    </div>
                    </div>
                </div> : null}
                <div>
                    <Button disabled={loading ? 'disabled' : null} className="large primary w-100 mb-2" onClick={onPutOnSale}>
                        {loading ? 'Loading...' : 'Put on sale'}
                    </Button>
                    {!loading ? <Button className="large w-100" onClick={myClose}>
                        Cancel
                </Button> : null}
                </div>
            </>}
        </Modal>
    );
}

export default ModalPutSale;
