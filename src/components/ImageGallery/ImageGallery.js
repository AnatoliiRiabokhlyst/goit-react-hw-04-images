import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from '../Loader';
import Button from '../Button';
import Modal from '../Modal';

function ImageGallery({ search, page, changePage }) {
  const API_KEY = '28023425-fe9b0fddd4dae40e08e29e597';
  const url = 'https://pixabay.com/api/';
  const options = '&image_type=photo&orientation=horizontal&per_page=12';
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!search) {
      return;
    }
    setStatus('pending');
    axios(`${url}?q=${search}&page=${page}&key=${API_KEY}${options}`).then(
      ({ data }) => {
        setSearchResults(prevState =>
          page > 1 ? [...prevState, ...data.hits] : data.hits
        );
        page === 1 && setTotalPages(Math.ceil(data.totalHits / 12));
        setStatus('resolved');
      }
    );
    setTimeout(
      () =>
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        }),
      400
    );
  }, [search, page, options, API_KEY, url]);

  const loadMore = () => {
    changePage(page + 1);
  };

  const openModal = url => {
    setModalUrl(url);
    setShowModal(!showModal);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <>
        <ul className={s.gallery}>
          {searchResults.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <li key={id} className={s.item}>
                <ImageGalleryItem
                  url={webformatURL}
                  data={largeImageURL}
                  onClick={openModal}
                />
              </li>
            );
          })}
        </ul>

        {showModal && (
          <Modal onCloseRequest={handleToggleModal}>
            {' '}
            <img src={modalUrl} alt="" />{' '}
          </Modal>
        )}
      </>
      {status === 'resolved' && page !== totalPages && (
        <Button loadMore={loadMore} />
      )}
      {status === 'pending' && <Loader />}
      <div></div>
    </div>
  );
}

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default ImageGallery;
