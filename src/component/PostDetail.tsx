import { useEffect, useState } from 'react';

import styles from '../App.module.css';
import { type Post } from '../types';

type PostDetail = {
  posts: Post[] | undefined;
  selectedPostID: number;
};

type Comment = {
  body: string;
  email: string;
  id: number;
  postId: number;
};

export const PostDetail = ({ posts, selectedPostID }: PostDetail) => {
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    let ignore = false;

    const fetchComments = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${selectedPostID}/comments`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = (await response.json()) as Comment[];
        if (!ignore) {
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    void fetchComments();

    return () => {
      ignore = true;
    };
  }, [selectedPostID]);

  const selectedPost = posts?.find((post) => post.id === selectedPostID);
  if (selectedPost === undefined) return <div>Loading post...</div>;

  return (
    <>
      <div className={styles.content}>
        <h2>내용</h2>
        <p className={styles.p}>{selectedPost.body}</p>
      </div>
      {/* {selectedPostID} */}
      <div className={styles.comments}>
        <h2>댓글</h2>
        {comments?.map((comment) => (
          <div className={styles.comment} key={comment.id}>
            <p className={styles.email}>
              작성자: {comment.email}
              <br />
            </p>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};
