import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// data atual para formatar o input
const inputTotal = dayjs(new Date()).format("YYYY-MM-DD")

// carrega a data atual e define como data
selectedDate.value = inputTotal
selectedDate.min = inputTotal

form.onsubmit = async (event) => {
  // previne o comportamento padrão de carregar a página
  event.preventDefault()

  try {
    // recuperando o nome do cliente
    const name = clientName.value.trim()

    if (!name) {
      return alert("Necessário informar o nome!")
    }

    // recupera o horário selecionado
    const hourSelected = document.querySelector(".hour-selected")
    
    // verifica se o horário foi add
    if (!hourSelected) {
      return alert("Selecione a hora.")
    }

    // recupera somente a hora
    const [hour] = hourSelected.innerText.split(":")

    // insere a hora na data
    const when = dayjs(selectedDate.value).add(hour, "hour")
    
    // gera um id
    const id = new Date().getTime()

    // faz o agendamento
    await scheduleNew({
      id,
      name,
      when,
    })

    // recarrega o agentamento
    await schedulesDay()

    // limpa o input de nome do cliente
    clientName.value = ""
    
  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }
}