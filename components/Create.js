import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase-config";

function Create({ user, posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  useEffect(() => {
    //console.log(user);
    //console.log(post);
  }, [title, post]);

  const postsCollectionRef = collection(db, "posts");
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target[0].value = "";
    e.target[1].value = "";
    if (!title || !post || post.length <= 1 || title.length <= 1) {
      toast.error("Fill all fields!");
    } else {
      try {
        await addDoc(postsCollectionRef, {
          title: title,
          post: post,
          author: {
            name: user.displayName,
            photo: user.photoURL,
            email: user.email,
            id: user.uid,
          },
        });
        setPosts([
          ...posts,
          {
            title: title,
            post: post,
            author: {
              name: user.displayName,
              photo: user.photoURL,
              email: user.email,
              id: user.uid,
            },
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full h-auto">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-full space-y-4 p-4"
      >
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title..."
          className="p-2 text-lg bg-transparent border-b-2 border-gray-200 outline-none"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          name="post"
          id="post"
          placeholder="Write..."
          className="p-2 text-lg resize-y h-24 bg-transparent border-b-2 border-gray-200 outline-none"
          defaultValue={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <input
          type="submit"
          value="Save"
          className="w-24 ml-auto rounded-xl font-medium cursor-pointer hover:bg-blue-800 transition-all ease text-xl h-12 bg-blue-700"
        />
      </form>
    </div>
  );
}

export default Create;
