import React, { useEffect } from 'react';
import NavBar from './NavBar'
import Footer from './Footer'
import Divider from './Divider'

import {connect} from "react-redux";
import {getUserInfo} from "../store/actions/User";
import useWeb3 from '../shared/hooks/useWeb3'

const Layout = function(props) {
  
    const { connected, walletAddress } = useWeb3()
    
    useEffect(() => {   
        if( connected && walletAddress && props.user_info.displayName === '') {
            props.getUserInfo({walletAddress: walletAddress})
        }
    }, [connected, walletAddress])
    
    useEffect(() => {
        if( props.theme === "dark" ) {
          document.body.classList.add("dark-theme");
        } else {
          document.body.classList.remove("dark-theme");
        }
    }, [props.theme])

    return (
      <div className={ "page-layout container-fluid " + (props.page + "-page") }>
        <NavBar {...props}/>
        <Divider className="d-none d-lg-block" />
        {props.children}
        <Divider />
        <Footer />
      </div>
    );
}

const mapStateToProps = ({user, setting}) => {
  const {user_info} = user;
  const {theme} = setting;
  return {user_info, theme}
};

export default connect(mapStateToProps, {getUserInfo})(Layout);
