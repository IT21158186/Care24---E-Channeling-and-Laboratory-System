import React, { useState} from 'react';


function Header() {

    const [employeeId, setId] = useState("");

    return (
        <div className="dashboard-app container">
            <h2>To see the employee profile</h2>
            <form>
            <div className="form-group">
                    <label for="employeeId">ID</label>
                    <input className="form-control" id="employeeId" placeholder="Type here..." value={employeeId} onChange={(e) => {
                        setId(e.target.value);
                    }} />
                </div>
            </form>
            <a className='btn btn-warning' href={`/employee/view/${employeeId}`}>
                View Profile
            </a>
        </div>
    )
}

export default Header;