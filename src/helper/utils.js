
export const shortenWallet = (wallet) => {
    if( wallet === undefined )
        return '';
        
    if( wallet.length < 18 ) {
        return wallet;
    }

    return wallet.slice(0, 11) + "..." + wallet.slice(-4);
}