import Link from "next/link";
import MultipleMinerScore from "../components/MultipleMinerScore";

export interface MinerScore {
  miner_uid: number,
  prompt_score: number,
  scored_time: string
}

export default async function RecentScore() {
  const MY_UIDS = process.env.NEXT_PUBLIC_MINERS?.split(",") || []

  return <div className="text-black py-20 px-20">
    <Link className="text-white underline" href="/">Back</Link>
    <h2 className="text-white text-4xl mb-10 font-bold text-center">My Recent Scores</h2>
    <MultipleMinerScore uids={MY_UIDS} />
  </div>
}