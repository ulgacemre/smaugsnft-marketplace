import React, { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal'
import ModalStep, {STEP_STATUS} from '../../components/Modal/ModalStep'
import Divider from '../../components/Divider';

const STATUS = {
	ACCEPT: "accept",
	FOLLOW: "follow",
}

const AcceptModal = ({onAccept, onClose}) => {
    return (
    <>
        <div className="d-flex align-items-center mb-32">
            <div className="size-48 bg-primary-4 rounded-circle flex-shrink-0"></div>
            <div className="text-body-2 ml-3">
                You are about to accept a bid for <br/>
                <b>C O I N Z</b> from <b>UI8</b>
            </div>
        </div>
        <div className="mb-32">
            <div className="text-body-1-bold mb-3">1.46 ETH for 1 edition</div>

            <Divider className="mb-12" />

            <div className="d-flex justify-content-between mb-12">
                <div className="text-body-2 neutral-4">Service fee</div>
                <div className="text-body-2-bold">0 ETH</div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="text-body-2 neutral-4">Total bid amount</div>
                <div className="text-body-2-bold">1.46 ETH</div>
            </div>
        </div>
        <div>
            <Button className="large primary w-100 mb-2" onClick={onAccept}>
                Accept a bid
            </Button>
            <Button className="large w-100" onClick={onClose}>Cancel</Button>
        </div>
    </>
    )
}


function ModalAccept({show, onClose}) {
    const [stepStatus, setStepStatus] = useState(STATUS.ACCEPT);
    const [title, setTitle] = useState("");    
    const [subStepStatus, setSubStepStatus] = useState([
        STEP_STATUS.START,
    ]);

    const onAccept = () => {
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
            setSubStepStatus( newStepStatus );
        }, 3000)
    }
    
    useEffect(() => {
        if( show ) {
            setStepStatus(STATUS.ACCEPT);
            setTitle("")
        }
    }, [show])

    return (
        <Modal 
            show={show} 
            onClose={onClose}
            title={title}
            className="accept-modal"
        >
        {stepStatus === STATUS.ACCEPT &&
            <AcceptModal onClose={onClose} onAccept={onAccept} />
        }
        {stepStatus === STATUS.FOLLOW &&
        <>
            <ModalStep 
                icon="insert"
                title="Accept bid"
                description="Send transaction with your wallet"
                status={subStepStatus[0]}
                onClick={onClickFirstStep}
            />
        </>
        }
        </Modal>
    );
}

export default ModalAccept;
