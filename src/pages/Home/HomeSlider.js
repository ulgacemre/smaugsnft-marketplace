import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import BidInfoSlider from '../../components/BidInfo/BidInfoSlider'
import Loading from '../../components/Loading';
import axios, { DOWNLOAD_NFTS_URL } from '../../utils/Api';
import axiosOther from 'axios';
function HomeSlider() {
    const [nfts, setNfts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [smaugsDolar, setSmaugsDolar] = useState('');
    const [smaugsDolarLoading, setSmaugsDolarLoading] = useState('');
    const [convertedImageType, setConvertedImageType] = useState('');
    const fetchNfts = () => {
        axios.get('single/banner').then((response) => {
            axios.get(`single/${response.data.all}?filter={"include": {"relation": "user"}}`).then(({ data }) => {
                if (data && data.id) {
                    setNfts(data);
                    setLoading(false);
                    const convertedImageRegex = (/[.]/.exec(data.imageUrl)) ? /[^.]+$/.exec(data.imageUrl) : undefined;
                    setConvertedImageType(convertedImageRegex[0]);
                    //console.log("HOME_SLIDER_NFTS ===>", data);
                    getSmaugsApiDolar();
                }
            }).catch(error => {
                console.log("HOME_SLIDER_FETCH_NFTS ===> ", error);
                setNfts(null);
                setLoading(false);
            })
        }).catch(error => {
            console.log('error => ', error);
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
        let result = nfts.salePrice * smaugsDolar;
        return result.toFixed(2);
    };



    useEffect(() => {
        fetchNfts();
    }, []);
    const renderContent = () => {
        if (loading) {
            return <Loading loading={loading && smaugsDolarLoading} color="black" position="center" size={40} />;
        } else if (nfts === null && loading === false) {
            return <h5 className="text-center">Not found!</h5>
        } else if (nfts !== null && loading === false) {
            return (
                <>
                    <div className="video-player-container">
                        {convertedImageType === 'mp4' ? <video width={100 + '%'} height={600} controls muted autoPlay>
                            <source src={DOWNLOAD_NFTS_URL + nfts.imageUrl} type="video/mp4"></source>
                        </video> : <img src={DOWNLOAD_NFTS_URL + nfts && nfts.imageUrl} style={{ objectFit: "contain", maxHeight: 700, borderRadius: 30, }} className="w-100" />}
                    </div>
                    <BidInfoSlider smaugsDolarConverted={convertedSmaugsDolar} item={nfts} />
                </>
            )
        }
    };
    return (
        <section className="sub-section d-flex align-items-center justify-content-lg-between justify-content-center flex-column flex-lg-row">
            {renderContent()}
        </section>
    )
}

export default HomeSlider
