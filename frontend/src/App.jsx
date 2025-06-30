// import libraries
import { Routes, Route} from "react-router-dom"
import { useState } from "react"

//import pages
import LandingPage from './pages/LandingPage'
import HomePage from "./pages/HomePage"
import PersonalNotePage from "./pages/PersonalNotePage"
import GroupNotePage from "./pages/GroupNotePage"
import SettingsPage from "./pages/SettingsPage"
import UserProfilePage from "./pages/UserProfilePage"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main>
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}/>
      <Sidebar isOpen={sidebarOpen}/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<HomePage/>}>
          <Route path="/home/personalnote" element={<PersonalNotePage/>}/>
          <Route path="/home/groupnote" element={<GroupNotePage/>}/>
        </Route>
        <Route path="/userprofile" element={<UserProfilePage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
      </Routes>

    </main>
  )
}

export default App
