import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import { Overlay } from './Modal.styled';
const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.toggleModal();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <div className="modal">
          <img src={this.props.src} alt="" />
        </div>
      </Overlay>,
      modalRoot
    );
  }
}
