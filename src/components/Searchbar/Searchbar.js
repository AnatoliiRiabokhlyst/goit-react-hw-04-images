import React from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends React.Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      return;
    }

    this.props.onSearch(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <ImSearch />
          </button>
          <input
            className={s.SearchForm_input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
export default Searchbar;
