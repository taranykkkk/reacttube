import { Link } from 'react-router-dom';
import styles from './InputSearch.module.scss';
import { Search } from 'lucide-react';
import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';
import { fetchSearchData, setSearchValue } from '../../store/searchSlice';
import debounce from 'lodash.debounce';

function InputSearch({ visibility }) {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    [],
  );

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickSearch = () => {
    dispatch(fetchSearchData(inputValue));
  };

  return (
    <div
      className={`${styles.search_box} flex_div`}
      style={visibility && { width: '70%', marginRight: '0' }}>
      <input
        value={inputValue}
        type="text"
        placeholder="Search..."
        style={visibility && { width: '100%' }}
        onChange={onChangeInput}
      />
      <Link to="/search">
        <Search size={20} color="#00d8ff" onClick={onClickSearch} />
      </Link>
    </div>
  );
}

export default InputSearch;
