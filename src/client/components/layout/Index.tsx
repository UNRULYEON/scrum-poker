import React from 'react'

import './Layout.css'

const Layout = (props: React.PropsWithChildren<{}>): JSX.Element => {
  const { children } = props
  
  return (
    <div id="layout">
      {children}
    </div>
  )
}

export default Layout