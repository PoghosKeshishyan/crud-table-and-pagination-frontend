import '../stylesheets/Controls.css';

export function Controls({
    users,
    searchedInputDisplay,
    setSearchedInputDisplay,
    showAllUsers,
    setCloneUsers,
    usersFiltered,
    setUsersFiltered,
    searchedUserInput,
    showModalDateFunc,
    showModalRangeFunc,
    showModalAddUserFunc,
    setChearchedUserInput,
}) {
    const submitHandler = (e) => {
        e.preventDefault();

        if (!searchedInputDisplay || !searchedUserInput) {
            setSearchedInputDisplay(!searchedInputDisplay);
        } else {
            const searchedUserInputs = users.filter(user => {
                if (user.user_name.toLowerCase().includes(searchedUserInput.toLowerCase())) {
                    return true;
                }

                return false;
            })

            setCloneUsers(searchedUserInputs);
            setUsersFiltered(true);
        }
    }

    return (
        <div className='Controls'>
            <button className='btn primary' onClick={showModalAddUserFunc}>
                Add user
                <i className='fa-solid fa-user-plus'></i>
            </button>

            {
                usersFiltered && <button className='btn danger' onClick={showAllUsers}>
                    Show All Users
                </button>
            }

            {
                !usersFiltered && <div className='filterUsersBtn'>
                    <form onSubmit={submitHandler}>
                        <input
                            type='search'
                            value={searchedUserInput}
                            onChange={e => setChearchedUserInput(e.target.value)}
                            placeholder='Search by user name...'
                            className={searchedInputDisplay ? 'searchInput active' : 'searchInput'}
                        />

                        <button className='btn primary' type='submit'>
                            <span>Search</span>
                            <i className='fa-solid fa-magnifying-glass' />
                        </button>
                    </form>

                    <button className='btn primary' onClick={showModalDateFunc}>
                        Filter users by date
                        <i className='fa-solid fa-filter'></i>
                    </button>

                    <button className='btn primary' onClick={showModalRangeFunc}>
                        Filter users by date range
                        <i className='fa-solid fa-filter'></i>
                    </button>
                </div>
            }
        </div>
    )
}
