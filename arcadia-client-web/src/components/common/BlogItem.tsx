import React from "react";
import { Link } from "react-router-dom";
import { Item } from "../../pages/types/BlogTypes";

export interface blogItemProps {
  blogItem: Item;
}

const BlogItem: React.FC<blogItemProps> = ({ blogItem }) => {
  return (
    <Link to={`/blogs/${blogItem.sys.id}`}>
      <div className="flex flex-col border bg-white border-black rounded-md p-6 gap-6 max-w-2xl mx-auto shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all duration-500 hover:translate-y-[-3px] hover:translate-x-[-2px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-md font-semibold">{blogItem.fields.blogTitle}</h1>
          <p className="text-sm text-slate-500">
            By {blogItem.fields.blogAuthor} - {blogItem.fields.createdDate}
          </p>
        </div>
        <div>
          <p>{blogItem.fields.blogSummary}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
