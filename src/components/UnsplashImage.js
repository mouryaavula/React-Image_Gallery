import styled from 'styled-components'
import React, { useState } from 'react';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import axios from 'axios';

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
    const [modal, setModal] = useState(false)
    const openImage = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }
    const downloadImage = () => {
        const method = 'GET';
        const url = `${regular}`;
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
    return (
        <>
            <Img src={url} key={key} alt="" onClick={openImage} style={{ cursor: 'pointer' }} />
            {
                modal ? (
                    <ModalTransition>
                        <Modal size="medium" >
                          <Grid>
                              <GridItem>
                                  <Button onClick={closeModal}>Back</Button>
                              </GridItem>
                          </Grid>
                          <Grid>
                            <ImageItem>
                                <Img src={regular} />
                            </ImageItem>
                            <div style={{ textAlign: 'center' }}>
                                <span>{descripition}</span>
                            </div>
                          </Grid>
                          <Grid>
                            <ButtonItem>
                                <Button appearance="primary" onClick={downloadImage}>Download</Button>
                            </ButtonItem>
                          </Grid>
                        </Modal>
                    </ModalTransition>
                ) : null
            }
        </>
    )
}
