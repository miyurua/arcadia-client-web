import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import BlogItem from "../components/common/BlogItem";
import { IBlog } from "./types/BlogTypes";

const BlogList: React.FC = () => {
  const [blogList, setBlogList] = useState<IBlog>();

  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_CONTENT_DELIVERY_API_TOKEN,
  });

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        const res = await client.getEntries();
        console.log("res", res);
        setBlogList(res);

        console.log(res);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    };
    getAllEntries();
  }, []);

  console.log("blogList", blogList);

  return (
    <main className="font-spacemono">
      <div className="flex flex-col max-w-4xl mx-auto gap-6 p-3 ">
        <h1 className="text-3xl font-bold my-7">Blog</h1>
        {blogList
          ? blogList.items.map((blogItems) => (
              <BlogItem blogItem={blogItems} key={blogItems.sys.id} />
            ))
          : ""}
      </div>
    </main>
  );
};

export default BlogList;
