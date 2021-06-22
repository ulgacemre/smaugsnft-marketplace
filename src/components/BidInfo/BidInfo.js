import React from 'react';
import { DOWNLOAD_USERS_URL } from '../../utils/Api';
import Button from '../Buttons/Button';
import avatar02 from '../../assets/images/avatar/avatar02.png';
import Link from '../Link';
import addresses from '../../shared/addresses';
const BidInfo = function ({ item, smaugsDolarConverted }) {


    ////////////////// AUCTION ENDING IN SECTION ////////////////////
    /*
                <div className="text-body-2-bold mb-2">Auction ending in</div>
                    <div className="d-flex justify-content-around">
                        <div>
                            <h4 className="neutral-1">19</h4>
                            <div className="text-body-2-bold neutral-4">Hrs</div>
                        </div>
                        <div>
                            <h4 className="neutral-1">24</h4>
                            <div className="text-body-2-bold neutral-4">mins</div>
                        </div>
                        <div>
                            <h4 className="neutral-1">19</h4>
                            <div className="text-body-2-bold neutral-4">secs</div>
                        </div>
                    </div>
    */

    return (
        <div className="bid-container">
            <div className="section bid-info">
                <h1>{item && item.user && item.itemName}</h1>
                <div className="d-flex justify-content-between">
                    <div className="d-flex bid-info-item">
                        <img src={DOWNLOAD_USERS_URL + item.user.imageUrl} className="size-40 rounded-circle mr-2" />
                        <div>
                            <div className="text-caption-2">Owner</div>
                            <div className="text-caption-bold">{item && item.user && item.user.displayName}</div>
                        </div>
                    </div>
                    <div className="d-flex bid-info-item">
                        <img src={avatar02} className="size-40 rounded-circle mr-2" />
                        <div>
                            <div className="text-caption-2">Instant price</div>
                            <div className="text-caption-bold">{item && item.user && item.salePrice} SMG</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section card text-center">
                <div className="mb-4">
                    <div className="text-body-2-bold">Price</div>
                    <h2 className="neutral-1">{item.salePrice} SMG</h2>
                    <div className="text-body-1-bold neutral-4">${smaugsDolarConverted()}</div>
                </div>
                <div>
                    <p className="text-center neutral-2">
                        {item.description}
                    </p>
                </div>
            </div>

            <div className="section">
                <Link href={`assets/${addresses.ERC721}/${item.id}`}><Button className="normal w-100 primary mb-2" >Buy Now</Button></Link>
                <Link href={`assets/${addresses.ERC721}/${item.id}`}><Button className="normal w-100 " >View item</Button></Link>
            </div>
        </div>
    );
}

export default BidInfo;
