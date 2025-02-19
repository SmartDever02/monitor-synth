"use client"
import { fetcher } from '@/utils/fetcher'
import React, { useState } from 'react'
import useSWR from 'swr'

const Score = () => {
    const [miners] = useState(process.env.NEXT_PUBLIC_MINERS?.split(",").map((miner: string) => parseInt(miner.trim(), 10)).filter((miner: number) => !isNaN(miner)))
    const { data, error, isLoading } = useSWR('https://synth.mode.network/validation/scores/latest', fetcher)
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
        const top = {
            SNID: 50,
            UID: addedGradeScore[0].miner_uid,
            Score: addedGradeScore[0].prompt_score,
            Grade: addedGradeScore[0].grade,
        }
        return (
            <div className='w-fit p-10 border border-white rounded-2xl'>
                <div className='flex flex-col gap-5'>
                    <div className='text-2xl font-bold text-center'>Score</div>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr>
                                <th className='py-2'>UID</th>
                                <th className='py-2'>Score</th>
                                <th className='py-2'>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-center'>{top.UID}</td>
                                <td className='text-center px-10'>{top.Score}</td>
                                <td className='text-center'>{top.Grade}</td>
                            </tr>
                            {
                                filteredData.map((item: any) => 
                                    <tr>
                                        <td className='text-center blur-sm hover:blur-0 transition-all duration-300 cursor-pointer'>{item.miner_uid}</td>
                                        <td className='text-center'>{item.prompt_score}</td>
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