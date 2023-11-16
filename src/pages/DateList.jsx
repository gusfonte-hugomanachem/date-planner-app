import axios from "axios"
import { useEffect, useState } from "react"

function DateList () {
    
    const [dateList, setDateList] = useState({})

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/dates`)
        .then((response) => {
            setDateList(response.data)
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    
    return (
        <>
        <h1>Date List</h1>

        {dateList.map((date) => {
            return (
                <p>{date.title}</p>
            )
        })}
        </>
    )
}
export default DateList
