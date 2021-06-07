import React from 'react';
import { Card } from 'react-bootstrap';
import Divider from '../../../components/Divider';
import Icon from '../../../components/Icon';
import Link from '../../../components/Link';
import { DOWNLOAD_USERS_URL } from '../../../utils/Api';

const CardSeller = function ({ idx, seller }) {
    return (
        <Link href={`/profile/${seller.walletAddress}`}>
            <Card className="card-seller">
                <div className="d-flex justify-content-between align-items-center pb-4">
                    <div className={"custom-badge text-caption-2-bold neutral-2 blue"}>
                        <Icon icon="cup" size="xs" className="svg-neutral-2 mr-1" />
                        <span>#{idx + 1}</span>
                    </div>
                    <div className="d-flex">
                        <Icon icon="plus-square" className="svg-neutral-5 mr-2 button" />
                        <Icon icon="arrow-expand" className="svg-neutral-5 button" />
                    </div>
                </div>
                <Divider />
                <div className="d-flex flex-column align-items-center pt-4">
                    <div className="avatar mb-3">
                        <img src={DOWNLOAD_USERS_URL + seller.imageUrl} className="rounded-circle" />
                        <div className="c-badge badge-br">
                            {seller.isVerified &&
                                <Icon icon="verified" />
                            }
                        </div>
                    </div>
                    <div className="text-caption-bold neutral-2" >
                        {seller.displayName.length > 16 ? seller.displayName.slice(0, 13) + '...' : seller.displayName}
                    </div>
                    <div className="text-caption-2-bold neutral-2" >
                        {seller.walletAddress.slice(0, 13)}...{seller.walletAddress.slice(35, 42)}
                    </div>
                </div>
            </Card>
        </Link>
    );
}

export default CardSeller;
