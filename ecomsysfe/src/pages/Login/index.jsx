import { useState } from 'react';
import Form from '../../components/Form';
import style from './Login.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const handleSetData = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    const handleLogin = (e) => {
        axios.post('http://localhost:8000/api/login/', data).then((response) => {
            if (response.status === 200 && response.data.user_id) {
                localStorage.setItem('user_id', response.data.user_id);
                navigate('/');
            }
        });
    };

    return (
        <div className={style.container}>
            <Form className={style.form}>
                <span className={style.title}>Login</span>
                <input
                    className={style.input}
                    type="text"
                    placeholder="Username"
                    value={data.username}
                    name="username"
                    onChange={handleSetData}
                />
                <input
                    className={style.input}
                    type="text"
                    placeholder="Password"
                    value={data.password}
                    name="password"
                    onChange={handleSetData}
                />
                <button className={style.button} onClick={handleLogin}>
                    Login
                </button>
                <Link href="/register" class={style.register_link}>
                    Đăng ký
                </Link>
            </Form>
        </div>
    );
}
