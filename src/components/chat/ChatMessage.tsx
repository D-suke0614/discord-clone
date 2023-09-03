import React from "react";
import "./ChatMessage.scss";
import { Avatar } from "@mui/material";

function ChatMessage() {
  return (
    <div className="message">
      <Avatar />
      <div className="messageInfo">
        <h4>
          D.suke Code
          <span className="messageTimeStamp">2023/09/03</span>
        </h4>
        <p>メッセージ本文</p>
      </div>
    </div>
  );
}

export default ChatMessage;
