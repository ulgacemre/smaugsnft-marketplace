import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Modal from '../../components/Modal'
import ModalStep, { STEP_STATUS } from '../../components/Modal/ModalStep'
import { createNFT, setNFTCreated } from '../../store/actions/NFTS'
import useWeb3 from '../../shared/hooks/useWeb3'
import Web3 from 'web3';
import { useHistory } from 'react-router';

function ModalCreateItem({ show, onClose, isSingle, mintERC721, isCreated, setCreated, uploadInfo, currentNFT, createNFT }) {
    const [routerTokenId, setRouterTokenId] = useState('');
    const history = useHistory();
    const [stepStatus, setStepStatus] = useState([
        STEP_STATUS.START,
        STEP_STATUS.UNREACH,
        STEP_STATUS.UNREACH
    ]);

    const { walletAddress } = useWeb3()

    useEffect(() => {
        if (isCreated) {
            let newStepStatus = [...stepStatus];
            newStepStatus[0] = STEP_STATUS.SUCCESS;
            newStepStatus[1] = STEP_STATUS.START;
            setStepStatus(newStepStatus);
        }
    }, [isCreated])


    const onClickFirstStep = () => {
        let newStepStatus = [...stepStatus];

        setCreated(false);

        createNFT({
            isSingle,
            nft_info: {
                itemName: uploadInfo.itemName,
                description: uploadInfo.itemDescription,
                salePrice: uploadInfo.itemPrice,
                royalties: uploadInfo.itemRoyalties,
                size: uploadInfo.itemSize,
                property: uploadInfo.itemProperty,
                putSale: uploadInfo.putOnSale,
                property: uploadInfo.itemProperty,
                walletAddress: walletAddress,
                creatorId: walletAddress,
                categoryId: uploadInfo.itemCategory
            },
            imageFile: uploadInfo.uploadImageFile
        });

        newStepStatus[0] = STEP_STATUS.PROCESSING;
        setStepStatus(newStepStatus);
    }

    const onClickThirdStep = () => {
        let newStepStatus = [...stepStatus];
        newStepStatus[1] = STEP_STATUS.SUCCESS;
        newStepStatus[2] = STEP_STATUS.PROCESSING;
        setStepStatus(newStepStatus);

        console.log("SECOND_STEP RUNNING");

        const web3 = new Web3(window.ethereum);



        web3.eth.personal.sign(
            "This is a test msg to be signed.",
            "0xfDCe6A128e22e0a4A98C16F02B3BCbF16f4D8945",
            function (err, sig) {
                let newStepStatus = [...stepStatus];
                newStepStatus[2] = STEP_STATUS.SUCCESS;
                setStepStatus(newStepStatus);
                history.push(`/assets/0xff506c7e01a03bb97e3318f28254cb6ef8fe8621/${localStorage.getItem("3295893275832758235")}`)
                /*
                 let newStepStatus = [...stepStatus];
        newStepStatus[2] = STEP_STATUS.FAILED;
        setStepStatus(newStepStatus);
                */
            });


    }

    const onClickMintStep = async () => {
        let newStepStatus = [...stepStatus];
        newStepStatus[0] = STEP_STATUS.SUCCESS;
        newStepStatus[1] = STEP_STATUS.PROCESSING;
        setStepStatus(newStepStatus);
        try {
            await mintERC721(localStorage.getItem("3295893275832758235"), [[walletAddress, 10], [walletAddress, 20]], "http://116.203.189.226:3000/api/single/" + localStorage.getItem("3295893275832758235"));
            let newStepStatus = [...stepStatus];
            newStepStatus[1] = STEP_STATUS.SUCCESS;
            newStepStatus[2] = STEP_STATUS.START;
            setStepStatus(newStepStatus);



        } catch (error) {
            let newStepStatus = [...stepStatus];
            newStepStatus[1] = STEP_STATUS.FAILED;
            setStepStatus(newStepStatus);
        }
    };


    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Follow steps"
            className="create-item-modal"
        >
            <ModalStep
                icon="file-upload"
                title="Upload files"
                description="Call contract method"
                status={stepStatus[0]}
                onClick={onClickFirstStep}
            />

            <ModalStep
                icon="pencil"
                title="Mint token"
                description="Sign lock order using your wallet"
                status={stepStatus[1]}
                onClick={onClickMintStep}
                className="mt-32"
            />

            <ModalStep
                icon="check"
                title="Sign Create order"
                description="Sign Create order using your wallet"
                status={stepStatus[2]}
                onClick={onClickThirdStep}
                className="mt-32"
            />



        </Modal>
    );
}


const mapStateToProps = ({ nfts }) => {
    const { currentNFT, isCreated } = nfts;
    return { currentNFT, isCreated }
};
const mapDispatchToProps = (dispatch) => {
    return {
        createNFT: (payload) => dispatch(createNFT(payload)),
        setCreated: (payload) => dispatch(setNFTCreated(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateItem);