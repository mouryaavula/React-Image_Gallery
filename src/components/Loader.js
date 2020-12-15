import React from 'react'
import styled from 'styled-components';

const Loading = styled.div`
    .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #222;
        border-color: #fff transparent #222 transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
        transform: rotate(0deg);
        }
        100% {
        transform: rotate(360deg);
        }
    }
`;

export const Loader = () => {
    return (
        <Loading>
            <div class="lds-dual-ring"></div>
        </Loading>
    )
}
