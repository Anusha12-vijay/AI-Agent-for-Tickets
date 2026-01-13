import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import CheckAuth from './components/check_auth.jsx'
import Tickets from './pages/tickets.jsx'
import TicketDetails from './pages/ticket.jsx'
import Signup from './pages/signup.jsx'
import Admin from './pages/admin.jsx'
import Login from './pages/login.jsx'
import Layout from "./components/Layout.jsx";
import ModeratorTickets from "./pages/moderator_tickets.jsx";
import Landing from './pages/Landing.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route
  path="/landing"
  element={
    <Landing />
  }
/>

      <Route
      path='/'
      element={
        <CheckAuth protectedRoute={true}>
          <Layout>
<Tickets />
          </Layout>
          

        </CheckAuth>
      }
      />
      
       <Route
      path='/tickets/:id'
      element={
        <CheckAuth protectedRoute={true}>
          <Layout>
<TicketDetails />
          </Layout>
          

        </CheckAuth>
      }
      />
       <Route
  path="/signup"
  element={
    <CheckAuth protectedRoute={false}>
      <Layout>
        <Signup />
      </Layout>
    </CheckAuth>
  }
/>

<Route
  path="/login"
  element={
    <CheckAuth protectedRoute={false}>
      <Layout>
        <Login />
      </Layout>
    </CheckAuth>
  }
/>

      
       <Route
      path='/admin'
      element={
        <CheckAuth protectedRoute={true}>
          <Layout>
            <Admin />
          </Layout>
          

        </CheckAuth>
      }
      />
      <Route
  path="/moderator/tickets"
  element={
    <CheckAuth protectedRoute={true}>
      <Layout>
        <ModeratorTickets />
      </Layout>
    </CheckAuth>
  }
/>

    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
