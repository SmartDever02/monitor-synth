"use client"

import Reward from "./components/Reward";
import Score from "./components/Score";
import Validate from "./components/Validate";
import Notification from "./components/Notification";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="mx-5 md:mx-10 flex flex-col">
      <ul className="flex gap-x-4 mb-4">
        <li>
          <Link className="underline" href="/score">Recent Scores</Link>
        </li>
        <li>
          <Link className="underline" href="/my-recent-score">My Recent Scores</Link>
        </li>
      </ul>
      <div className="flex flex-row gap-10 w-full">
        <Validate />
        <Score />
        <Reward />
      </div>

      <Notification />
    </div >
  );
}
