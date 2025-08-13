'use client'

import React, { useEffect, useState } from "react";


const scaryMessages = [
  "You shouldn’t be here...",
  "Something is lurking in the shadows...",
  "The walls are closing in...",
  "A whisper: 'Go back...' ",
  "The darkness consumes all..."
];

export default function NotFound() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * scaryMessages.length);
      setMessage(scaryMessages[randomIndex]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-red-500 p-6 font-mono">
      <h1 className="text-6xl font-bold mb-4 animate-pulse">404</h1>
      <h2 className="text-2xl mb-8">{message || "You are lost  ..."}</h2>
    </main>
  );
}
