import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { useSelector } from "react-redux";

const CreatePost = () => {
  // get currentUser value

  const { currentUser } = useSelector((state) => state.user);

  // state variable for post content
  const [content, setContent] = useState("");
  console.log("content", content);

  const [isSendButtonEnabled, setIsSendButtonEnabled] = useState(false);
  // isSendButtonEnabled = false

  // handle send post

  const handleSendPost = async () => {
    try {
      if (content === "") {
        return alert("Kindly fill something to post!");
      }
      const response = await axios.post(
        "http://localhost:4000/api/create-post",
        // body
        {
          content,
          author: currentUser?._id,
        },
      );
      // alert message on successful post creation
      if (response.data.post) {
        setContent("");
        setIsSendButtonEnabled(false);
        return alert("post created successfully");
      }
    } catch (err) {
      console.log("err", err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center border-2 border-gray-500 px-10 rounded-full py-2">
        <input
          type="text"
          placeholder="What's on your mind?"
          className="p-4 text-2xl  outline-none"
          value = {content}
          onChange={(e) => setContent(e.target.value)}
        />
        {/* create post icon */}
        <div>
          {/* if false then show pen icon */}
          {!isSendButtonEnabled && (
            <FaPen
              onClick={() => setIsSendButtonEnabled(true)}
              className="text-2xl cursor-pointer"
            />
          )}

          {
            // is isSendButtonEnabled = true then only show send icon
            isSendButtonEnabled && (
              <IoIosSend
                onClick={handleSendPost}
                className="text-4xl cursor-pointer"
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CreatePost;