import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import DefaultLayout from '../../components/Layout/DefaultLayout';
import ProductList from '../../components/ProductList';
import SearchBar from '../../components/SearchBar';
import style from './HomePage.module.scss';
import request from '../../utils/request';
import formatNumber from '../../utils/formatNumber';

function Home() {
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [clothes, setClothes] = useState([]);
    const [mobilePhones, setMobilePhones] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8001/api/products').then((res) => {
            let books = [];
            let clothes = [];
            let mobilePhones = [];
            res.data.forEach(product => {
                if (product.type === 'book') {
                    books.push(product);
                }
                if (product.type === 'cloth') {
                    clothes.push(product);
                }
                if (product.type === 'mobile') {
                    mobilePhones.push(product);
                }
            })
            setBooks(books);
            setClothes(clothes);
            setMobilePhones(mobilePhones);
        });
    }, []);

    const handleSearch = (keyword) => {
        navigate(`/search/${keyword}`);
    };

    const handleEnterSearch = (event, keyword) => {
        if (event.keyCode === 13) {
            navigate(`/search/${keyword}`);
        }
    };

    return (
        <DefaultLayout>
            <div>
                <div className={style.background_container}>
                    <span className={style.corporate_name}>Price Tag</span>
                    <SearchBar handleSearch={handleSearch} handleEnterSearch={handleEnterSearch} />
                </div>
                <div className={style.product_list_container}>
                    <ProductList products={books} type={'Books'} />
                </div>
                <div className={style.product_list_container}>
                    <ProductList products={clothes} type={'Clothes'} />
                </div>
                <div className={style.product_list_container}>
                    <ProductList products={mobilePhones} type={'Mobile Phones'} />
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Home;
