import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const entityName = "Municipalidad de Luque";
const itemsPerPage = 15;
const wb = XLSX.utils.book_new();

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_URL_FOR_TOKEN_REQUEST,
      {
        client_id: import.meta.env.VITE_COSTUMER_KEY,
        client_secret: import.meta.env.VITE_COSTUMER_SECRET,
        grant_type: "client_credentials",
        request_token: import.meta.env.VITE_REQUEST_TOKEN,
      }
    );
    console.log(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

const getExtraAmount = (amendments) => {
  let totalAmount = 0;
  amendments.forEach((amendment) => {
    if (amendment.description === "Ampliación de Monto") {
      totalAmount += amendment.amendsAmount.amount;
    }
  });
  return totalAmount;
};

const getFullDataById = async (id, access_token) => {
  try {
    const response = await axios.get(
      `https://www.contrataciones.gov.py/datos/api/v3/doc/ocds/releases/id/${id}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { awards, tender, contracts } = response.data.releases[0];
    const amendments = contracts ? contracts[0].amendments : null;

    return {
      "ID de llamado": id,
      "Empresa Contratista": awards ? awards[0].suppliers[0].name : "NO APLICA",
      "Monto de contrato": awards ? awards[0].value.amount : 0,
      "Monto de adenda ampliatoria": amendments
        ? getExtraAmount(amendments)
        : 0,
      "Tipo de procedimiento": tender
        ? tender.procurementMethodDetails
        : "NO DISPONIBLE",
      Descripción: tender ? tender.title : "SIN DESCRIPCIÓN",
      "Fecha de apertura": tender
        ? new Date(tender.bidOpening.date).toLocaleDateString()
        : "SIN FECHA",
      "Fecha de firma de contrato": contracts
        ? new Date(contracts[0].dateSigned).toLocaleDateString()
        : "SIN FECHA",
    };
  } catch (error) {
    console.error(`Error fetching full data for ID ${id}:`, error);
    return null;
  }
};

const ContractsDNCP = () => {
  const [data, setData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const refreshToken = async () => {
      const newToken = await getAccessToken();
      setAccessToken(newToken);
    };

    // Get initial token
    refreshToken();

    // Set interval to refresh token every 14 minutes
    const interval = setInterval(refreshToken, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (!accessToken || loading) return;
      setLoading(true);

      let pageNumber = 1;
      let totalResponse = 1;

      while (pageNumber <= totalResponse) {
        try {
          const response = await axios.get(
            `https://www.contrataciones.gov.py/datos/api/v3/doc/search/processes?page=${pageNumber}&items_per_page=${itemsPerPage}&tender.procuringEntity.name=${entityName}&planning.budget.budgetBreakdown.classifications.anio=2022`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          totalResponse = response.data.pagination.total_pages;

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
                return await getFullDataById(id, accessToken);
              } else {
                return null;
              }
            })
          );

          const filteredData = dataForExcel.filter((item) => item !== null);
          setData((prevData) =>
            prevData ? [...prevData, ...filteredData] : filteredData
          );

          const ws = XLSX.utils.json_to_sheet(filteredData);
          XLSX.utils.book_append_sheet(wb, ws, `PAGE ${pageNumber}`);

          console.log(filteredData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        pageNumber += 1;

        // Delay next page request to respect rate limit
        await new Promise((resolve) => setTimeout(resolve, 4000)); // 15 requests/min -> 4000 ms/request
      }

      XLSX.writeFile(wb, "first.xlsx");
      setLoading(false);
    };

    getData();
  }, [accessToken]);

  return <div>{data ? <h1>DATA LOADED</h1> : <h1>NO DATA</h1>}</div>;
};

export default ContractsDNCP;
