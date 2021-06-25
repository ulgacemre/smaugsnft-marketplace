import React from 'react';
import BidInfo from './BidInfo'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, EffectFade } from "swiper";
import Icon from '../Icon';

SwiperCore.use([Autoplay, Pagination]);

const mainSlideOptions = {
    spaceBetween: 50,
    slidesPerView: 1,
    navigation: {
        nextEl: '.bidinfo-button-next',
        prevEl: '.bidinfo-button-prev',
    },
    effect: "fade",
    allowTouchMove: false,
    noSwiping: true
};

const BidInfoSlider = function ({ items, smaugsDolar, setIndex, index }) {
    /*
    //////////////////////   SLIDER //////////////////////
        <Swiper {...mainSlideOptions}>
                {props.data.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <BidInfo {...item} />                
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="d-flex justify-content-lg-start justify-content-center">
                <div className="bidinfo-button-prev button nav-button size-40 mr-2 rounded-circle">
                    <Icon icon="arrow-left" size="sm" />
                </div>
                <div className="bidinfo-button-next button nav-button size-40 rounded-circle">
                    <Icon icon="arrow-right" size="sm" />
                </div>
            </div>
    ///////////////////// SLIDER END ////////////////////
    */
    return (
        <div className="bidinfo-slider">
            <Swiper {...mainSlideOptions}>
                {items.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <BidInfo smaugsDolar={smaugsDolar} item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="d-flex justify-content-lg-start justify-content-center">
                <div onClick={() => index === 0 ? setIndex(0) : setIndex(index - 1)} className="bidinfo-button-prev button nav-button size-40 mr-2 rounded-circle">
                    <Icon icon="arrow-left" size="sm" />
                </div>
                <div onClick={() => index === 2 ? setIndex(2) : setIndex(index + 1)} className="bidinfo-button-next button nav-button size-40 rounded-circle">
                    <Icon icon="arrow-right" size="sm" />
                </div>
            </div>

        </div>
    );
}

export default BidInfoSlider;
