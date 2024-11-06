import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Images from './Images'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Images />
  </StrictMode>,
)
