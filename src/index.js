import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import Router from './router/Router';
import { Web3Provider } from "./shared/context/Web3";
import { ContractsProvider } from "./shared/context/Contracts";
import configureStore from "./store";
import "swiper/swiper-bundle.min.css";
import 'video.js/dist/video-js.css';
import './assets/styles/app.scss';
import Loading from './components/Loading';
import useWeb3 from './shared/hooks/useWeb3';


const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3Provider>
        <ContractsProvider>
          <Router />
        </ContractsProvider>
      </Web3Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
