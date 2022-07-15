
//redux-toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//axios
import axios from 'axios'
import instance from '../../shared/axios';
// import instance from '../../shared/axios';


export const loadPostsDB = createAsyncThunk(
  'loadPost', async() => {
    const response = await instance.get('/api/post').catch((err) => console.log(err))
    return response.data
  }
);

// export const getDataDB = () => {
//   return async (dispatch) => {
//     try {
//       const response = await instance.get("/post");
//       dispatch(setData(response.data));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// // 추가하기
// export const addDataDB = (data) => {
//   return async (dispatch) => {
//     console.log(data,"??")
    
//     try {
//       const response = await instance.post("/api/post", data);
//       console.log(response.data)
//       const newPoster = { ...data, boardmainId: response.data.boardMainId }
//       dispatch(addData(newPoster));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// // 삭제하기
// export const removeDataDB = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await instance.delete(`/api/post/${id}`);
//       dispatch(removeData(id));
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// //수정하기
// export const modifyDataDB = (id, data) => {
//   console.log(data, "sddsddf")
//   return async (dispatch) => {
//     try {
//       const response = await instance.patch("/api/post/" + id, data);
//       console.log(response)
//       dispatch(modifyData({id, data}));
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

export const addDataDB = createAsyncThunk(
  'addData',
  async (data) => {
    const response = await instance.post("/api/post", data);
    const newPoster = { ...data, boardmainId: response.data.boardMainId }
    return newPoster
  }
)

export const modifyDataDB = createAsyncThunk(
  'modifyData', 
  async (id, data) => {
    console.log(data, id)
    await instance.patch('/api/post' + id, data)
    window.alert('수정되었습니다')
    return data
  }
)

export const removeDataDB= createAsyncThunk(
  'removeData', 
  async (id) => {
    await instance.delete('/api/post/' + id)
    window.alert('삭제되었습니다')
    return id
  }
)

//Reducer
const postSlice = createSlice({
  name: "post",
  initialState: {
    list: []
  },
  // reducers: {
  //   //read
  //   setData: (state, action) => {
  //     state.list = action.payload;
  //   },


  //   // 추가하기
  //   addData: (state, action) => {
  //     state.list.push(action.payload);
  //   },


  //   // 삭제하기 
  //   removeData: (state, action) => {
  //     state.list = state.list.filter(
  //       (post) => {
  //         if (post.id === action.payload) { // 받아온 id와 저장되어 있는 데이터의 id가 같으면 
  //           // action.payload => id
  //           return false;
  //         } else {
  //           return true;
  //         }
  //       }
  //     )
  //   },

  //   //수정하기
  //   modifyData: (state, action) => {
  //     state.list = state.list.map(
  //       (post) => {
  //         console.log(post, "짝")
  //         if (post.id === action.payload.id) { // 받아온 id와 저장되어 있는 데이터의 id가 같으면 
  //           return {
  //             ...post, 
  //             subject: action.payload.data.subject,
  //             content: action.payload.data.content
  //           }
  //         } else {
  //           return post;
  //         }
  //       }
  //     );
  //   }
  // },

  extraReducers: {
    [loadPostsDB.fulfilled] : (state, { payload }) => {
      state.list = payload
    },

    //추가하기 
    [addDataDB.fulfilled]: (state, { payload }) => {
      state.list.push(payload);
    },

    //수정하기
    [modifyDataDB.fulfilled] : (state, { payload })=> {
  state.list.map(
    (post) => {
      console.log(payload, "무 ㅓ야야야")
      if (post.id === payload.id) {
        return {
          ...post,
          categoryName: payload.data.categoryName,
          content: payload.data.content,
          postImages : payload.data.postImages
          }
      } else {
        return post
        }
        }
      )
    },

    [removeDataDB.fulfilled]: (state, { payload }) => {
        state.list = state.list.filter(
          (post) => {
            return (
              post.id !== payload // 받아온 id와 저장되어 있는 데이터의 id가 다르면 걸러라
            )
          
        }
      )
    }
  }
});

export const postAction = postSlice.actions;

export const { setData, addData, removeData, modifyData } = postSlice.actions;
export default postSlice.reducer;
