'use client'

import Chart from 'react-apexcharts'

import { MinerScore } from "../miner/[uid]/chart";

export default async function ScoreChart({ scores }: { scores: MinerScore[][] }) {
  const data = {
    series: scores.map((minerItem) => ({
      name: 'UID-' + minerItem[0].miner_uid,
      data: minerItem.map((item) => item.prompt_score)
    })),
    options: {
      chart: {
        id: 'miner-score-graph'
      },
      xaxis: {
        categories: scores[0].map((item) => new Date(item.scored_time).toLocaleTimeString())
      }
    }
  }

  return <Chart options={data.options} series={data.series} type="line" height={450} />
}