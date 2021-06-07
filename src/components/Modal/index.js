import React from 'react';
import { Modal as BModal } from 'react-bootstrap'
import Icon from '../Icon'
import Button from '../Buttons/Button'

function Modal({
    className = '',
    title = '',
    show = false,
    onClose = () => { },
    closeBtn = true,
    ...props
}) {
    return (
        <BModal show={show} onHide={onClose} className={className}>
            <BModal.Body>
                <div className={"modal-title d-flex align-items-center " + (title === "Wrong network" ? 'justify-content-center' : 'justify-content-between')}>
                    {title === 'Wrong network' ? (
                        <div className="d-flex" style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            {title == 'Wrong network' ? <i className="fas fa-cogs" style={{ fontSize: 32, marginBottom: 6 }}></i> : null}
                            <div className={"text-body-1-bold"}>{title}</div>
                        </div>
                    ) : (
                        <div className={"text-body-1-bold"}>{title}</div>
                    )}
                    {closeBtn ? <Button icon="close" className="normal" circle={true}
                        onClick={onClose} /> : null}
                </div>
                {props.children}
            </BModal.Body>
        </BModal>
    );
}

export default Modal;
