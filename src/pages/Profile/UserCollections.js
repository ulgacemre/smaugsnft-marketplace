import React, { useState, useEffect } from 'react';
import Button from '../../components/Buttons/Button';
import Divider from '../../components/Divider';
import { Swiper, SwiperSlide } from "swiper/react";
import Icon from '../../components/Icon';

import {dataFollowers} from '../../FakeData/Profile'

function UserCollections({className}) {
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        let newFollowings = [];
        dataFollowers.map((follower) => {newFollowings.push(true)})
        setFollowings(newFollowings)
    }, [])

    const setFollowChange = (idx) => {        
        let newFollowings = [...followings];
        newFollowings[idx] = !newFollowings[idx]

        setFollowings(newFollowings)
    }

    return (
        <div className={className}>
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
                                <img src={collect} className="follower-collect-item mr-2"/>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <Divider className="d-none d-lg-block mb-5" />
                </div>
            ))}
            
            <div className="text-center">
                <Icon icon="loading" />
            </div>
        </div>
    );
}

export default UserCollections;
