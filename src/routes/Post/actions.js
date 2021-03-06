import {
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  INVALIDATE_POST
} from '../../constants';
import http from '../../utils/HttpClient';

export function invalidate() {
  return {
    type: INVALIDATE_POST,
  };
}

function shouldFetchPost(state) {
  if (state.currentPost.isLoading) {
    return false;
  } else {
    return state.currentPost.didInvalidate;
  }
}

export function loadPost(slug) {
  return {
    // Types of actions to emit before and after
    types: ['LOAD_POST_REQUEST', 'LOAD_POST_SUCCESS', 'LOAD_POST_FAILURE'],

    // Check the cache (optional):
    // shouldCallAPI: (state) => shouldFetchPost(state),

    // Perform the fetching:
    callAPI: () => http.get(`/api/v0/post/${slug}`),

    // Arguments to inject in begin/end actions
    payload: { slug },
  };
}
