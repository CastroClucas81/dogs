import React from "react";
import { PHOTO_GET } from "../../../api";
import useFetch from "../../../hooks/useFetch";
import Error from "../../helper/Error";
import Loading from "../../helper/loading/Loading";
import PhotoContent from "../../photo/photoContent/PhotoContent";

import styles from "./styles.module.css";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  //fechar modal
  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) setModalPhoto(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
