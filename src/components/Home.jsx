import Navbar from './Navbar';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = ({ allPosts, sortPosts, resetInput, search, onSearch }) => {
  return (
    <>
      <header>
        <Navbar
          onReset={resetInput}
          searchInput={search}
          handleSearch={onSearch}
        />
      </header>
      <section id="button-bar">
        <p>Sort By: </p>
        <button name="new-button" onClick={sortPosts}>
          Newest
        </button>
        <button name="popular-button" onClick={sortPosts}>
          Most Popular
        </button>
      </section>
      <section>
        {allPosts &&
          allPosts.map((post) => {
            return (
              <Link to={`/id${post.id}`} className="link" key={post.id}>
                <div className="post-card" key={post.id}>
                  <p>
                    Posted{' '}
                    {post['created_date'] &&
                      moment(post['created_date']).format('MM-DD-YYYY')} at{' '}
                    {post['created_time'] &&
                      moment(post['created_time'], 'HH:mm:ss').format('hh:mm:ss A')}
                  </p>
                  <h3>{post.title}</h3>
                  <p>Upvotes: {post.upvotes}</p>
                </div>
              </Link>
            );
          })}
      </section>
    </>
  );
};

export default Home;
