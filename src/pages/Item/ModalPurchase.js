import React, { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal'
import Divider from '../../components/Divider';
import imgProcessing from '../../assets/images/processing.svg'
import useWeb3 from '../../shared/hooks/useWeb3';
import CheckBox from '../../components/Input/CheckBox';
import axios from '../../utils/Api';
import Loading from '../../components/Loading';
const STATUS = {
    START: "start",
    PROCESSING: "processing",
    SUCCESS: "success",
}

function ModalPurchase({ show, onClose, data, commisionPrice, fetchNftItem }) {
    // approver states end
    const { walletSMGBalance, walletAddress, approveSMG, transferFromSMG, transfer } = useWeb3();
    // buying
    const [buyingError, setBuyingError] = useState(false);

    const [stepStatus, setStepStatus] = useState(STATUS.START);
    const [title, setTitle] = useState("Checkout");
    // approver states
    const [approverStatus, setApproverStatus] = useState(false);
    const [mustApproverStatus, setMustApproverStatus] = useState(false);
    const [sending, setSending] = useState(false);
    const [approveError, setApproveError] = useState(false);

    const [done, setDone] = useState(false);
    const [hashAddress, setHashAddress] = useState('');

    const myClose = () => {
        setApproverStatus(false)
        setMustApproverStatus(false);
        setSending(false);
        setApproveError(false);
        setBuyingError(false);
        setTitle("Checkout")
        onClose();
    };


    const otherSendAddressSMG = async (address, noComissionPrice) => {
        try {

            const res = await transfer(address, noComissionPrice);
            return res;
        } catch (error) {
            //console.log("otherSendAddressSMG_error ===> ", error)
        }
    };


    const buyNow = async () => {
       
        try {
            // data.walletAddress "transferFromSMG" 'to' field.........

          
            const res = await otherSendAddressSMG(data.walletAddress, data.salePrice * 10 ** 8);

            //otherSendAddressSMG("0x8De5021b533ef04C5f2e6875cd473223D42669b9",(commisionPrice() - data.salePrice).toFixed(2) * 10 ** 8);

            axios.patch(`single/${data.id}`, {
                walletAddress: walletAddress,
                putSale: false 
            }).then(({ data }) => {

                if (res) {
                    setHashAddress(res.hash);
                    setDone(false);
                    res.wait(res).then((response) => {
                        //console.log(response);
                        if (response.status == 1) {
                            setDone(true);
                        } else {
                            setDone(false);
                        }
                    })
                }

                fetchNftItem(data.id);

                setBuyingError(false);
                setStepStatus(STATUS.SUCCESS)
                setTitle("")
                setSending(false);
            }).catch(error => {
                //console.log("PATCH_NEW_NFT_TOKEN_error ===> ", error)
            });
        } catch (error) {
            setBuyingError(true);
            setSending(false);
        }


    }

    /*
    const approve = async () => {
        try {
            const response = await approveSMG(parseInt(commisionPrice()) * 10 ** 8);

           
            setApproveError(false);
            return response;
        } catch (error) {
            console.log(error);
        }
    };
*/

    const onContinue = async () => {
        setApproveError(false);
        if (title === "Checkout") {
            if (!approverStatus) {
                setMustApproverStatus(true);
            } else {

                setSending(true);

                approveSMG(parseInt(commisionPrice()) * 10 ** 8).then(() => {
                    //console.log("apppppp",approveError);
                    if (approveError == false) 
                        buyNow();
                })

            }


        }
    }

    useEffect(() => {
        if (show) {
            setStepStatus(STATUS.START);
            setTitle("Checkout")
        }
    }, [show])



    const renderContent = () => {
        if (title === "Checkout") {
            return (
                <>
                    <div className="text-body-2-bold mb-32">
                        You are about to purchase {data.itemName} from {data.user.displayName}
                    </div>
                    <div className="purchase-info mb-32">
                        <div className="d-flex justify-content-between">
                            <div className="text-body-2-bold">{commisionPrice()}</div>
                            <div className="text-body-2-bold">SMG</div>
                        </div>
                        <Divider className="mt-12" />
                        <div className="d-flex justify-content-between mt-12">
                            <div className="text-body-2">Your balance</div>
                            <div className="text-body-2-bold">{parseInt(walletSMGBalance)} SMG</div>
                        </div>
                        <div className="d-flex justify-content-between mt-12">
                            <div className="text-body-2">Service fee</div>
                            <div className="text-body-2-bold">{(commisionPrice() - data.salePrice).toFixed(2)} SMG</div>
                        </div>
                        <div className="d-flex justify-content-between mt-12">
                            <div className="text-body-2">You will pay</div>
                            <div className="text-body-2-bold">{commisionPrice()} SMG</div>
                        </div>
                    </div>
                    {parseInt(walletSMGBalance) >= parseInt(commisionPrice()) ? <CheckBox
                        title={`I accept the commission amount of ${(commisionPrice() - data.salePrice).toFixed(2)} SMG.`}
                        className="mb-12"
                        required={mustApproverStatus}
                        value={approverStatus}
                        onChange={(val) => {
                            setMustApproverStatus(false);
                            setApproverStatus(val);
                        }}
                    /> : <div className="purchase-caution p-4 mb-3 d-flex">
                        <Icon icon="circle-info" className="svg-primary-3 mr-3" size="lg" />
                        <div>
                            <div className="text-body-2-bold primary-3">
                                Insufficient Balance
                    </div>
                        </div>
                    </div>}

                    {approveError || buyingError ? <div className="purchase-caution p-4 mb-3 d-flex">
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
                    <div className="">
                        {sending ? <Button
                            className="large primary w-100 mb-2"
                            disabled={true}
                            style={{ cursor: "not-allowed" }}
                        >
                            <img src={imgProcessing} className="size-20 processing" style={{ marginRight: '20px' }} /> Approving and purchasing now...
                </Button> : <Button
                            className="large primary w-100 mb-2"
                            onClick={() => parseInt(walletSMGBalance) >= parseInt(commisionPrice()) ? onContinue() : null}
                            style={parseInt(walletSMGBalance) >= parseInt(commisionPrice()) ? { cursor: "pointer" } : { cursor: "not-allowed" }}
                        >
                            Approve and purchase
                </Button>}
                        <Button className="large w-100" onClick={myClose}>Cancel</Button>
                    </div>
                </>
            )
        }
    };





    return (
        <Modal
            show={show}
            onClose={myClose}
            title={title}
            className="purchase-modal"
        >
            {(stepStatus === STATUS.START || stepStatus === STATUS.PROCESSING) &&
                <>
                    {renderContent()}

                    {/* 
                    <div className="purchase-caution p-4 mb-32 d-flex">
                        <Icon icon="circle-info" className="svg-primary-3 mr-3" size="lg" />
                        <div>
                            <div className="text-body-2-bold primary-3">
                                This creator is not verified
                    </div>
                            <div className="text-caption-2 primary-3">
                                Purchase this item at your own risk
                    </div>
                        </div>
                    </div>
                    */}


                </>
            }
            {stepStatus === STATUS.SUCCESS &&
                <div>
                    <h2 className="text-center mb-32">Yay! 🎉</h2>
                    <div className="text-center text-body-2-bold mb-32">
                        You successfully purchased <br /> {data.itemName} from {data.user.displayName}
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
            }
        </Modal>
    );
}

export default ModalPurchase;
