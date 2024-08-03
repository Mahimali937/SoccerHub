import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './Navbar.css';

const Navbar = ({ onReset, searchInput, handleSearch }) => {
  return (
    <header id="navbar">
      <h1>Soccer Hub</h1>
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={searchInput}
        onChange={handleSearch}
      ></input>
      <div id="navbar-right" onClick={onReset}>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/create" className="link">
          Create A Post
        </Link>
      </div>
    </header>
  );
};

export default Navbar;