import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { Heading } from './components/Heading';
import { Loader } from './components/Loader';
import { UnsplashImage } from './components/UnsplashImage';
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

const Input = styled.input`
    height: 2.5rem;
    width: 20rem;
    margin-top: 1em;
    outline: none;
    text-indent: 1em;
    font-size: 1em;

    ::placeholder {
        font-size: .8em;
    }
`;

const Button = styled.button`
    height: 2.5rem;
    padding: 0 1em;
    outline: none;
    cursor: pointer;
    background: #222;
    border: none;
    color: #fff;
    font-size: 1em;
`;

let page = 1

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  useEffect(() => {
    console.log('true-po')
    fetchImages();
  }, [])

  const fetchImages = () => {
    console.log('true')
    const apiRoot = 'https://api.unsplash.com';
    axios.get(`${apiRoot}/photos/random?client_id=SS2xJ03UZU_mGL8tRvd8U4enJ74cOGRSReU4RNhAiuc&count=10`)
      .then((response) => {
        console.log(response.data, 'pop')
        setImages([...images, ...response.data]);
      })
  }

  const handleSearch = (event) => {
    if (event?.target.value !== '') {
      setQuery(event?.target.value)
      var url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.append("search", event?.target.value);
      window.history.pushState(null, null, url);
      const apiRoot = 'https://api.unsplash.com';
      axios.get(`${apiRoot}/search/photos?client_id=SS2xJ03UZU_mGL8tRvd8U4enJ74cOGRSReU4RNhAiuc&query=${event?.target.value}`)
        .then((response) => {
          setImages([...response.data.results])
        })
    } else {
      setQuery(event?.target.value)
      fetchImages()
    }
  }

  const searchInfinite = () => {
    page = page + 1
    console.log(page, 'p')
    const apiRoot = 'https://api.unsplash.com';
    axios.get(`${apiRoot}/search/photos?client_id=SS2xJ03UZU_mGL8tRvd8U4enJ74cOGRSReU4RNhAiuc&page=${page}&query=${query}`)
      .then((response) => {
        setImages([...images, ...response.data.results])
      })
  }

  return (
    <div className="App">
      <Heading />
      <form>
          <Input type="text" placeholder="Search photos" onChange={handleSearch}/>
      </form>
      <GlobalStyle />
      <InfiniteScroll
        dataLength={images.length}
        next={query === '' ? fetchImages : searchInfinite}
        hasMore={true}
        loader={<Loader />}
      >
        <WrapperImages>
          {images.map(image => (
            <UnsplashImage url={image.urls.thumb} key={image.id} />
          ))}
        </WrapperImages>
      </InfiniteScroll>
    </div>
  );
}

export default App;
