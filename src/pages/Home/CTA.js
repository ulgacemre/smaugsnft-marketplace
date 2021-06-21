import React from 'react';
import Button from '../../components/Buttons/Button'
import heorImage from '../../assets/images/home/block.png'
import Link from '../../components/Link';
function CTA() {
    return (
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center">
            <div className="cta-content">
                <div className="cta-content-text" style={{marginBottom: '40px'}}>
                
                    <h2 style={{marginBottom: '20px'}}>
                    Sell your designs with Smaugs NFT
                    </h2>
                    <div className="text-body-2 neutral-4">
                       AI powered NFT marketplace
                    </div>
                </div>
                <div className="d-none d-lg-flex cta-action">
                <Link href={'/upload'}>
                    <Button className="primary large mr-3">
                        Earn now
                    </Button>
                    </Link>
                    <Link href={'/search'}>
                    <Button className="large">
                        Discover more
                    </Button>
                    </Link>
                </div>
                <div className="d-lg-none d-block cta-action" style={{marginBottom: '40px'}}>
                <Link href={'/upload'}>
                    <Button className="primary large w-100 mb-3">
                        Earn now
                    </Button>
                    </Link>
                    <Link href={'/search'}>
                    <Button className="large w-100">
                        Discover more
                    </Button>
                    </Link>
                </div>
            </div>
            <div>
                <img src={heorImage} className="d-xl-none d-block w-100" />
                <img src={heorImage} className="d-xl-block d-none" style={{width: '640px'}} />
            </div>
        </div>
    );
}

export default CTA;
