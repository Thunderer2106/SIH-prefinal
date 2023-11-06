import axios from 'axios'

const API_URL='http://localhost:5000/api/ticket/'

const setTicket=async(ticketData,token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    console.log(ticketData[0]);
    


    const response = await axios.post(API_URL+'set',ticketData,config)
    return response.data


}

const getUserTickets=async(token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL+'getuser', config)
    return response.data
}

const getDeptTickets=async(token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL+'getdept', config)
    return response.data
}

const updateTicket=async(ticketid,token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL+ticketid, config)
    return response.data

}


const ticketService={
    setTicket,
    getUserTickets,
    getDeptTickets,
    updateTicket,
}

export default ticketService



