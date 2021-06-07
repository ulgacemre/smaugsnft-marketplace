import React from 'react';
import Button from '../../../components/Buttons/Button';
import { Swiper, SwiperSlide } from "swiper/react";

function Creator({user}) {
    return (
        <div className={"creator-user-list-item d-flex align-items-center py-4"}>
            <div className="avatar mr-3">
                <img src={user.avatar} className="rounded-circle"/>
                <div className="c-badge badge-tl text-caption-2-bold neutral-8">
                    {user.badge}
                </div>
            </div>
            <div>
                <div className="text-caption-bold">
                    {user.name}
                </div>
                <div className="text-caption-2-bold neutral-3">
                    {user.wallet} <span className="text-caption-2 neutral-4">ETH</span>
                </div>
            </div>
        </div>
    )
}

function Users ({data, onChange}) {
    return (
        <div className="latest-creators">
            <div className="text-caption-2-bold neutral-4">
                Latest upload from creators 🔥
            </div>
            <div className="d-xl-block d-none">
                {data.map((user, idx) => (
                    <Creator key={idx} user={user}/>
                ))}
            </div>
            
            <div className="d-xl-none d-block">
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={0}
                >
                    {data.map((user, idx) => (                    
                        <SwiperSlide key={idx} >
                            <Creator user={user}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <Button 
                className="d-none d-xl-block normal text-button-2 mt-2"
                icon="arrow-right"
                iconsize="sm"
                iconPos="right">
                Discover more
            </Button>
        </div>
    );
}

export default Users;
