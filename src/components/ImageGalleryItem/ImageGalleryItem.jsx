export const ImageGalleryItem = ({ image, toggleModal }) => {
  return (
    <li>
      <img src={image.webformatURL} alt={image.tags} onClick={toggleModal} />
    </li>
  );
};
