import React from 'react';

const UserTable = ({ users }) => {
  return (
    <div className="table-responsive">
    <table>
      <thead>
        <tr>
          <th>FIRST NAME</th>
          <th>LAST NAME</th>
          <th>MAIDEN NAME</th>
          <th>AGE</th>
          <th>GENDER</th>
          <th>EMAIL</th>
          <th>USERNAME</th>
          <th>BLOODGROUP</th>
          <th>EYECOLOR</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.maidenName}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.bloodGroup}</td>
                <td>{user.eyeColor}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
};

export default UserTable;
