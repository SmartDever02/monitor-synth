import Link from "next/link";
import MultipleMinerScore from "../components/MultipleMinerScore";

export interface MinerScore {
  miner_uid: number,
  prompt_score: number,
  scored_time: string
}

const TOP_MINER_UIDS = [4, 5, 10, 90, 91, 116, 144, 160]

export default async function RecentScore() {
  const MY_UIDS = process.env.NEXT_PUBLIC_MINERS?.split(",") || []

  // get top 10 miners from the last prompt_score
  const res = await fetch(`https://synth.mode.network/validation/scores/latest`);
  const data: MinerScore[] = await res.json();

  const RECENT_MINER_UIDS = data.sort((a, b) => b.prompt_score - a.prompt_score).slice(0, 5).map((item) => item.miner_uid);

  const uniqueMinerUIDs = Array.from(new Set([...TOP_MINER_UIDS, ...MY_UIDS, ...RECENT_MINER_UIDS]));


  return <div className="text-black py-20 px-20">
    <Link className="text-white underline" href="/">Back</Link>
    <h2 className="text-white text-4xl mb-10 font-bold text-center">Recent Scores</h2>
    <MultipleMinerScore uids={uniqueMinerUIDs} />
  </div>
}