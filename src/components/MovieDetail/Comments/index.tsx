import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

import back_button from '../../../assets/back-button.png';
import { Comment } from './Comment';

const CommentsList = styled.ul`
  padding: 0;
  @media (max-width: 478px) {
    padding-right: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  max-width: 653px;
  align-items: center;
  background: rgba(163, 163, 164, 0.1);
  border-radius: 5px;
  padding: 11px 12px;
  margin-top: 15px;
`;

const Input = styled.input`
  border-radius: 5px;
  font-weight: 300;
  font-size: 1.25rem;
  line-height: 1.43rem;
  background-color: #606365;
  color: #fff;
  flex: 0 1 80%;
  padding: 11px 12px;
  border: none;
  outline: none;
  &::placeholder {
    color: #fff;
  }
  @media (max-width: 478px) {
    font-size: 1rem;
    flex: 1 1 100%;
  }
`;

const Button = styled.button`
  width: 67px;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  cursor: pointer;
  @media (max-width: 478px) {
    transform: scale(0.8);
  }
`;

export interface CommentType {
  id: number;
  date: string;
  author: string;
  text: string | undefined;
}

export const Comments: React.FC<{ filmId: number | undefined }> = ({
  filmId,
}) => {
  let commentsJSON = localStorage.getItem(`film_comments_${filmId}`);

  let comments = [] as CommentType[];

  comments.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

  if (commentsJSON) {
    comments = JSON.parse(
      localStorage.getItem(`film_comments_${filmId}`) as string
    ) as CommentType[];
  }

  const [commentsState, setCommentsState] = useState(comments);
  const [inputValue, setInputValue] = useState('');

  const addCommentHandler = (e: React.FormEvent) => {
    e.preventDefault();

    let newComment: CommentType = {
      id: comments[comments.length - 1]
        ? comments[comments.length - 1].id + 1
        : 1,
      date: new Date().toLocaleString(),
      author: 'You',
      text: inputValue,
    };

    comments.push(newComment);
    localStorage.setItem(`film_comments_${filmId}`, JSON.stringify(comments));
    setCommentsState((prev) => [...prev, newComment]);

    setInputValue('');
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <CommentsList>
        {commentsState
          .sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0))
          .map((comment) => (
            <Comment
              key={comment.id}
              author={comment.author}
              text={comment.text}
              date={comment.date}
            />
          ))}
      </CommentsList>
      <Form onSubmit={addCommentHandler}>
        <Input
          value={inputValue}
          type="text"
          placeholder="Leave a comment"
          onChange={inputChangeHandler}
        />
        <Button>
          <img src={back_button} alt="" />
        </Button>
      </Form>
    </div>
  );
};
