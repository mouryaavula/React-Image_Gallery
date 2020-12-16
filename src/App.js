import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Heading } from './components/Heading';
import { Loader } from './components/Loader';
import { UnsplashImage } from './components/UnsplashImage';
import { ImageComponent } from './components/ImageComponent';
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { render } from '@testing-library/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       images: [],
       query: ''
    }
  }
  
  componentDidMount() {
    this.fetchImages()
  }

  fetchImages = () => {
    if (this.state.query === '') {
      const apiRoot = 'https://api.unsplash.com';
      axios.get(`${apiRoot}/photos/random?client_id=DtUhr98dV5Mo_RF1TRHU26mRd9ofcDRzU3sKhAuzRAA&count=10`)
        .then((response) => {
          this.setState({
            images: [...this.state.images, ...response.data]
          })
        })
    } else {
      const apiRoot = 'https://api.unsplash.com';
      page = page + 1
      axios.get(`${apiRoot}/search/photos?client_id=DtUhr98dV5Mo_RF1TRHU26mRd9ofcDRzU3sKhAuzRAA&page=${page}&query=${this.state.query}`)
      .then((response) => {
        this.setState({
          images: [...this.state.images, ...response.data.results]
        })
      })
    }
  }

  handleSearch = (event) => {
    this.setState({
      query: event.target.value
    }, () => {
      var url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.append("search", event?.target.value);
      window.history.pushState(null, null, url);
    })
  }

  searchImages = (event) => {
    event.preventDefault()
    const apiRoot = 'https://api.unsplash.com';
    axios.get(`${apiRoot}/search/photos?client_id=DtUhr98dV5Mo_RF1TRHU26mRd9ofcDRzU3sKhAuzRAA&query=${this.state.query}`)
      .then((response) => {
        this.setState({
          images: [...response.data.results]
        })
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Heading />
              <form>
                  <Input type="text" placeholder="Search photos" onChange={this.handleSearch}/>
                  <Button onClick={this.searchImages}>Search</Button>
              </form>
              <GlobalStyle />
              <InfiniteScroll
                dataLength={this.state.images.length}
                next={this.fetchImages}
                hasMore={true}
                loader={<Loader />}
              >
                <WrapperImages>
                  {this.state.images.map(image => (
                    <UnsplashImage url={image.urls.thumb} key={image.id} id={image.id} regular={image.urls.regular} descripition={image.alt_description} />
                  ))}
                </WrapperImages>
              </InfiniteScroll>
            </Route>
            <Route exact path="/:id">
              <ImageComponent />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
