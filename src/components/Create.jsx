import Navbar from './Navbar';
import React from 'react';
import moment from 'moment';
import { createClient } from '@supabase/supabase-js';
import './Create.css';

const Create = ({
  allInputs,
  onInput,
  allPosts,
  resetInput,
  search,
  onSearch,
}) => {
  const supabaseUrl = 'https://rmsprgzojkqchmzckncf.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtc3ByZ3pvamtxY2htemNrbmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1MzQ0ODIsImV4cCI6MjAyODExMDQ4Mn0.eRLCb_Q8sqm0gIElpZSJWcN3wdAe9ilHy64nyYyHMg4';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const addPost = async () => {
    const currentDate = moment().format('MM-DD-YYYY');
    const currentTime = moment().format('HH:mm:ss');
    const twelveHourTime = moment(currentTime, 'HH:mm:ss').format('hh:mm:ss A');
    const { data, error } = await supabase
      .from('SoccerPosts')
      .insert([
        { 
          title: allInputs[0], 
          content: allInputs[1], 
          image: allInputs[2], 
          created_date: currentDate,
          created_time: twelveHourTime
        },
      ])
      .select();
    alert('Post Created!');
    onInput();
    allPosts();
  };  

  return (
    <>
      <header>
        <Navbar
          onReset={resetInput}
          handleSearch={onSearch}
          searchInput={search}
        />
      </header>
      <section id="form">
        <h1>Create A Post</h1>
        <div className="inputs">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={allInputs[0]}
            onChange={onInput}
          ></input>
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={allInputs[1]}
            onChange={onInput}
          ></input>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={allInputs[2]}
            onChange={onInput}
          ></input>
        </div>
        <button name="add-button" onClick={addPost}>
          Add Post
        </button>
      </section>
    </>
  );
};

export default Create;