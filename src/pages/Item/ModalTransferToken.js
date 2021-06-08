import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Button from '../../components/Buttons/Button';
import Divider from '../../components/Divider';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal'
import Context from '../../shared/context/Contracts/Context';
import useWeb3 from '../../shared/hooks/useWeb3';
import axios from '../../utils/Api';

function ModalTransferToken({ show, onClose, nft, fetchNftItem }) {

    const { transferFromERC721 } = useContext(Context);

    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState('');
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [hashAddress, setHashAddress] = useState('');

    const {walletAddress} = useWeb3();

    const onContinue = async () => {
        try {
            setLoading(true);
            const res = await transferFromERC721(walletAddress, address, nft.id);


            setHashAddress(res.hash);

            axios.patch(`single/${nft.id}`, {
                walletAddress: address,
            }).then(() => {
                setSuccess(true);
                setLoading(false);
                setError(false);

                res.wait(res).then((response) => {
                    if (response.status == 1) {
                        setDone(true);

                        fetchNftItem(nft.id);

                    } else {
                        setDone(false);
                        setError(true);
                    }
                });

            }).catch((error) => {
                //console.log("ERROR ===> ", error);
                setSuccess(false);
                setLoading(false);
                setError(true);
            });

        } catch (error) {
            //console.log("transferFromERC721 ===> ", error);
            setSuccess(false);
                setLoading(false);
                setError(true);
        }
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Transfer token"
            className="transfer-token-modal"
        >
            {success ? <div>
                <h2 className="text-center mb-32">Success</h2>
                <div className="text-center text-body-2-bold mb-32">
                    You successfully transferred <br /> {nft.itemName} to {address.slice(0, 13)}...{address.slice(35, 42)}
                </div>
                <div className="purchase-status mb-32">
                    <div className="row">
                        <div className="col-6">
                            <div className="text-caption neutral-4 mb-2">Status</div>
                            {done ? <div className="text-caption-bold green-2">Success</div> :
                                <div className="text-caption-bold primary-2"> Processing</div>}
                        </div>
                        <div className="col-6">
                            <div className="text-caption neutral-4 mb-2">Transaction ID</div>
                            <div className="text-caption-bold overflow-hidden">
                                <a href={`https://testnet.bscscan.com/tx/${hashAddress}`} target="_blank">
                                    {hashAddress.slice(0, 13)}...{hashAddress.slice(35, 42)}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-body-2-bold mb-3">
                        Time to show-off
                </div>
                    <div className="d-flex justify-content-center mb-12">
                        <Button icon="facebook" className="large svg-neutral-4 mr-3" circle={true} />
                        <Button icon="twitter" className="large svg-neutral-4 mr-3" circle={true} />
                        <Button icon="instagram" className="large svg-neutral-4 mr-3" circle={true} />
                        <Button icon="pinterest" className="large svg-neutral-4" circle={true} />
                    </div>
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
                        Transfer token
                    </div>
                    <div className="mb-32">
                        <div className="text-body-1-bold mb-3">
                            Receiver address
                </div>
                        <input type="text" value={address} onChange={({ target }) => setAddress(target.value)} placeholder="Paste address" className="no-border w-100 bg-neutral-8 mb-12"></input>
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

export default ModalTransferToken;
