// react
import React from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';

// commentSlice
import { loadCommentsDB, addCommentDB, editCommentDB, deleteCommentDB } from '../redux/modules/commentSlice';

// style
import styled from 'styled-components';

const Comment = (props) => {
  const dispatch = useDispatch();
  const postId = props.postId;
  const userId = 13;
  const commentRef = React.useRef();

  // 코멘트 불러오기
  React.useEffect(() => {
    dispatch(loadCommentsDB({ postId: postId, pgNo: 0 }));
  }, [dispatch, postId]);

  const comments = useSelector((state) => state.comment.list);

  // 코멘트 추가하기
  const addComment = async () => {
    const commentData = {
      postId: postId,
      comment: commentRef.current.value,
    }; 

    await dispatch(addCommentDB(commentData));
    commentRef.current.value = '';
  };

  // 코멘트 수정하기
  const [isEdit, setIsEdit] = React.useState(false);
  const [targetComment, setTargetComment] = React.useState(null);

  const startEdit = (v) => {
    if (v.userId === userId) {
      setIsEdit(true);
      setTargetComment(v);
      commentRef.current.value = v.comment;
      commentRef.current.focus();
    } else {
      window.alert('작성자만 수정할수 있어요');
    }
  };

  const editComment = async () => {
    const commentData = {
      commentId: targetComment.id,
      comment: commentRef.current.value,
    };
    await dispatch(editCommentDB(commentData));
    commentRef.current.value = '';
    dispatch(loadCommentsDB({ postId: postId, pgNo: 0 }));
    setIsEdit(false);
  };

  // 코멘트 삭제하기
  const deleteComment = async (v) => {
    if (v.userId === userId) {
      const commentData = {
        commentId: v.id,
        boardMainId: postId
      }
      await dispatch(deleteCommentDB(commentData));
      dispatch(loadCommentsDB({ postId: postId, pgNo: 0 }));
    } else {
      window.alert('작성자만 삭제할수 있어요');
    }
  };

  return (
    <CommentsWrap>
      {comments?.length > 0 ? (
        comments.map((v) => (
          <OneComment key={v.id}>
            <h5> {v.nickname} </h5>
            <p> {v.comment} </p>
            <sub> 2022-07-05 </sub>
            <span onClick={() => startEdit(v)}> 수정 </span>
            <span onClick={() => deleteComment(v)}> 삭제 </span>
          </OneComment>
        ))
      ) : (
        <NoComments> 댓글이 아직 없어요 </NoComments>
      )}

      <CommentInput is_edit={isEdit}>
        <textarea ref={commentRef} />
        {isEdit ? <button onClick={editComment}>수정</button> : <button onClick={addComment}>전송</button>}
      </CommentInput>
    </CommentsWrap>
  );
};

export default Comment;

const CommentsWrap = styled.div`
  width: 95%;
  margin: auto;
`;

const NoComments = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 20px;
  margin: 30px;
`;

const OneComment = styled.div`
  display: flex;
  gap: 20px;

  border: 1px solid #ddd;

  h5 {
    font-weight: bold;
  }

  span {
    cursor: pointer;
  }
`;

const CommentInput = styled.div`
  display: flex;
  height: ${(props) => (props.is_edit ? '100px' : '30px')};

  textarea {
    width: 80%;
    border: 1px solid #ddd;
  }

  button {
    width: 20%;
  }
`;
