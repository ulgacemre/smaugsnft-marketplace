import React, { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal'
import ModalStep, {STEP_STATUS} from '../../components/Modal/ModalStep'
import Divider from '../../components/Divider';
import Switch from '../../components/Input/Switch';

const STATUS = {
	START: "start",
	FOLLOW: "follow",
}


const PutSaleModal = ({onContinue, onClose}) => {
    const [showInfo, setShowInfo] = useState(false)
    return (
    <>
        <div className="d-flex mb-32">
            <div className="size-48 bg-primary-2 rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                <Icon icon="coin" size="sm" className="svg-neutral-8" />
            </div>
            <div className="ml-3">
                <div className="text-body-2">Instant sale price</div>
                <div className="text-caption neutral-4">Enter the price for which the item will be instanly sold</div>
            </div>
            <Switch className="ml-3 small" value={showInfo} onChange={setShowInfo}/>
        </div>

        {showInfo &&
        <div className="mb-32">
            <div className="d-flex justify-content-between mb-12">
                <input type="text" placeholder="Enter your price" className="no-border w-100 bg-neutral-8"></input>
                <div className="text-body-2-bold">ETH</div>
            </div>
            
            <Divider className="mb-12" />

            <div className="d-flex justify-content-between mb-12">
                <div className="text-body-2 neutral-4">Service fee</div>
                <div className="text-body-2-bold">1.5 %</div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="text-body-2 neutral-4">Total bid amount</div>
                <div className="text-body-2-bold">0 ETH</div>
            </div>
        </div>
        }

        <div>
            <Button className="large primary w-100 mb-2" onClick={onContinue}>
                Continue
            </Button>
            <Button className="large w-100" onClick={onClose}>
                Cancel
            </Button>
        </div>
    </>
    )
}


function ModalSale({show, onClose}) {
    const [stepStatus, setStepStatus] = useState(STATUS.START);
    const [title, setTitle] = useState("");    
    const [subStepStatus, setSubStepStatus] = useState([
        STEP_STATUS.START,
        STEP_STATUS.UNREACH
    ]);

    const onContinue = () => {
        setStepStatus(STATUS.FOLLOW)
        setTitle("Follow steps")
    }

    const onClickFirstStep = () => {
        let newStepStatus = [...subStepStatus];
        if( newStepStatus[0] === STEP_STATUS.START ) {
            newStepStatus[0] = STEP_STATUS.PROCESSING;
            setSubStepStatus( newStepStatus );
            
            setTimeout(() => {
                let newStepStatus = [...subStepStatus];
                newStepStatus[0] = STEP_STATUS.FAILED;
                setSubStepStatus( newStepStatus );
            }, 3000)
        } else if (newStepStatus[0] === STEP_STATUS.FAILED) {            
            newStepStatus[0] = STEP_STATUS.SUCCESS;
            newStepStatus[1] = STEP_STATUS.START;
            setSubStepStatus( newStepStatus );
        }
    }
    
    const onClickSecondStep = () => {
        let newStepStatus = [...subStepStatus];                 
        newStepStatus[1] = STEP_STATUS.SUCCESS;
        setSubStepStatus( newStepStatus );
    }

    useEffect(() => {
        if( show ) {
            setStepStatus(STATUS.START);
            setTitle("")
        }
    }, [show])

    return (
        <Modal 
            show={show} 
            onClose={onClose}
            title={title}
            className="sale-modal"
        >
        {stepStatus === STATUS.START &&
            <PutSaleModal onClose={onClose} onContinue={onContinue} />
        } 
        {stepStatus === STATUS.FOLLOW &&
        <>
            <ModalStep 
                icon="check"
                title="Approve"
                description="Approve perfoming transactions with your wallet"
                status={subStepStatus[0]}
                onClick={onClickFirstStep}
            />
            
            <ModalStep 
                icon="pencil"
                title="Sign sell order"
                description="Sign sell order using your wallet"
                status={subStepStatus[1]}
                onClick={onClickSecondStep}
                className="mt-32"
            />
        </>
        }
        </Modal>
    );
}

export default ModalSale;
