import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../context/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api.get("/me").then((response) => console.log(response));
  }, []);

  return (
    <>
      <h1>Dashboard:</h1>
      <h2>E-mail: {user?.email}</h2>
      <Can permissions={["metrics.list"]}>
        <h1>Métricas</h1>
      </Can>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/me");
  console.log(response.data);

  return {
    props: {},
  };
});
