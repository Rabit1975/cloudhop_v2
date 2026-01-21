import React from 'react'
import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'

export default function ChatModule() {
  return (
    <div className="chat-module">
      <ChatSidebar />
      <ChatWindow />
    </div>
  )
}
