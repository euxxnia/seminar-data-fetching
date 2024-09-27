import './reset.css';
import './App.css';

import { useEffect, useState } from 'react';

import styles from './App.module.css';
import { PostDetail } from './component/PostDetail';
import { PostList } from './component/PostList';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const App = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [selectedPostID, setSelectedPostID] = useState(1);

  useEffect(() => {
    let ignore = false;

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = (await response.json()) as Post[];
        if (!ignore) {
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };

    void fetchPosts();

    return () => {
      ignore = true;
    };
  }, [selectedPostID]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.postList}>
        <PostList
          posts={posts}
          selectedPostID={selectedPostID}
          setSelectedPostID={setSelectedPostID}
        />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.postContent}>
        <PostDetail posts={posts} selectedPostID={selectedPostID} />
      </div>
    </div>
  );
};
