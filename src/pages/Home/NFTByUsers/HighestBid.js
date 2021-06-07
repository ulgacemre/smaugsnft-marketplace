import React from 'react';
import Label from '../../../components/Label';

function HighestBid ({title, image, owner, stock, bid}) {
    return (
        <div className="highest-bid w-100">
            <img src={image} className="mb-4"/>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <img src={owner.avatar} className="rounded-circle size-40" />
                    <div className="ml-3">
                        <div className="text-body-1-bold">{title}</div>
                        <div className="text-caption-bold neutral-3">{stock} in stock</div>
                    </div>
                </div>
                <div>
                    <div className="text-caption-2 neutral-4">Highest bid</div>
                    <Label className="green">
                        {bid} ETH
                    </Label>
                </div>
            </div>
        </div>
    );
}

export default HighestBid;
