import * as firebase from 'firebase'
import _ from 'lodash'

import {
  FETCH_POSTS,
  DELETE_POST,
  CREATE_POST
} from './types';

// Make sure you swap this out with your Firebase app's config
const config = {  
  //apiKey: "XXXXXXXXXXXX-XXXXXXXXXXX-XX-XXXXXXXXXXX",
  //authDomain: "XXXX.firebaseapp.com",
  databaseURL: "https://fbredux.firebaseio.com",
  //storageBucket: "XXXX.appspot.com",
};

const Posts = firebase  
  .initializeApp(config)
  .database()
  .ref();

export const fetchPosts = () => {
  return dispatch => {
    Posts.on('value', snapshot => {
      dispatch({
        type: FETCH_POSTS,
        payload: snapshot.val()
      });
    });
  };
}

export const createPost = (post) => {
  return dispatch => Posts.push(post);
}

export const deletePost = (key) => {
  return dispatch => Posts.child(key).remove();
}