import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../components/Buttons/Button';
import CardBid from '../../components/CardBid';
import Loading from '../../components/Loading';
import axios from '../../utils/Api';
import imgHero from '../../assets/images/search/no-result-bg.png'
function OnSale({ walletAddress, className, smaugsDolar }) {

    const [onSaleItems, setOnSaleItems] = useState([]);
    const [onSaleItemsLoading, setOnSaleItemsLoading] = useState(true);

    const fetchOnSaleItems = () => {
        axios.get(`single?filter={"where":{"walletAddress":"${walletAddress}","putSale":"true"}, "include":{"relation": "user"}}&access_token=UgtEdXYhEDVL8KgL84yyzsJmdxuw2mTLB9F6tGXKCCUh4Av6uBZnmiAqjoYZQBlS`).then(({ data }) => {
            setOnSaleItems(data);
            setOnSaleItemsLoading(false);
        }).catch((error) => {
            //console.log("FETCH_ON_SALE_ITEMS_ERROR ===> ", error)
            setOnSaleItems([]);
            setOnSaleItemsLoading(false);
        });
    };



    useEffect(() => {
        if (walletAddress) {
            fetchOnSaleItems();
        }
    }, [walletAddress]);
    const renderContent = () => {
        if (onSaleItemsLoading && onSaleItems.length === 0) {
            return (
                <div className="container-fluid" style={{ width: 100 + '%' }}>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-32">
                            <Loading
                                position={"center"}
                                loading={onSaleItemsLoading}
                                color={"black"}
                                size={40}
                            />
                        </div>
                    </div>
                </div>
            )
        } else if (!onSaleItemsLoading && onSaleItems.length === 0) {
            return (
                <div className="container content text-center mt-4" style={{ display: "flex", flexDirection: "column" }}>
                    <img src={imgHero} className="w-100 mb-5" />
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
                    <div className="row">
                        {onSaleItems.map((item, idx) => (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-12 mb-32" key={idx}>
                                <div className="profile-card-item">
                                    <CardBid smaugsDolar={smaugsDolar} data={item} />
                                </div>
                            </div>
                        ))}
                    </div>
                   
                </>
            )
        }
    };
    return <div className={className}>{renderContent()}</div>;
}

export default OnSale
