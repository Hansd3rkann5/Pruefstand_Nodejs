import './App.css'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Header } from './header'
import { Konfig } from './pages/konfig'
import { Manu } from './pages/manu'
import { Drop } from './pages/drop'
import { Running } from './pages/running'
import { Results } from './pages/results'
import { Show_Konfig } from './pages/show_konfig'
import { DeviceContextProvider } from './hooks/deviceContextProvider'
//import { Odds } from './pages/odds'

const router = createHashRouter([{
  "path": "/", "element": <Header />,
  children: [
    { "path": "/", "element": <Home /> },
    { "path": "/konfig", "element": <Konfig /> },
    { "path": "/manu", "element": <Manu /> },
    { "path": "/drop", "element": <Drop /> },
    { "path": "/running", "element": <Running /> },
    { "path": "/results", "element": <Results /> },
    { "path": "/show_konfig", "element": <Show_Konfig /> },
    //{ "path": "/odds", "element": <Odds /> },
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
