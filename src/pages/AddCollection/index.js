import React, { useState, useRef } from 'react'
import Layout from '../../components/Layout'

function AddCollection() {
    const [collectionName, setCollectionName] = useState('');
    const [description, setDescription] = useState('');
    const [comissionFee, setComissionFee] = useState('');

    const [collectionNameError, setCollectionNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [comissionFeeError, setComissionFeeError] = useState(false);

    const [bannerImageError, setBannerImageError] = useState(false);
    const [collectionImageError, setCollectionImageError] = useState(false);

    const [creatingCollection, setCreatingCollection] = useState(false);

    const [bannerImage, setBannerImage] = useState(null);
    const [collectionImage, setCollectionImage] = useState(null);

    const [collectionImageFakePath, setCollectionImageFakePath] = useState('');
    const [bannnerImageFakePath, setBannerImageFakePath] = useState('');

    const bannerImageRef = useRef(null);
    const collectionImageRef = useRef(null);


    const handleBannerImage = ({ target }) => {
        setBannerImageFakePath(URL.createObjectURL(target.files[0]));
    };

    const handleCollectionImage = ({ target }) => {
        setCollectionImageFakePath(URL.createObjectURL(target.files[0]));
    }

    const renderCollectionImage = () => {
        if (collectionImageFakePath) {
            return (
                <img className="collection-image" src={collectionImageFakePath} />
            )
        } else {
            return (
                <i className="fas fa-image text-black"></i>
            )
        }
    };

    const onCreateCollection = () => {
        if (!collectionName) {
            setCollectionNameError(true);
        }
        if (!description) {
            setDescriptionError(true);
        }
        if (!comissionFee) {
            setComissionFeeError(true);
        }
        if (!bannerImage) {
            setBannerImageError(true);
        }
        if (!collectionImage) {
            setCollectionImageError(true);
        }
    };

    return (
        <Layout>
            <section className="add-collection-section">
                <div className="drop-file-loader" style={{
                    backgroundImage: `url("${bannnerImageFakePath}")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }} onClick={() => bannerImageRef.current.click()}>
                    {!bannnerImageFakePath ? (
                        <>
                            <i className="fas fa-image text-white"></i>
                            <h5 className="text-white">Drag and drop banner image</h5>
                            <p className="text-white">or click to upload</p>
                        </>
                    ) : null}
                    <input ref={bannerImageRef} type="file" className="d-none" onChange={(event) => handleBannerImage(event)} />
                </div>
                <div className={`add-collection-image-container ${bannnerImageFakePath ? 'p-0' : ''}`} onClick={() => collectionImageRef.current.click()}>
                    {renderCollectionImage()}
                    <input ref={collectionImageRef} type="file" className="d-none" onChange={(event) => handleCollectionImage(event)} />
                </div>
                <div className="container">
                    <div className="form">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7 col-lg-7 col-xs-12 col-sm-12">
                                    <div className="group">
                                        <label>Collection name</label>
                                        <input value={collectionName} onChange={({ target }) => setCollectionName(target.value)} className="group-input" type="text" placeholder="Name" />
                                        {collectionNameError ? <small className="error-text">Please fill 'Collection Name' field!</small> : null}
                                    </div>
                                </div>
                                <div className="col-md-5 col-lg-5 d-none d-md-flex" style={{ marginTop: 20 }}>
                                    <p style={{ margin: "0px !important", fontSize: 14, padding: "0px !important", color: "#707a8a" }}>
                                        This name will appear on the collection page and will also be included in the contracts for the NFTs in this collection.
                                        </p>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-md-7 col-lg-7 col-xs-12 col-sm-12">
                                    <div className="group">
                                        <label>Description</label>
                                        <textarea value={description} onChange={({ target }) => setDescription(target.value)} className="group-textarea" rows={5} type="text" placeholder="Description" />
                                        {descriptionError ? <small className="error-text">Please fill 'Description' field!</small> : null}
                                    </div>
                                </div>
                                <div className="col-md-5 col-lg-5 d-none d-md-flex" style={{ marginTop: 20 }}>
                                    <p style={{ margin: "0px !important", fontSize: 14, padding: "0px !important", color: "#707a8a" }}>
                                        This description will be included on your collection page and can be changed. It will not be embedded into the NFTs in your collection.
                                        </p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7 col-lg-7 col-xs-12 col-sm-12">
                                    <div className="group">
                                        <label>Comission Fee</label>
                                        <div className="custom-input">
                                            <input value={comissionFee} onChange={({ target }) => setComissionFee(target.value)} type="number" placeholder="0" />
                                            <i className="fas fa-percent"></i>
                                        </div>
                                        {comissionFeeError ? <small className="error-text">Please fill 'Comission Fee' field!</small> : null}
                                    </div>
                                </div>
                                <div className="col-md-5 col-lg-5 d-none d-md-flex">
                                    <p style={{ margin: "0px !important", fontSize: 14, padding: "0px !important", color: "#707a8a" }}>
                                        This description will be included on your collection page and can be changed. It will not be embedded into the NFTs in your collection.
                                        </p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7 col-xs-12 col-sm-12">
                                    <div className="group">
                                        <div className="d-block mt-4 mb-4">
                                            <div>
                                                {bannerImageError ? <small className="error-text">Please upload a banner image!</small> : null}
                                            </div>
                                            <div>
                                                {collectionImageError ? <small className="error-text">Please upload a collection image!</small> : null}
                                            </div>
                                        </div>
                                        <button onClick={() => !creatingCollection ? onCreateCollection() : null} className="disabled create-button">
                                            <span>Create Collection</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export default AddCollection
