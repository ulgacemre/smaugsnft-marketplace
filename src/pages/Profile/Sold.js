import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../components/Buttons/Button';
import CardBid from '../../components/CardBid';
import Loading from '../../components/Loading';
import axios from '../../utils/Api';
import imgHero from '../../assets/images/search/no-result-bg.png'
import useWeb3 from '../../shared/hooks/useWeb3';
function Sold({ queryAddress, className, smaugsDolar }) {

    const [createdItems, setCreatedItems] = useState([]);
    const [createdItemsLoading, setCreatedItemsLoading] = useState(true);
    const { walletAddress } = useWeb3();

    const fetchCreatedItems = () => {
        axios.get(`single?filter={"where":{"creatorId":"${queryAddress}","walletAddress": {"neq": "${walletAddress}"}}, "include":{"relation": "user"}}`).then(({ data }) => {
            setCreatedItems(data);
            setCreatedItemsLoading(false);
        }).catch((error) => {
            //console.log("FETCH_ON_SALE_ITEMS_ERROR ===> ", error)
            setCreatedItems([]);
            setCreatedItemsLoading(false);
        });
    };



    useEffect(() => {
        if (queryAddress) {
            fetchCreatedItems();
        }
    }, [queryAddress]);
    const renderContent = () => {
        if (createdItemsLoading && createdItems.length === 0) {
            return (
                <div className="container-fluid" style={{ width: 100 + '%' }}>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-32">
                            <Loading
                                position={"center"}
                                loading={createdItemsLoading}
                                color={"black"}
                                size={40}
                            />
                        </div>
                    </div>
                </div>
            )
        } else if (!createdItemsLoading && createdItems.length === 0) {
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
                        {createdItems.map((item, idx) => (
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

export default Sold
