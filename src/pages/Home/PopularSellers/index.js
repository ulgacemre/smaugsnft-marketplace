import React from 'react';
import DropDown from '../../../components/DropDown';
import Icon from '../../../components/Icon';
import { ListDates } from '../../../FakeData/Home'
import { Sellers } from '../../../FakeData/Home'
import CardSeller from './CardSeller';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import axios from '../../../utils/Api';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../../../components/Loading';

SwiperCore.use([Autoplay, Navigation]);

const mainSlideOptions = {
    spaceBetween: 20,
    slidesPerView: 1,
    centerInsufficientSlides: true,
    centeredSlides: true,
    freeMode: true,
    freeModeSticky: true,
    navigation: {
        nextEl: '.seller-button-next',
        prevEl: '.seller-button-prev',
    },
    effect: "fade",
    breakpoints: {
        576: {
            slidesPerView: 2,
            centeredSlides: false
        },
        768: {
            slidesPerView: 3,
            centeredSlides: false
        },
        992: {
            slidesPerView: 4,
            centeredSlides: false
        },
        1200: {
            slidesPerView: 5,
            centeredSlides: false
        }
    }
};

function PopularSellers() {

    const [popularSellers, setPopularSellers] = useState([]);
    const [popularSellersLoading, setPopularSellersLoading] = useState(true);

    const fetchPopularUsers = () => {
        axios.get(`Users?filter={"where": {"imageUrl": {"neq": "default.png"}}, "skip":0, "limit": 5}`).then(({ data }) => {
            setPopularSellers(data);
            setPopularSellersLoading(false);
        }).catch(error => {
            //console.log("FETCH_POPULAR_USERS ===> ", error);
            setPopularSellers([]);
            setPopularSellersLoading(false);
        })
    };

    useEffect(() => {
        fetchPopularUsers();
    }, []);

    return (
        <>
            <div className="section-topbar d-flex justify-content-between flex-column flex-lg-row align-lg-items-center">
                <div>
                  
                    <h3>
                    Popular Sellers
                       
                    </h3>
                </div>
                <div className="pt-32"></div>
                {/*
                <div>
                    <DropDown values={ListDates} style={{ minWidth: '256px' }} label="TIMEFRAME" />
                </div>
                */}
            </div>
            <div className="position-relative">
                {popularSellersLoading ? <Loading size={40} position={"center"} loading={popularSellersLoading} color={"black"} /> : (<>
                    <Swiper {...mainSlideOptions}>
                        {popularSellers.map((seller, idx) => (
                            <SwiperSlide key={idx}>
                                <CardSeller idx={idx} seller={seller} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="d-flex justify-content-xl-start justify-content-center mt-5">
                        <div className="seller-button-prev button nav-button size-40 rounded-circle mr-4">
                            <Icon icon="arrow-left" size="sm" />
                        </div>
                        <div className="seller-button-next button nav-button size-40 rounded-circle">
                            <Icon icon="arrow-right" size="sm" />
                        </div>
                    </div>
                </>)}
            </div>

        </>
    );
}

export default PopularSellers;
