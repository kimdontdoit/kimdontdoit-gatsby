import React from 'react'
import { Link } from 'gatsby'

import * as classes from './button.module.css'

const Button = (props) => {
  const { children, onClick, className = '', href } = props

  const passiveButton = (
    <button className={`${classes.btn} ${className}`}>{children}</button>)
  const clickableButton = (<button onClick={onClick}
                                   className={`${classes.btn} ${className}`}>
    {children}
  </button>)

  const htmlLink = (
    <a href={href} className={`${classes.btn} ${className}`}>
      {children}
    </a>
  )

  const gatsbyLink = (
    <Link to={href} className={`${classes.btn} ${className}`}>
      {children}
    </Link>
  )

  if (href) {
    if (href.startsWith('mailto:')) {
      return htmlLink
    }

    return gatsbyLink
  }

  if (onClick) return clickableButton

  return passiveButton
}

export default Button
