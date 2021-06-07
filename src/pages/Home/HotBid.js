import React from 'react';
import Icon from '../../components/Icon';
import {dataHotbids} from '../../FakeData/Home'
import CardBid from '../../components/CardBid';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";

SwiperCore.use([Autoplay, Navigation]);

const mainSlideOptions = {
    spaceBetween: 32,
    slidesPerView: 'auto',
    centerInsufficientSlides: true,
    navigation: {
        nextEl: '.hotbid-button-next',
        prevEl: '.hotbid-button-prev',
    },
    effect: "fade",
    breakpoints: {
        768: {
          slidesPerView: 2
        },
        992: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4
        }
    }
};

function HotBid() {
    return (
        <>
           {/*
            <div className="section-topbar d-flex justify-content-between align-items-center">
                <h3>
                    Hot bid
                </h3>
                <div className="d-flex">
                    <div className="hotbid-button-prev button nav-button size-40 rounded-circle mr-4">
                        <Icon icon="arrow-left" size="sm" />
                    </div>
                    <div className="hotbid-button-next button nav-button size-40 rounded-circle">
                        <Icon icon="arrow-right" size="sm" />
                    </div>
                </div>
            </div>
            <div className="position-relative">
                <Swiper {...mainSlideOptions}>
                    {dataHotbids.map((hotbid, idx) => (                    
                        <SwiperSlide key={idx}>
                            <CardBid data={hotbid} />
                        </SwiperSlide>
                    ))}
                </Swiper> 
            </div>
           */}
               
        </>
    );
}

export default HotBid;
