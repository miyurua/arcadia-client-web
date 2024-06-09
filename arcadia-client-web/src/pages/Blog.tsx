import { createClient } from "contentful";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactMarkdown from "react-markdown";
import { Item } from "./types/BlogTypes";
// import { IBlog } from "./types/BlogTypes";

const Blog: React.FC = () => {
  const [blogDetails, setBlogDetails] = useState<Item>();
  const id = useParams();
  SwiperCore.use([Navigation]);

  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_CONTENT_DELIVERY_API_TOKEN,
  });

  console.log("blog details", blogDetails);

  useEffect(() => {
    const getBlogEntry = async () => {
      try {
        await client.getEntry(id.id).then((entries) => {
          setBlogDetails(entries);
        });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    };

    getBlogEntry();
  }, []);

  return (
    <main className="font-spacemono">
      <Swiper navigation>
        {blogDetails && (
          <SwiperSlide>
            <div
              style={{
                background: `url(${blogDetails?.fields.blogImage.fields.file.url}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="h-[720px]"
            ></div>
          </SwiperSlide>
        )}
      </Swiper>
      {blogDetails && (
        <div className="flex flex-col max-w-4xl mx-auto gap-6 p-3 ">
          <div>
            <h1 className="text-3xl font-bold my-7">
              {blogDetails.fields.blogTitle}
            </h1>
            <p className="text-md text-slate-500">
              by {blogDetails?.fields.blogAuthor} -{" "}
              {blogDetails?.fields.createdDate}
            </p>
          </div>
          <div>
            <ReactMarkdown className="flex flex-col gap-6">
              {blogDetails.fields.blogContent}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </main>
  );
};

export default Blog;
