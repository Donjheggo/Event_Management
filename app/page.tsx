'use client';

import { useUser } from "@/context/user-context";

export default function Events() {
  const { loading, user } = useUser();

  if (loading) {
    return;
  }

  return (
    <div>
      <h1>User role: {JSON.stringify(user) ?? ""} </h1>
      <h1>Event Page </h1>
    </div>
  );
}
