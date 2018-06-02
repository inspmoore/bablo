import React from 'react'

const Rates = ({ rates }) => {
  if (!rates.map) return <p>Fetching data...</p>
  return (
    <div>
      {rates.map(val => (
        <p key={val.date}>
          {Number(val.rate).toFixed(2)} - {val.date}
        </p>
      ))}
    </div>
  )
}

export default Rates
