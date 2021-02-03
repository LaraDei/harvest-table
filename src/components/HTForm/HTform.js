import React from 'react'
import './HTform.css'


export default function Form(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['harvestTable-form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}
