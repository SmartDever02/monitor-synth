"use client"

import Reward from "./components/Reward";
import Score from "./components/Score";
import Validate from "./components/Validate";

export default async function Home() {
  return (
    <div className="mx-5 md:mx-10 flex flex-col">
      <div className="flex flex-row gap-10 w-full">
        <Validate />
        <Score />
        <Reward />
      </div>
    </div >
  );
}
