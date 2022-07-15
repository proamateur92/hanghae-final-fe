//redux-toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import instance from "../../shared/axios";

import axios from "axios";
import { useDispatch } from "react-redux";

export const loadPostsDB = createAsyncThunk("loadPost", async () => {
  const response = await instance
    .get("/api/post")
    .catch((err) => console.log(err));
  return response.data;
});

export const addDataDB = createAsyncThunk("addData", async (data) => {
  console.log(data, "츄가");
  const response = await instance.post("/api/post", data);
  const newPoster = { ...data, boardmainId: response.data.boardMainId };
  return newPoster;
});

export const modifyDataDB = createAsyncThunk("modifyData", async (newData) => {
  console.log(newData.data, "data", newData.id, "id");
  await instance.patch("/api/post/" + newData.id, newData.data);
  window.alert("수정되었습니다");
  return newData;
});

export const removeDataDB = createAsyncThunk("removeData", async (id) => {
  await instance.delete("/api/post/" + id);
  window.alert("삭제되었습니다");
  return id;
});

//Reducer
const postSlice = createSlice({
  name: "post",
  initialState: {
    list: [],
    pageNumber: 0,
    last: false,
  },

  extraReducers: {
    // 불러오기
    [loadPostsDB.fulfilled]: (state, { payload }) => {
      state.list = payload;
      if (payload.pageable.pageNumber === 0) {
        state.list = [...payload.content];
      } else {
        state.list = [...state.list, ...payload.content];
      }
      state.pageNumber = payload.pageable.pageNumber;
      state.last = payload.last;
    },

    //추가하기
    [addDataDB.fulfilled]: (state, { payload }) => {
      state.list.push(payload);
    },

    //수정하기
    [modifyDataDB.fulfilled]: (state, { payload }) => {
      state.list.map((post) => {
        console.log(payload, "무 ㅓ야야야");
        if (post.id === payload.id) {
          return {
            ...post,
            payload,
          };
        } else {
          return post;
        }
      });
    },

    [removeDataDB.fulfilled]: (state, { payload }) => {
      state.list = state.list.filter((post) => {
        return (
          post.id !== payload // 받아온 id와 저장되어 있는 데이터의 id가 다르면 걸러라
        );
      });
    },
  },
});

export const postAction = postSlice.actions;

export const { setData, addData, removeData, modifyData } = postSlice.actions;
export default postSlice.reducer;
