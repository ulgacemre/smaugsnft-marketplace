import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../components/Layout'
import Button from '../../components/Buttons/Button'
import Switch from '../../components/Input/Switch'
import Divider from '../../components/Divider'
import Icon from '../../components/Icon'
import Link from '../../components/Link'
import FileUploader from '../../components/FileUploader'
import Input from '../../components/Input'
import DropDown from '../../components/DropDown';
import Modal from '../../components/Modal'
import { Swiper, SwiperSlide } from "swiper/react";
import * as nsfwjs from 'nsfwjs'
import { useHistory } from 'react-router-dom';

import { dataRoyalties, dataCollections, dataCurrency } from '../../FakeData/Upload'



import avatar01 from '../../assets/images/avatar/avatar01.png'
import placeholder from '../../assets/images/placeholder.png'
import ModalCreateItem from './ModalCreateItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import useWeb3 from '../../shared/hooks/useWeb3';
import axios from '../../utils/Api';
import PreviewCard from './PreviewCard';
import { ContractsContext } from '../../shared/context/Contracts';
import Loading from '../../components/Loading';
import { CLIENT_URL } from '../../constants/config';
function Collection({ color, create = false, title, className = '', display, ...props }) {
    return (
        <div className={"collection-item " + className + ` d-${display}`} {...props}>
            <div className={"mark p-1 mb-12" + (create ? " pointer" : "")} style={{ backgroundColor: color }}>
                {create &&
                    <Icon icon="plus-2" />
                }
            </div>
            <div className="text-button-2">
                {title}
            </div>
        </div>
    )
}

function PreviewModalContent({ data, clearAll, detectingPhoto, uploadFileTypeMp4 }) {
    return (
        <>
            <PreviewCard
                detectingPhoto={detectingPhoto}
                data={data}
                uploadFileTypeMp4={uploadFileTypeMp4}
                hover={false}
            />
            <div className="d-flex align-items-center mt-4 pointer"
                onClick={clearAll}>
                <Icon icon="close-circle" />
                <span className="text-button-1 neutral-4 ml-2">Clear all</span>
            </div>
        </>
    )
}

function UploadSingle({ isSingle = true, user_info }) {
    const [uploadImage, setUploadImage] = useState(placeholder);
    const [uploadImageFile, setUploadImageFile] = useState(null);
    const [collections, setCollections] = useState(dataCollections);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemSize, setItemSize] = useState('');
    const [itemProperty, setItemProperty] = useState('');
    const [itemRoyalties, setItemRoyalities] = useState('');
    const [putOnSale, setPutOnSale] = useState(false);
    const [instantSalePrice, setInstantSalePrice] = useState(false);
    const [unlockPurchase, setUnlockPurchase] = useState(false);
    const [disableCreate, setDisableCreate] = useState(true);

    const [categoriesData, setCategoriesData] = useState([]);
    const [detectingPhoto, setDetectingPhoto] = useState(false);

    const [itemCategory, setItemCategory] = useState('');

    const [uploadFileTypeMp4, setUploadFileTypeMp4] = useState(false);



    const [itemCurrency, setItemCurrency] = useState('');

    const [isShowPreviewModal, setShowPreviewModal] = useState(false);
    const [isShowCreateItemModal, setShowCreateItemModal] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);

    const { connecting, walletAddress } = useWeb3();
    const { mintERC721 } = useContext(ContractsContext);

    const history = useHistory();
    const { connected } = useWeb3();

    const [pageLoading, setPageLoading] = useState(false);


    useEffect(() => {
        if (connected) {
            return null;
        } else {
            history.push("/connect");
        }
    }, [connected]);


    useEffect(() => {
        setPageLoading(true);
        axios.get(`Users/${walletAddress}`)
            .then(({ data }) => {
                setPageLoading(false);
            }).catch(function (error) {
                setPageLoading(false);
                history.push('/profile/edit');
            });
    }, [user_info, walletAddress]);

    /*
     useEffect(() => {
         if (walletAddress) {
             if (walletAddress !== '0xB9a32da7F33731FfDa8e7ecCB91325eee8A524AC') {
                 history.push("/404");
             }
         } else {
             history.push("/404");
         }
     }, [walletAddress]);
    */
    const fetchAllCategories = () => {
        return new Promise((resolve, reject) => {
            axios.get(`Categories`)
                .then(({ data }) => {
                    setCategoriesData(data);
                    resolve(data);
                }).catch(function (error) {
                    reject(error);
                    //console.log("FETCH_CATEGORIES ===> ", error);
                    //console.log("Error****:", error.message);
                });
        })
    };

    useEffect(() => {
        fetchAllCategories().then((response) => {
            setItemCategory(response[0].id);
            setItemRoyalities("0%");
        });
    }, []);

    const detect = async (file) => {
        console.log("file => ", file);
        setDetectingPhoto(true);

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === "image/png" || file.type === 'video/mp4') {
            if (file.size <= 30000000) {

                if (file.type === 'video/mp4') {

                    setUploadFileTypeMp4(true);
                    setUploadImageFile(file);

                } else {
                    setUploadFileTypeMp4(false);
                    setUploadImage(URL.createObjectURL(file))
                    const fakePath = URL.createObjectURL(file);
                    var img = document.createElement("img");
                    img.src = fakePath;
                    img.crossOrigin = "anonymous";
                    const model = await nsfwjs.load(`${CLIENT_URL}NSFWJS/quant_mid/`, { type: "graph" });
                    const predictions = await model.classify(img)

                    //console.log(predictions)

                    const best = predictions[0];

                    //console.log(best);


                    if (best.className == "Porn" || best.className == "Hentai") {
                        setDetectingPhoto(false);
                        toast.error('The file is not accepted by the artificial intelligence system.!', {
                            position: "top-right",
                            autoClose: 7000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setUploadImageFile(null);

                    } else {
                        setDetectingPhoto(false);

                        toast.success('The file is accepted by the artificial intelligence system.!', {
                            position: "top-right",
                            autoClose: 7000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setUploadImageFile(file);

                    }
                }

            } else {
                setDetectingPhoto(false);
                toast.error('Max 30 MB!', {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setUploadImageFile(null);
                setUploadImage(placeholder);
            }

        } else {
            setDetectingPhoto(false);
            toast.error('Only jpeg,jpg,gif,png and mp4!', {
                position: "top-right",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setUploadImageFile(null);

        }
    }

    useEffect(() => {
        if (uploadImageFile === null || itemName === '' || itemRoyalties === '' || itemDescription === '' || itemCategory === '') {
            setDisableCreate(true)
        } else {
            setDisableCreate(false)
        }
    }, [uploadImageFile, itemName, itemDescription, itemRoyalties, itemCategory])

    const clearAll = () => {
        setItemName('');
        setItemPrice('');
        setItemDescription('');
        setItemRoyalities('');
        setItemCategory('');
        setUploadImage(placeholder);
        setPutOnSale(true)
    }

    const onPreview = () => {
        setShowPreviewModal(true);
    };

    const onCreateItem = () => {
        if (!itemName || uploadImageFile === null || !itemRoyalties || !itemDescription || !itemCategory) {
            toast.warn('Please do not leave any blank spaces!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (itemName.length > 26) {
            toast.warn('Item name cannot exceed 25 characters.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (parseInt(itemPrice) < 100) {
            toast.warn('Max 100 SMG!');
        } else {
            setShowCreateItemModal(true);
            //console.log("CATEGORY_ID ===> ", itemCategory);
        }
    }

    useEffect(() => {
        if (itemName && itemName.length > 26) {
            setItemName(itemName.slice(0, 26));
        }
    }, [itemName]);
    /*
    
    useEffect(() => {
        if (!connecting && walletAddress) {
            if (!user_info.displayName) {
                history.push("/profile/edit");
            }
        }
    }, [connecting, walletAddress, user_info]);
    
    */

    const activePutOnSale = (val) => {
        setPutOnSale(val);
        setInstantSalePrice(val);
    };


    return (
        <Layout page="upload-single">
            {pageLoading ? <div className="p-5">
                <Loading
                    size={50}
                    position="center"
                    color="black"
                    loading={loadingPage}
                />
            </div> : (
                <>
                    <ToastContainer />
                    <section className="section container">
                        <div className="d-flex justify-content-between flex-lg-row flex-column">
                            <div className="left-panel">
                                <div className="section d-flex flex-xl-row-reverse flex-column flex-reverse">
                                    <Link>
                                        <Button className="d-flex d-xl-none normal mb-3" icon="arrow-left" iconPos="left">
                                            {isSingle ? "Switch To Multiple" : "Switch To Single"}
                                        </Button>
                                        <Button className="d-none d-xl-flex normal">
                                            {isSingle ? "Switch To Multiple" : "Switch To Single"}
                                        </Button>
                                    </Link>
                                    {isSingle ? (
                                        <h2>Create single collectible</h2>
                                    ) : (
                                        <h2>Create multiple collectible</h2>
                                    )}
                                </div>

                                <div className="section">
                                    <div className="text-body-2-bold mb-1">Upload file <font color="red"><b>*</b></font></div>
                                    <div className="text-caption-2 neutral-4 mb-3">Drag or choose your file to upload</div>
                                    <FileUploader
                                        onDrop={(files) => {
                                            detect(files[0])
                                        }} />
                                </div>

                                <div className="section">
                                    <div className="text-body-2-bold mb-1">Item Details</div>
                                    <Input
                                        className="mt-32"
                                        label="Item name"
                                        required={true}
                                        placeholder='e. g. "Redeemable Bitcoin Card with logo"'
                                        value={itemName}
                                        onChange={(name) => setItemName(name)}
                                    />
                                    <Input
                                        className="mt-32"
                                        label="Description"
                                        required={true}
                                        placeholder='e. g. “After purchasing you will able to recived the logo...”'
                                        value={itemDescription}
                                        onChange={(val) => setItemDescription(val)}
                                    />

                                    <div className="row" style={{ marginTop: 22 }}>
                                        <div className="col-12 col-lg-4" style={{ marginTop: '12px' }}>
                                            <DropDown
                                                label="Royalties"
                                                values={dataRoyalties}
                                                required={true}
                                                value={itemRoyalties}
                                                onChange={(val) => setItemRoyalities(val.title)}
                                            />
                                        </div>
                                        <div className="col-12 col-lg-4" style={{ marginTop: '12px' }}>

                                            {categoriesData.length > 0 ? <DropDown
                                                label="Categories"
                                                values={categoriesData}
                                                required={true}
                                                value={itemCategory}
                                                onChange={(val) => setItemCategory(val.id)}
                                            /> : <label>Loading...</label>}
                                            {/*<Input
                                        label="Size"
                                        style={{ padding: 0 }}
                                        placeholder='e. g. Size'
                                        value={itemSize}
                                        onChange={(val) => setItemSize(val)}
                                    />*/}
                                        </div>
                                        <div className="col-12 col-lg-4">
                                            <Input
                                                style={{ padding: 0 }}
                                                label="Propertie"
                                                placeholder='e. g. Propertie'
                                                value={itemProperty}
                                                onChange={(val) => setItemProperty(val)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Divider className="section" />

                                <div className="section" >
                                    <Switch
                                        title="Put on sale"
                                        description="You’ll receive bids on this item"
                                        className="mb-32 w-100"
                                        value={putOnSale}
                                        onChange={(val) => activePutOnSale(val)}
                                    />

                                    <Switch
                                        title="Instant sale price"
                                        description="Enter the price for which the item will be instantly sold"
                                        className="mb-32 w-100"
                                        value={instantSalePrice}
                                        onChange={(val) => {
                                            setInstantSalePrice(val)
                                            setPutOnSale(val)
                                            if (!val)
                                                setItemPrice(0)
                                        }}
                                    />
                                    {instantSalePrice && (
                                        <div className="row">
                                            <div className="col-9 col-md-9" style={{ paddingRight: 0 }}>
                                                <Input
                                                    className="mb-32"
                                                    label="Price"
                                                    placeholder='Price for item'
                                                    type="number"
                                                    value={itemPrice}
                                                    onChange={(price) => {
                                                        if (!price) {
                                                            if (isNaN(price)) {
                                                                setItemPrice(price.slice(0, 1));
                                                            } else {
                                                                setItemPrice(price);
                                                            }
                                                        } else {
                                                            setItemPrice(price);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="col-3 col-md-3 mt-1">
                                                <label>Currency</label>
                                                <DropDown
                                                    values={dataCurrency}
                                                    value={itemCurrency}
                                                    onChange={(val) => setItemCurrency(val.title)}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <Switch
                                        title="Unlock once purchased"
                                        description="Content will be unlocked after successful transaction"
                                        className="mb-32 w-100"
                                        value={unlockPurchase}
                                        onChange={(val) => setUnlockPurchase(val)}
                                    />

                                    <div className="choose-collection">
                                        <div className="mb-4">
                                            <div className="text-body-2-bold" >
                                                Choose collection
                                    </div>
                                            <div className="text-caption-2 neutral-4 mt-1" >
                                                Choose an exiting collection or create a new one
                                    </div>
                                        </div>

                                        <Swiper
                                            slidesPerView={'auto'}
                                            spaceBetween={16}
                                        >
                                            <SwiperSlide>
                                                <Collection title="Create collection" color="#23262F" create={true} />
                                            </SwiperSlide>

                                            {collections.map((collection, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <Collection
                                                        display={collection.display}
                                                        title={collection.title}
                                                        color={collection.color}
                                                        className="ml-2"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                                <div className="action">
                                    <div className="d-none d-lg-flex justify-content-between align-items-center">
                                        <Button className="large primary" icon="arrow-right" iconPos="right" onClick={onCreateItem} disabled={disableCreate}>
                                            Create item
                                </Button>
                                    </div>
                                    <div className="d-lg-none d-block">
                                        <Button className="large w-100 mb-12" onClick={onPreview}>
                                            Preview
                                </Button>
                                        <Button className="large primary w-100" icon="arrow-right" iconPos="right" onClick={onCreateItem} disabled={disableCreate} >
                                            Create item
                                </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="right-panel d-none d-lg-block ml-32">
                                <div className="preview-panel">
                                    <div className="text-body-1-bold mb-4" >
                                        Preview
                            </div>
                                    <PreviewModalContent
                                        detectingPhoto={detectingPhoto}
                                        uploadFileTypeMp4={uploadFileTypeMp4}
                                        data={{
                                            title: itemName,
                                            itemPrice: itemPrice,
                                            user_info: user_info,
                                            image: uploadImage,
                                            stock: [
                                                { avatar: avatar01 },
                                                { avatar: avatar01 },
                                                { avatar: avatar01 },
                                            ],
                                            bid: 1.125,
                                            highest: 0.001,
                                        }}
                                        clearAll={clearAll}
                                    />
                                </div>
                            </div>
                        </div>

                        <Modal
                            show={isShowPreviewModal}
                            onClose={() => setShowPreviewModal(false)}
                            title="Preview"
                            className="preview-modal"
                        >
                            <PreviewModalContent
                                detectingPhoto={detectingPhoto}
                                uploadFileTypeMp4={uploadFileTypeMp4}
                                data={{
                                    title: itemName,
                                    itemPrice: itemPrice,
                                    user_info: user_info,
                                    image: uploadImage,
                                    stock: [
                                        { avatar: avatar01 },
                                        { avatar: avatar01 },
                                        { avatar: avatar01 },
                                    ],
                                    bid: 1.125,
                                    highest: 0.001,
                                }}
                                clearAll={clearAll}
                            />
                        </Modal>

                        <ModalCreateItem
                            show={isShowCreateItemModal}
                            mintERC721={mintERC721}
                            onClose={() => setShowCreateItemModal(false)}
                            isSingle={isSingle}
                            uploadInfo={{
                                uploadImageFile,
                                itemName,
                                itemDescription,
                                itemRoyalties,
                                itemSize,
                                itemProperty,
                                itemPrice,
                                putOnSale,
                                instantSalePrice,
                                unlockPurchase,
                                itemCategory
                            }}
                        />
                    </section>

                </>
            )}
        </Layout>
    );
}
const mapStateToProps = ({ user }) => {
    const { user_info } = user;
    return { user_info }
};
export default connect(mapStateToProps)(UploadSingle);
