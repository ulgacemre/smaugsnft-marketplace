import React from 'react'
import HashLoader from "react-spinners/HashLoader";
import './Loading.css';
import { css } from '@emotion/react';
function Loading({ style, position, loading, color, size }) {
    const loadingSpinner = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
    return (
        <div className={"loading-container " + (position ? `loading-position-${position}` : 'loading-position-left')} style={style ? style : null}>
            <HashLoader color={localStorage.getItem("theme") === `"${"dark"}"` ? "white" : "black"} loading={loading} css={loadingSpinner} size={size} />
        </div>
    )
}

export default Loading
