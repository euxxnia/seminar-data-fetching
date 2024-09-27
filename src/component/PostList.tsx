import styles from '../App.module.css';
import { type PostListProps } from '../types';

export const PostList = ({
  posts,
  selectedPostID,
  setSelectedPostID,
}: PostListProps) => {
  return (
    <>
      <h2>포스트 목록</h2>
      <ul className={styles.ul}>
        {posts?.map((post) => (
          <li
            key={post.id}
            className={`${styles.post ?? ''} ${post.id === selectedPostID ? (styles.selected ?? '') : ''}`}
            onClick={() => {
              setSelectedPostID(post.id);
            }}
          >
            <span className={styles.id}>{post.id}. </span>
            <span className={styles.title}>{post.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
