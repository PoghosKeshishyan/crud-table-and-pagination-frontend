import { useState } from 'react';
import { motion } from 'framer-motion';
import { WorningModal } from './WorningModal';
import '../stylesheets/FilterUsersByRange.css';

export function FilterUsersByRange({
    users,
    setUsersFiltered,
    worningModal,
    setCloneUsers,
    setWorningModal,
    setModalFromFilterRange
}) {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [nextDay, setNextDay] = useState('');  

    const onChangeInputFrom = (e) => {
        const selectedDay = e.target.value.split('-').reverse().join('.');
        setFromDate(selectedDay);

        const currentDate = new Date(e.target.value);
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);
        const result = nextDate.toISOString().split('T')[0];
        setNextDay(result);
    }

    const onChangeInputTo = (e) => {
        const selectedDay = e.target.value.split('-').reverse().join('.');
        setToDate(selectedDay);
    }

    const closeModal = () => {
        setModalFromFilterRange(false);
        setWorningModal(false);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (!fromDate || !toDate) {
            return setWorningModal(true);
        }

        const usersFilteredUsers = users.filter(user => {
            if (user.registered_at >= fromDate && user.registered_at <= toDate) {
                return true;
            }

            return false;
        })

        setCloneUsers(usersFilteredUsers);
        setWorningModal(false);
        setUsersFiltered(true);
        setModalFromFilterRange(false)
    }

    return (
        <div className='FilterUsersByRange'>
            <motion.div
                className='darkBg' onClick={closeModal}
                initial={{opacity: 0}} animate={{opacity: 1}}
                transition={{duration: 1.5, delay: 0.2, ease: [0, 0.71, 0.2, 1.01]}}
            />

            {worningModal && <WorningModal />}

            <motion.form
                className='content' onSubmit={submitHandler}
                initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 1, delay: 0.2, ease: [0, 0.71, 0.2, 1.01]}}
            >
                <i className='fa-solid fa-xmark' onClick={closeModal} />
                <h2 className='heading'>Filter users by range</h2>

                <div className='box'>
                    <span>From</span> <input type='date' onChange={onChangeInputFrom} />
                    <span>To</span> <input type='date' min={nextDay} onChange={onChangeInputTo} />
                </div>

                <input type='submit' value='Filter' className='btn default' />
            </motion.form>
        </div>
    )
}
