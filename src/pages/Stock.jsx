import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PriceTxnChart from '../components/PriceTxnChart'

const axios = require('axios')

export default function Stock() {
  const [stockTxns, setStockTxns] = useState([])
  const [stockPrices, setStockPrices] = useState([])

  const { symbol } = useParams()
  useEffect(() => {
    const PORT = process.env.PORT || 3001
    const url = `http://localhost:${PORT}/stocks/${symbol}`
    const fetchData = async () => {
      const response = await axios.get(url)
      const formattedRes = response.data
      setStockTxns(formattedRes.stockTxns)
      setStockPrices(formattedRes.stockPrices)
    }
    fetchData()
  }, [symbol])

  //   const createTxnDataPoints = () => {
  //     const txnChartData = { dates: [], txnData: [] }

  //   }

  return (
    <div>
      <h1>Hi this is {symbol}</h1>
      <PriceTxnChart prices={stockPrices} txns={stockTxns} />
    </div>
  )
}
