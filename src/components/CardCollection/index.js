import React, { useState } from 'react';
import Label from '../Label';

const CardCollection = function({data}) {
    let collects = data.collection.slice(0, 3)

    return (
        <>
            <div className="collection-image-container">
                <img src={data.image} className="collection-img mb-2" />
                <div className="d-flex justify-content-between" >
                    {collects.map((collect, idx) => (
                        <img src={collect} className="collection-item-img" key={idx} />
                    ))}
                </div>
            </div>
            <div className="collection-content mt-3">
                <div className="text-body-2-bold">{data.title}</div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="collection-owner">
                        <img src={data.owner.avatar} className="size-24 rounded-circle mr-12" />
                        <span className="text-caption mr-1">By</span>
                        <span className="text-caption">{data.owner.name}</span>
                    </div>
                    <Label className="gray">{data.collection.length} ITEMS</Label>
                </div>
            </div>
        </>
    );
}

export default CardCollection;
