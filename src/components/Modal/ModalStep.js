
import Button from '../../components/Buttons/Button';
import Icon from '../../components/Icon';
import imgProcessing from '../../assets/images/processing.svg'

export const STEP_STATUS = {
    UNREACH: "unreach",
	START: "start",
	PROCESSING: "processing",
	SUCCESS: "success",
	FAILED: "failed",
	CANCELLED: "cancelled",
}

export default function ModalStep({className='', icon, title='', description='', status=STEP_STATUS.UNREACH, onClick }) {

    return (
        <div className={className}>
            <div className="d-flex align-items-center mb-3">
                <div className={"modal-step-icon " + status}>
                    {(status === STEP_STATUS.UNREACH || status === STEP_STATUS.START || status === STEP_STATUS.FAILED || status === STEP_STATUS.CANCELLED) && 
                        <Icon icon={icon} />
                    }
                    {status === STEP_STATUS.SUCCESS &&
                        <Icon icon="check" />
                    }
                    {status === STEP_STATUS.PROCESSING &&
                        <img src={imgProcessing} className="w-100 processing" />
                    }
                </div>

                <div style={{marginLeft: '20px'}}>
                    <div className="text-body-2-bold mb-1">{title}</div>
                    <div className="text-caption-2">{description}</div>
                </div>                
            </div>
            {status === STEP_STATUS.UNREACH &&
                <Button className="large primary w-100" disabled onClick={onClick}>
                    Start Now
                </Button>
            }
            {status === STEP_STATUS.START &&
                <Button className="large primary w-100" onClick={onClick}>
                    Start Now
                </Button>
            }
            {status === STEP_STATUS.PROCESSING && 
                <Button className="large primary w-100" onClick={onClick} >
                    <Icon icon="loading"/>
                </Button>
            }                
            {status === STEP_STATUS.SUCCESS &&
                <Button className="large w-100" disabled onClick={onClick} >
                    Done
                </Button>
            }
            {status === STEP_STATUS.FAILED && 
            <>
                <Button className="large normal failed w-100" onClick={onClick} >
                    Failed
                </Button>
                <div className="text-caption-2 neutral-4 mt-3"> 
                    Something went wrong, please <span className="primary-1 pointer" onClick={onClick}>try again</span>
                </div>
            </>
            } 
            {status === STEP_STATUS.CANCELLED && 
            <>
                <Button className="large normal failed w-100" >
                    Cancelled
                </Button>
                <div className="text-caption-2 neutral-4 mt-3"> 
                    Something went wrong, please <span className="primary-1 pointer" onClick={onClick}>try again</span>
                </div>
            </>
            } 
            
        </div>
    )
}
