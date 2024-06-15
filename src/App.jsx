import ReadAndShowFileContent from "./components/ReadAndShowFileContent";
import { useEffect, useState } from "react";
import axios from "axios";

const entityName = "Municipalidad de Luque";
const pageNumber = 1;

const getAccessToken = async () => {
  const access_token = await axios
    .post(import.meta.env.VITE_URL_FOR_TOKEN_REQUEST, {
      request_token: import.meta.env.VITE_REQUEST_TOKEN,
    })
    .then(({ data }) => {
      console.log(data.access_token);
      return data.access_token;
    })
    .catch((error) => console.log(error));

  return access_token;
};

const getFullDataById = async (id, access_token) => {
  try {
    const response = await axios.get(
      `https://www.contrataciones.gov.py/datos/api/v3/doc/ocds/releases/id/${id}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `${access_token}`,
        },
      }
    );

    const { awards, tender } = response.data.releases[0];

    return {
      id,
      contract_amount: awards ? awards[0].value.amount : 0,
      contractor: awards ? awards[0].suppliers[0].name : "NO APLICA",
      description: tender ? tender.title : "SIN DESCRIPCIÓN",
    };
  } catch (error) {
    console.error(`Error fetching full data for ID ${id}:`, error);
    return null;
  }
};

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const access_token = await getAccessToken();
      if (!access_token) return;

      try {
        const response = await axios.get(
          `https://www.contrataciones.gov.py/datos/api/v3/doc/search/processes?page=${pageNumber}&items_per_page=150&tender.procuringEntity.name=${entityName}&planning.budget.budgetBreakdown.classifications.anio=2023`,
          {
            headers: {
              accept: "application/json",
              Authorization: `${access_token}`,
            },
          }
        );

        const { records } = response.data;
        const listOfProcidureIds = records.map((record) => {
          const pid = record.compiledRelease.planning
            ? record.compiledRelease.planning.identifier
            : null;
          return pid || "ND";
        });

        const dataForExcel = await Promise.all(
          listOfProcidureIds.map(async (id) => {
            if (id !== "ND") {
              return await getFullDataById(id, access_token);
            } else {
              return null;
            }
          })
        );

        setData(dataForExcel.filter((item) => item !== null));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      {data ? <h1>DATA LOADED</h1> : <h1>NO DATA</h1>}
      {/* Uncomment the next line if you want to use ReadAndShowFileContent */}
      {/* <ReadAndShowFileContent /> */}
    </div>
  );
}
export default App;
