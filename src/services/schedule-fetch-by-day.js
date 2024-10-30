import dayjs from "dayjs"
import { apiConfig } from "./api-config"

export async function scheduleFetchByDay({ date }) {
  try {
    // faz a requisição
    const response = await fetch(`${apiConfig.baseURL}/schedules`)

    //convente para JSON
    const data = await response.json()

    // filtra os agentamentos pelo dia selecionado
    const dailySchedules = data.filter((schedule) =>
      dayjs(date).isSame(schedule.when, "day"))

    return dailySchedules
  } catch (error) {
    alert("Não foi possível buscar os agendamentos do dia selecionado.")
    console.log(error)
  }
}