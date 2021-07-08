import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../components/Layout'
import Button from '../../components/Buttons/Button'
import Divider from '../../components/Divider'
import Icon from '../../components/Icon'
import Link from '../../components/Link'
import SubNav from '../../components/SubNav'
import CardBid from '../../components/CardBid';
import Loading from '../../components/Loading';

import axios from '../../utils/Api';

import { dataHotbids, dataSortOrder, dataFilterLike, dataFilterCreator } from '../../FakeData/Home'
import { dataFilterOpen } from '../../FakeData/Search'
import imgHero from '../../assets/images/search/no-result-bg.png'

import DropDown from '../../components/DropDown';
import PriceSlider from '../../components/Slider/PriceSlider';
import SearchBox from '../../components/Input/SearchBox';
import SearchBox2 from '../../components/Input/SearchBox2';
import ScrollView from '../../components/ScrollView';

import axiosOther from 'axios';
import SearchNoResult from './SearchNoResult';


function Search() {
    const [searchKey, setSearchKey] = useState('')
    const [searchType, setSearchType] = useState('');
    const [price, setPrice] = useState(500)
    const [sortOrder, setSortOrder] = useState('')
    const [filterOpen, setFilterOpen] = useState(dataFilterOpen[0]);
    const [smaugsDolar, setSmaugsDolar] = useState(null);


    // search states start
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [allNfts, setAllNfts] = useState([]);
    const [nftsLoading, setNftsLoading] = useState(true);
    const [categoriesData, setCategoriesData] = useState([]);
    const [searchCategoryId, setSearchCategoryId] = useState('');
    const [filterType, setFilterType] = useState('');

    const [limit, setLimit] = useState('12');
    const [skip, setSkip] = useState('0');
    const [category, setCategory] = useState(null);
    const [filter, setFilter] = useState(null);
    // search states end

    // single search start
    const [singleCategoryId, setSingleCategoryId] = useState('');
    //single search end

    const getSmaugsApiDolar = async () => {
        const { data } = await axiosOther.get("https://api.coingecko.com/api/v3/simple/price?ids=smaugs-nft&vs_currencies=usd");
        if (data) {
            setSmaugsDolar(data["smaugs-nft"].usd);
        }
    };
    const fetchAllCategories = () => {
        axios.get(`Categories`)
            .then(({ data }) => {
                setCategoriesData(data);
            }).catch(function (error) {
                //console.log("FETCH_CATEGORIES ===> ", error);
                //console.log("Error****:", error.message);
            });
    };

    const paginationContinue = () => {
        setPaginationLoading(true);
        const newLimit = parseInt(limit) + 12;
        const newSkip = parseInt(skip) + 12;

        setLimit(`${newLimit}`)
        setSkip(`${newSkip}`)

        if (category && category === 0) {
            axios.get(`single?filter={"skip":${newSkip},"limit":${newLimit},"order": "id DESC","include":{"relation": "user"}}`).then(({ data }) => {
                setAllNfts(data);
                setNftsLoading(false);
                setPaginationLoading(false);
                //console.log("NFTS ===> ", data);
            }).catch((error) => {
                //console.log("FETCH_NFTS_ERROR ===> ", error);
                setPaginationLoading(true);
                setAllNfts([]);
                setNftsLoading(false);
            });
        } else if (filter) {
            if (filter === "Highest price") {
                axios.get(`single?filter={"where":{"putSale":"true"},"order": "salePrice DESC", "include": "user", "skip":${newSkip},"limit":${newLimit} }`).then(({ data }) => {
                    setAllNfts(data);
                    setNftsLoading(false);
                    setNftsLoading(false);
                    setPaginationLoading(false);
                }).catch((error) => {
                    setAllNfts([]);
                    setNftsLoading(false);
                    //console.log("FILTER_ERROR ===> ", error);
                })
            } else if (filter === "Lowest price") {
                axios.get(`single?filter={"where":{"putSale":"true"},"order": "salePrice ASC", "include": "user", "skip":${newSkip},"limit":${newLimit} }`).then(({ data }) => {
                    setAllNfts(data);
                    setNftsLoading(false);
                    setNftsLoading(false);
                    setPaginationLoading(false);
                }).catch((error) => {
                    setAllNfts([]);
                    setNftsLoading(false);
                    //console.log("FILTER_ERROR ===> ", error);
                })
            } else if (filter === "Not for sale") {
                axios.get(`single?filter={"where":{"putSale":"false"},"order": "id DESC", "include": "user", "skip":${newSkip},"limit":${newLimit} }`).then(({ data }) => {
                    setAllNfts(data);
                    setNftsLoading(false);
                    setPaginationLoading(false);
                    setNftsLoading(false);
                }).catch((error) => {
                    setAllNfts([]);
                    setNftsLoading(false);
                    //console.log("FILTER_ERROR ===> ", error);
                })
            } else {
                firstFetchNfts();
            }
        } else {
            axios.get(`single?filter={"skip":${newSkip},"limit":${newLimit},"order": "id DESC","include":{"relation": "user"}}`).then(({ data }) => {
                setAllNfts(data);
                setNftsLoading(false);
                setPaginationLoading(false);
                //console.log("NFTS ===> ", data);
            }).catch((error) => {
                //console.log("FETCH_NFTS_ERROR ===> ", error);
                setPaginationLoading(true);
                setAllNfts([]);
                setNftsLoading(false);
            });
        }

    };

    useEffect(() => {
        getSmaugsApiDolar();
    }, []);


    const firstFetchNfts = () => {
        setNftsLoading(true);
        axios.get(`single?filter={"where":{"skip":0,"limit":12},"include":{"relation": "user"}, "skip": 0, "limit": 12}`).then(({ data }) => {
            setAllNfts(data);
            setNftsLoading(false);
            //console.log("NFTS ===> ", data);
        }).catch((error) => {
            //console.log("FETCH_NFTS_ERROR ===> ", error);
            setAllNfts([]);
            setNftsLoading(false);
        })
    };

    const fetchNftsWithCategory = (category) => {
        setNftsLoading(true);
        setCategory(category);
        if (category === 0) {
            firstFetchNfts();
        } else {
            setNftsLoading(true);
            axios.get(`single?filter={"where": {"categoryId": ${category.id}}, "include":{"relation": "user"}, "skip": 0, "limit": 12}`).then(({ data }) => {
                setAllNfts(data);
                setNftsLoading(false);
            }).catch((error) => {
                //console.log("fetchNftsWithCategory ===> ", error);
                setAllNfts([]);
                setNftsLoading(false);
            })
        }
    };

    useEffect(() => {
        fetchAllCategories();
        firstFetchNfts();
    }, []);

    const handleChangeSingleSearchCategoryId = (category) => {
        fetchNftsWithCategory(category);
    }

    const handleSortOrder = (key) => {
        console.log(key)
        setSortOrder(key);
    }

    useEffect(() => {
        //console.log(searchKey)
    }, [searchKey])

    const handleChangeMobileCategory = (category) => {
        setNftsLoading(true);
        if (category.id === -1) {
            firstFetchNfts();
        } else {
            fetchNftsWithCategory(category);
        }
    };



    const handleFilterHighestLowest = ({ title }) => {
        setFilterType(title);
        setNftsLoading(true);
        setFilter(title);
        if (title === "Highest price") {
            axios.get(`single?filter={"where":{"putSale":"true"},"order": "salePrice DESC", "include": "user" }`).then(({ data }) => {
                setAllNfts(data);
                setNftsLoading(false);
            }).catch((error) => {
                setAllNfts([]);
                setNftsLoading(false);
                //console.log("FILTER_ERROR ===> ", error);
            })
        } else if (title === "Lowest price") {
            axios.get(`single?filter={"where":{"putSale":"true"},"order": "salePrice ASC", "include": "user" }`).then(({ data }) => {
                setAllNfts(data);
                setNftsLoading(false);
            }).catch((error) => {
                setAllNfts([]);
                setNftsLoading(false);
                //console.log("FILTER_ERROR ===> ", error);
            })
        } else {
            return null;
        }
    };

    const renderContent = () => {
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
        } else {
            return (
                <div className="row">
                    {allNfts.map((nft, idx) => (
                        <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-32" key={idx}>
                            <div className="card-item">
                                <CardBid smaugsDolar={smaugsDolar} data={nft} />
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    };

    const filteredActivities = useMemo(() => {
        // return activities.filter((item) => searchType === '' || item.type === searchType)
    }, [searchType]);

    const priceRange = (value) => {
        setPrice(value);

        axios.get(`single?filter={"where":{"salePrice":{"lte" : ${value}} }, "include": "user"}`).then(({ data }) => {
            setAllNfts(data);
            setNftsLoading(false);
        }).catch(error => {
            setAllNfts([]);
            setNftsLoading(false);
            //console.log("PriceRangeError ===> ", error);
        });

    };

    return (
        <Layout page="search">
            <div className="container content">
                {/*
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-none d-lg-flex text-body-1 neutral-3">Type your keywords</div>
                    <SearchBox2
                        placeholder="Type your keywords"
                        value={searchKey}
                        onSearch={(val) => setSearchKey(val)}
                    />
                </div>
                       <Divider className="d-none d-lg-block mt-32 mb-5" />
                 */}



                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-12 mb-32">

                        <div>
                            <div className="d-none d-lg-block">
                                <PriceSlider
                                    label="PRICE RANGE"
                                    value={price}
                                    min={1}
                                    max={100000}
                                    onChange={(value) => priceRange(value)}
                                />

                                <Divider className="mb-4 mt-4" />
                            </div>

                            <DropDown
                                label="Filter"
                                values={dataFilterLike}
                                value={filterType}
                                onChange={(val) => handleFilterHighestLowest(val)}
                                className="mb-4"
                            />
                        </div>

                        <div className="d-block d-lg-none mb-32 mt-32">{categoriesData.length > 0 ? <DropDown
                            label="Categories"
                            values={categoriesData}
                            allItems={true}
                            value={searchCategoryId}
                            className="mb-4"
                            onChange={(category_id) => handleChangeMobileCategory(category_id)}
                        /> : <Loading
                            position={"center"}
                            loading={true}
                            color={"black"}
                            size={20}
                        />}</div>

                        <div className="d-none d-lg-block mb-32 mt-32">{categoriesData.length > 0 ? <DropDown
                            label="Categories"
                            values={categoriesData}
                            allItems={true}
                            value={searchCategoryId}
                            className="mb-4"
                            onChange={(category_id) => handleChangeMobileCategory(category_id)}
                        /> : <Loading
                            position={"center"}
                            loading={true}
                            color={"black"}
                            size={20}
                        />}</div>

                        <div className="d-none d-lg-block">
                            <Divider className="mb-4 mt-4" />

                            <div onClick={() => {
                                firstFetchNfts();
                                setSearchCategoryId("");
                                setFilterType("");
                                setPrice("");
                            }} className="text-button-2 pointer d-flex align-items-center">
                                <Icon icon="close-circle-fill" size="sm" className="mr-2 svg-neutral-2" />
                                <div className="text-decoration-none neutral-2" >Reset Filter</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-12">
                        {renderContent()}
                        <Button onClick={() => !paginationLoading ? paginationContinue() : null} disabled={!paginationLoading ? null : 'disabled'} className="normal m-auto mt-32 d-none d-lg-block" icon="loading" iconPos="right" iconsize="xs">
                            {paginationLoading ? null : 'Load more'}
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Search;
