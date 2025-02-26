import dynamic from "next/dynamic";
import Link from "next/link";
const PromptScoreChart = dynamic(() => import('./chart'), { ssr: false })

export default async function MinerPage({ params }: { params: { uid: string } }) {
  const currentDate = new Date().toISOString().split('T')[0];
  const beforeDate = new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0];

  const res = await fetch(`https://synth.mode.network/validation/scores/historical?from=${beforeDate}&to=${currentDate}&miner_uid=${params.uid}`)

  const prompt_scores = await res.json();

  return <div className="px-20 py-20 text-black">
    <Link className="text-white" href="/">Back</Link>
    <h2 className="text-white text-4xl mb-10 font-bold text-center">UID: {params.uid}</h2>
    <PromptScoreChart scores={prompt_scores} />
  </div>
}