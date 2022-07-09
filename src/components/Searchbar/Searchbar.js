import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';

export default function Searchbar({ onSearch, changePage }) {
  const [search, setSearch] = useState('');

  const onChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };
  const onSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      toast.error('Please enter search request', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    onSearch(search);
    changePage(1);
    setSearch('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          <ImSearch />
        </button>
        <input
          className={s.SearchForm_input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={onChange}
          onChange={search}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};
