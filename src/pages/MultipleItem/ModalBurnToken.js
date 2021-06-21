import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Button from '../../components/Buttons/Button';
import Modal from '../../components/Modal'
import Context from '../../shared/context/Contracts/Context';
import axios from '../../utils/Api';
import Icon from '../../components/Icon';
import Divider from '../../components/Divider';
import { toast } from 'react-toastify';

function ModalBurnToken({ show, onClose, tokenId, nft, fetchNftItem }) {

    const { multipleFunctions, burnERC721 } = useContext(Context);
    const [hashAddress, setHashAddress] = useState('');
    const [burnQuantity, setBurnQuantity] = useState('');
    const [done, setDone] = useState(false);
    const [burning, setBurning] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (nft) {
            setBurnQuantity(nft.supply);
        }
    }, [nft]);

    const onContinue = async () => {
        alert('multiple continue!');
    }


    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Burn token"
            allCenter={false}
            className="burn-token-modal"
        >
            {hashAddress !== '' ? (<><div>
                <h2 className="text-center mb-32">Yay! 🎉</h2>
                <div className="text-center text-body-2-bold mb-32">
                    You successfully burned token <br /> {nft.itemName} from {nft.user.displayName}
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
            </div>
            </>) : (
                <>
                    <div className="text-body-2 neutral-4 mb-32">
                        Are you sure to burn this token? This action cannot be undone. Token will be transfered to zero address
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
                    <div className="mb-32">
                        <div className="text-body-1-bold mb-3">
                            Amount of supply to be burned :
                </div>
                        <input type="number" value={burnQuantity} onChange={({ target }) => setBurnQuantity(target.value)} placeholder="Type token price" className="no-border w-100 bg-neutral-8 mb-12"></input>
                        <Divider />
                    </div>
                    <div>
                        <Button disabled={burning ? 'disabled' : null} className="large alert w-100 mb-2" onClick={onContinue}>
                            {burning ? 'Burning...' : 'Burn token'}
                        </Button>
                        <Button className="large w-100" onClick={onClose}>
                            Cancel
                </Button>
                    </div>
                </>
            )
            }
        </Modal >
    );
}

export default ModalBurnToken;
