import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import Layout from '../../components/Layout'
import Button from '../../components/Buttons/Button'
import Divider from '../../components/Divider'
import Icon from '../../components/Icon'
import Link from '../../components/Link'
import Input from '../../components/Input';
import TextArea from '../../components/Input/TextArea';
import useWeb3 from '../../shared/hooks/useWeb3'

import defaultAvatar from '../../assets/images/avatar/default.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import { updateUserInfo } from "../../store/actions/User";
import Loading from '../../components/Loading';
import { DOWNLOAD_USERS_URL } from '../../utils/Api';

function EditProfile(props) {
    const [name, setName] = useState();
    const [customUrl, setCustomUrl] = useState(props.user_info.customUrl);
    const [bio, setBio] = useState(props.user_info.bio);
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [twitterUsername, setTwitterUsername] = useState('');
    const [facebookUsername, setFacebookUsername] = useState('');
    const [instagramUsername, setInstagramUsername] = useState('');
    const [avatar, setAvatar] = useState(null)
    const [avatarFile, setAvatarFile] = useState()
    const [avatarUrl, setAvatarUrl] = useState()
    const [isAvatarChanged, setAvatarChanged] = useState(false)
    const fileInputRef = useRef(null)


    const [userLoading, setUserLoading] = useState(true);

    const [warnDisplayName, setWarnDisplayName] = useState(false);

    const { connected, walletAddress } = useWeb3()
    let history = useHistory();

    useEffect(() => {
        if (connected) {
            if (props.user_info) {
                setName(props.user_info.displayName)
                setCustomUrl(props.user_info.customUrl)
                setBio(props.user_info.bio)
                setWebsiteUrl(props.user_info.website)
                setAvatarUrl(props.user_info.imageUrl === '' ? 'default.png' : props.user_info.imageUrl)
                setAvatar(props.user_info.imageUrl === "" ? defaultAvatar : props.user_info.avatar)
                setTwitterUsername(props.user_info.twitterUsername)
                setInstagramUsername(props.user_info.instagramUsername)
                setFacebookUsername(props.user_info.facebookUsername)

                setTimeout(() => {
                    setUserLoading(false);
                }, 1800);
            }
        } else {
            history.push("/");
        }
    }, [props.user_info, connected])

    const onChangeAvatar = (event) => {
        createImage(event.target.files[0]);
    }

    const createImage = (file) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setAvatarChanged(true);
            setAvatarFile(file)
        };
        reader.readAsDataURL(file);
    }

    const onClickUpload = () => {
        fileInputRef.current.click();
    }

    const updateProfile = () => {
        if (name) {
            setWarnDisplayName(false);
            props.updateUserInfo({
                avatar: isAvatarChanged ? avatarFile : avatarUrl,
                avatarChanged: isAvatarChanged,
                walletAddress: walletAddress,
                displayName: name,
                customUrl: customUrl,
                website: websiteUrl,
                bio: bio,
                twitterUsername: twitterUsername,
                instagramUsername: instagramUsername,
                facebookUsername: facebookUsername,
            })

            history.push(`/profile/${walletAddress}`)
        } else {
            setWarnDisplayName(true);
            toast.warn('Please fill in the Display Name field.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const clearAll = () => {
        setName('')
        setCustomUrl('')
        setBio('')
        setWebsiteUrl('')
        setTwitterUsername('')
        setFacebookUsername('')
        setInstagramUsername('')
    }

    const verifyTwitter = (twitterName) => {
        //console.log(twitterName)
    }

    return (
        <Layout page="edit-profile">
            {userLoading ? <div className="p-5">
                <Loading loading={userLoading} size={45} position="center" color="black" />
            </div> : (
                <>
                    <ToastContainer />
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center py-4">
                            <Link href="/profile">
                                <Button className="normal" icon="arrow-left" iconPos="left">
                                    Back to profile
                        </Button>
                            </Link>

                            <div className="d-none d-lg-block text-button-2">
                                <span className="neutral-4">Profile</span>
                                <span className="size-40 mx-4">
                                    <Icon icon="chevron-right" />
                                </span>
                                <span>Edit profile</span>
                            </div>
                        </div>
                    </div>

                    <Divider />

                    <div className="content container">
                        <div className="page-title">
                            <h2>Edit profile</h2>
                            <div className="edit-profile-help neutral-4 mt-3">
                                You can set preferred display name, create <span className="text-caption-bold neutral-2">your profile URL</span> and manage other personal settings.
                    </div>
                            <Divider className="d-lg-none mb-32" />
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <div className="profile-photo d-flex">
                                    <img src={avatar} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple={false}
                                        style={{ display: 'none' }}
                                        onChange={onChangeAvatar}
                                        ref={fileInputRef}
                                    />
                                    <div className="ml-32" >
                                        <div className="text-body-2-bold mb-2">Profile photo</div>
                                        <div className="text-caption-2 neutral-4 mb-3">We recommend an image of at least 400x400. Gifs work too 🙌</div>
                                        <Button className="normal" onClick={onClickUpload}>Upload</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="info-section col-xl-6 col-12">
                                <div className="row">
                                    <div className="col-12 col-xl-12 col-lg-6">
                                        <Divider className="d-lg-none mt-32 mb-32" />

                                        <div className="text-body-2-bold mb-32">Account Info</div>
                                        <Input
                                            label="DISPLAY NAME"
                                            placeholder="Enter your display name"
                                            className="mb-32"
                                            value={name}
                                            borderRed={warnDisplayName}
                                            onChange={setName}
                                        />

                                        <TextArea
                                            label="BIO"
                                            placeholder="About yourselt in a few words"
                                            className="mb-32"
                                            value={bio}
                                            onChange={setBio}
                                        />
                                    </div>
                                    <div className="col-12 col-xl-12 col-lg-6">
                                        <div className="text-body-2-bold mb-32">Social</div>
                                        <Input
                                            label="PORTFOLIO OR WEBSITE"
                                            placeholder="Enter URL"
                                            className="mb-32"
                                            value={websiteUrl}
                                            onChange={(val) => setWebsiteUrl(val)}
                                        />
                                        <Input
                                            label="TWIITER"
                                            prefix="@"
                                            placeholder="twitter username"
                                            className="mb-32"
                                            value={twitterUsername}
                                            onChange={(val) => setTwitterUsername(val)}
                                        />
                                        <Input
                                            label="INSTAGRAM"
                                            prefix="@"
                                            placeholder="instagram username"
                                            className="mb-32"
                                            value={instagramUsername}
                                            onChange={(val) => setInstagramUsername(val)}
                                        />
                                        <Input
                                            label="FACEBOOK"
                                            prefix="@"
                                            placeholder="facebook username"
                                            value={facebookUsername}
                                            onChange={(val) => setFacebookUsername(val)}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <div className="text-caution neutral-4">
                                            To update your settings you should sign message through your wallet. Click 'Update profile' then sign the message
                                </div>

                                        <Divider style={{ marginTop: '40px', marginBottom: '40px' }} />

                                        <div className="d-lg-flex d-none align-items-center">
                                            <Button className="primary large mr-32" onClick={updateProfile}>Update Profile</Button>
                                            <div className="d-flex align-items-center pointer" onClick={clearAll}>
                                                <Icon icon="close-circle" className="mr-2" />
                                                <div className="text-button-1 neutral-4">Clear all</div>
                                            </div>
                                        </div>
                                        <div className="d-block d-lg-none align-items-center">
                                            <Button className="primary large w-100 mb-32" onClick={updateProfile}>Update Profile</Button>
                                            <div className="d-flex justify-content-center align-items-center w-100 mx-auto pointer" onClick={clearAll}>
                                                <Icon icon="close-circle" className="mr-2" />
                                                <div className="text-button-1 neutral-4">Clear all</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>

            )}</Layout>
    );
}

const mapStateToProps = ({ user }) => {
    const { user_info } = user;
    return { user_info: user_info }
};

export default connect(mapStateToProps, { updateUserInfo })(EditProfile);
