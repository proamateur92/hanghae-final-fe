import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/userSlice';
import postReducer from './modules/postSlice';
import heartReducer from './modules/heartSlice';
import commentReducer from './modules/commentSlice';
import noticeReducer from './modules/noticeSlice';
import communityReducer from './modules/communitySlice';
import recruitReducer from './modules/recruitSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
    heart: heartReducer,
    notice: noticeReducer,
    community: communityReducer,
    recruit: recruitReducer
  },
});

export default store;
