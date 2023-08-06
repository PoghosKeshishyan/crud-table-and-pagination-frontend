import { useState } from 'react';
import { UserItem } from './UserItem';
import '../stylesheets/Users.css';

export function Users({ currentUsers, editUser, deleteUser, cloneUsers, setCloneUsers }) {
  const [sorted, setSorted] = useState(false);  

  const sortThHandler = () => {
    setCloneUsers([...cloneUsers].reverse());
    setSorted(!sorted);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th className='forSort' onClick={sortThHandler}>
            Registration Date
            {
              sorted ? 
              <i className='fa-solid fa-arrow-down-1-9' />
              :  
              <i className='fa-solid fa-arrow-up-9-1' />
            }
          </th>
          <th>User name</th>
          <th>Age</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {
          currentUsers.map(user => <UserItem
            user={user}
            key={user._id}
            editUser={editUser}
            deleteUser={deleteUser}
          />)
        }
      </tbody>
    </table>
  )
}
