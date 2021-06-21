import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../../components/Layout'
import UserPanel from './UserPanel'
import Button from '../../components/Buttons/Button'
import SubNav from '../../components/SubNav';
import Link from '../../components/Link';

import UserCollections from './UserCollections';
import Followers from './Followers';
import ScrollView from '../../components/ScrollView';
import axios, { DOWNLOAD_COVERS_URL, DOWNLOAD_USERS_URL } from '../../utils/Api'
import axiosOther from 'axios';

import { connect } from "react-redux";
import { getUserSingleNFTs } from '../../store/actions/NFTS';
import useWeb3 from '../../shared/hooks/useWeb3'

import imgDefaultBg from '../../assets/images/profile/back.png'
import OnSale from './OnSale';
import Loading from '../../components/Loading';
import Created from './Created';
import Likes from './Likes';

import imgHero from '../../assets/images/search/no-result-bg.png'
import DropDown from '../../components/DropDown';
import Collectibles from './Collectibles';
import './profile.css';
import SearchNoResult from '../Search/SearchNoResult';
import { toast, ToastContainer } from 'react-toastify';







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
    },

]

{/*    {
        title: 'Following'
    },
    {
        title: 'Followers'
    }*/ }

function Profile({ user_info, getUserSingleNFTs }) {
    const [coverPhoto, setCoverPhoto] = useState(imgDefaultBg);
    const [currentTab, setCurrentTab] = useState(0);
    const [smaugsDolar, setSmaugsDolar] = useState(null);

    const [queryAddress, setQueryAddress] = useState("");

    const [userInfo, setUserInfo] = useState(null);
    const [myAddress, setMyAddress] = useState("");
    const [userInfoLoading, setUserInfoLoading] = useState(false);

    const profileInput = useRef(null);
    const [coverPhotoChanged, setCoverPhotoChanged] = useState(null);
    const [coverPhotoChanging, setCoverPhotoChanging] = useState(false);


    const history = useHistory();
    const { connected, walletAddress } = useWeb3();

    const [isFollowing, setIsFollowing] = useState(null);

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
        setUserInfoLoading(true);
        axios.get(`Users/${address}?filter={"include":  {"relation": "follower","scope": {  "fields":["displayName"], "type": "count" }}}`)
            .then(async ({ data }) => {

                const res = await data.follower.find(item => item.walletAddress === walletAddress);

                if(res) {
                    setIsFollowing(true);
                } else {
                    setIsFollowing(false);
                }

                console.log("res => ", res);
                console.log("data => ", data);


                setUserInfo(data);
                setUserInfoLoading(false);
            }).catch(function (error) {
                console.log("error => ", error);
                setUserInfo(null);
                setUserInfoLoading(false);
            });
    };
    useEffect(() => {
        if (walletAddress) {
            getUserSingleNFTs(walletAddress);
            setMyAddress(walletAddress);
        }
    }, [walletAddress]);


    useEffect(() => {
        setQueryAddress(address);
        if (address !== walletAddress) {
            fetchUserInfo(address);
        } else {
            if (user_info.walletAddress !== '') {
                if (user_info.displayName === '') {
                    history.push("/profile/edit");
                } else {
                    setUserInfo(user_info);
                }
            }
        }
        

    }, [user_info, address]);


    const handleCoverPhoto = (event) => {
        const files = event.target.files;

        const file = files[0];
        if (file) {
            if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
                var fakePath = URL.createObjectURL(file);
                var image = new Image();
                image.src = fakePath;
                image.onload = function () {
                    if (this.width < 1200) {
                        toast.error("The maximum width of the cover photo must be no more than 1200 pixels!");
                        profileInput.current.value = null;
                    } else if (this.height < 275) {
                        toast.error("The maximum height of the cover photo must be no more than 275 pixels!");
                        profileInput.current.value = null;
                    } else {
                        setCoverPhotoChanging(true);
                        const formData = new FormData();
                        // Update the formData object 
                        formData.append(
                            "file",
                            file,
                            file.name
                        );

                        axios.post(`Containers/covers/upload`, formData)
                            .then(({ data }) => {
                                const imageUrl = data.result.files.file[0].name;
                                axios.patch(`Users/${walletAddress}`, { coverUrl: imageUrl })
                                    .then(() => {
                                        toast.success("Your cover photo has been successfully changed.");
                                        setCoverPhotoChanging(false);
                                        setCoverPhotoChanged(imageUrl);
                                        profileInput.current.value = null;
                                    }).catch(function () {
                                        toast.error("Something went error, please try again!");
                                        setCoverPhotoChanging(false);
                                        setCoverPhotoChanged(null);
                                        profileInput.current.value = null;
                                    });
                            })
                            .catch((error) => {
                                toast.error("Something went error, please try again!");
                                profileInput.current.value = null;
                            })

                        profileInput.current.value = null;
                    }

                }
            } else {
                toast.error("Cover photo must be jpg, png or jpeg extension!");
            }
        }

    };


    const renderContent = () => {
        switch (currentTab.title) {
            case "Collectibles":
                return <Collectibles smaugsDolar={smaugsDolar} walletAddress={queryAddress} className="mt-5" />;
            case "Created":
                return <Created smaugsDolar={smaugsDolar} walletAddress={queryAddress} className="mt-5" />;
            case "Likes":
                return <Likes smaugsDolar={smaugsDolar} walletAddress={queryAddress} className="mt-5" />;
            case "Following":
                return <UserCollections address={userInfo.walletAddress} smaugsDolar={smaugsDolar} className="mt-5" />;
            case "Followers":
                return <Followers address={userInfo.walletAddress} smaugsDolar={smaugsDolar} className="mt-5" />;

            default:
                return <OnSale smaugsDolar={smaugsDolar} className="mt-5" walletAddress={queryAddress} />;
        }
    };


    return (
        <Layout page="profile">
            <ToastContainer />
            {!userInfo && !userInfoLoading ? (
                <div className="container content text-center">
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
            ) : (
                <>
                    {userInfo ? (
                        <>
                            <section>
                                <div className="container-fluid">
                                    <img src={coverPhotoChanged ? DOWNLOAD_COVERS_URL + coverPhotoChanged : DOWNLOAD_COVERS_URL + userInfo.coverUrl} className="background" />
                                </div>
                                <div className="container">
                                    <div className="content" style={{ justifyContent: "left" }}>
                                        <div className="left-panel">
                                            {connected && queryAddress === myAddress ? <div className="d-flex d-lg-none justify-content-between mt-32 mb-4">
                                                <Button disabled={coverPhotoChanging ? true : false} onClick={() => !coverPhotoChanging ? profileInput.current.click() : null} className="normal primary" icon="image" iconsize="xs">
                                                    {coverPhotoChanging ? 'Changing...' : 'Edit cover photo'}
                                                </Button>
                                                <input type="file" ref={profileInput} className="d-none" onChange={handleCoverPhoto} />
                                                <Link href="/profile/edit">
                                                    <Button className="normal primary ml-3" icon="edit" iconsize="xs">Edit profile</Button>
                                                </Link>
                                            </div> : <div className="d-flex d-lg-none justify-content-between mt-32 mb-4"></div>}
                                            <UserPanel
                                                isFollowing={isFollowing}
                                                setIsFollowing={setIsFollowing}
                                                username={userInfo.displayName}
                                                walletAddress={userInfo.walletAddress}
                                                avatar={DOWNLOAD_USERS_URL + userInfo.imageUrl}
                                                url={userInfo.customUrl}
                                                createdOn={userInfo.createdOn}
                                                twitterUsername={userInfo.twitterUsername}
                                                facebookUsername={userInfo.facebookUsername}
                                                instagramUsername={userInfo.instagramUsername}
                                                website={userInfo.website}
                                                bio={userInfo.bio}
                                                verified={userInfo.verified}
                                            />
                                        </div>
                                        <div className="w-100 right-panel">
                                            {connected && queryAddress === myAddress ? <div className="d-lg-flex d-none justify-content-end mt-32">
                                                <Button disabled={coverPhotoChanging ? true : false} onClick={() => !coverPhotoChanging ? profileInput.current.click() : null} className="normal primary" icon="image" iconsize="xs">
                                                    {coverPhotoChanging ? 'Changing...' : 'Edit cover photo'}
                                                </Button>
                                                <input type="file" ref={profileInput} className="d-none" onChange={handleCoverPhoto} />
                                                <Link href="/profile/edit">
                                                    <Button className="normal primary ml-3" icon="edit" iconsize="xs">Edit profile</Button>
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
                </>
            )}
        </Layout>
    );
}

const mapStateToProps = ({ user }) => {
    const { user_info } = user;
    return { user_info: user_info }
};

export default connect(mapStateToProps, { getUserSingleNFTs })(Profile);
