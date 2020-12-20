import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import Button from '@atlaskit/button';
import ShareButton from 'react-web-share-button';
import {
    Link
} from "react-router-dom";

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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


export class ImageComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            image: '',
            description: ''
        }
    }
    
    downloadImage = () => {
        const method = 'GET';
        const url = `${this.state.image}`;
        axios
            .request({
                url,
                method,
                responseType: 'blob', //important
            })
            .then(({ data }) => {
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'file.png'); //any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
    }
    componentDidMount() {
        const apiRoot = 'https://api.unsplash.com';
        axios.get(`${apiRoot}/photos/${window.location.pathname.split('/')[1]}?client_id=DtUhr98dV5Mo_RF1TRHU26mRd9ofcDRzU3sKhAuzRAA&count=10`)
            .then((response) => {
                this.setState({
                    image: response.data.urls.regular,
                    description: response.data.alt_description
                })
            })
    }
    render() {
        return (
            <div>
                <Grid>
                    <GridItem>
                        <Link to="/"><Button>Back</Button></Link>
                    </GridItem>
                </Grid>
                <Grid>
                <ImageItem>
                    <img src={this.state.image} />
                </ImageItem>
                <div style={{ textAlign: 'center' }}>
                    <span>{this.state.description}</span>
                </div>
                </Grid>
                <Grid>
                    <ButtonItem>
                        <Button appearance="primary" onClick={this.downloadImage}>Download</Button>
                    </ButtonItem>
                    <ButtonItem>
                        <ShareButton text={`${this.state.description}`} text={`${this.state.description}`} url={`${this.state.image}`} />
                    </ButtonItem>
                </Grid>
            </div>
        )
    }
}

export default ImageComponent