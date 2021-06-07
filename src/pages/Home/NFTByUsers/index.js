import React, { useState, useEffect } from 'react';
import NFT from './NFT'
import Users from './Users'

function NFTByUsers ({nfts, users}) {
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {
        if( users.length > 0 )
            setSelectedUser( users[0] )
    }, [])

    return (
        <div className="d-flex justify-content-lg-between justify-content-center flex-column flex-xl-row">
            <NFT data={nfts} />
            <Users data={users} onChange={(user) => setSelectedUser(user)} />
        </div>
    );
}

export default NFTByUsers;
