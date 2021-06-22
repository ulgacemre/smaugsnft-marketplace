import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Button from '../../components/Buttons/Button';
import Divider from '../../components/Divider';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal'
import Context from '../../shared/context/Contracts/Context';
import useWeb3 from '../../shared/hooks/useWeb3';
import axios from '../../utils/Api';
const Web3 = require('web3');

function ModalUnlockData({ show, onClose, nft, fetchNftItem, multiple }) {

    const { multipleFunctions, transferFromERC721 } = useContext(Context);
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [loading, setLoading] = useState(false);
    const [relatedLink, setRelatedLink] = useState('');

    useEffect(() => {
        if (nft) {
            setRelatedLink(nft.unlockData);
        }
    }, [nft]);

    const web3 = new Web3(window.ethereum);


    const onContinue = () => {
        setLoading(true);
        web3.eth.personal.sign('I want to change unlock data link.', nft.walletAddress)
            .then(() => {
                axios.patch(`single/${nft.id}`, {
                    unlockData: relatedLink
                }).then((response) => {
                    setLoading(false);
                    setError(false);
                    setSuccess(true);
                    fetchNftItem(nft.id);
                }).catch((error) => {
                    setLoading(false);
                    setError(true);
                    setSuccess(false);
                });
            }).catch(error => {
                console.log("error**", error);
                setSuccess(false);
                setLoading(false);
                setError(true);
            });

    };

    const myClose = () => {
        setSuccess(false);
        setLoading(false);
        onClose();
    };

    return (
        <Modal
            show={show}
            onClose={myClose}
            title="Unlock data"
            className="transfer-token-modal"
        >
            {success ? <div>
                <h2 className="text-center mb-32">Success</h2>
                <div className="text-center text-body-2-bold mb-32">
                    You successfully updated unlock data link!
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
                    <div className="mb-32">
                        <div className="text-body-1-bold mb-3">
                            Related Link
                        </div>
                        <input type="text" value={relatedLink} onChange={({ target }) => setRelatedLink(target.value)} placeholder="Related link" className="no-border w-100 bg-neutral-8 mb-12"></input>
                        <Divider />
                    </div>
                    <div>
                        <Button className="large primary w-100 mb-2" disabled={loading ? 'disabled' : null} onClick={onContinue}>
                            {loading ? 'Loading...' : 'Continue'}
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

export default ModalUnlockData;
