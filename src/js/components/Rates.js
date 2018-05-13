import React from 'react'

const Rates = ({ rates }) => {
  if (!rates.map) return <p>Fetching data...</p>
  return (
    <div>
      {rates.map(val => (
        <p key={val.date}>
          {val.rate} - {val.date}
        </p>
      ))}
    </div>
  )
}

export default Rates
