import React, { Component } from 'react';
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../../services/fetchImages';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 42,
    loading: false,
    // error: null,
    total: 0,
    showModal: false,
  };

  handleSubmitForm = query => {
    this.setState({ query });
  };

  handleErrorMessage = text => {
    toast.error(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });
      fetchImages(query, page)
        .then(({ images, total }) => {
          if (images.length === 0) {
            this.handleErrorMessage(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return [];
          }

          if (prevState.query === query) {
            // only page changed
            this.setState({ images: [...prevState.images, ...images] });
          } else {
            this.setState({ images, total });
          }
        })
        .catch(error =>
          this.handleErrorMessage(
            error.message || 'Something went wrong. Try again.'
          )
        )
        .finally(() => this.setState({ loading: false }));
    }
  }

  onClickButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, loading, page, total, showModal } = this.state;
    const shouldRenderButton = 12 * page < total && images.length > 0;
    return (
      <Container>
        <Searchbar
          onSubmit={this.handleSubmitForm}
          handleErrorMessage={this.handleErrorMessage}
        />
        <ToastContainer autoClose={3000} />
        {loading && <Loader />}
        <ImageGallery images={images} toggleModal={this.toggleModal} />
        {shouldRenderButton && <Button onClick={this.onClickButton} />}
        {showModal && <Modal toggleModal={this.toggleModal} />}
      </Container>
    );
  }
}
