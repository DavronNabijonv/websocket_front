'use client';

import { useEffect, useRef, useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Render.com'dagi WebSocket URL'ni bu yerga yozing:
    socketRef.current = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);


    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && input.trim()) {
      socketRef.current.send(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">💬 Real-Time Chat</h1>

      <div className="w-full max-w-md h-64 overflow-y-auto bg-gray-800 rounded p-3 mb-4 shadow-inner">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm mb-1">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-md">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-l px-3 py-2 text-black"
          placeholder="Xabar yozing..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Yuborish
        </button>
      </div>
    </div>
  );
}
