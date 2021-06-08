import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Button from '../../components/Buttons/Button';
import Divider from '../../components/Divider';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal'
import useWeb3 from '../../shared/hooks/useWeb3';
import axios from '../../utils/Api';

function ModalChangePrice({ show, onClose, nft, fetchNftItem }) {

    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (nft) {
            setPrice(nft.salePrice);
        }
    }, [nft]);

    const onContinue = async () => {
        axios.patch(`single/${nft.id}`, {
            salePrice: parseInt(price),
        }).then(() => {
            setSuccess(true);
            setLoading(false);
            setError(false);

            fetchNftItem(nft.id);

        }).catch((error) => {
            //console.log("ERROR ===> ", error);
            setSuccess(false);
            setLoading(false);
            setError(true);
        });
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Change price"
            className="transfer-token-modal"
        >
            {success ? <div>
                <h2 className="text-center mb-32">Success</h2>
                <div className="text-center text-body-2-bold mb-32">
                    You successfully changed price <br /> {nft.itemName} token
                </div>
            </div> : (
                <>
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
                    <div className="text-body-2 neutral-4 mb-32">
                        Change price token
                    </div>
                    <div className="mb-32">
                        <div className="text-body-1-bold mb-3">
                            Token price
                </div>
                        <input type="number" value={price} onChange={({ target }) => setPrice(target.value)} placeholder="Type token price" className="no-border w-100 bg-neutral-8 mb-12"></input>
                        <Divider />
                    </div>
                    <div>
                        <Button className="large primary w-100 mb-2" disabled={loading ? 'disabled' : null} onClick={onContinue}>
                            {loading ? 'Sending...' : 'Send'}
                        </Button>
                        <Button className="large w-100" onClick={onClose}>
                            Cancel
                </Button>
                    </div>
                </>
            )}
        </Modal>
    );
}

export default ModalChangePrice;
