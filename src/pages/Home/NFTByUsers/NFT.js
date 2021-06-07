import React from 'react';
import Button from '../../../components/Buttons/Button';
import Label from '../../../components/Label';
import HighestBid from './HighestBid'
import Icon from '../../../components/Icon'

function NFT ({data}) {
    return (
        <div className="d-flex">
            <HighestBid {...data[0]}/>
            <div className="nft-list w-100 d-lg-block d-none">
                {data.map((item, idx) => (
                    <div key={idx} className={"d-flex align-items-center " + (idx > 0 ? "mt-32" : "")}>
                        <div className="nft-list-item">
                            <img src={item.image} className="nft-list-img" />
                            <div className="nft-list-hover">
                                <Button className="size-48 rounded-circle bg-neutral-8 border-0">
                                    <Icon icon="arrow-right" />
                                </Button>
                            </div>
                        </div>
                        <div className="ml-4 flex-grow-1">
                            <div className="mb-2">{item.title}</div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <img src={item.owner.avatar} className="size-20 rounded-circle"/>
                                <Label className="green">{item.bid} ETH</Label>
                                <div className="text-caption">{item.count} of {item.stock}</div>
                            </div>
                            <Button className="small">Place a bid</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NFT;
