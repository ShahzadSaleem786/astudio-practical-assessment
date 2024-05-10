import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import Pagination from './Pagination';
import { FaSearch } from 'react-icons/fa';
import './styles.css';

const COLORS = {
  BLACK: "#322625",
  GREY: "#ebebeb",
  BLUE: "#c0e3e5",
  YELLOW: "#fdc936"
};

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedNameFilter, setSelectedNameFilter] = useState('');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState('');
  const [selectedGenderFilter, setSelectedGenderFilter] = useState('');
  const [selectedEmailFilter, setSelectedEmailFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [pageSize, currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users`);
      const allUsers = response.data.users;
      const totalUsers = allUsers.length;
      const totalPages = Math.ceil(totalUsers / pageSize);
      setUsers(allUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize));
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNameFilterChange = (value) => {
    setSelectedNameFilter(value);
  };

  const handleAgeFilterChange = (value) => {
    setSelectedAgeFilter(value);
  };

  const handleGenderFilterChange = (value) => {
    setSelectedGenderFilter(value);
  };

  const handleEmailFilterChange = (value) => {
    setSelectedEmailFilter(value);
  };

    const filteredUsers = searchValue
        ? users.filter(user =>
        Object.values(user).some(val => {
        if (typeof val === 'number') {
            return val.toString().toLowerCase().includes(searchValue.toLowerCase());
        } else if (typeof val === 'string') {
            return val.toLowerCase().includes(searchValue.toLowerCase());
        }
        return false;
        })
    )
  : users;

  const filteredUsersWithNameFilter = selectedNameFilter
    ? filteredUsers.filter(user => user.firstName && user.firstName.toLowerCase() === selectedNameFilter.toLowerCase())
    : filteredUsers;

  const filteredUsersWithAgeFilter = selectedAgeFilter
    ? filteredUsersWithNameFilter.filter(user => user.age && user.age === parseInt(selectedAgeFilter))
    : filteredUsersWithNameFilter;

  const filteredUsersWithGenderFilter = selectedGenderFilter
    ? filteredUsersWithAgeFilter.filter(user => user.gender && user.gender.toLowerCase() === selectedGenderFilter.toLowerCase())
    : filteredUsersWithAgeFilter;

  const filteredUsersWithEmailFilter = selectedEmailFilter
    ? filteredUsersWithGenderFilter.filter(user => user.email && user.email.toLowerCase() === selectedEmailFilter.toLowerCase())
    : filteredUsersWithGenderFilter;

  console.log("Total pages:", totalPages);
  console.log("Current page:", currentPage);

  return (
    <div>
      <h1 style={{ color: COLORS.BLACK, fontFamily: 'Neutra Text' }}>Home/Users</h1>
      <div className="filters-container" style={{ display: 'flex', alignItems: 'center' }}>
        <select
          className="filter-input"
          value={pageSize}
          onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
          style={{color: COLORS.BLACK, marginRight: '10px' }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
          <span style={{ color: COLORS.BLACK, marginRight: '10px' }}>Entries</span>
        <span>|</span>
        <i className="search-icon" style={{ color: COLORS.BLACK, marginLeft: '15px', marginRight: '15px' }} onClick={() => setShowSearchInput(!showSearchInput)}>
          <FaSearch />
        </i>
        {showSearchInput && (
          <input 
            type="text" 
            className="filter-input" 
            placeholder="Search" 
            onChange={(e) => handleSearch(e.target.value)} 
            style={{ marginLeft: '10px', marginRight: '10px' }}
          />
        )}
        <span>|</span>
        <select
          className="filter-input"
          value={selectedNameFilter}
          onChange={(e) => handleNameFilterChange(e.target.value)}
          style={{color: COLORS.BLACK, marginLeft: '10px' }}
        >
          <option value="">Name</option>
          {Array.from(new Set(users.map(user => user.firstName))).map(firstName => (
            <option key={firstName} value={firstName}>{firstName}</option>
          ))}
        </select>
        <select
          className="filter-input"
          value={selectedEmailFilter}
          onChange={(e) => handleEmailFilterChange(e.target.value)}
          style={{color: COLORS.BLACK, marginLeft: '10px' }}
        >
          <option value="">Email</option>
          {Array.from(new Set(users.map(user => user.email))).map(email => (
            <option key={email} value={email}>{email}</option>
          ))}
        </select>
        <select
          className="filter-input"
          value={selectedAgeFilter}
          onChange={(e) => handleAgeFilterChange(e.target.value)}
          style={{color: COLORS.BLACK, marginLeft: '10px' }}
        >
          <option value="">Age</option>
          {Array.from(new Set(users.map(user => user.age))).map(age => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>
        <select
          className="filter-input"
          value={selectedGenderFilter}
          onChange={(e) => handleGenderFilterChange(e.target.value)}
          style={{color: COLORS.BLACK, marginLeft: '10px' }}
        >
          <option value="">Gender</option>
          {Array.from(new Set(users.map(user => user.gender))).map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
      </div>
      <UserTable users={filteredUsersWithEmailFilter} />
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} pageSize={pageSize} />
    </div>
  );
};

export default UsersPage;
