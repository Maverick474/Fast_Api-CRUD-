import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
    const [data, setData] = useState([])

    useEffect(()=>{
        fetchData()
    }, [])

    const fetchData = async() => {
        const response = await axios.get('http://localhost:8000/api/todo')
        setData(response.data)
    }
  return (
    <div className='min-h-screen'>
      {data.map((data)=>(
        <div className='border mx-3 p-4 my-5 w-2/3 rounded-md bg-indigo-200 text-black font-bold'>
            <p>{data.title} </p>
            <p>{data.description} </p>
        </div>
      ))}
    </div>
  )
}

export default Home
