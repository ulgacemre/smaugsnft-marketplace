import React, { useState, useRef } from 'react';
import Popup from './Popup';
import Icon from './Icon';
import Button from './Buttons/Button';
import Link from './Link'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Scrollbar } from "swiper";

import { dataActivities } from '../FakeData/Activity'

SwiperCore.use([Scrollbar]);

const Notification = function({data, className, ...props}) {
    const [popupShow, setPopupShow] = useState(false)
    const elementButton = useRef(null);

    return (
        <div className={ "notification " + className } {...props}>
            <div className="button size-40" ref={elementButton} onClick={() => setPopupShow(!popupShow)}>
                <Icon icon="bell" />                
                <span className={"status " + (dataActivities.length > 0 ? "on" : "off")}></span>
            </div>
            
            <Popup 
                className="notification-popup"
                target={elementButton.current}
                show={popupShow}
                onClose={() => setPopupShow(false)}
            >
                <div className="d-flex justify-content-between align-items-center mb-3 px-3">
                    <h4>Notification</h4>
                    <Link href="/activity" className="d-none d-lg-block">
                        <Button className="normal primary">See all</Button>
                    </Link>
                </div>
                <Swiper
                    slidesPerView='auto'
                    direction='vertical'
                    spaceBetween={0}
                    className="notification-content"
                    freeMode={true}
                    scrollbar={true}
                >
                    {dataActivities.map((item,idx) => (
                        <SwiperSlide key={idx} >
                            <div className="notification-item d-flex align-items-center p-3">
                                <img src={item.image} className="notification-img" />
                                <div className="notification-item-content ml-4">
                                    <div className="text-body-2-bold neutral-1">{item.title}</div>
                                    <div className="text-caption-bold neutral-3">{item.description}</div>
                                    <div className="text-caption-2 neutral-4">{item.time}</div>
                                </div>
                                <div className="ml-auto notification-mark">
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Link href="/activity" className="d-block d-lg-none">                    
                    <Button 
                        className="w-100 large primary" 
                        style={{marginTop: '20px'}}>
                            See all
                    </Button>
                </Link>
            </Popup>
        </div>
    );
}

export default Notification;
