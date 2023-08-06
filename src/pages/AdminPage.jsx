import React from 'react';
import axios from '../axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { Controls } from '../components/Controls';
import { Users } from '../components/Users';
import { AddUser } from '../components/AddUser';
import { EditUser } from '../components/EditUser';
import { FilterUsersByDate } from '../components/FilterUsersByDate';
import { FilterUsersByRange } from '../components/FilterUsersByRange';
import { Pagination } from '../components/Pagination';
import '../stylesheets/AdminPage.css';

export function AdminPage() {
  const [users, setUsers] = useState([]);
  const [cloneUsers, setCloneUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [singleUser, setSingleUser] = useState({});
  const [idSingleUser, setIdSingleUser] = useState(0);
  const [searchedUserInput, setChearchedUserInput] = useState('');
  const [searchedInputDisplay, setSearchedInputDisplay] = useState(false);

  // modals boolean variables
  const [modalFromAddUser, setModalFromAddUser] = useState(false);
  const [modalFromEditUser, setModalFromEditUser] = useState(false);
  const [modalFromFilterDate, setModalFromFilterDate] = useState(false);
  const [modalFromFilterRange, setModalFromFilterRange] = useState(false);
  const [worningModal, setWorningModal] = useState(false);
  const [usersFiltered, setUsersFiltered] = useState(false);

  // pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const lastUserIndex = currentPage * itemsPerPage;
  const firstUserIndex = lastUserIndex - itemsPerPage;
  const currentUsers = cloneUsers.slice(firstUserIndex, lastUserIndex);

  useEffect(() => {
    loadingUsers();
  }, [])

  async function loadingUsers() {
    const response = await axios.get('users');
    setUsers(response.data);
    setCloneUsers(response.data.reverse());
    setLoading(false);
  }

  const editUser = async(id) => {
    const response = await axios.get(`users/${id}`);
    setSingleUser(response.data);
    setIdSingleUser(id);
    setModalFromEditUser(true);
  }

  const deleteUser = async (id) => {
    await axios.delete(`users/${id}`);
    loadingUsers();
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const showModalAddUserFunc = () => setModalFromAddUser(true);
  const showModalDateFunc = () => setModalFromFilterDate(true);
  const showModalRangeFunc = () => setModalFromFilterRange(true);

  const showAllUsers = () => {
    setCloneUsers([...users]);
    setUsersFiltered(false);
    setChearchedUserInput('');
    setSearchedInputDisplay(false);
  }

  return loading ? <Loading /> : (
    <motion.div className='AdminPage'
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 1.2, ease: [0, 0.71, 0.2, 1.01] }}
      >
        CRUD table and Pagination with Framer Motion
      </motion.h1>

      {/* ============ control buttons ============ */}
      <Controls
        users={users}
        searchedUserInput={searchedUserInput}
        showAllUsers={showAllUsers}
        setCloneUsers={setCloneUsers}
        usersFiltered={usersFiltered}
        setUsersFiltered={setUsersFiltered}
        setChearchedUserInput={setChearchedUserInput}
        showModalDateFunc={showModalDateFunc}
        showModalRangeFunc={showModalRangeFunc}
        showModalAddUserFunc={showModalAddUserFunc}
        searchedInputDisplay={searchedInputDisplay}
        setSearchedInputDisplay={setSearchedInputDisplay}
      />

      {/* ============ modal windows ============ */}
      {
        modalFromAddUser && <AddUser
          loadingUsers={loadingUsers}
          worningModal={worningModal}
          setWorningModal={setWorningModal}
          setModalFromAddUser={setModalFromAddUser}
        />
      }

      {
        modalFromEditUser && <EditUser
          singleUser={singleUser}
          loadingUsers={loadingUsers}
          idSingleUser={idSingleUser}
          worningModal={worningModal}
          setSingleUser={setSingleUser}
          setWorningModal={setWorningModal}
          setModalFromEditUser={setModalFromEditUser}
        />
      }

      {
        modalFromFilterDate && <FilterUsersByDate
          users={users}
          worningModal={worningModal}
          setCloneUsers={setCloneUsers}
          setWorningModal={setWorningModal}
          setUsersFiltered={setUsersFiltered}
          setModalFromFilterDate={setModalFromFilterDate}
        />
      }

      {
        modalFromFilterRange && <FilterUsersByRange
          users={users}
          setUsersFiltered={setUsersFiltered}
          worningModal={worningModal}
          setCloneUsers={setCloneUsers}
          setWorningModal={setWorningModal}
          setModalFromFilterRange={setModalFromFilterRange}
        />
      }

      {/* ============ users table ============ */}
      {
        cloneUsers.length > 0 ? <Users 
          editUser={editUser} 
          deleteUser={deleteUser} 
          cloneUsers={cloneUsers}
          currentUsers={currentUsers} 
          setCloneUsers={setCloneUsers}
          searchedUserInput={searchedUserInput}
        />   
        :   
        <div className='usersAreEmpty'>
          <i className='fa-solid fa-circle-exclamation'></i>
          <h3>There is no user with your registered data.</h3>
        </div>
      }

      {/* ============ pagination ============ */}
      {
        cloneUsers.length > 0 && <Pagination
          paginate={paginate}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalUsers={cloneUsers.length}
          setCurrentPage={setCurrentPage}
        />
      }
    </motion.div>
  )
}
