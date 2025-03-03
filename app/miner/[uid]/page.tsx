import dynamic from "next/dynamic";
import Link from "next/link";
import { format, addDays, subDays } from 'date-fns';

const PromptScoreChart = dynamic(() => import('./chart'), { ssr: false })

export default async function MinerPage({ params }: { params: { uid: string } }) {
  const currentDate = format(addDays(new Date(), 1), 'yyyy-MM-dd');
  const beforeDate = format(subDays(new Date(), 2), 'yyyy-MM-dd');

  console.log("currentDate: ", currentDate)

  const res = await fetch(`https://synth.mode.network/validation/scores/historical?from=${beforeDate}&to=${currentDate}&miner_uid=${params.uid}`, {
    cache: "no-cache"
  })

  const prompt_scores = await res.json();

  return <div className="px-20 py-20 text-black">
    <Link className="text-white" href="/">Back</Link>
    <h2 className="text-white text-4xl mb-10 font-bold text-center">UID: {params.uid}</h2>
    <PromptScoreChart scores={prompt_scores} />
  </div>
}