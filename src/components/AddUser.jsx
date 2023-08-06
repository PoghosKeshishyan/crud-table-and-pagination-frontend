import { useState } from 'react';
import { motion } from 'framer-motion'; 
import { WorningModal } from './WorningModal';
import axios from '../axios';
import '../stylesheets/AddUser.css';

export function AddUser({ setModalFromAddUser, loadingUsers, worningModal, setWorningModal }) {
    const today = new Date().toISOString().split('T')[0].split('-').reverse().join('.');

    const [user, setUser] = useState({
        user_name: '',
        phone: '',
        email: '',
        age: '',
        registered_at: today,
    })

    const onChangeInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const closeModal = () => {
        setModalFromAddUser(false);
        setWorningModal(false);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!user.user_name || !user.phone || !user.email || !user.age) {
            return setWorningModal(true);
        }

        await axios.post('users', user);
        setModalFromAddUser(false);
        setWorningModal(false);
        loadingUsers();
    }

    return (
        <div className='AddUser'>
            <motion.div
                className='darkBg' onClick={closeModal}
                initial={{opacity: 0}} animate={{opacity: 1}}
                transition={{duration: 1.5, delay: 0.2, ease: [0, 0.71, 0.2, 1.01]}}
            />
            
            {worningModal && <WorningModal />}

            <motion.form
                onSubmit={submitHandler}
                initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 1, delay: 0.2, ease: [0, 0.71, 0.2, 1.01]}}
            >
                <i className='fa-solid fa-xmark' onClick={closeModal} />
                <h2 className='heading'>Add new user</h2>

                <div className='box'>
                    <p>User name <span className='required'>*</span></p>
                    <input type='text' name='user_name' value={user.user_name} onChange={onChangeInput} />
                </div>

                <div className='box'>
                    <p>Phone <span className='required'>*</span></p>
                    <input type='tel' name='phone' value={user.phone} onChange={onChangeInput} />
                </div>

                <div className='box'>
                    <p>Email <span className='required'>*</span></p>
                    <input type='email' name='email' value={user.email} onChange={onChangeInput} />
                </div>

                <div className='box'>
                    <p>Age <span className='required'>*</span></p>
                    <input type='number' name='age' value={user.age} onChange={onChangeInput} />
                </div>

                <input type='submit' value='Submit' className='btn default' />
            </motion.form>
        </div>
    )
}
