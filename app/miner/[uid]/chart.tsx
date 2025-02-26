'use client'

import Chart from 'react-apexcharts'

export interface MinerScore {
  miner_uid: number,
  prompt_score: number,
  scored_time: string
}

export default function PromptScoreChart({ scores }: { scores: MinerScore[] }) {
  const data = {
    series: [{
      name: 'UID-' + scores[0].miner_uid,
      data: scores.map((item) => item.prompt_score)
    }],
    options: {
      chart: {
        id: 'miner-score-graph'
      },
      xaxis: {
        categories: scores.map((item) => new Date(item.scored_time).toLocaleTimeString())
      }
    }
  }

  return <Chart options={data.options} series={data.series} type="line" height={450} />
}