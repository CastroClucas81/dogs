import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import User from "./components/user/User";
import { UserStorage } from "./UserContext";
import ProtectedRouter from "./components/helper/ProtectedRouter";
import Photo from "./components/photo/Photo";
import UserProfile from "./components/user/userProfile/UserProfile";
import NotFound from "./components/notFound/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/*tudo q eu colocar no userstorage os componentes internos 
          terão acesso */}
        <UserStorage>
          <Header />
          <main className="AppBody">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <ProtectedRouter path="conta/*" element={<User />} />
              <Route path="foto/:id" element={<Photo />} />
              <Route path="perfil/:user" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
