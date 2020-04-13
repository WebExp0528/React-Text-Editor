import React, { useState, useEffect, useRef } from 'react';
import SearchService from '../../services/api/SearchService';
import './index.scss';
import Loader from '../Loader';
import Tooltip from '../Tooltip';
import SearchResults from './SearchResults';
import { withRouter } from 'react-router-dom';
import useClickOutside from '../../hooks/clickOutside';

const Search = (props) => {
    const service = new SearchService();
    const [ results, setResults ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ value, setValue ] = useState('');
    const delay = useRef();
    const ref = useRef(null);

    const handleClickOutside = () => {
        setValue('');
    };

    useClickOutside(ref, handleClickOutside);

    useEffect(() => {
        const unlisten = props.history.listen(() => {
            setValue('');
            clearTimeout(delay.current);
        });

        return function cleanup() {
            unlisten();
        };
    }, [props.history]);

    const handleChange = (e) => {
        const inputValue = e.target.value;

        clearTimeout(delay.current);
        setLoading(true);

        if (inputValue.length > 0) {
            delay.current = setTimeout(() => {
                service.search(inputValue)
                    .then(res => {
                        setResults(res.data);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }, 1500);
        }

        setValue(inputValue);
    };

    return (
        <div className="search" ref={ref}>
            <div className="search__input-wrap">
                <input
                    type="text"
                    placeholder="Search article or folder"
                    className="form-control search__input"
                    onChange={handleChange}
                    value={value}
                />
            </div>
            <div className="search__results">
                <Tooltip show={value}>
                    {
                        loading
                        ? <Loader/>
                        : <SearchResults results={results} />
                    }
                </Tooltip>
            </div>
        </div>
    );
};

export default withRouter(Search);