import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from './context/ThemeContext'
import TripDashboardPage from './pages/TripDashboardPage'
import ItineraryPlannerPage from './pages/ItineraryPlannerPage'
import Header from './components/layout/Header'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="tripsync-theme">
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-background via-travel-50/30 to-travel-100/20">
          <Header />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<TripDashboardPage />} />
              <Route path="/itinerary" element={<ItineraryPlannerPage />} />
            </Routes>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="mt-16"
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;