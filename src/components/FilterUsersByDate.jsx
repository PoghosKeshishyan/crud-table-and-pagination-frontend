import { useState } from 'react';
import { motion } from 'framer-motion';
import { WorningModal } from './WorningModal';
import '../stylesheets/FilterUsersByDate.css';

export function FilterUsersByDate({
    users,
    worningModal,
    setCloneUsers,
    setWorningModal,
    setUsersFiltered,
    setModalFromFilterDate,
}) {
    const [selectedDay, setSelectedDay] = useState('');

    const onChangeInput = (e) => {
        const value = e.target.value.split('-').reverse().join('.');
        setSelectedDay(value);
    }

    const closeModal = () => {
        setModalFromFilterDate(false);
        setWorningModal(false);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (!selectedDay) {
            return setWorningModal(true);
        }

        const usersFilteredUsers = users.filter(user => user.registered_at === selectedDay);
        setCloneUsers(usersFilteredUsers);
        setUsersFiltered(true);
        setModalFromFilterDate(false);
    }

    return (
        <div className='FilterUsersByDate'>
            <motion.div
                className='darkBg' onClick={closeModal}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
            />

            {worningModal && <WorningModal />}

            <motion.form
                className='content' onSubmit={submitHandler}
                initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
            >
                <i className='fa-solid fa-xmark' onClick={closeModal} />
                <h2 className='heading'>Filter users by date</h2>
                <input type='date' onChange={onChangeInput} />
                <input type='submit' value='Filter' className='btn default' />
            </motion.form>
        </div>
    )
}
