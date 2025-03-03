import dynamic from "next/dynamic";
import { format, addDays, subDays } from 'date-fns';

const ScoreChart = dynamic(() => import("./chart"), { ssr: false })

export interface MinerScore {
  miner_uid: number,
  prompt_score: number,
  scored_time: string
}

export default async function MultipleMinerScore({ uids }: { uids: Array<number | string> }) {
  const currentDate = format(addDays(new Date(), 1), 'yyyy-MM-dd');
  const beforeDate = format(subDays(new Date(), 2), 'yyyy-MM-dd');

  const fetchScores = async (uid: number | string) => {
    const res = await fetch(`https://synth.mode.network/validation/scores/historical?from=${beforeDate}&to=${currentDate}&miner_uid=${uid}`, {
      cache: "no-cache"
    });
    return res.json();
  };

  const promptScores: MinerScore[][] = await Promise.all(uids.map(fetchScores));

  return <ScoreChart scores={promptScores} />
}