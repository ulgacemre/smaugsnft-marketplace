import React, { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Modal from '../../components/Modal'
import TextArea from '../../components/Input/TextArea'
import { toast, ToastContainer } from 'react-toastify';
import Icon from '../../components/Icon';
import Loading from '../../components/Loading';

import axios from '../../utils/Api';

function ModalReport({ show, onClose, supply, nft_id, walletAddress, connected }) {
    const [txtReport, setTxtReport] = useState('');
    const [sending, setSending] = useState(false);

    const createReport = () => {
        let payload = {
            message: txtReport,
            userId: walletAddress,
            nft721Id: supply === 1 ? nft_id : 0,
            nft1155Id: supply !== 1 ? nft_id : 0
        };
        axios.post("Reports", payload).then(({ data }) => {
            setTxtReport('');
            toast("Thank you for reporting!", {
                autoClose: 5000,
                type: "success",
            });
            setSending(false);
        }).catch((error) => {
            //console.log("CREATE_REPORT_ERROR ===> ", error);
            toast("Something went error!", {
                type: "error",
                autoClose: 5000
            });
        });
    };

    const onSend = () => {
        if (connected) {
            if (txtReport) {
                setSending(true);
                createReport();
            } else {
                toast("Message field cannot be empty!", {
                    autoClose: 5000,
                    type: "error",
                });
            }
        } else {
            window.location.href = "/connect";
        }
    }

    return (
        <>
            <ToastContainer />
            <Modal
                show={show}
                onClose={onClose}
                title="Report"
                className="report-modal"
            >
                <div className="text-body-2 neutral-4 mb-32">
                    Describe why you think this item should be removed from marketplace
            </div>
                <div className="mb-32">
                    <TextArea
                        label="MESSAGE"
                        placeholder="Tell us the details"
                        value={txtReport}
                        onChange={setTxtReport}
                    />
                </div>
                <div>
                    {!sending ? <Button className="large primary w-100 mb-2" onClick={onSend}>
                        Send now
                </Button> : <Button className="large primary w-100 mb-2" >
                        <Loading position="center" loading={sending} size={20} color={"black"} />
                    </Button>}
                    <Button className="large w-100" onClick={onClose}>
                        Cancel
                </Button>
                </div>
            </Modal>
        </>
    );
}

export default ModalReport;
