import styled from 'styled-components';

const CommentWrapper = styled.div`
  background: #606365;
  border-radius: 5px;
  width: 100%;
  padding: 7px 10px;
  margin: 8px 0;
  max-width: 653px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Author = styled.p`
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.1rem;
`;

const Date = styled.p`
  font-weight: 200;
  font-size: 0.9rem;
  line-height: 1.1rem;
`;

const Text = styled.p`
  font-size: 1.25rem;
  line-height: 1.4rem;
  overflow: hidden;
`;

interface CommentProps {
  author: string;
  text: string | undefined;
  date: string;
}

export const Comment: React.FC<CommentProps> = ({ date, author, text }) => {
  return (
    <CommentWrapper>
      <Header>
        <Author>{author}</Author>
        <Date>{date}</Date>
      </Header>
      <Text>{text}</Text>
    </CommentWrapper>
  );
};
