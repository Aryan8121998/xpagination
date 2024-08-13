import React, { useEffect, useState } from 'react';
import "./Tables.css"

function Tables() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');

  const rowsPerPage = 10;

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (error) {
    alert(error);
  }

  return (
    <div className="App">
      <table style={{width:"100%"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='.pagination-container'>
        <button type="text "onClick={handlePreviousClick} disabled={currentPage === 1} style={{margin:"10px"}}>
          Previous
        </button>
      {currentPage}
        {/* style={{border:"1px solid black" , height:"10px"}} */}
        <button type='text' onClick={handleNextClick} disabled={currentPage === totalPages} style={{margin:"10px"}}> 
          Next
        </button>
      </div>
    </div>
  );
}

export default Tables;
