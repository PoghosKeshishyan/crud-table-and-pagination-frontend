import { motion } from 'framer-motion'; 
import { WorningModal } from './WorningModal';
import axios from '../axios';
import '../stylesheets/EditUser.css';

export function EditUser({ 
    singleUser, 
    worningModal, 
    idSingleUser,
    loadingUsers,
    setSingleUser, 
    setWorningModal,
    setModalFromEditUser,
}) {
    const onChangeInput = (e) => {
        setSingleUser({ ...singleUser, [e.target.name]: e.target.value });
    }

    const closeModal = () => {
        setModalFromEditUser(false);
        setWorningModal(false);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!singleUser.user_name || !singleUser.phone || !singleUser.email || !singleUser.age) {
            return setWorningModal(true);
        }

        await axios.put(`users/${idSingleUser}`, singleUser);
        setModalFromEditUser(false);
        setWorningModal(false);
        loadingUsers();
    }

    return (
        <div className='EditUser'>
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
                <h2 className='heading'>Edit user</h2>

                <div className='box'>
                    <p>User name <span className='required'>*</span></p>
                    <input type='text' name='user_name' value={singleUser?.user_name} onChange={onChangeInput} />
                </div>

                <div className='box'>
                    <p>Phone <span className='required'>*</span></p>
                    <input type='tel' name='phone' value={singleUser?.phone} onChange={onChangeInput} />
                </div>

                <div className='box'>
                    <p>Email <span className='required'>*</span></p>
                    <input type='email' name='email' value={singleUser?.email} onChange={onChangeInput} />
                </div>

                <div className='box'>
                    <p>Age <span className='required'>*</span></p>
                    <input type='number' name='age' value={singleUser?.age} onChange={onChangeInput} />
                </div>

                <input type='submit' value='Submit' className='btn default' />
            </motion.form>
        </div>
    )
}
