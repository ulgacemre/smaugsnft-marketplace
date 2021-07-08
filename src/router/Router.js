import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
/* Pages */
import Home from "../pages/Home/index";
import Upload from "../pages/Upload";
import UploadSingle from "../pages/Upload/Single";
import UploadMultiple from "../pages/Upload/Multiple";
import ConnectWallet from "../pages/ConnectWallet";
import Profile from "../pages/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import Activity from '../pages/Activity';
import Search from '../pages/Search';
import SearchNoResult from '../pages/Search/SearchNoResult';
import Item from '../pages/Item';
import useWeb3 from '../shared/hooks/useWeb3';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import CategoryNfts from '../pages/CategoryNfts';

import Web3 from 'web3';
import MultipleSoon from '../pages/Upload/MultipleSoon';
import MultipleItem from '../pages/MultipleItem';
import Multiple from '../pages/Upload/Multiple';
import addresses from '../shared/addresses';
import AddCollection from '../pages/AddCollection';

function Router() {

    const [loading, setLoading] = useState("true");
    const [error, setError] = useState("false");

    useEffect(() => {
        if (window.web3) {


            setTimeout(() => {
                if (window.web3.currentProvider.networkVersion === "56") {
                    setError("false");
                    setLoading("false");
                } else if (window.web3.currentProvider.networkVersion !== "56") {
                    setError("true");
                    setLoading("false");
                } else {
                    setError("false");
                    setLoading("false");
                }
            }, 1200);


        } else {
            setError("false");
            setLoading("false");
        }
    }, [window.web3]);



    return (
        <>
            {loading === "true" ? (
                <div className="container py-5">
                    <Loading loading={loading} size={55} color="black" position="center" />
                </div>
            ) : (
                    <BrowserRouter>
                        <Fragment>
                            <Switch>
                                <Route exact path="/" component={Home} />



                                <Route exact path="/upload/single" render={(props) => (
                                    <UploadSingle {...props} isSingle={true} />
                                )} />
                                <Route exact path="/add-collection" component={AddCollection} />

                                <Route exact path="/upload/multiple" render={(props) => (
                                    <UploadMultiple {...props} isSingle={false} />
                                )} />
                                {/*<Route exact path="/upload/multiple" component={MultipleSoon} />*/}
                                <Route exact path="/upload" component={Upload} />

                                <Route exact path="/search" component={Search} />
                                <Route exact path="/collection/:categoryId" component={CategoryNfts} />
                                {/*<Route exact path="/connect" component={ConnectWallet} /> */}
                                <Route exact path="/profile/edit" component={EditProfile} />
                                <Route exact path="/profile/:address" component={Profile} />
                                <Route exact path="/activity" component={Activity} />
                                <Route exact path={`/assets/${addresses.ERC721}/:nft_id`} render={(props) => (
                                    <Item {...props} multiple={false} type="purchase" />
                                )} />
                                <Route exact path="/assets/0x39Ce7Ac544f211e89564625ff8FE0a9c62a8aD8f/:nft_id/:ownerId" render={(props) => (
                                    <MultipleItem {...props} multiple={true} type="purchase" />
                                )} />
                                <Route exact path="/item/accept" render={(props) => (
                                    <Item {...props} type="accept" />
                                )} />
                                <Route exact path="/item/putonsale" render={(props) => (
                                    <Item {...props} type="putonsale" />
                                )} />
                                <Route exact component={SearchNoResult} />
                            </Switch>
                        </Fragment>
                    </BrowserRouter>
                )
            }

        </>
    );




}

export default Router;
