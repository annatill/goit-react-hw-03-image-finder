import propTypes from 'prop-types';

export const ImageGalleryItem = ({ image, toggleModal }) => {
  return (
    <li>
      <img
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => toggleModal(image)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: propTypes.shape({
    webformatURL: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
  }).isRequired,
  toggleModal: propTypes.func.isRequired,
};
