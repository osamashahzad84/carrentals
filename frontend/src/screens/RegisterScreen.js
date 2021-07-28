import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cnic, setCnic] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister)
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match')
        } else {
            dispatch(register(name, email, cnic, password))
        }
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create new Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter your name" required
                        onChange={e => setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter your email address" required
                        onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="cnic">CNIC</label>
                    <input type="text" minLength="13" maxLength="13" pattern="\d{13}" id="cnic" placeholder="Enter 13 digit CNIC without -"
                        required onChange={(e) => setCnic(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" required
                        onChange={e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Re-enter password" required
                        onChange={e => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}