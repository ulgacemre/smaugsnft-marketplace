import React, { useState, useEffect } from 'react';
import Button from '../../components/Buttons/Button';
import Divider from '../../components/Divider';
import { Swiper, SwiperSlide } from "swiper/react";
import Icon from '../../components/Icon';

import { dataFollowers } from '../../FakeData/Profile'

import axios, { DOWNLOAD_USERS_URL } from '../../utils/Api';

import { ToastContainer, toast } from 'react-toastify'
import useWeb3 from '../../shared/hooks/useWeb3';

const FollowingItem = ({ data, idx, walletAddress, address, followingsData }) => {
    const [following, setFollowing] = useState(true);
    const [followingPayload, setFollowingPayload] = useState(false);

    const follow = () => {
        setFollowingPayload(true);
        axios.post('Followingusers', {
            followeeId: data.walletAddress,
            followerId: walletAddress
        }).then((response) => {
            setFollowingPayload(false);
            setFollowing(!following);
        }).catch(error => {
            toast.error('Something went error!');
            setFollowingPayload(false);
            console.log("error => ", error);
        })
    };
    const unFollow = () => {
        setFollowingPayload(true);
        axios.delete(`Users/${address}/follower/rel/${data.walletAddress}`).then((response) => {
            setFollowingPayload(false);
            setFollowing(!following);
        }).catch(error => {
            toast.error('Something went error!');
            setFollowingPayload(false);
            console.log("error => ", error);
        })
    };

    return (
        <>
            <div className="follower-list-item d-flex">
                <div className="follower-info d-flex">
                    <img src={DOWNLOAD_USERS_URL + data.imageUrl} className="avatar" />
                    <div className="follower-info-text d-flex flex-row flex-lg-column justify-content-between align-items-center">
                        <div>
                            <div className="text-body-2-bold">
                                {data.displayName}
                            </div>
                            <div className="text-caption-2 neutral-4 mb-12">
                                {data.followee.length} followers
                                    </div>
                        </div>

                        {address === walletAddress ? (
                            <>
                                <Button
                                    style={followingPayload ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                                    className={"d-none d-lg-block small " + (following ? '' : 'primary')}
                                    onClick={() => following ? unFollow() : follow()}
                                >
                                    {(
                                        !following ? (
                                            followingPayload ? 'Following...' : 'Follow'
                                        ) : (
                                            followingPayload ? 'Unfollowing...' : 'Unfollow'
                                        )
                                    )}
                                </Button>
                                <Button
                                    style={followingPayload ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                                    className={"d-lg-none normal " + (following ? "" : "primary")}
                                    onClick={() => following ? unFollow() : follow()}
                                >
                                    {(
                                        !following ? (
                                            followingPayload ? 'Following...' : 'Follow'
                                        ) : (
                                            followingPayload ? 'Unfollowing...' : 'Unfollow'
                                        )
                                    )}
                                </Button>
                            </>
                        ) : null}
                    </div>
                </div>

            </div>
        </>
    )
}

function UserCollections({ className, address }) {
    const [followings, setFollowings] = useState([]);

    const [followingsData, setFollowingsData] = useState([]);
    const [followingsLoading, setFollowingsLoading] = useState(false);

    const { walletAddress } = useWeb3();



    useEffect(() => {
        let newFollowings = [];
        dataFollowers.map((follower) => { newFollowings.push(true) })
        setFollowings(newFollowings)
    }, []);

    useEffect(() => {
        if (address) {
            setFollowingsLoading(true);
            axios.get(`Users/${address}/followee?filter={"include":  {"relation": "followee","scope": {  "fields":["displayName"], "type": "count" }}}`).then((response) => {
                setFollowingsData(response.data);
                setFollowingsLoading(false);
            }).catch((error) => {
                console.log("error => ", error);
                setFollowingsLoading(false);
            })
        }
    }, [address]);


    /*
    {dataFollowers.map((follower, idx) => (
                <div key={idx}>
                    <div className="follower-list-item d-flex">
                        <div className="follower-info d-flex">
                            <img src={follower.avatar} className="avatar" />
                            <div className="follower-info-text d-flex flex-row flex-lg-column justify-content-between align-items-center">
                                <div>
                                    <div className="text-body-2-bold">
                                        {follower.username}
                                    </div>
                                    <div className="text-caption-2 neutral-4 mb-12">
                                        {follower.followers} followers
                                    </div>
                                </div>

                                <Button
                                    className={"d-none d-lg-block small " + (followings[idx] ? "primary" : "")}
                                    onClick={() => setFollowChange(idx)}
                                >
                                    {followings[idx] ? "Follow" : "Unfollow"}
                                </Button>
                                <Button
                                    className={"d-lg-none normal " + (followings[idx] ? "primary" : "")}
                                    onClick={() => setFollowChange(idx)}
                                >
                                    {followings[idx] ? "Follow" : "Unfollow"}
                                </Button>
                            </div>
                        </div>

                        <Swiper
                            slidesPerView={'auto'}
                            spaceBetween={8}
                            className="swiper-collection"
                        >
                            {follower.collections.map((collect, idx) => (
                                <SwiperSlide key={idx}>
                                    <img src={collect} className="follower-collect-item mr-2" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <Divider className="d-none d-lg-block mb-5" />
                </div>
            ))}
    */

    return (
        <div className={className}>
            <ToastContainer />
            {followingsLoading ? <div className="text-center">
                <Icon icon="loading" />
            </div> : (
                <div className="row">
                    {followingsData.length > 0 ? (
                        followingsData.map((item, idx) => {
                            return (
                                <>
                                    <div className="col-lg-4 col-xs-12 col-sm-12">
                                        <FollowingItem
                                            followingsData={followingsData}
                                            address={address}
                                            data={item}
                                            key={idx}
                                            idx={idx}
                                            walletAddress={walletAddress}
                                        />
                                    </div>
                                </>
                            );
                        })
                    ) : <div style={{ marginLeft: 22 }}><p style={{ fontSize: 22 }} className="text-center m-0 p-0 ">Not found!</p></div>}
                </div>
            )}
        </div>
    );
}

export default UserCollections;
