"use client"
import { fetcher } from '@/utils/fetcher'
import Link from 'next/link'
import React, { useState } from 'react'
import useSWR from 'swr'

const Score = () => {
    const [miners] = useState(process.env.NEXT_PUBLIC_MINERS?.split(",").map((miner: string) => parseInt(miner.trim(), 10)).filter((miner: number) => !isNaN(miner)))
    const { data, error, isLoading } = useSWR('https://synth.mode.network/validation/scores/latest', fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 2000
    })
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading data</div>
    if (data) {
        const scoreSortedData = data.sort((a: any, b: any) => b.prompt_score - a.prompt_score)
        const addedGradeScore = scoreSortedData.map((item: any, index: number) => ({
            ...item,
            grade: index + 1,
        }))

        const filteredData = addedGradeScore.filter((item: any) =>
            miners?.includes(item.miner_uid)
        );

        if (window) {
            (window as any).my_miner_top_score_uid = filteredData[0]?.miner_uid;
            (window as any).my_miner_top_score_grade = filteredData[0]?.grade;
            (window as any).my_miner_top_score = filteredData[0]?.prompt_score;

            let grade = 0, score = 0;
            for (let i = 0; i < filteredData.length; i++) {
                grade += filteredData[i].grade;
                score += filteredData[i].prompt_score;
            }
            (window as any).my_avg_score = score / filteredData.length;
            (window as any).my_avg_score_grade = grade / filteredData.length;
        }

        const top = {
            SNID: 50,
            UID: addedGradeScore[0].miner_uid,
            Score: addedGradeScore[0].prompt_score,
            Grade: addedGradeScore[0].grade,
        }
        return (
            <div className='w-fit p-10 border border-white rounded-2xl'>
                <div className='flex flex-col gap-5'>
                    <div className='text-2xl font-bold text-center'>
                        <Link className='underline' href={`/score`}>Score</Link></div>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr>
                                <th className='py-2'>UID</th>
                                <th className='py-2'>Score</th>
                                <th className='py-2'>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-red-500'>
                                <td className='text-center'><Link className='underline' href={`/miner/${top.UID}`}>
                                    {top.UID}
                                </Link></td>
                                <td className='text-center px-10'>{Number(top.Score).toFixed(8)}</td>
                                <td className='text-center'>{top.Grade}</td>
                            </tr>
                            {
                                filteredData.map((item: any) =>
                                    <tr>
                                        <td className='text-center transition-all duration-300 cursor-pointer'>
                                            <Link className='underline' href={`/miner/${item.miner_uid}`}>
                                                {item.miner_uid}
                                            </Link></td>
                                        <td className='text-center'>{Number(item.prompt_score).toFixed(8)}</td>
                                        <td className='text-center'>{item.grade}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Score