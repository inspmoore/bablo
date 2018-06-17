import React from 'react'
import PropTypes from 'prop-types'

const Hrywna = ({ uah }) => {
  return <p>{uah}</p>
}

Hrywna.propTypes = {
  uah: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Hrywna
