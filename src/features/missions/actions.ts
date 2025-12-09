"use server";

export const getSelectedMission = async (missionID: string) => {
	const response = await fetch(
		`http://127.0.0.1:3000/api/missions/${missionID}`
	);

	return (await response.json()).result[0];
};
