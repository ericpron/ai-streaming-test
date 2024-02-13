"use client";
import { useChat } from "ai/react";

const ChatComponent = () => {
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();

  console.log(messages);
  console.log(input);

  return (
    <div>
      {messages.map((message) => {
        return (
          <div key={message.id}>
            {message.role === "assistant" ? (
              <h3 className="text-lg font-semibold mt-2">GPT-4</h3>
            ) : (
              <h3 className="text-lg font-semibold mt-2">User</h3>
            )}

            {message.content.split("\n").map((currentTextBlock, index) => {
              if (currentTextBlock === "") {
                return <p key={message.id + index}>&nbsp;</p>;
              } else {
                return <p key={message.id + index}>{currentTextBlock}</p>;
              }
            })}
          </div>
        );
      })}
      <form className="mt-12" onSubmit={handleSubmit}>
        <p>User message</p>
        <textarea
          className="mt-2 w-full bg-slate-600 p-2 rounded-md"
          placeholder={"What should I make for dinner tonight?"}
          value={input}
          onChange={handleInputChange}
        />
        <button className="rounded-md bg-blue-600 p-2 mt-2">Send</button>
      </form>
    </div>
  );
};
export default ChatComponent;
