import React, { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Modal from '../../components/Modal'
import Icon from '../../components/Icon';

import axios from '../../utils/Api';

function ModalRemoveSale({ show, onClose, nft, fetchNftItem, multiple }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const myClose = () => {
        onClose();
        setLoading(false);
        setError(false);
        setSuccess(false);
    }

    const onRemove = () => {
        axios.patch(`${multiple ? 'multiple' : 'single'}/${nft.id}`, {
            putSale: false
        }).then((response) => {
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
            title="Remove from sale"
            className="remove-sale-modal"
        >
            {success ? (
                <div>
                    <h2 className="text-center mb-32">Success!</h2>
                    <div className="text-center text-body-2-bold mb-32">
                        You successfully removed on sale this token
                    </div>
                </div>
            ) : <>
                <div className="text-body-2 neutral-4 mb-32">
                    Do you really want to remove your item from sale? You can put it on sale anytime
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
                    <Button disabled={loading ? 'disabled' : null} className="large primary w-100 mb-2" onClick={onRemove}>
                        {loading ? 'Removing...' : 'Remove now'}
                    </Button>
                    {!loading ? <Button className="large w-100" onClick={myClose}>
                        Cancel
                </Button> : null}
                </div>
            </>}
        </Modal>
    );
}

export default ModalRemoveSale;
