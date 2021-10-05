import React from "react";
import { useParams } from "react-router";
import { PHOTO_ONE_GET } from "../../api";
import useFetch from "../../hooks/useFetch";
import Error from "../helper/Error";
import Head from "../helper/Head";
import Loading from "../helper/loading/Loading";
import PhotoContent from "./photoContent/PhotoContent";

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_ONE_GET(id);
    request(url, options);
  }, [request, id]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        <PhotoContent single={true} data={data} />
      </section>
    );
  else return null;
};

export default Photo;
