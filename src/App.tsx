import './App.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { Header } from './header'
import { Home } from './pages/home'
import { Konfig_Manu } from './pages/konfig_manu'
import { Manu } from './pages/manu'
import { Drop } from './pages/konfig_drop'
import { Results } from './pages/results'
import { Show_Konfig } from './pages/show_konfig'
import { DeviceContextProvider } from './hooks/deviceContextProvider'
//import { Odds } from './pages/odds'

const router = createHashRouter([{
  "path": "/", "element": <Header />,
  children: [
    { "path": "/", "element": <Home /> },
    { "path": "/konfig_manu", "element": <Konfig_Manu /> },
    { "path": "/manu", "element": <Manu /> },
    { "path": "/konfig_drop", "element": <Drop /> },
    { "path": "/results", "element": <Results /> },
    { "path": "/show_konfig", "element": <Show_Konfig /> },
  ]
}])

function App() {

  return (
    <DeviceContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </DeviceContextProvider>
  )
}

export default App
