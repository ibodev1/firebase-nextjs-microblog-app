import React from "react";
import Image from "next/image";

function Post({ data }) {
  return (
    <div className="w-full h-auto border-b-2 p-2 border-gray-200 overflow-hidden">
      <h2>{data.title ? data.title : null}</h2>
      <p>{data.post ? data.post : null}</p>
      <div className="flex items-center mb-2 mt-6">
        <Image
          src={data.author.photo ? data.author.photo : null}
          width="50"
          height="50"
          alt="pp"
          className="rounded-full"
        />
        <p className="ml-4">{data.author.name ? data.author.name : null}</p>
      </div>
    </div>
  );
}

export default Post;
