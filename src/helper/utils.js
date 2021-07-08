
export const shortenWallet = (wallet) => {
    if (wallet === undefined)
        return '';

    if (wallet.length < 18) {
        return wallet;
    }

    return wallet.slice(0, 11) + "..." + wallet.slice(-4);
}

export const checkVerified = (nft) => {
    return nft.user.verified === true;
}