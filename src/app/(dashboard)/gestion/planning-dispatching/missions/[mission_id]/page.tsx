import { getSelectedMission } from '@/features/missions/actions'
import MissionDisplaySection from '@/features/missions/components/MissionDisplaySection'
import React from 'react'

type Props = {}

const page = async ({ params }: { params: Promise<{ mission_id: string }> }) => {
    const { mission_id } = await params
    const mission = await getSelectedMission(mission_id)
    return (
        <div><MissionDisplaySection mission={mission} /></div>
    )
}

export default page