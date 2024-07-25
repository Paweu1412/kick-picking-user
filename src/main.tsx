import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { NextUIProvider } from "@nextui-org/react";
import General from './General/General'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <General />
  </NextUIProvider>,
)
