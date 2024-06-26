import style from './Search.module.scss';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import SearchBar from '../../components/SearchBar';
import ProductList from '../../components/ProductList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Search() {
    const { q } = useParams();

    const [keySearch, setKeySearch] = useState(q);
    const [searchItems, setSearchItems] = useState([]);

    useEffect(() => {
        const key = keySearch || '';
        axios.get(`http://localhost:8000/api/search/${key}`).then((res) => {
            setSearchItems([...res.data['books'], ...res.data['clothes'], ...res.data['mobile_phones']]);
        });
    }, [keySearch]);

    const handleSearch = (word) => {
        setKeySearch(word);
    };

    const handleEnterSearch = (event, word) => {
        if (event.keyCode === 13) {
            setKeySearch(word);
        }
    };

    return (
        <DefaultLayout>
            <div className={style.container}>
                <SearchBar
                    className={`${style.search_bar} ${style.search_button}`}
                    keys={q}
                    handleSearch={handleSearch}
                    handleEnterSearch={handleEnterSearch}
                />
                <div className={style.product_list_container}>
                    <ProductList products={[...searchItems]} inSearchPage={true} />
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Search;
