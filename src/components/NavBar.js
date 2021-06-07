import React, { useState, useEffect, useRef, useContext } from "react"
import { Navbar as B4Navbar, Nav } from 'react-bootstrap'
import SearchBox from './Input/SearchBox'
import Notification from './Notification'
import Button from './Buttons/Button'
import ConnectButton from './Buttons/ConnectButton'
import Link from './Link'
import Logo from './Logo'
import Icon from './Icon'
import Popup from "./Popup"
import Divider from "./Divider"
import useWeb3 from "../shared/hooks/useWeb3"


const NavBar = function (props) {

    const [popupShow, setPopupShow] = useState(false)
    const elementButton = useRef(null);


    const { connected } = useWeb3();



    return (
        <div className="land-nav navbar-default nav-scroll">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="navbar-header">
                    <B4Navbar.Brand style={{ alignItems: "center", display: "flex", paddingTop: 0, paddingBottom: 0 }} href="/">
                        <Logo />
                    </B4Navbar.Brand>
                    <div className="d-xl-block d-none navbar-header-splitter"></div>
                    <Nav className="d-xl-flex d-none nav navbar-nav" as="ul">
                        <Nav.Item as="li">
                            <Nav.Link href="/" >Discover</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link href="#">How it works</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>

                <SearchBox className="d-lg-flex d-none ml-auto" />


                <Link href="/upload">
                    <Button className="d-lg-block d-none normal primary mr-2" style={{ marginLeft: '20px' }} >Upload</Button>
                </Link>

                <ConnectButton style={{ marginLeft: '20px' }} />

                <div
                    className="d-lg-none d-flex"
                    style={{ marginLeft: '20px' }}
                    ref={elementButton}
                    onClick={() => setPopupShow(!popupShow)}
                >
                    <Icon icon="burger" className="pointer" />
                </div>

                <Popup
                    className="navbar-popup"
                    target={elementButton.current}
                    placement="bottom-end"
                    show={popupShow}
                    onClose={() => setPopupShow(false)}
                >
                    {!connected ? (
                        <>
                            <Link href="/connect" >
                                <div className="text-button-2 neutral-4 text-center">
                                    <Icon icon="wallet" className="mr-2" />
                            Connect Wallet
                        </div>
                            </Link> <Divider className="my-3" />
                        </>
                    ) : null}

                    <Link href="/search" >
                        <div className="text-button-2 neutral-4 text-center">
                            <Icon icon="search" className="mr-2" />
                            Search
                        </div>
                    </Link>
                    <Divider className="my-3" />
                    <Link href="/upload" >
                        <div className="text-button-2 neutral-4 text-center">
                            <Icon icon="file-upload" className="mr-2" />
                            Upload
                        </div>
                    </Link>
                </Popup>
            </div>
        </div>
    );
}

export default NavBar;
