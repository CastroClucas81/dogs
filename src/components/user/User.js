import React from "react";
import UserHeader from "./userHeader/UserHeader";
import Feed from "../feed/Feed";
import { Routes, Route } from "react-router-dom";
import UserPhotoPost from "./userPhotoPost/UserPhotoPost";
import UserStats from "./userStats/UserStats";
import { UserContext } from "../../UserContext";
import NotFound from "../notFound/NotFound";
import Head from "../helper/Head";

const User = () => {
  const { data } = React.useContext(UserContext);

  return (
    <section className="container">
      <Head title="Minha conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
