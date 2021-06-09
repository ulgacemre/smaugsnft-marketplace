import React, { useState } from 'react';
import Icon from './Icon';
import Label from './Label';
import Button from './Buttons/Button';
import Link from './Link';
import '../assets/styles/_card-bid.css';
import { DOWNLOAD_NFTS_URL, DOWNLOAD_USERS_URL } from '../utils/Api';

import { connect } from "react-redux";

const CardBid = function ({ data, hover = true, user_info, smaugsDolar }) {
    const [heart, setHeart] = useState(false);

    return (
        <>
            <div className="hotbid-image-container">
                <Link href={`/assets/0xff506c7e01a03bb97e3318f28254cb6ef8fe8621/${data.id}`}>
                    <img src={DOWNLOAD_NFTS_URL + data.imageUrl} className="hotbid-item-img" />
                    {hover &&
                        <div className="hotbid-item-hover">
                            <div className="d-flex justify-content-between p-2 w-100">
                                <div>
                                    {/* <Label className="green" fill>Purchasing !</Label> */}
                                </div>
                                <Button className="size-32 rounded-circle bg-neutral-8 border-0"
                                    onClick={() => setHeart(!heart)}
                                >
                                    <Icon icon={heart ? "heart-fill" : "heart"} className={heart ? "svg-primary-3" : ""} />
                                </Button>
                            </div>
                            <Button
                                className="primary normal mb-3"
                                icon="scatter-up"
                                iconPos="right">
                                <span>Buy Now</span>
                            </Button>
                        </div>
                    }
                </Link>
            </div>
            <div className="hotbid-content">
                <div className="d-flex justify-content-between align-items-center mb-12">

                    <Link href={`/assets/0xff506c7e01a03bb97e3318f28254cb6ef8fe8621/${data.id}`}>
                        <div className="text-body-2-bold neutral-2">{data.itemName}</div>
                    </Link>

                </div>
                <div className="d-flex justify-content-between align-items-center mb-12">
                    <Link href={`/profile/${data.walletAddress}`}>
                        <div className="stacked-avatar">
                            <img style={{ width: 30, height: 30, borderRadius: 30 }} src={data.user ? DOWNLOAD_USERS_URL + data.user.imageUrl : DOWNLOAD_USERS_URL + user_info.imageUrl} />
                            <div className="ml-2 text-caption-bold neutral-2">  {data.user ? data.user.displayName : data.itemPrice}</div>
                        </div>
                    </Link>

                </div>

                <div className="d-flex justify-content-between align-items-center mb-12">

                    <Label className="green">{data.putSale ? `${data.salePrice} SMG` : 'Not for sale'} </Label>
                    {data.putSale ? <Label className="black neutral-2">
                        {(data.salePrice * smaugsDolar).toFixed(2)} $
                    </Label> : null}

                </div>





            </div>
        </>
    );
}
const mapStateToProps = ({ user, setting }) => {
    const { user_info } = user;
    return { user_info }
};

export default connect(mapStateToProps)(CardBid);

