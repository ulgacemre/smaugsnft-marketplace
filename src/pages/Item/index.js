import React, { useState, useEffect, useMemo, useRef } from 'react';
import Layout from '../../components/Layout'
import Button from '../../components/Buttons/Button';
import Label from '../../components/Label';
import Icon from '../../components/Icon';
import SubNav from '../../components/SubNav';
import ItemPageSubNav from '../../components/ItemPageSubNav';
import Divider from '../../components/Divider';
import Popup from '../../components/Popup';
import ModalPurchase from './ModalPurchase';
import ModalBid from './ModalBid';
import ModalAccept from './ModalAccept';
import ModalSale from './ModalSale';
import ModalTransferToken from './ModalTransferToken';
import ModalUnlockData from './ModalUnlockData';
import ModalRemoveSale from './ModalRemoveSale';
import ModalBurnToken from './ModalBurnToken';
import ModalReport from './ModalReport';
import { useHistory, useParams } from 'react-router-dom';

import Web3 from 'web3';
import poster from '../../assets/images/home/poster.png'
import avatar03 from '../../assets/images/avatar/avatar03.png'
import { dataLabels, dataInfo } from '../../FakeData/Item'
import './Item.css';
import { connect } from "react-redux";
import axios, { DOWNLOAD_NFTS_URL, DOWNLOAD_USERS_URL } from '../../utils/Api';
import Loading from '../../components/Loading';
import axiosOther from 'axios';
import Link from '../../components/Link';
import useWeb3 from '../../shared/hooks/useWeb3';
import ModalPutSale from './ModalPutSale';
import slugify from 'slugify';
import ModalChangePrice from './ModalChangePrice';
import ModalShareLinks from './ModalShareLinks';
import addresses from '../../shared/addresses';
import { Helmet } from "react-helmet";

const infoTabs = [
    {
        title: 'Info'
    },
    {
        title: 'Owners'
    },
    {
        title: 'History'
    },
]




const PopupMenu = ({ onChangePrice, onTransferToken, onRemoveFromSale, onPutOnSale, onBurnToken, onReport, owner, walletAddress, nft, onUnlockData }) => (
    <>
        {walletAddress === owner.walletAddress ? (
            <>
                <div className="item-popup-item d-flex align-items-center mb-12" onClick={onChangePrice}>
                    <Icon icon="coin" size="sm" />
                    <div className="neutral-4 ml-2">Change price</div>
                </div>
                <Divider className="mb-3" />
                <div className="item-popup-item d-flex align-items-center mb-12" onClick={onTransferToken}>
                    <Icon icon="chevron-right-square" size="sm" />
                    <div className="neutral-4 ml-2">Transfer token</div>
                </div>
                <Divider className="mb-3" />
                <div className="item-popup-item d-flex align-items-center mb-12" onClick={onUnlockData}>
                    <Icon icon="wallet" size="sm" />
                    <div className="neutral-4 ml-2">Unlock Data</div>
                </div>
                <Divider className="mb-3" />
                {nft.putSale ? <div className="item-popup-item d-flex align-items-center mb-12" onClick={onRemoveFromSale}>
                    <Icon icon="close-circle" size="sm" />
                    <div className="neutral-4 ml-2">Remove from sale</div>
                </div> : <div className="item-popup-item d-flex align-items-center mb-12" onClick={onPutOnSale}>
                    <Icon icon="close-circle" size="sm" />
                    <div className="neutral-4 ml-2">Put on sale</div>
                </div>}
                <Divider className="mb-3" />
                <div className="item-popup-item d-flex align-items-center mb-12 primary-3 svg-primary-3" onClick={onBurnToken}>
                    <Icon icon="close-circle-fill" size="sm" />
                    <div className="ml-2">Burn token</div>
                </div>
                <Divider className="mb-3" />
            </>
        ) : null}
        <div className="item-popup-item d-flex align-items-center " onClick={onReport}>
            <Icon icon="info-circle" size="sm" />
            <div className="neutral-4 ml-2">Report</div>
        </div>
    </>
)

//
// type: purchase, accept, putonsale
//

function Item({ type = 'purchase', multiple, user_info }) {
    const [heart, setHeart] = useState(false)
    const [modalPurchaseShow, setModalPurchaseShow] = useState(false)
    const [modalBidShow, setModalBidShow] = useState(false)
    const [modalUnlockData, setModalUnlockData] = useState(false)
    const [modalAcceptShow, setModalAcceptShow] = useState(false)
    const [modalSaleShow, setModalSaleShow] = useState(false)
    const [modalTransferTokenShow, setModalTransferTokenShow] = useState(false)
    const [modalRemoveSaleShow, setModalRemoveSaleShow] = useState(false)
    const [modalPutOnSale, setModalPutOnSale] = useState(false)
    const [modalBurnTokenShow, setModalBurnTokenShow] = useState(false)
    const [modalChangePrice, setModalChangePrice] = useState(false)
    const [modalReportShow, setModalReportShow] = useState(false)
    const [popupCardShow, setPopupCardShow] = useState(false)
    const [modalShareLinks, setModalShareLinks] = useState(false)
    const [popupShow, setPopupShow] = useState(false)
    const [popupArrowLeft, setPopupArrowLeft] = useState(0)
    const [smaugsDolar, setSmaugsDolar] = useState(null);

    const [activities, setActivities] = useState([]);

    const moreButton = useRef(null);

    // nft item start
    const [nft, setNft] = useState(null);
    const [nftTab, setNftTab] = useState(0);
    const [nftLoading, setNftLoading] = useState(true);
    const [creator, setCreator] = useState(null);
    //nft item end

    const [videoType, setVideoType] = useState('');

    const { walletAddress, connected } = useWeb3();
    const history = useHistory();

    useEffect(() => {
        if (nft) {
            const convertedImageRegex = (/[.]/.exec(nft && nft.imageUrl)) ? /[^.]+$/.exec(nft && nft.imageUrl) : undefined;
            setVideoType(convertedImageRegex[0]);
        }
    }, [nft]);
    // params
    const { nft_id, ownerId } = useParams();

    const fetchNftItemMultiple = (id, ownerId) => {
        axios.get(`multiple?filter={"where":{"or":[{"walletAddress":"${ownerId}"},{"tokenId":"${id}"}]},"include":["category"]}`).then((res) => {

            res.data.forEach(item => {
                if (item.walletAddress === ownerId) {
                    axios.get(`Users/${item.creatorId}`).then((creator) => {
                        setCreator(creator.data);
                        axios.get(`Users/${item.walletAddress}`).then((owner) => {
                            const payload = {
                                ...item,
                                user: owner.data
                            };
                            setNft(payload);
                            setNftLoading(false);
                        }).catch(error => {
                            //console.log("OWNER_FETCH_ERROR ===> ", error);
                            setCreator(null);
                            setNftLoading(false);
                        })
                    }).catch(error => {
                        //console.log("OWNER_FETCH_ERROR ===> ", error);
                        setCreator(null);
                        setNftLoading(false);
                    })
                }
            });

            //console.log("NFT ===> ", data);
        }).catch((error) => {
            //console.log('NFT FETCH ERROR ===>', error)
            history.push("/404");
        });
    };

    const fetchNftItemSingle = (id) => {
        axios.get(`single/${id}?filter={"include":["category"]}`).then((res) => {

            axios.get(`Users/${res.data.creatorId}`).then((creator) => {
                setCreator(creator.data);
                axios.get(`Users/${res.data.walletAddress}`).then((owner) => {
                    axios.get(`activities?filter={"where":{"nft721Id":${res.data.id}}, "order": "id DESC"}`).then((activity) => {

                        axios.get(`NFTUsers?filter={"where": {"walletAddress": "${walletAddress}", "nft721Id": ${nft_id}}}`).then((response) => {
                            if (response.data.length > 0) {
                                setHeart(true);
                            } else {
                                setHeart(false);
                            }
                            const payload = {
                                ...res.data,
                                user: owner.data
                            };
                            setNft(payload);
                            setActivities(activity.data);
                            setNftLoading(false);
                        }).catch(error => {
                        });

                    }).catch(error => {
                        setActivities([]);
                    })
                }).catch(error => {
                    //console.log("OWNER_FETCH_ERROR ===> ", error);
                    setCreator(null);
                    setNftLoading(false);
                })
            }).catch(error => {
                //console.log("OWNER_FETCH_ERROR ===> ", error);
                setCreator(null);
                setNftLoading(false);
            })

            //console.log("NFT ===> ", data);
        }).catch((error) => {
            //console.log('NFT FETCH ERROR ===>', error)
            history.push("/404");
        });
    };

    const getSmaugsApiDolar = async () => {
        const { data } = await axiosOther.get("https://api.coingecko.com/api/v3/simple/price?ids=smaugs-nft&vs_currencies=usd");
        if (data) {
            setSmaugsDolar(data["smaugs-nft"].usd);
        }
    };

    useEffect(() => {
        if (nft_id && ownerId) {
            fetchNftItemMultiple(nft_id, ownerId);
            getSmaugsApiDolar();
        }
    }, [nft_id, ownerId]);


    useEffect(() => {
        if (nft_id && !ownerId) {
            fetchNftItemSingle(nft_id);
            getSmaugsApiDolar();
        }
    }, [nft_id, ownerId]);



    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [])

    useEffect(() => {
        resizeHandler();
    }, [popupShow])

    const renderLoading = () => {
        return (
            <div className="container content d-flex justify-content-center flex-lg-row flex-column" style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Loading
                    position={"center"}
                    loading={nftLoading}
                    color={"black"}
                    size={50}
                />
            </div>
        )
    };

    // renderTabs start
    const InfoListItem = ({ avatar, info, address, name, isVerified }) => (
        <Link href={`/profile/${address}`}>
            <div className="info-list-item">
                <div className="nft-list-item d-flex align-items-center">
                    <div className="avatar mr-3">
                        <img src={avatar} className="size-48 rounded-circle" />
                        <div className="c-badge badge-br">
                            {isVerified &&
                                <Icon icon="verified" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="text-caption neutral-4" >
                            {info}
                        </div>
                        <div className="nft-list-name text-caption-bold neutral-2" >
                            {name}
                        </div>
                    </div>
                </div>

                <Divider className="mt-3 mb-3" />
            </div>
        </Link>
    );

    const renderInfoTab = () => {
        return <div>
            <div className="item-content mb-3">
                <label><b>Properties</b></label>
                <div className="items">
                    <div className="item">
                        <span className="title">Category:</span>
                        <span>     <Link href={`/collection/${slugify(nft && nft.category.title).toLowerCase()}`}><Label className={"black"} fill >  {nft && nft.category.title}  </Label></Link></span>
                    </div>
                    <div className="item">
                        <span className="title">Royalties:</span>
                        <span>{nft && nft.royalties}</span>
                    </div>
                    <div className="item">
                        <span className="title">Max Supply:</span>
                        <span>{nft && nft.supply}</span>
                    </div>
                </div>
            </div>
            <div className="item-content">
                <label><b>Chain Info</b></label>
                <div className="items">
                    <div className="item">
                        <span className="title">Contract address:</span>
                        <span>
                            <a href={`https://bscscan.com/address/${addresses.ERC721}`} target="_blank">{addresses.ERC721.slice(0, 6)}...{addresses.ERC721.slice(34, 42)}</a>
                        </span>
                    </div>
                    <div className="item">
                        <span className="title">Token ID:</span>
                        <span>{nft && nft.id}</span>
                    </div>
                    <div className="item">
                        <span className="title">Blockchain:</span>
                        <span>BSC</span>
                    </div>
                </div>
            </div>
        </div>;
    };

    const renderHistoryTab = () => {
        return (
            activities.length > 0 ? (
                <div className="item-content mb-3">
                    <label><b>Actions</b></label>
                    <div className="items">
                        {activities.map((item, idx) => {
                            return (
                                <div key={idx} className="item" style={{ flexDirection: "column" }}>
                                    <span>{item.action.slice(0, 45) + '...'}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : <h6 className="text-center">Not found!</h6>
        )
    };

    // renderTabsEnd

    const renderContent = () => {
        switch (nftTab) {
            case 0:
                return renderInfoTab();
            case 1:
                return (
                    <>
                        <InfoListItem
                            avatar={DOWNLOAD_USERS_URL + creator.imageUrl}
                            info={"Creator"}
                            name={creator.displayName}
                            isVerified={false}
                            address={creator.walletAddress}
                        />
                        <InfoListItem
                            avatar={DOWNLOAD_USERS_URL + nft.user.imageUrl}
                            info={"Owner"}
                            name={nft.user.displayName}
                            isVerified={false}
                            address={nft.user.walletAddress}
                        />
                    </>
                )
            case 2:
                return renderHistoryTab();
            case 3:
                return "bids";
        }
    };

    const renderPurchaseButton = () => {
        if (connected) {
            if (user_info && user_info.displayName) {
                if (walletAddress !== nft.walletAddress) {
                    return (
                        <div className="d-flex justify-content-between mt-32 mb-32"><Button
                            disabled={nft.salePrice === 0 ? 'disabled' : null}
                            className="large primary w-100 mr-2"
                            style={nft.salePrice === 0 ? { cursor: "not-allowed" } : null}
                            onClick={purchaseModalActive}
                        >
                            Purchase now
                        </Button></div>
                    )
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    const onTransferToken = () => {
        setModalTransferTokenShow(true)
    }

    const onRemoveFromSale = () => {
        setModalRemoveSaleShow(true)
    }

    const onPutOnSale = () => {
        setModalPutOnSale(true);
    }
    const onUnlockData = () => {
        setModalUnlockData(true);
    }
    const onChangePrice = () => {
        setModalChangePrice(true);
    }

    const onBurnToken = () => {
        setModalBurnTokenShow(true)
    }

    const onReport = () => {
        setModalReportShow(true)
    }

    const renderSmaugsDolar = (price) => {
        let result = price * smaugsDolar;
        return result.toFixed(2);
    }

    const resizeHandler = () => {
        const arrowWidth = 32;
        const popupDlg = document.getElementsByClassName('item-popup')
        if (popupDlg.length === 1) {
            setTimeout(() => {
                const rectButton = moreButton.current.getBoundingClientRect()
                const rectPopup = popupDlg[0].getBoundingClientRect()
                const actualPos = rectButton.x + (rectButton.width / 2)
                let leftPos = actualPos - rectPopup.x - arrowWidth / 2;
                if (leftPos > rectPopup.width - 56)
                    leftPos = rectPopup.width - 56
                setPopupArrowLeft(leftPos);
            }, 30);
        }
    }
    const setLike = () => {
        if (!heart) {
            const web3 = new Web3(window.ethereum);
            axios.post('NFTLikes', {
                walletAddress: walletAddress,
                nft721Id: nft.id,
                likes: 1
            }).then((response) => {
                axios.post('NFTUsers', {
                    nft721Id: nft.id,
                    nftlikesId: response.data.id,
                    walletAddress: walletAddress
                }).then((responseNext) => {
                    console.log("responseNext => ", responseNext.data);
                    setHeart(true);


                    web3.eth.personal.sign('I want to like ' + nft.itemName, walletAddress)
                        .then(() => {
                        }).catch(error => {
                            console.log("error**", error);
                        });
                }).catch(error => {
                    console.log("error => ", error);
                });
            }).catch(error => {
                console.log("error => ", error);
            });
        } else {

            axios.get(`NFTUsers?filter={"where": {"walletAddress": "${walletAddress}", "nft721Id": ${nft_id}}}`).then((response) => {
                if (response.data.length > 0) {
                    const web3 = new Web3(window.ethereum);
                    axios.delete(`NFTLikes/${response.data[0].nftlikesId}`).then((likeData) => {

                        axios.delete(`NFTUsers/${response.data[0].id}`).then((res) => {
                            setHeart(false);

                            web3.eth.personal.sign('I want to unlike ' + nft.itemName, walletAddress)
                                .then(() => {
                                }).catch(error => {
                                    console.log("error**", error);
                                });
                        });

                    }).catch(error => {
                        console.log("unlike_delete_error => ", error);
                    })
                }
            }).catch(error => {
                console.log("error =>", error);
            });

        }
    };
    const HighestBidInfo = () => (
        <div className="d-flex">
            <img src={DOWNLOAD_USERS_URL + nft.user.imageUrl} className="size-48 rounded-circle" />
            <div className="ml-3" style={{ display: "flex", flexDirection: "column", }}>
                <div className="item-normal-price" style={{ display: "flex", flexDirection: "row", marginTop: "auto", marginBottom: "auto" }}>
                    <span className="mr-12">
                        {nft.putSale === false ? 'Not For Sale' : `${nft.salePrice} SMG`}
                    </span>
                    <span className="neutral-4 mr-2">
                        {nft.putSale !== false ? `$ ${renderSmaugsDolar(nft.salePrice)}` : null}
                    </span>
                </div>
            </div>
        </div>
    )
    const renderComissionPrice = () => {
        const part1 = (nft.salePrice / 100) * 2;
        const result = nft.salePrice + part1;
        return result.toFixed(2);
    };
    const renderComissionWithSmaugsDolar = () => {
        const comission = renderComissionPrice();
        const result = smaugsDolar * comission;
        return result.toFixed(2);
    };

    const purchaseModalActive = () => {
        if (nft.salePrice !== 0 && connected === true) {
            setModalPurchaseShow(true)
        } else {
            history.push("/connect");
        }
    };
    return (
        <Layout page="item">
      
            {!nftLoading ? <div className="container content d-flex justify-content-between flex-lg-row flex-column">
                <div className="sticky-action d-xl-block d-none">
                    <Button className="large mb-3 bg-neutral-2 svg-neutral-4" icon="close" circle />
                    <Button onClick={() => setModalShareLinks(true)} className="large mb-3" icon="share-square" circle />
                    <Button
                        className="large mb-3 svg-primary-3"
                        icon={heart ? "heart-fill" : "heart"}
                        circle
                        onClick={() => setLike()}
                    />

                    <Button
                        childRef={moreButton}
                        className="large"
                        icon="more"
                        onClick={() => setPopupShow(true)}
                        circle
                    />

<Helmet>
                <meta charSet="utf-8" />
                <title>{nft.itemName}</title>
                <meta property="og:title" content={nft.itemName} />
                <meta property="og:description" content={nft.description} />
                <meta property="og:image" content={DOWNLOAD_NFTS_URL + nft.imageUrl} />
                <meta name="twitter:title" content={nft.itemName} />
                <meta name="twitter:description" content={nft.description} />
                <meta name="twitter:image" content={DOWNLOAD_NFTS_URL + nft.imageUrl} />
            </Helmet>


                    <Popup
                        className="item-popup"
                        target={moreButton.current}
                        show={popupShow}
                        arrowStyle={{ left: `${popupArrowLeft}px` }}
                        onClose={() => setPopupShow(false)}
                    >
                        <PopupMenu
                            onChangePrice={onChangePrice}
                            onTransferToken={onTransferToken}
                            onRemoveFromSale={onRemoveFromSale}
                            onBurnToken={onBurnToken}
                            onReport={onReport}
                            onPutOnSale={onPutOnSale}
                            onUnlockData={onUnlockData}
                            nft={nft}
                            walletAddress={walletAddress}
                            owner={nft.user}
                        />
                    </Popup>
                </div>
                <div className="item-image">

                    {videoType === 'mp4' ? <video width={100 + '%'} height={100 + '%'} autoPlay controls> <source src={DOWNLOAD_NFTS_URL + nft.imageUrl} type="video/mp4"></source> </video> : <img src={`${DOWNLOAD_NFTS_URL}${nft && nft.imageUrl}`} className="w-100 h-100" style={{ objectFit: "contain" }} />}
                    <div className="item-image-info d-flex" >


                        {/*<Label className={"mr-2 purple"} fill>
                            Lockable
                        </Label>*/}
                    </div>
                    <div className="item-image-action d-xl-none d-flex">
                        <Button className="large mr-4" icon="share-square" circle />
                        <Button
                            className="large mr-4 svg-primary-3"
                            icon={heart ? "heart-fill" : "heart"}
                            circle
                            onClick={() => setLike()}
                        />
                        <Button className="large" icon="more"
                            onClick={() => setPopupCardShow(!popupCardShow)}
                            circle />
                    </div>

                    {popupCardShow &&
                        <div className="popup-item-card d-xl-none d-block">
                            <PopupMenu
                                onChangePrice={onChangePrice}
                                onTransferToken={onTransferToken}
                                onRemoveFromSale={onRemoveFromSale}
                                onBurnToken={onBurnToken}
                                onReport={onReport}
                                onPutOnSale={onPutOnSale}
                                onUnlockData={onUnlockData}
                                nft={nft}
                                walletAddress={walletAddress}
                                owner={nft.user}
                            />
                        </div>
                    }
                </div>

                <div className="right-panel d-flex flex-column">
                    <h3 className="mb-2"> {nft && nft.itemName} </h3>
                    <div className="d-flex align-items-center" style={{ marginBottom: '15px' }}>
                        <Label className="green mr-2" font="text-button-1">{nft && nft.putSale === false ? 'Not For Sale' : `${nft.salePrice} SMG`}</Label>
                        {nft.putSale !== false ? <Label className="gray mr-2" font="text-button-1">$ {renderSmaugsDolar(nft.salePrice)}</Label> : null}
                        <div className="text-button-1 neutral-4">
                            {nft.supply} Supply
                        </div>
                    </div>


                    <div className="text-body-2 neutral-4" style={{ marginBottom: '15px' }}>
                        {nft && nft.description}
                    </div>

                    <div className="">
                        <div className="tabs-info">
                            <ItemPageSubNav
                                className="small"
                                setNftTab={setNftTab}
                                nftTab={nftTab}
                                tabs={infoTabs}
                            />
                        </div>
                        <div className="info-list">
                            {renderContent()}
                        </div>
                    </div>

                    <div className="card mt-auto">
                        {type === "purchase" &&
                            <>
                                <HighestBidInfo avatar={avatar03} username="Kohaku Tora" value={1.46} price="$2,764.89" />
                                {renderPurchaseButton()}

                                <div className="neutral-4">
                                    <span className="text-caption-bold neutral-2 mr-12">Service fee</span>
                                    <span className="text-caption-bold neutral-2 mr-12">2%</span>
                                    <span className="text-caption neutral-2 mr-12">
                                        {renderComissionPrice()}
                                    </span>
                                    <span className="text-caption neutral-2 mr-12">
                                        {renderComissionWithSmaugsDolar()}
                                    </span>
                                </div>
                            </>
                        }
                        {type === "accept" &&
                            <>
                                <HighestBidInfo avatar={avatar03} username="Kohaku Tora" price={nft.salePrice} />
                                <div className="d-flex justify-content-between mt-32 mb-32">
                                    <Button className="large w-100 mr-2">View all</Button>
                                    <Button
                                        className="large primary w-100"
                                        onClick={() => setModalAcceptShow(true)}
                                    >
                                        Accept
                                    </Button>
                                </div>
                            </>
                        }
                        {type === "putonsale" &&
                            <>
                                <Button
                                    className="large primary w-100"
                                    onClick={() => setModalSaleShow(true)}
                                >
                                    Put on sale
                                </Button>
                                <div className="text-caption neutral-4 mt-32">

                                </div>
                            </>
                        }
                    </div>
                </div>

                <ModalPurchase multiple={multiple} fetchNftItem={multiple ? fetchNftItemMultiple : fetchNftItemSingle} data={nft} commisionPrice={renderComissionPrice} show={modalPurchaseShow} onClose={() => setModalPurchaseShow(false)} />
                <ModalChangePrice multiple={multiple} fetchNftItem={multiple ? fetchNftItemMultiple : fetchNftItemSingle} nft={nft} show={modalChangePrice} onClose={() => setModalChangePrice(false)} />
                <ModalUnlockData fetchNftItem={fetchNftItemSingle} nft={nft} show={modalUnlockData} onClose={() => setModalUnlockData(false)} />
                <ModalShareLinks multiple={multiple} nft={nft} show={modalShareLinks} onClose={() => setModalShareLinks(false)} />
                <ModalBid multiple={multiple} show={modalBidShow} onClose={() => setModalBidShow(false)} />
                <ModalPutSale multiple={multiple} nft={nft} fetchNftItem={multiple ? fetchNftItemMultiple : fetchNftItemSingle} show={modalPutOnSale} onClose={() => setModalPutOnSale(false)} />
                <ModalAccept multiple={multiple} show={modalAcceptShow} onClose={() => setModalAcceptShow(false)} />
                <ModalSale multiple={multiple} show={modalSaleShow} onClose={() => setModalSaleShow(false)} />
                <ModalTransferToken multiple={multiple} nft={nft} fetchNftItem={multiple ? fetchNftItemMultiple : fetchNftItemSingle} show={modalTransferTokenShow} onClose={() => setModalTransferTokenShow(false)} />
                <ModalRemoveSale multiple={multiple} fetchNftItem={multiple ? fetchNftItemMultiple : fetchNftItemSingle} nft={nft} show={modalRemoveSaleShow} onClose={() => setModalRemoveSaleShow(false)} />
                <ModalBurnToken fetchNftItem={multiple ? fetchNftItemMultiple : fetchNftItemSingle} multiple={multiple} nft={nft} tokenId={nft.id} show={modalBurnTokenShow} onClose={() => setModalBurnTokenShow(false)} />
                <ModalReport multiple={multiple} connected={connected} walletAddress={walletAddress} nft_id={nft_id} supply={nft.supply} show={modalReportShow} onClose={() => setModalReportShow(false)} />
            </div>
                : renderLoading()}
        </Layout>
    );
}
const mapStateToProps = ({ user }) => {
    const { user_info } = user;
    return { user_info }
};

export default connect(mapStateToProps)(Item);