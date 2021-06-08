import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import BidInfoSlider from '../../components/BidInfo/BidInfoSlider'
import Loading from '../../components/Loading';
import axios, { DOWNLOAD_NFTS_URL } from '../../utils/Api';
import axiosOther from 'axios';
function HomeSlider() {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [smaugsDolar, setSmaugsDolar] = useState('');
    const [smaugsDolarLoading, setSmaugsDolarLoading] = useState('');
    const fetchNfts = () => {
        axios.get(`single?filter={"include": {"relation": "user"}}`).then(({ data }) => {
            setNfts(data);
            setLoading(false);
            //console.log("HOME_SLIDER_NFTS ===>", data);
            getSmaugsApiDolar();
        }).catch(error => {
            //console.log("HOME_SLIDER_FETCH_NFTS ===> ", error);
            setNfts([]);
            setLoading(false);
        })
    };
    const getSmaugsApiDolar = async () => {
        const { data } = await axiosOther.get("https://api.coingecko.com/api/v3/simple/price?ids=smaugs-nft&vs_currencies=usd");
        if (data) {
            setSmaugsDolar(data["smaugs-nft"].usd);
            setSmaugsDolarLoading(false);
        }
    };

    const convertedSmaugsDolar = () => {
        let result = nfts[0].salePrice * smaugsDolar;
        return result.toFixed(2);
    };

    useEffect(() => {
        fetchNfts();
    }, []);
    return (
        <section className="sub-section d-flex align-items-center justify-content-lg-between justify-content-center flex-column flex-lg-row">
            {loading ? <Loading loading={loading && smaugsDolarLoading} color="black" position="center" size={40} /> : (
                <>
                    <div className="video-player-container">
                        <img src={DOWNLOAD_NFTS_URL + nfts[0].imageUrl} style={{ objectFit: "contain", maxHeight: 700, borderRadius: 30, }} className="w-100" />
                    </div>
                    <BidInfoSlider smaugsDolarConverted={convertedSmaugsDolar} item={nfts[0]} />
                </>
            )}
        </section>
    )
}

export default HomeSlider
