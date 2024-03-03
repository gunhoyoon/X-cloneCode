"use client";

import useSocket from "@/app/(afterLogin)/messages/[room]/_lib/useSocket";

export default function WebSocketComponent() {
  useSocket();
  return null;
}

// socketIo를 서버 컴포넌트에서 쓰면, 메모리 누수가 심함.(아무짓도 안했는데 메모리가 올라가는거)
