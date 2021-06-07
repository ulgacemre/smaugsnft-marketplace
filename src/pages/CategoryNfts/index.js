import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
import axios from '../../utils/Api';
import imgHero from '../../assets/images/search/no-result-bg.png'
import Loading from '../../components/Loading';

import './category-nfts.css';

import axiosOther from 'axios';
import CardBid from '../../components/CardBid';
import Layout from '../../components/Layout';
import slugify from 'slugify';

function CategoryNfts() {
    const { categoryId } = useParams();


    const history = useHistory();
    const [nfts, setNfts] = useState([]);
    const [nftsLoading, setNftsLoading] = useState("true");
    const [category, setCategory] = useState(null);

    const [smaugsDolar, setSmaugsDolar] = useState(null);
    const getSmaugsApiDolar = async () => {
        const { data } = await axiosOther.get("https://api.coingecko.com/api/v3/simple/price?ids=smaugs-nft&vs_currencies=usd");
        if (data) {
            setSmaugsDolar(data["smaugs-nft"].usd);
        }
    };

    const fetchNftsWithCategory = () => {
        setNftsLoading("true");


        axios.get("Categories").then(async ({ data }) => {
            data.forEach(element => {
                if (slugify(element.title.toLowerCase()) === categoryId) {
                    setCategory(element);
                    axios.get(`single?filter={"where": {"categoryId": ${element.id}}, "include":{"relation": "user"}}&access_token=UgtEdXYhEDVL8KgL84yyzsJmdxuw2mTLB9F6tGXKCCUh4Av6uBZnmiAqjoYZQBlS`).then(({ data }) => {
                        setNfts(data);
                        getSmaugsApiDolar();
                        setNftsLoading("false");
                    }).catch((error) => {
                        setNfts([]);
                        setNftsLoading("false");
                        console.log("fetchCategoryNfts ===> ", error);
                    })
                }
            });
        });





    };

    useEffect(() => {
        if (categoryId) {
            fetchNftsWithCategory();
        } else {
            setNftsLoading(true);
        }
    }, [categoryId]);

    const renderContent = () => {
        if (nftsLoading === "true" && nfts.length === 0) {
            return (
                <Loading
                    position={"center"}
                    loading={nftsLoading}
                    color={"black"}
                    size={40}
                />
            )
        } else if (nftsLoading === "false" && nfts.length === 0) {
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
                <div>
                    <div className="py-5 d-flex align-items-center">
                        <i onClick={() => history.push("/")} className="fas fa-arrow-left" style={{ cursor: "pointer", fontSize: 24, marginRight: 12 }}></i>
                        <h4>{nftsLoading === "true" ? 'Yükleniyor...' : category.title}</h4>
                    </div>
                    <div className="row">
                        {nfts.map((nft, idx) => (
                            <div className="col-xl-3 col-lg-6 col-xs-12 col-12 mb-32" style={{ display: "flex" }} key={idx}>
                                <div className="category-nfts-card-item">
                                    <CardBid smaugsDolar={smaugsDolar} data={nft} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    };

    return (
        <Layout>
            <div className="container">
                {renderContent()}
            </div>
        </Layout>
    );
}

export default CategoryNfts
