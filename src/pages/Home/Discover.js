import React, { useState, useEffect } from 'react';
import Icon from '../../components/Icon';
import './Discover.css';
import {
    dataHotbids,
    dataSortOrder,
    dataFilterPrice,
    dataFilterLike,
    dataFilterCreator
} from '../../FakeData/Home'
import Button from '../../components/Buttons/Button';
import CardBid from '../../components/CardBid';
import DropDown from '../../components/DropDown';
import SubNav from '../../components/SubNav';
import PriceSlider from '../../components/Slider/PriceSlider';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import Divider from '../../components/Divider';
import axios from '../../utils/Api';
import Loading from '../../components/Loading';
import imgHero from '../../assets/images/search/no-result-bg.png'
import axiosOther from 'axios';
SwiperCore.use([Autoplay, Navigation]);

const mainSlideOptions = {
    spaceBetween: 32,
    slidesPerView: 'auto',
    slidesPerColumnFill: 'row',
    centerInsufficientSlides: true,
    navigation: {
        nextEl: '.discover-button-next',
        prevEl: '.discover-button-prev',
    },
    effect: "fade",
};

const filterType = [
    {
        title: 'All items'
    },
    {
        title: 'Art'
    },
    {
        title: 'Game'
    },
    {
        title: 'Photography'
    },
    {
        title: 'Music',
        className: 'd-xl-inline-block d-none'
    },
    {
        title: 'Video',
        className: 'd-xl-inline-block d-none'
    }
]

function Discover({ smaugsDolar }) {
    const [price, setPrice] = useState(500)
    const [allNfts, setAllNfts] = useState([]);
    const [nftsLoading, setNftsLoading] = useState(true);
    // search datas

    const [searchCategory, setSearchCategory] = useState(-1);


    useEffect(() => {
        if (price) {
            console.log("UPDATED_PRICE ===> ", price);
        }
    }, [price]);
    // search
    const [categoriesData, setCategoriesData] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const fetchAllCategories = () => {
        axios.get(`Categories`)
            .then(({ data }) => {
                setCategoriesData(data);
                setCategoriesLoading(false);
            }).catch(function (error) {
                console.log("FETCH_CATEGORIES ===> ", error);
                setCategoriesData([]);
                setCategoriesLoading(false);
                console.log("Error****:", error.message);
            });
    };
    const firstFetchNfts = () => {
        axios.get(`single?filter={"where":{"skip":0,"limit":12},"include":{"relation": "user"}}&access_token=UgtEdXYhEDVL8KgL84yyzsJmdxuw2mTLB9F6tGXKCCUh4Av6uBZnmiAqjoYZQBlS`).then(({ data }) => {
            setAllNfts(data);
            setNftsLoading(false);
            console.log("NFTS ===> ", data);
        }).catch((error) => {
            console.log("FETCH_NFTS_ERROR ===> ", error);
            setAllNfts([]);
            setNftsLoading(false);
        })
    };

    const fetchNftsWithCategory = (category) => {
        setNftsLoading(true);
        if (category === 0) {
            firstFetchNfts();
        } else {
            axios.get(`single?filter={"where": {"categoryId": ${category.id}}, "include":{"relation": "user"}}&access_token=UgtEdXYhEDVL8KgL84yyzsJmdxuw2mTLB9F6tGXKCCUh4Av6uBZnmiAqjoYZQBlS`).then(({ data }) => {
                setAllNfts(data);
                setNftsLoading(false);
            }).catch((error) => {
                setAllNfts([]);
                setNftsLoading(false);
                console.log("fetchNftsWithCategory ===> ", error);
            })
        }
    };
    useEffect(() => {
        fetchAllCategories();

        firstFetchNfts();
    }, []);

    const renderSliderContent = () => {
        if (nftsLoading && allNfts.length === 0) {
            return <Loading
                position={"center"}
                loading={nftsLoading}
                color={"black"}
                size={40}
            />
        } else if (!nftsLoading && allNfts.length === 0) {
            return (
                <div className="container content text-center">
                    <img src={imgHero} className="w-50" />
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
        } else {
            return (
                <>
                    <Swiper {...mainSlideOptions}>
                        {allNfts.map((nft, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="discover-card-item">
                                    <CardBid smaugsDolar={smaugsDolar} data={nft} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="d-flex mt-32 justify-content-center">
                        <div className="discover-button-prev button nav-button size-40 rounded-circle mr-4">
                            <Icon icon="arrow-left" size="sm" />
                        </div>
                        <div className="discover-button-next button nav-button size-40 rounded-circle">
                            <Icon icon="arrow-right" size="sm" />
                        </div>
                    </div>
                </>
            )
        }
    };

    const renderContent = () => {
        if (nftsLoading && allNfts.length === 0) {
            return (
                <Loading
                    position={"center"}
                    loading={nftsLoading}
                    color={"black"}
                    size={40}
                />
            )
        } else if (!nftsLoading && allNfts.length === 0) {
            return (
                <div className="container content text-center">
                    <img src={imgHero} className="w-50" />
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
        } else {
            return (
                <div className="row">
                    {allNfts.map((nft, idx) => (
                        <div className="col-xl-3 col-4 mb-32" style={{ display: "flex" }} key={idx}>
                            <div className="discover-card-item">
                                <CardBid smaugsDolar={smaugsDolar} data={nft} />
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    };
    const handleFilterHighestLowest = ({ title }) => {
        setNftsLoading(true);
        if (title === "Highest price") {
            axios.get(`single?filter={"where":{"putSale":"true"},"order": "salePrice DESC", "include": "user" }`).then(({ data }) => {
                setAllNfts(data);
                setNftsLoading(false);
            }).catch((error) => {
                setAllNfts([]);
                setNftsLoading(false);
                console.log("FILTER_ERROR ===> ", error);
            })
        } else if (title === "Lowest price") {
            axios.get(`single?filter={"where":{"putSale":"true"},"order": "salePrice ASC", "include": "user" }`).then(({ data }) => {
                setAllNfts(data);
                setNftsLoading(false);
            }).catch((error) => {
                setAllNfts([]);
                setNftsLoading(false);
                console.log("FILTER_ERROR ===> ", error);
            })
        } else {
            firstFetchNfts();
        }
    };

    return (
        <>
            <div className="section-topbar d-flex justify-content-between align-items-center">
                <h3>
                    Discover
                </h3>
            </div>
            <div className="action-bar">

                <div className="d-none d-lg-flex justify-content-between align-items-center mb-32">
                    <SubNav onChange={(category) => fetchNftsWithCategory(category)} allItems={true} tabs={categoriesData} />
                    <DropDown values={dataFilterLike} onChange={(val) => handleFilterHighestLowest(val)} label="Filter" />
                </div>

                <div className="d-lg-none d-block mb-32">
                    {/*<div className="w-100 mb-12">
                        <DropDown values={dataSortOrder} />
                    </div>*/}
                    <div className="w-100 mb-12">
                        {categoriesData.length > 0 ? <DropDown onChange={(val) => {
                            if (val.title === "All items") {
                                firstFetchNfts();
                            } else {
                                fetchNftsWithCategory(val);
                            }
                        }} values={categoriesData} /> : <Loading
                            position={"center"}
                            loading={nftsLoading}
                            style={{ marginTop: 10 }}
                            color={"black"}
                            size={15}
                        />}
                    </div>
                    {/*
                    <Button className="primary large w-100">
                        Advanced Filter
                    </Button>
                    */}
                </div>

                {
                    /*
                     <Divider />
                 <div className="row py-5 d-none d-lg-flex">
                     <div className="col-xl-3 col-lg-4">
                         <DropDown values={dataFilterPrice} label="PRICE" />
                     </div>
                     <div className="col-xl-3 col-lg-4">
                         <DropDown values={dataFilterLike} label="LIKE" />
                     </div>
                     <div className="col-xl-3 d-xl-block d-none">
                         {categoriesData.length > 0 ? <DropDown allItems={true} values={categoriesData} label="CATEGORIES" /> : <label>Categories loading...</label>}
                     </div>
                     <div className="col-xl-3 col-lg-4">
                         <PriceSlider
                             label="PRICE RANGE"
                             value={price}
                             min={1}
                             max={1000}
                             onChange={(value) => setPrice(value)}
                         />
                     </div>
                 </div>
                    */
                }
            </div>
            <div>
                <div className="d-lg-block d-none">
                    {renderContent()}
                </div>
                <div className="d-block d-lg-none mt-5">
                    {renderSliderContent()}
                </div>
            </div>

        </>
    );
}

export default Discover;
