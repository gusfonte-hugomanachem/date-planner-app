import axios from "axios"
import { useEffect, useState } from "react"

function DateList () {
    
    const [dateList, setDateList] = useState({})

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/dates`)
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    })
    
    return (
        <>
        <h1>DATE LIST</h1>
        </>
    )
}
export default DateList
