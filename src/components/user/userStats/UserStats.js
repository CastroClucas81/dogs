import React from "react";
import Head from "../../helper/Head";
import useFetch from "../../../hooks/useFetch";
import { GET_STATS } from "../../../api";
import Loading from "../../helper/loading/Loading";
import Error from "../../helper/Error";
//utilizado pra evitar que essa biblioteca seja carregada sempre
const UserStatsGraphs = React.lazy(() => import('../userStatsGraphs/UserStatsGraphs'));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = GET_STATS();
      await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else return null;
};

export default UserStats;
