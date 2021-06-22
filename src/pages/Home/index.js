import React, { useState } from 'react';
import axiosOther from 'axios';
import Layout from '../../components/Layout'
import Button from '../../components/Buttons/Button'
import Divider from '../../components/Divider'
import VideoPlayer from '../../components/VideoPlayer'
import BidInfoSlider from '../../components/BidInfo/BidInfoSlider'
import NFTByUsers from './NFTByUsers';
import PopularSellers from './PopularSellers';
import HotBid from './HotBid';
import HotCollection from './HotCollection';
import Discover from './Discover';
import CTA from './CTA';

import { bidInfoData, NFTs, NFTUsers } from '../../FakeData/Home'
import slideVideo from '../../assets/videos/test.mp4'
import Link from '../../components/Link';
import HomeSlider from './HomeSlider';
import { useEffect } from 'react';
function Home() {
    const [smaugsDolar, setSmaugsDolar] = useState(null);
    const getSmaugsApiDolar = async () => {
        const { data } = await axiosOther.get("https://api.coingecko.com/api/v3/simple/price?ids=smaugs-nft&vs_currencies=usd");
        if (data) {
            setSmaugsDolar(data["smaugs-nft"].usd);
        }
    };
    useEffect(() => {
        getSmaugsApiDolar();
    }, []);
    return (
        <Layout page="home">
            <section className="section container">
                <section className="text-center">
                    <div className="text-hairline-2 text-uppercase mb-2">Create, explore, & collect digital art NFTs.</div>
                    <h3 className="mb-4">World's first AI powered NFT Marketplace</h3>
                    <Link href="/search">
                        <Button className="large m-auto">Start your search</Button>
                    </Link>
                </section>
                <HomeSlider smaugsDolar={smaugsDolar} />
            </section>

            <section className="section bg-neutral-7">
                <div className="container">
                    <PopularSellers smaugsDolar={smaugsDolar} />
                </div>
            </section>

            {/*<section className="section">
                <div className="container">
                    <HotBid />
                </div>
            </section> */}

            <section className="section bg-neutral-8">
                <div className="container">
                    <HotCollection smaugsDolar={smaugsDolar} />
                </div>
            </section>

            <section className="section bg-neutral-7">
                <div className="container">
                    <Discover smaugsDolar={smaugsDolar} />
                </div>
            </section>

            <Divider className="d-none d-lg-block" />

            <section className="section">
                <div className="container">
                    <CTA smaugsDolar={smaugsDolar} />
                </div>
            </section>
        </Layout>
    );
}

export default Home;
