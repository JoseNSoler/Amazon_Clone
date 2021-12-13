import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signin, signout } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const local = useLocation();
    const navigate = useNavigate();

    const redirect = local.search ? local.search.split('=')[1] : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        // Sign in
        dispatch(signin(email, password))
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder='Enter Email' required
                        onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Email address</label>
                    <input type="password" id="password" placeholder='Enter Password' required
                        onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button className='primary' type='submit'>Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New Customer? {' '}
                        <Link to="/register">Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
