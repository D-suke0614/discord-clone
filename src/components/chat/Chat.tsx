import React, { useState } from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import useSubCollection from "../../hooks/useSubCollection";

function Chat() {
  const [inputText, setInputText] = useState<string>("");
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const { subDocuments: messages } = useSubCollection("channels", "messages");
  const user = useAppSelector((state) => state.user.user);

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // channelsコレクションの中にあるmessageコレクションの中にメッセージ情報を入れる
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });
    setInputText("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chatMessage">
        {messages.map((message, idx) => (
          <ChatMessage
            key={idx}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
      </div>

      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form action="">
          <input
            type="text"
            placeholder="Udemyへメッセージを送信"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          ></button>
        </form>
        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
}

export default Chat;
