import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Header } from './header'
import { Konfig } from './pages/konfig'
import { Manu } from './pages/manu'
import { Drop } from './pages/drop'
import { Running } from './pages/running'
import { Results } from './pages/results'

const router = createBrowserRouter([{ "path": "/", "element": <Header />,
children: [
  { "path": "/", "element": <Home /> },
  { "path": "/konfig", "element": <Konfig /> },
  { "path": "/manu", "element": <Manu /> },
  { "path": "/drop", "element": <Drop /> },
  { "path": "/running", "element": <Running /> },
  { "path": "/results", "element": <Results /> },
] }])

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider></>
  )
}

export default App
