import React, { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal'
import ModalStep, {STEP_STATUS} from '../../components/Modal/ModalStep'
import Divider from '../../components/Divider';

const STATUS = {
	CONNECT: "connect",
	PLACEBID: "place-bid",
	FOLLOW: "follow",
}

const ConnectModal = ({onConnect, onClose}) => {
    return (
    <>
        <div className="size-80 bg-primary-2 rounded-circle mb-32 d-flex align-items-center justify-content-center mx-auto">
            <Icon icon="wallet" className="svg-neutral-8" />
        </div>
        <div className="text-body-2-bold mb-32">
            You need to connect your wallet first to sign messages and send transaction to Ethereum network
        </div>
        <div>
            <Button className="large primary w-100 mb-2" onClick={onConnect}>
                Connect wallet
            </Button>
            <Button className="large w-100" onClick={onClose}>Cancel</Button>
        </div>
    </>
    )
}

const PlaceBidModal = ({onPlaceBid, onClose}) => {
    return (
    <>
        <div className="text-body-2-bold mb-32">
            You are about to place a bit for C O I N Z from UI8
        </div>
        <div className="mb-32">
            <div className="text-body-1-bold mb-3">Your bid</div>
            <div className="d-flex justify-content-between mb-12">
                <input type="text" placeholder="Enter bid" className="no-border w-100 bg-neutral-8"></input>
                <div className="text-body-2-bold">ETH</div>
            </div>
            
            <Divider className="mb-12" />

            <div className="d-flex justify-content-between mb-12">
                <div className="text-body-2 neutral-4">Your balance</div>
                <div className="text-body-2-bold">8.498 ETH</div>
            </div>
            <div className="d-flex justify-content-between mb-12">
                <div className="text-body-2 neutral-4">Service fee</div>
                <div className="text-body-2-bold">0 ETH</div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="text-body-2 neutral-4">Total bid amount</div>
                <div className="text-body-2-bold">0 ETH</div>
            </div>
        </div>
        <div>
            <Button className="large primary w-100 mb-2" onClick={onPlaceBid}>
                Place a bid
            </Button>
            <Button className="large w-100" onClick={onClose}>Cancel</Button>
        </div>
    </>
    )
}


function ModalBid({show, onClose}) {
    const [stepStatus, setStepStatus] = useState(STATUS.CONNECT);
    const [title, setTitle] = useState("");    
    const [subStepStatus, setSubStepStatus] = useState([
        STEP_STATUS.START,
        STEP_STATUS.UNREACH,
        STEP_STATUS.UNREACH
    ]);

    const onConnect = () => {
        setStepStatus(STATUS.PLACEBID);
        setTitle("Place a bid")
    }

    const onPlaceBid = () => {
        setStepStatus(STATUS.FOLLOW)
        setTitle("Follow steps")
    }

    const onClickFirstStep = () => {
        let newStepStatus = [...subStepStatus];
        newStepStatus[0] = STEP_STATUS.PROCESSING;
        setSubStepStatus( newStepStatus );
        
        setTimeout(() => {
            let newStepStatus = [...subStepStatus];
            newStepStatus[0] = STEP_STATUS.SUCCESS;
            newStepStatus[1] = STEP_STATUS.START;
            setSubStepStatus( newStepStatus );
        }, 3000)
    }
    
    const onClickSecondStep = () => {
        let newStepStatus = [...subStepStatus];
        if( newStepStatus[1] === STEP_STATUS.CANCELLED) {
            newStepStatus[1] = STEP_STATUS.SUCCESS;
            newStepStatus[2] = STEP_STATUS.START;
        } else {
            newStepStatus[1] = STEP_STATUS.CANCELLED;
        }
        setSubStepStatus( newStepStatus );
    }

    const onClickThirdStep = () => {
        let newStepStatus = [...subStepStatus];
        newStepStatus[2] = STEP_STATUS.SUCCESS;
        setSubStepStatus( newStepStatus );
    }

    useEffect(() => {
        if( show ) {
            setStepStatus(STATUS.CONNECT);
            setTitle("")
        }
    }, [show])

    return (
        <Modal 
            show={show} 
            onClose={onClose}
            title={title}
            className="placebid-modal"
        >
        {stepStatus === STATUS.CONNECT &&
            <ConnectModal onClose={onClose} onConnect={onConnect} />
        } 
        {stepStatus === STATUS.PLACEBID &&
            <PlaceBidModal onClose={onClose} onPlaceBid={onPlaceBid} />
        } 
        {stepStatus === STATUS.FOLLOW &&
        <>
            <ModalStep 
                icon="insert"
                title="Deposit ETH"
                description="Send transaction with your wallet"
                status={subStepStatus[0]}
                onClick={onClickFirstStep}
            />
            
            <ModalStep 
                icon="check"
                title="Approve"
                description="Checking balance and approving"
                status={subStepStatus[1]}
                onClick={onClickSecondStep}
                className="mt-32"
            />

            <ModalStep 
                icon="pencil"
                title="Signature"
                description="Create a signature to place a bit"
                status={subStepStatus[2]}
                onClick={onClickThirdStep}
                className="mt-32"
            />
        </>
        }
        </Modal>
    );
}

export default ModalBid;
