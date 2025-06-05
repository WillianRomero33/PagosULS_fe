import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export async function GetUser(){
    const res = await axios.get(BASE_URL+"auth")
    console.log(res.data)
    return res.data
}

export async function GetSelectedStudent(carnet: string){
    const res = await axios.get(BASE_URL+"students/"+carnet)
    return res.data
}

// Obtiene los pagos pendientes y pagados de un estudiante
// id: id del estudiante
export async function GetFees(id: string){
    const res = await axios.get(BASE_URL+"fees/"+id)
    console.log(res.data)
    return res.data
}

// Obtiene los semestres
export async function GetSemesters(){
    const res = await axios.get(BASE_URL+"semesters")
    return res.data
}

// Obtiene los semestres
export async function DoPayment(paymentDetails: []){
    const res = await axios.post(BASE_URL+"payments", {paymentDetails})
    return res.data
}
