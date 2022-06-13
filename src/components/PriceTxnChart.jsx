import { useState } from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js'
import { useEffect } from 'react'
import { Chart } from 'react-chartjs-2'
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
)

export default function PriceTxnChart({ prices, txns }) {
  const [txnCount, setTxnCount] = useState([])
  const [bubbleData, setBubbleData] = useState([])
  const closePricesArr = prices.map((element) => {
    return element.close
  })

  const allDates = prices.map((element) => {
    return element.date
  })
  const labels = allDates.map((element) => {
    return element.slice(0, 10)
  })

  useEffect(() => {
    let temp = []
    for (let i = 0; i < labels.length; i++) {
      const dayFilter = txns.filter(
        (priceObj) =>
          priceObj.transactionDate.slice(0, 10) === labels[i].slice(0, 10)
      )
      temp.push(dayFilter.length)
    }
    const bubbleData = labels.map((element, idx) => {
      return { x: element, y: closePricesArr[idx], r: temp[idx] * 3 }
    })
    setBubbleData(bubbleData)
    setTxnCount(temp)
  }, [txns, prices])

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Stock Price',
        borderColor: 'rgba(255,99,132, 0.6)',
        fill: false,
        data: closePricesArr,
        tension: 0.1,
        pointRadius: 0.5,
      },
      {
        type: 'bubble',
        borderColor: 'rgb(0,0,255)',
        label: '# of Congress Transactions',
        fill: false,
        data: bubbleData,
      },
    ],
  }

  return (
    <div>
      <h1>
        this is the chart with {prices.length} {txns.length}
      </h1>
      <Chart type="line" data={data} />
    </div>
  )
}
