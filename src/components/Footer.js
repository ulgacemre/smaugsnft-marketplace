import React from 'react';
import Logo from './Logo'
import Divider from './Divider'
import Icon from './Icon'
import SingleInput from './Input/SingleInput'
import Toggle from './Toggle';
import Link from './Link';

function Footer() {
    return (
        <footer className="container">
            <div className="footer-content d-flex justify-content-between flex-lg-row flex-column">
                <div className="footer-section">
                    <Logo className="mb-32" />
                    <div className="text-body-2">
                        World's first AI-powered NFT marketplace on Binance Smart Chain
                    </div>
                </div>

                <Divider className="d-block d-lg-none mt-32 mb-32" />

                <div className="d-none d-lg-block footer-section">
                    <div className="footer-subtitle">
                        <div>Links</div>
                    </div>
                    <div className="text-button-2 neutral-4">
                        <div className="mb-4">
                            <Link href="/" style={{ color: "#777E90" }}>
                                Discover
                            </Link>
                        </div>
                        <div className="mb-4">
                            <Link href="/connect" style={{ color: "#777E90" }}>
                                Connect wallet
                            </Link>
                        </div>
                        <div>
                            <Link href="/upload" style={{ color: "#777E90" }}>
                                Create item
                            </Link>
                        </div>
                    </div>
                </div>

                <Toggle
                    className="d-block d-lg-none footer-section"
                    title="Links"
                    divider={false}>
                    <div className="text-button-2 neutral-4">
                        <div className="mb-4">
                            <Link href="/" style={{ color: "#777E90" }}>
                                Discover
                            </Link>
                        </div>
                        <div className="mb-4">
                            <Link href="/connect" style={{ color: "#777E90" }}>
                                Connect wallet
                            </Link>
                        </div>
                        <div>
                            <Link href="/upload" style={{ color: "#777E90" }}>
                                Create item
                            </Link>
                        </div>
                    </div>
                </Toggle>

                <Divider className="d-block d-lg-none mt-32 mb-32" />

                <div className="d-none d-lg-block footer-section">
                    <div className="footer-subtitle">
                        <div>Info</div>
                    </div>
                    <div className="text-button-2 neutral-4">
                        <div className="mb-4">
                            <Link href="/faq" style={{ color: "#777E90" }}>
                                FAQ
                            </Link>
                        </div>
                        <div className="mb-4">
                            <Link href="/search" style={{ color: "#777E90" }}>
                                Search
                            </Link>
                        </div>
                        <div>
                            <Link href="https://t.me/smaugsnftsupport" target="_blank" style={{ color: "#777E90" }}>
                                Support
                            </Link>
                        </div>
                        
                    </div>
                </div>

                <Toggle
                    className="d-block d-lg-none footer-section"
                    title="Info"
                    divider={false}>
                    <div className="text-button-2 neutral-4">
                        <div className="mb-4">
                            <Link href="/faq" style={{ color: "#777E90" }}>
                                FAQ
                            </Link>
                        </div>
                        <div className="mb-4">
                            <Link href="/search" style={{ color: "#777E90" }}>
                                Search
                            </Link>
                        </div>
                        <div>Support</div>
                    </div>
                </Toggle>

                <Divider className="d-block d-lg-none mt-32 mb-32" />

                <div className="footer-section">
                    <div className="footer-subtitle">
                        Join Newsletter
                    </div>
                    <div className="text-caption mb-4">
                        Subscribe our newsletter to get more free design course and resource
                    </div>
                    <SingleInput placeholder="Enter your email" />
                </div>
            </div>

            <Divider />
            <div className="d-flex justify-content-lg-between justify-content-center pt-32 pb-32">
                <div className="text-caption-2 neutral-4">
                    Copyright © 2021 Smaugs NFT. All rights reserved
                </div>
                {/*     <div className="d-lg-block d-none">
                    <span className="text-caption-2 mr-3">
                        We use cookies for better service.
                    </span>
                    <span className="text-caption-2-bold primary-1 pointer">
                        Accept
                    </span>
                </div>*/}
            </div>
        </footer>
    );
}

export default Footer;
