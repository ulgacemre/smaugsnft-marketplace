import React from 'react';
import Icon from '../../components/Icon';
import { dataHotCollection } from '../../FakeData/Home'
import CardCollection from '../../components/CardCollection';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { useState } from 'react';
import { useEffect } from 'react';
import CardBid from '../../components/CardBid';
import Loading from '../../components/Loading';
import axios from '../../utils/Api';

SwiperCore.use([Autoplay, Navigation]);

const mainSlideOptions = {
    spaceBetween: 32,
    slidesPerView: 'auto',
    centerInsufficientSlides: true,
    navigation: {
        nextEl: '.collection-button-next',
        prevEl: '.collection-button-prev',
    },
    effect: "fade",
    breakpoints: {
        992: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        }
    }
};

function HotCollection({ smaugsDolar }) {
    const [recentlyNfts, setRecentlyNfts] = useState([]);
    const [recentlyNftsLoading, setRecentlyNftsLoading] = useState(true);

    const fetchRecentlyNfts = () => {
        axios.get(`single?filter={"where":{"putSale":"true"},"order": "id DESC", "include": "user" }`).then(({ data }) => {
            setRecentlyNfts(data);
            setRecentlyNftsLoading(false);
            console.log("data => ", data);
        }).catch((error) => {
            console.log("HOT_COLLECTION_RECENTLY_MINTED_NFTS_ERROR ===> ", error);
            setRecentlyNfts([]);
            setRecentlyNftsLoading(false);
        });
    };

    useEffect(() => {
        fetchRecentlyNfts();
    }, []);

    return (
        <>
            <div className="section-topbar d-flex justify-content-between align-items-center">
                <h3>
                    Recently Minted
                </h3>
                <div className="d-none d-lg-flex">
                    <div className="collection-button-prev button nav-button size-40 rounded-circle mr-4">
                        <Icon icon="arrow-left" size="sm" />
                    </div>
                    <div className="collection-button-next button nav-button size-40 rounded-circle">
                        <Icon icon="arrow-right" size="sm" />
                    </div>
                </div>
            </div>
            <div className="position-relative">
                {recentlyNftsLoading ? <Loading
                    size={40}
                    position={true}
                    color={"black"}
                    loading={recentlyNftsLoading}
                /> : (
                    <>
                        <Swiper {...mainSlideOptions}>
                            {recentlyNfts.map((recentlyNft, idx) => (
                                <SwiperSlide style={{ maxWidth: 250 }} key={idx}>
                                    <div className="hot-card-item">
                                        <CardBid smaugsDolar={smaugsDolar} data={recentlyNft} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="d-flex d-lg-none justify-content-center mt-32">
                            <div className="collection-button-prev button nav-button size-40 rounded-circle mr-4">
                                <Icon icon="arrow-left" size="sm" />
                            </div>
                            <div className="collection-button-next button nav-button size-40 rounded-circle">
                                <Icon icon="arrow-right" size="sm" />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default HotCollection;
