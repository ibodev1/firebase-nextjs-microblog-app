import { useEffect, useState } from "react";
import Create from "../components/create";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase-config";
import Post from "../components/Post";

export default function Home({ user, login }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postsCollectionRef = collection(db, "posts");
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, [user, login]);
  return (
    <div>
      {login ? <Create user={user} posts={posts} setPosts={setPosts} /> : null}
      {posts.map((data, i) => (
        <Post key={i} data={data} />
      ))}
    </div>
  );
}
