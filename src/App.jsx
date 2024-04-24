import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Video from './pages/Video/Video';
import { useState } from 'react';
import Search from './pages/Search/Search';

function App() {
  const [sidebar, setSideBar] = useState(false);

  return (
    <div>
      <NavBar sidebar={sidebar} setSideBar={setSideBar} />
      <Routes>
        <Route
          path="/"
          element={<Home sidebar={sidebar} setSideBar={setSideBar} />}
        />
        <Route
          path="/video/:categoryId/:videoId"
          element={<Video sidebar={sidebar} setSideBar={setSideBar} />}
        />
        <Route
          path="search"
          element={<Search sidebar={sidebar} setSideBar={setSideBar} />}
        />
      </Routes>
    </div>
  );
}

export default App;
