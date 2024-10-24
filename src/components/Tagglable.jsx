import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Tagglable = (props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <br />
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Tagglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node
}

Tagglable.defaultProps = {
  buttonLabel: 'Toggle'
}

export default Tagglable
