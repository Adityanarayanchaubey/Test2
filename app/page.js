"use client"
import { useState } from "react";
import styles from "./page.module.css";
// import { text } from "node:stream/consumers";

export default function Home() {
  const [message, setmessage] = useState("");
  const [response, setResponse] = useState("");
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState("");
  const [streamResponse, setStreamResponse] = useState("");

  // Method to collect the data

  const handlechat = async () => {
    setLoading(true);
    setResponse("");

    try {

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });


      const data = await res.json();

      setResponse(data.response);
    } catch (error) {
      setResponse("Error:" + error.message);
    }

    setLoading(false);
  };


  // const handleStreamChat = async () => {
  //     setStreaming(true)
  //     setStreamResponse("")

  //     try {
  //       const res = await fetch("api/chat-stream",{
  //         method:"POST",
  //          headers:{
  //           "Content-Type":"application/json"
  //          },
  //       body: JSON.stringify({ message }),
  //       })

  //       const reader =  res.body.getReader()
  //        const decoder = new  TextDecoder()
        

  //   while (true){
  //         const {done, value} = await reader.read()
  //   if(done) break;

  //   const chunk = decoder.decode(value)
  //  const lines = chunk.split("\n")
  // }

    
  //     } catch (error) {
        
  //     }

  // }

  return (
  <div
  style={{
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #1e1e2f, #3a3a5f)",
    minHeight: "100vh",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "450px",
      margin: "30px 0",
      background: "#24244a",
      borderRadius: "20px",
      boxShadow: "0 8px 32px rgba(30,30,47,0.2)",
      border: "1px solid #2e2e4f",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <h1
      style={{
        background: "linear-gradient(90deg, #6a5acd, #836fff)",
        color: "#fff",
        padding: "25px 0 10px 0",
        textAlign: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
        marginBottom: "10px",
        letterSpacing: ".03em"
      }}
    >
      🚀 Get Started with AI
    </h1>
    <div
      id="chatArea"
      style={{
        flex: "1",
        padding: "18px 10px",
        minHeight: "280px",
        maxHeight: "320px",
        overflowY: "auto",
        background: "#23234b",
        display: "flex",
        flexDirection: "column",
        gap: "14px"
      }}
    >
      {/* Example bubbles, replace with dynamic rendering of your messages */}
      <div
        style={{
          alignSelf: "flex-end",
          background: "linear-gradient(135deg, #6a5acd, #836fff)",
          color: "#fff",
          borderRadius: "16px 16px 2px 18px",
          padding: "11px 16px",
          maxWidth: "78%",
          fontSize: "1.08rem",
          boxShadow: "0 2px 8px rgba(106,90,205,0.13)"
        }}
      >
        {message}
      </div>
      <div
        style={{
          alignSelf: "flex-start",
          background: "#363672",
          color: "#fff",
          borderRadius: "18px 18px 15px 4px",
          padding: "12px 15px",
          maxWidth: "78%",
          fontSize: "1.08rem",
          boxShadow: "0 2px 8px rgba(30,30,47,0.12)"
        }}
      >
        {response || (
          <span style={{ color: "#bbb", fontStyle: "italic" }}>
            Your AI response will appear here...
          </span>
        )}
      </div>
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "18px 18px 18px 18px",
        background: "#2e2e4f",
        borderTop: "1px solid #383863"
      }}
    >
      <textarea
        value={message}
        onChange={(e) => setmessage(e.target.value)}
        placeholder="Type your message..."
        rows={1}
        style={{
          width: "100%",
          minHeight: "44px",
          resize: "none",
          padding: "10px 16px",
          borderRadius: "12px",
          border: "none",
          outline: "none",
          background: "#2e2e4f",
          color: "#fff",
          fontSize: "1.08rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      />
      <button
        onClick={handlechat}
        style={{
          padding: "8px 18px",
          borderRadius: "20px",
          border: "none",
          background: "linear-gradient(135deg, #6a5acd, #836fff)",
          color: "#fff",
          fontSize: "1.08rem",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(106,90,205,0.15)",
          transition: "transform 0.2s, box-shadow 0.2s"
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "scale(1.08)";
          e.target.style.boxShadow = "0 4px 16px rgba(106,90,205,0.24)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 2px 8px rgba(106,90,205,0.15)";
        }}
      >
        {loading ? "Loading..." : "Send"}
      </button>
    </div>
  </div>
  <style jsx>{`
    @media (max-width: 550px) {
      div[style*="maxWidth: 450px"] {
        max-width: 98vw !important;
        margin: 12px 0 !important;
      }
      h1 {
        font-size: 1.45rem !important;
        padding: 19px 0 6px 0 !important;
        margin-bottom: 8px !important;
      }
      #chatArea {
        min-height: 180px !important;
        max-height: 250px !important;
        padding: 10px 5px !important;
      }
      textarea {
        font-size: 1rem !important;
        padding: 7px 10px !important;
      }
      button {
        font-size: 1rem !important;
        padding: 8px 13px !important;
      }
    }
  `}</style>
</div>

  );
}
