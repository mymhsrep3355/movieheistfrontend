import React from 'react'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

const Share = ({movies}) => {
    const handleShare = () => {
        const shareText = movies.map((movie) => movie.title).join(", ");
        const shareMessage = `Check out my favorite movies: ${shareText}`; // Customize the share message as needed
        console.log("Sharing:", shareMessage);
      };
    
      return (
        <div className="flex gap-3 justify-end">
          <FacebookShareButton url={window.location.href}>
            <FaFacebook onClick={handleShare} />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href}>
            <FaXTwitter onClick={handleShare} />
          </TwitterShareButton>
          <WhatsappShareButton url={window.location.href}>
            <FaWhatsapp onClick={handleShare} />
          </WhatsappShareButton>
        </div>
      );
    };


export default Share