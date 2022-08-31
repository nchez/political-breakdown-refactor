import { useEffect, useState } from 'react'
import PriceTxnChart from '../components/PriceTxnChart'

const axios = require('axios')

export default function Home() {
  const [topStocks, setTopStocks] = useState([])
  // might not need these states below
  const [txns, setTxns] = useState([])
  const [prices, setPrices] = useState([])

  useEffect(() => {
    let active = true
    const PORT = process.env.PORT || 3001
    const url = `http://localhost:${PORT}/`
    const fetchData = async () => {
      const response = await axios.get(url)
      const formattedRes = response.data
      if (active) {
        setTopStocks(formattedRes)
        // console.log(formattedRes)
      }
    }
    fetchData()
    console.log('effect triggered')
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <h2>HOME</h2>
    </>
  )
}
