'use client'
import React from 'react'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
type Props = {
    miner: string
}

const ValidateItem = ({ miner }: Props) => {
    const { data, error, isLoading } = useSWR(`https://synth.mode.network/validation/miner?uid=${miner}`, fetcher)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading data</div>
    if (data) return <div className='flex flex-row gap-2 items-center text-sm'>
        <div className='rounded-full w-14 h-8 flex items-center justify-center blur-sm hover:blur-0 transition-all duration-300 bg-indigo-500 cursor-pointer'>{miner}</div>
        <div>{data.validated}</div>
        <div>{data.validated ? 'Nice' : data.reason}</div>
    </div>
}

export default ValidateItem