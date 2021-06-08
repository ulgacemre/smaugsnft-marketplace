import React, { useState, useEffect } from 'react'
import axios from '../../utils/Api';
import imgHero from '../../assets/images/search/no-result-bg.png'
import Loading from '../../components/Loading';
import CardBid from '../../components/CardBid';
import Button from '../../components/Buttons/Button';

function Collectibles({ walletAddress, className, smaugsDolar }) {
    const [collectibles, setCollectibles] = useState([]);
    const [collectiblesLoading, setCollectiblesLoading] = useState(true);

    const fetchAllCollectibles = () => {
        // "include": {"relation":"user"}
        axios.get(`single?filter={"where":{"and": [{"walletAddress": "${walletAddress}"}, {"creatorId": {"neq":"${walletAddress}"}}]}, "include":"user"}`).then(({ data }) => {
            setCollectibles(data);
            setCollectiblesLoading(false);
        }).catch((error) => {
            console.log("FETCH_ALL_COLLECTIBLES_ERROR ===> ", error);
            setCollectibles([]);
            setCollectiblesLoading(false);
        });


    };



    useEffect(() => {
        fetchAllCollectibles();
    }, []);

    const renderContent = () => {
        if (collectiblesLoading && collectibles.length === 0) {
            return (
                <div className="container-fluid" style={{ width: 100 + '%' }}>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-32">
                            <Loading
                                position={"center"}
                                loading={collectiblesLoading}
                                color={"black"}
                                size={40}
                            />
                        </div>
                    </div>
                </div>
            )
        } else if (!collectiblesLoading && collectibles.length === 0) {
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
                        {collectibles.map((item, idx) => (
                            <div className="col-xl-5 col-lg-6 col-md-6 col-12 mb-32" key={idx}>
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

export default Collectibles
