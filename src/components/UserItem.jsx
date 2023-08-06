export function UserItem({ user, editUser, deleteUser }) {
  return (
    <tr>
        <td>{user._id}</td>
        <td>{user.registered_at}</td>
        <td>{user.user_name}</td>
        <td>{user.age}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td>
          <button className='btn primary' onClick={() => editUser(user._id)}>
            Edit
            <i className='fa-solid fa-user-pen'></i>
          </button>
          
          <button className='btn danger' onClick={() => deleteUser(user._id)}>
            Delete
            <i className='fa-solid fa-user-slash'></i>
          </button>
        </td>
    </tr>
  )
}