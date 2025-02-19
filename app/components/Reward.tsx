'use client'
import React, { useState } from 'react'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'

const Reward = () => {
    const [miners] = useState(process.env.NEXT_PUBLIC_MINERS?.split(",").map((miner: string) => parseInt(miner.trim(), 10)).filter((miner: number) => !isNaN(miner)))
    const { data, error, isLoading } = useSWR('/api/getRewards', fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 5000
    })
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading data</div>
    if (data) {
        const sortedData = data.sort((a: any, b: any) => b.incentive - a.incentive)
        const addedGrade = sortedData.map((item: any, index: number) => ({
            ...item,
            grade: index + 1,
        }))
        const filteredData = addedGrade.filter((item: any) =>
            miners?.includes(item.uid)
        );
        const Result = filteredData.map((item: any) => ({
            Grade: item.grade,
            UID: item.uid,
            Stake: item.stake,
            Incentive: item.incentive,
            Performance: item.minerPerformance,
            daily: item.taoPerDay,
            Score: item.score,
        }));
        const total_stake = filteredData.reduce((acc: number, item: any) => acc + item.stake, 0);
        const total_daily = filteredData.reduce((acc: number, item: any) => acc + item.taoPerDay, 0);
        return (
            <div className='w-full p-10 border border-white rounded-2xl'>
                <div className='flex flex-col gap-5'>
                    <div className='text-2xl font-bold text-center'>Rewards</div>
                    <table>
                        <thead>
                            <tr>
                                <th className='py-2'>UID</th>
                                <th className='py-2'>Grade</th>
                                <th className='py-2'>Stake</th>
                                <th className='py-2'>Incentive</th>
                                <th className='py-2'>Performance</th>
                                <th className='py-2'>Daily</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Result.map((item: any) => (
                                    <tr key={item.UID}>
                                        <td className='text-center blur-sm hover:blur-0 transition-all duration-300 cursor-pointer'>{item.UID}</td>
                                        <td className='text-center'>{item.Grade}</td>
                                        <td className='text-center'>{item.Stake}</td>
                                        <td className='text-center'>{item.Incentive}</td>
                                        <td className='text-center'>{item.Performance}</td>
                                        <td className='text-start'>{item.daily}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className='flex flex-col gap-2 mt-4 justify-center items-center'>
                        <span>Total Daily: {total_daily}</span>
                        <span>Total Stake: {total_stake}</span>
                    </div>
                </div>
            </div>
        )
    }

}

export default Reward