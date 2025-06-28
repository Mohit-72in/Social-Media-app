import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PostListProvider from './store/post-list-store';
import { useState } from 'react';
import './App.css'; // ✅ your CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap (if used)


function App() {
  const [selectedTab, setSelectedTab] = useState('Home');

  return (
    <BrowserRouter basename="/Social-Media-app">
      <PostListProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <div className="app-container">
                <Sidebar
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
                <div className="content">
                  <Header />
                  {selectedTab === 'Home' ? <PostList /> : <CreatePost />}
                  <Footer />
                </div>
              </div>
            }
          />
        </Routes>
      </PostListProvider>
    </BrowserRouter>
  );
}

export default App;
