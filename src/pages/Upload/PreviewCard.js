import React, { useState } from 'react';
import Icon from '../../components/Icon';
import Label from '../../components/Label';
import Button from '../../components/Buttons/Button';
import Divider from '../../components/Divider';
import { DOWNLOAD_USERS_URL } from '../../utils/Api';
import Loading from '../../components/Loading';



const PreviewCard = function ({ data, hover = true, detectingPhoto, uploadFileTypeMp4 }) {
    const [heart, setHeart] = useState(false);

    return (
        <div>
            <div className="hotbid-image-container">
                {uploadFileTypeMp4 ? <video controls autoPlay muted width={100 + '%'} height={100 + '%'}>
                    <source src={data.image} type="video/mp4"></source>
                </video> : <img src={data.image} style={detectingPhoto && !uploadFileTypeMp4 ? { opacity: 0.5 } : null} className="hotbid-item-img" />}
                {hover &&
                    <div className="hotbid-item-hover">
                        <div className="d-flex justify-content-between p-2 w-100">
                            <div>
                                <Label className="green" fill>Purchasing !</Label>
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
            </div>
            <div className="hotbid-content">



                <div className="d-flex justify-content-between align-items-center mb-12">

                    <div className="text-body-2-bold">{data.title === '' ? 'Item Name' : data.title}</div>

                </div>
                <div className="d-flex justify-content-between align-items-center mb-12">
                    <div className="stacked-avatar">
                        <img style={{ width: 30, height: 30, borderRadius: 30, marginRight: 7 }} src={`${DOWNLOAD_USERS_URL}${data.user_info.imageUrl}`} />
                        <div className="text-caption-bold" style={{ marginTop: 6 }}>  {data.user_info.displayName}</div>
                    </div>
                    <Label className="green">{data.itemPrice} SMG</Label>
                </div>


            </div>
        </div>
    );
}

export default PreviewCard;