
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomBook from './Component/RoomBook/roomBook';
import Login from './Component/Auth/Login';
import CurrentHistory from './Component/Status/CurrentHistory';
import BookedHistory from './Component/Status/BookedHistory';
import UsersList from './Component/Admin/RequestList/UsersList';
import Master from './Component/Admin/RequestList/Master';
import Dashboard from './Component/Admin/dashboard';
import ProtectedRoute from './Component/Users/security';
import UpdateProfile from './Component/Auth/updateProfile';
import UserProfileUpdate from './Component/Admin/updateUserprofile/userProfileUpdate';
import AvailableList from './Component/Admin/AvailableList/AvailableList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/roombook' element={<ProtectedRoute><RoomBook /></ProtectedRoute>} />
          <Route path='/current-request' element={<ProtectedRoute><CurrentHistory /></ProtectedRoute>} />
          <Route path='/booked-request' element={<ProtectedRoute><BookedHistory /></ProtectedRoute>} />
          {/* <Route path='/create-users' element={<ProtectedRoute><CreateUsers /></ProtectedRoute>} /> */}
          <Route path='/request-list' element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
          <Route path='/master' element={<ProtectedRoute><Master /></ProtectedRoute>} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/update_profile' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path='/user-profile-update' element={<ProtectedRoute><UserProfileUpdate /></ProtectedRoute>} />
          <Route path='/available-count' element={<ProtectedRoute><AvailableList /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

