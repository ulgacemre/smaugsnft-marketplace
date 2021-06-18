import React, { useEffect } from 'react';
import Layout from '../../components/Layout'
import Button from '../../components/Buttons/Button'
import Divider from '../../components/Divider'
import Icon from '../../components/Icon'
import Link from '../../components/Link'

import imgSingle from '../../assets/images/upload/single.png'
import imgMultiple from '../../assets/images/upload/multiple.png'
import imgSingleSmall from '../../assets/images/upload/single-small.png'
import imgMultipleSmall from '../../assets/images/upload/multiple-small.png'
import { connect } from "react-redux";
import useWeb3 from '../../shared/hooks/useWeb3';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router';



function Upload({ user_info }) {

    const { connected, walletAddress } = useWeb3();
    const history = useHistory();

    const renderCondition = () => {
        if (connected) {
            if (!user_info.displayName) {
                return "/profile/edit";
            } else {
                return "/upload/single";
            }
        } else {
            return "/connect";
        }
    };
    useEffect(() => {
        if (walletAddress) {
            if (walletAddress !== '0xfDCe6A128e22e0a4A98C16F02B3BCbF16f4D8945') {
                history.push("/404");
            }
        } else {
            history.push("/404");
        }
    }, [walletAddress]);
    const renderConditionMultiple = () => {
        if (connected) {
            if (!user_info.displayName) {
                return "/profile/edit";
            } else {
                return "/upload/multiple";
            }
        } else {
            return "/connect";
        }
    };

    return (
        <Layout page="upload">
            <ToastContainer />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center py-4">
                    <Link href="/">
                        <Button className="normal" icon="arrow-left" iconPos="left">
                            Back to home
                        </Button>
                    </Link>

                    <div className="d-none d-lg-block text-button-2">
                        <span className="neutral-4">Home</span>
                        <span className="size-40 mx-4">
                            <Icon icon="chevron-right" />
                        </span>
                        <span>Upload Item</span>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="content container">
                <div className="section section-title mx-auto text-center">
                    <h2 className="mb-3">Upload item</h2>
                    <div className="text-neutral-4 text-caption">
                        Choose <b>“Single”</b> if you want your collectible to be one of a kind or <b>“Multiple”</b> if you want to sell one collectible multiple times
                    </div>
                </div>
                <div className="section section-content text-center">
                    <div className="d-none d-lg-flex justify-content-center">
                        <div className="card-upload-type">
                            <img src={imgSingle} className="mb-4" />
                            <Link href={renderCondition()}>
                                <Button className="normal m-auto">Create Single</Button>
                            </Link>
                        </div>
                        <div className="card-upload-type ml-32">
                            <img src={imgMultiple} className="mb-4" />
                            <Link href={renderConditionMultiple()}>
                                <Button className="primary normal m-auto">Create Multiple</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="d-block d-lg-none">
                        <div className="list-upload-type d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img src={imgSingleSmall} />
                                <div className="text-body-2-bold">Create Single</div>
                            </div>
                            <div className="d-flex align-items-center size-40 pointer">
                                <Link href={renderCondition()}>
                                    <Icon icon="chevron-right" iconsize="sm" />
                                </Link>
                            </div>
                        </div>
                        <Divider className="mt-32 mb-32" />
                        <div className="list-upload-type d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img src={imgMultipleSmall} />
                                <div className="text-body-2-bold">Create Multiple</div>
                            </div>
                            <div className="d-flex align-items-center size-40 pointer">
                                <Link href={renderConditionMultiple()}>
                                    <Icon icon="chevron-right" iconsize="sm" />
                                </Link>
                            </div>
                        </div>
                        <Divider className="mt-32" />
                    </div>
                    <div className="text-caption-2 neutral-4 mt-32">
                        We do not own your private keys and cannot access your funds without your confirmation.
                    </div>
                </div>
            </div>
        </Layout>
    );
}
const mapStateToProps = ({ user }) => {
    const { user_info } = user;
    return { user_info: user_info }
};
export default connect(mapStateToProps)(Upload);