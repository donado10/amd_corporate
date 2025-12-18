import { getRessourceMission, getSelectedMission } from '@/features/missions/actions'
import MissionDisplaySection from '@/features/missions/components/MissionDisplaySection'
import React from 'react'

type Props = {}

const page = async ({ params }: { params: Promise<{ mission_id: string }> }) => {
    const { mission_id } = await params
    const mission = await getSelectedMission(mission_id)

    console.log(mission)
    const ressources = await getRessourceMission(mission.miss_addons?.driver ?? "", mission.miss_addons?.car ?? "")

    return (
        <div><MissionDisplaySection mission={mission} ressources={ressources} /></div>
    )
}

export default page