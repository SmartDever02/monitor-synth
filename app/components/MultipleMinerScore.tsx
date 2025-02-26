import dynamic from "next/dynamic";
const ScoreChart = dynamic(() => import("./chart"), { ssr: false })

export interface MinerScore {
  miner_uid: number,
  prompt_score: number,
  scored_time: string
}

export default async function MultipleMinerScore({ uids }: { uids: Array<number | string> }) {
  const currentDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
  const beforeDate = new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0];

  const fetchScores = async (uid: number | string) => {
    const res = await fetch(`https://synth.mode.network/validation/scores/historical?from=${beforeDate}&to=${currentDate}&miner_uid=${uid}`);
    return res.json();
  };

  const promptScores: MinerScore[][] = await Promise.all(uids.map(fetchScores));

  return <ScoreChart scores={promptScores} />
}