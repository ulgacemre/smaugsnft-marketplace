import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Modal from '../../components/Modal'
import ModalStep, { STEP_STATUS } from '../../components/Modal/ModalStep'
import { createNFT, setNFTCreated } from '../../store/actions/NFTS'
import useWeb3 from '../../shared/hooks/useWeb3'
import Web3 from 'web3';
import { useHistory } from 'react-router';
import { useContext } from 'react';
import Context from '../../shared/context/Contracts/Context';
import { API_URL } from '../../constants/config';

function ModalCreateItem({ show, onClose, mintERC721, isCreated, setCreated, uploadInfo, createNFTMultiple, isSingle, createNFT }) {
    const history = useHistory();
    const [stepStatus, setStepStatus] = useState([
        STEP_STATUS.START,
        STEP_STATUS.UNREACH,
        STEP_STATUS.UNREACH
    ]);

    const { walletAddress } = useWeb3()

    const { multipleFunctions } = useContext(Context);


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

        if (isSingle) {
            createNFT({
                nft_info: {
                    itemName: uploadInfo.itemName,
                    description: uploadInfo.itemDescription,
                    salePrice: uploadInfo.itemPrice,
                    royalties: uploadInfo.itemRoyalties,
                    size: uploadInfo.itemSize,
                    property: uploadInfo.itemProperty,
                    putSale: uploadInfo.putOnSale,
                    walletAddress: walletAddress,
                    creatorId: walletAddress,
                    categoryId: uploadInfo.itemCategory
                },
                imageFile: uploadInfo.uploadImageFile
            });
        } else {
            createNFTMultiple({
                nft_info: {
                    itemName: uploadInfo.itemName,
                    description: uploadInfo.itemDescription,
                    salePrice: uploadInfo.itemPrice,
                    royalties: uploadInfo.itemRoyalties,
                    size: uploadInfo.itemSize,
                    putSale: uploadInfo.putOnSale,
                    property: "",
                    walletAddress: walletAddress,
                    creatorId: walletAddress,
                    categoryId: uploadInfo.itemCategory,
                    supply: uploadInfo.itemSupply
                },
                imageFile: uploadInfo.uploadImageFile
            }).then((response) => {
                if (response.success) {
                    setCreated(true);
                    localStorage.setItem("3295893275832758235", response.success.id);
                } else {
                    let newStepStatus = [...stepStatus];
                    newStepStatus[0] = STEP_STATUS.FAILED;
                    setStepStatus(newStepStatus);
                }
            });
        }

        newStepStatus[0] = STEP_STATUS.PROCESSING;
        setStepStatus(newStepStatus);
    }

    const onClickThirdStep = () => {
        let newStepStatus = [...stepStatus];
        newStepStatus[1] = STEP_STATUS.SUCCESS;
        newStepStatus[2] = STEP_STATUS.PROCESSING;
        setStepStatus(newStepStatus);
        // console.log("SECOND_STEP RUNNING");
        const web3 = new Web3(window.ethereum);
        web3.eth.personal.sign(isSingle ? 'I agree to create single NFT token.' : 'I agree to create multiple NFT token.', walletAddress)
            .then(() => {
                let newStepStatus = [...stepStatus];
                newStepStatus[2] = STEP_STATUS.SUCCESS;
                setStepStatus(newStepStatus);
                window.location.href = `/assets/0xff506c7e01a03bb97e3318f28254cb6ef8fe8621/${localStorage.getItem("3295893275832758235")}`;
            }).catch(error => {
                console.log("error**", error);
            });
    }

    const onClickMintStep = async () => {
        let newStepStatus = [...stepStatus];
        newStepStatus[0] = STEP_STATUS.SUCCESS;
        newStepStatus[1] = STEP_STATUS.PROCESSING;
        setStepStatus(newStepStatus);
        try {
            if (isSingle) {
                await mintERC721(localStorage.getItem("3295893275832758235"), [[walletAddress, 10], [walletAddress, 20]], `${API_URL}multiple/${localStorage.getItem("3295893275832758235")}`);
            } else {
                await multipleFunctions.multipleMintERC1155(localStorage.getItem("3295893275832758235"), [[walletAddress, 10], [walletAddress, 20]], uploadInfo.itemSupply, `${API_URL}multiple/${localStorage.getItem("3295893275832758235")}`);
            }
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







