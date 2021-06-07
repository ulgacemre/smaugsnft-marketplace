import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../../components/Layout'
import UserPanel from './UserPanel'
import Button from '../../components/Buttons/Button'
import SubNav from '../../components/SubNav';
import Link from '../../components/Link';

import UserCollections from './UserCollections';
import Followers from './Followers';
import ScrollView from '../../components/ScrollView';
import axios, { DOWNLOAD_USERS_URL } from '../../utils/Api'
import axiosOther from 'axios';

import { connect } from "react-redux";
import { getUserSingleNFTs } from '../../store/actions/NFTS';
import useWeb3 from '../../shared/hooks/useWeb3'

import imgDefaultBg from '../../assets/images/profile/back.png'
import OnSale from './OnSale';
import Loading from '../../components/Loading';
import Created from './Created';

import imgHero from '../../assets/images/search/no-result-bg.png'
import DropDown from '../../components/DropDown';
import Collectibles from './Collectibles';
import './profile.css';

const filterType = [
    {
        title: 'On Sale'
    },
    {
        title: 'Collectibles'
    },
    {
        title: 'Created'
    },
    {
        title: 'Likes'
    },
    {
        title: 'Following'
    },
    {
        title: 'Followers'
    }
]

function Profile({ user_info, getUserSingleNFTs }) {
    const [coverPhoto, setCoverPhoto] = useState(imgDefaultBg);
    const [currentTab, setCurrentTab] = useState(0);
    const [smaugsDolar, setSmaugsDolar] = useState(null);

    const [queryAddress, setQueryAddress] = useState("");

    const [userInfo, setUserInfo] = useState(null);
    const [myAddress, setMyAddress] = useState("");
    const [userInfoLoading, setUserInfoLoading] = useState(true);


    const { connected, walletAddress } = useWeb3()

    const handleChangeTab = (tab) => {
        setCurrentTab(tab)
    }


    let { address } = useParams();

    const getSmaugsApiDolar = async () => {
        const { data } = await axiosOther.get("https://api.coingecko.com/api/v3/simple/price?ids=smaugs-nft&vs_currencies=usd");
        if (data) {
            setSmaugsDolar(data["smaugs-nft"].usd);
        }
    };

    useEffect(() => {
        getSmaugsApiDolar();
    }, [address]);

    const fetchUserInfo = (address) => {
        axios.get(`Users/${address}`)
            .then(({ data }) => {
                setUserInfo(data);
                setUserInfoLoading(false);
            }).catch(function (error) {
                console.log(error);
                setUserInfo(null);
                setUserInfoLoading(false);
                console.log("Error****:", error.message);
            });
    };
    useEffect(() => {
        if (walletAddress) {
            getUserSingleNFTs(walletAddress);
            setMyAddress(walletAddress);
        }
    }, [walletAddress]);


    useEffect(() => {


        if (address !== walletAddress) {
            fetchUserInfo(address);
        } else {
            setUserInfo(user_info);
        }
        setQueryAddress(address);

    }, [user_info, address]);



    const renderContent = () => {
        switch (currentTab.title) {
            case "Collectibles":
                return <Collectibles smaugsDolar={smaugsDolar} walletAddress={queryAddress} className="mt-5" />;
            case "Created":
                return <Created smaugsDolar={smaugsDolar} walletAddress={queryAddress} className="mt-5" />;
            case "Likes":
                return (
                    <div className="container content text-center mt-5" style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <img src={imgHero} className="w-100" />
                        <div className="content-text mx-auto">
                            <h2>
                                Sorry, we couldn’t find any results for this search.
                </h2>
                            <div className="text-caption neutral-4 mt-2">
                                Maybe give one of these a try?
                </div>
                        </div>
                    </div>
                );
            case "Following":
                return <UserCollections smaugsDolar={smaugsDolar} className="mt-5" />;
            case "Followers":
                return <Followers smaugsDolar={smaugsDolar} className="mt-5" />;

            default:
                return <OnSale smaugsDolar={smaugsDolar} className="mt-5" walletAddress={queryAddress} />;
        }
    };


    return (
        <Layout page="profile">
            {userInfo ? (
                <>
                    <section style={{ backgroundColor: "#23262F" }}>
                        <div className="container-fluid">
                            <img src={coverPhoto} className="background" />
                        </div>
                        <div className="container">
                            <div className="content" style={{ justifyContent: "left" }}>
                                <div className="left-panel">
                                    {connected && queryAddress === myAddress ? <div className="d-flex d-lg-none justify-content-between mt-32 mb-4">
                                        <Button className="normal white-label" icon="image" iconsize="xs">Edit cover photo</Button>
                                        <Link href="/profile/edit">
                                            <Button className="normal white-label ml-3" icon="edit" iconsize="xs">Edit profile</Button>
                                        </Link>
                                    </div> : <div className="d-flex d-lg-none justify-content-between mt-32 mb-4"></div>}
                                    <UserPanel
                                        username={userInfo.displayName}
                                        walletAddress={userInfo.walletAddress}
                                        avatar={userInfo.avatar ? userInfo.avatar : DOWNLOAD_USERS_URL + userInfo.imageUrl}
                                        url={userInfo.customUrl}
                                        createdOn={userInfo.createdOn}
                                        twitterUsername={userInfo.twitterUsername}
                                        facebookUsername={userInfo.facebookUsername}
                                        instagramUsername={userInfo.instagramUsername}
                                        website={userInfo.website}
                                        bio={userInfo.bio}
                                    />
                                </div>
                                <div className="right-panel">
                                    {connected && queryAddress === myAddress ? <div className="d-lg-flex d-none justify-content-end mt-32">
                                        <Button className="normal white-label" icon="image" iconsize="xs">Edit cover photo</Button>
                                        <Link href="/profile/edit">
                                            <Button className="normal white-label ml-3" icon="edit" iconsize="xs">Edit profile</Button>
                                        </Link>
                                    </div> : <div className="d-lg-flex d-none justify-content-end mt-32"></div>}
                                    <div className="user-collection-panel">
                                        <ScrollView className="d-none d-lg-block w-100">
                                            <SubNav allItems={false} tabs={filterType} className="scroll-subnav" onChange={handleChangeTab} />
                                        </ScrollView>
                                        <div className="d-lg-none">
                                            <DropDown
                                                allItems={false}
                                                values={filterType}
                                                value={currentTab}
                                                onChange={(val) => setCurrentTab(val)}
                                            />
                                        </div>

                                        {renderContent()}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </>
            ) : <Loading
                position={"center"}
                loading={userInfo ? false : true}
                color={"black"}
                size={40}
            />}
        </Layout>
    );
}

const mapStateToProps = ({ user }) => {
    const { user_info } = user;
    return { user_info: user_info }
};

export default connect(mapStateToProps, { getUserSingleNFTs })(Profile);
