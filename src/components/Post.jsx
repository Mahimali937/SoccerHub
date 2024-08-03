import Navbar from './Navbar';
import React, { useState } from 'react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './Post.css';

const Post = ({
  postInfo,
  onUpvoteChange,
  allPosts,
  onEdit,
  resetInput,
  search,
  onSearch,
}) => {
  const supabaseUrl =  'https://rmsprgzojkqchmzckncf.supabase.co';
  const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtc3ByZ3pvamtxY2htemNrbmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1MzQ0ODIsImV4cCI6MjAyODExMDQ4Mn0.eRLCb_Q8sqm0gIElpZSJWcN3wdAe9ilHy64nyYyHMg4';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const addComment = async () => {
    const { data, error } = await supabase
      .from('SoccerPosts')
      .select('comments')
      .eq('id', postInfo.id);

    let existingComments;
    if (data[0].comments === null || data[0].comments === '') {
      existingComments = [];
    } else {
      existingComments = JSON.parse(data[0].comments);
    }

    const newComments = [...existingComments, comment];

    const { newData, newError } = await supabase
      .from('SoccerPosts')
      .update({ comments: JSON.stringify(newComments) })
      .eq('id', postInfo.id);

    setComment('');
    allPosts();
  };

  const deletePost = async () => {
    const { error } = await supabase
      .from('SoccerPosts')
      .delete()
      .eq('id', postInfo.id);
    allPosts();
    alert('Post Deleted!');
    navigate('/');
  };

  return (
    <>
      <header>
        <Navbar
          onReset={resetInput}
          searchInput={search}
          handleSearch={onSearch}
        />
      </header>
      <section className="post-container">
        <p>
          Posted{' '}
          {postInfo['created_date'] &&
            postInfo['created_time'] &&
            moment(postInfo['created_date'] + ' ' + postInfo['created_time']).format('MM-DD-YYYY [at] hh:mm:ss A')}
        </p>
        <h3>{postInfo.title}</h3>
        <p>{postInfo.content}</p>
        <img src={postInfo.image} alt="Post Image"></img>
        <div className="icons">
          <div
            id={postInfo.id}
            style={{ display: 'inline' }}
            onClick={onUpvoteChange}
            className="icon"
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            <p style={{ display: 'inline' }}>{postInfo.upvotes} Upvotes</p>
          </div>
          <div>
            <div
              id={`${postInfo.id}edit`}
              style={{ display: 'inline' }}
              className="icon"
              onClick={onEdit}
            >
              <Link to={`/id${postInfo.id}edit`} className="link">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
            </div>
            <div
              style={{ display: 'inline' }}
              className="icon"
              onClick={deletePost}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        </div>
        <section className="comments">
          <p>Comments</p>
          {postInfo.comments &&
            JSON.parse(postInfo.comments).map((comment, index) => {
              return (
                <p key={index} className="comment">
                  - {comment}
                </p>
              );
            })}
          <input
            type="text"
            placeholder="Leave A Comment..."
            onChange={handleCommentChange}
            value={comment}
          ></input>
          <button onClick={addComment}>Add Comment</button>
        </section>
      </section>
    </>
  );
};

export default Post;

