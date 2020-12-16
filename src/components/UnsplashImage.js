import styled from 'styled-components'
import React from 'react';
import axios from 'axios';
import {
    Link
} from "react-router-dom";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
};

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 400px;
`;

const Grid = styled.div`
    grid-template-columns: repeat(2, 1fr);
`;

const GridItem = styled.div`
    grid-column: span 1;
    padding: 1rem;
`;

const ImageItem = styled.div`
    grid-column: span 2;
    padding: 1rem;
    text-align: center;
`;

const ButtonItem = styled.div`
    grid-column: span 1;
    padding: 1rem;
    text-align: right;
`;

export const UnsplashImage = ({url, key, id, regular, descripition }) => {
    return (
        <>
            <Link to={`/${id}`} ><Img src={url} key={key} alt="" style={{ cursor: 'pointer' }} /></Link>
        </>
    )
}
