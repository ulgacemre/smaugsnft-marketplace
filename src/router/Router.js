import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
/* Pages */
import Home from "../pages/Home/index";
import Upload from "../pages/Upload";
import UploadSingle from "../pages/Upload/Single";
import ConnectWallet from "../pages/ConnectWallet";
import Profile from "../pages/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import Activity from '../pages/Activity';
import Search from '../pages/Search';
import SearchNoResult from '../pages/Search/SearchNoResult';
import Item from '../pages/Item';
import Test from '../pages/Test';
import useWeb3 from '../shared/hooks/useWeb3';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import CategoryNfts from '../pages/CategoryNfts';

import Web3 from 'web3';

function Router() {

    const [loading, setLoading] = useState("true");
    const [error, setError] = useState("false");

    useEffect(() => {
        if (window.web3) {


            setTimeout(() => {
                if (window.web3.currentProvider.chainId === "0x61") {
                    setError("false");
                    setLoading("false");
                } else {
                    setError("true");
                    setLoading("false");
                }
            }, 1200);


        }
    }, [window.web3]);



    return (
        <>
            {loading === "true" ? (
                <div className="container py-5">
                    <Loading loading={loading} size={55} color="black" position="center" />
                </div>
            ) : (
                error === "true" ? (
                    <Modal
                        show={error === "true" ? true : false}
                        closeBtn={false}
                        title="Wrong network"
                    >
                        <p>
                            Please change your network to Binance Smart Chain Testnet
            </p>
                    </Modal>
                ) : (
                    <BrowserRouter>
                        <Fragment>
                            <Switch>
                                <Route exact path="/" component={Home} />



                                <Route exact path="/upload/single" render={(props) => (
                                    <UploadSingle {...props} isSingle={true} />
                                )} />
                                {/*
<Route exact path="/upload/multiple" render={(props) => (
    <UploadSingle {...props} isSingle={false} />
)} />
*/}
                                <Route exact path="/upload" component={Upload} />

                                <Route exact path="/search" component={Search} />
                                <Route exact path="/collection/:categoryId" component={CategoryNfts} />
                                <Route exact path="/connect" component={ConnectWallet} />
                                <Route exact path="/profile/edit" component={EditProfile} />
                                <Route exact path="/profile/:address" component={Profile} />
                                <Route exact path="/activity" component={Activity} />
                                <Route exact path="/test" component={Test} />
                                <Route exact path="/assets/0xff506c7e01a03bb97e3318f28254cb6ef8fe8621/:nft_id" render={(props) => (
                                    <Item {...props} type="purchase" />
                                )} />
                                <Route exact path="/item/accept" render={(props) => (
                                    <Item {...props} type="accept" />
                                )} />
                                <Route exact path="/item/putonsale" render={(props) => (
                                    <Item {...props} type="putonsale" />
                                )} />
                                <Redirect path="/assets" to="/assets/0xff506c7e01a03bb97e3318f28254cb6ef8fe8621/:nft_id" />
                                <Route exact component={SearchNoResult} />
                            </Switch>
                        </Fragment>
                    </BrowserRouter>
                )
            )}

        </>
    );




}

export default Router;
