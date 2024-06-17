import React from "react";
import {
  Page,
  Text,
  Font,
  View,
  Document,
  Image,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

const currentDate = new Date();

const formattedDate = formatDate(currentDate);
Font.register({ family: "PTSans", src: "/fonts/PTSans-Regular.ttf" });
Font.register({ family: "PTSans-Bold", src: "/fonts/PTSans-Bold.ttf" });

//Create styles

const styles = StyleSheet.create({
  page: {
    // backgroundColor: "#E4E4E4",
    paddingTop: 15,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },

  header: {
    display: "flex",
    alignContent: "center",
    flexDirection: "column",
    // marginLeft: "15px",
    borderBottom: "1.1px solid black",
  },

  footer: {
    position: "absolute",
    display: "flex",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    // marginLeft: "15px",
    borderTop: "1.1px solid black",
    bottom: 30,
    left: 35,
    right: 35,
  },

  headerTitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  section: {
    width: "100%",
    height: "100%",
    margin: 10,
    padding: 10,
    flexDirection: "column",
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "15%",
    transform: "translate(-50%, -50%)",
    opacity: 0.2,
    width: "100%",
    height: "20%",
    // paddingLeft: "15px",
  },

  text: {
    // margin: 15,
    fontSize: 11,
    textAlign: "justify",
    fontFamily: "PTSans",
  },

  headerTextContainer: {},

  headerText: {
    width: "80px",
    marginTop: "7px",
    marginLeft: "5px",
    fontSize: 10,
    textAlign: "left",
    textTransform: "uppercase",
    lineHeight: 1.5,
    fontFamily: "PTSans-Bold",
    marginBottom: "0px",
    borderBottom: "1px solid black",
  },

  missionText: {
    marginTop: "5px",
    fontSize: 7.5,
    textAlign: "justify",
    fontFamily: "PTSans",
    marginBottom: "5px",
  },

  visionText: {
    marginTop: "5px",
    fontSize: 7.5,
    textAlign: "justify",
    fontFamily: "PTSans",
    width: "80%",
  },
  logoMuni: {
    width: "1.39cm",
    height: "1.64cm",
  },
  logoLuqueDiferente: {
    marginTop: "5px",
    width: "3.14cm",
    height: "1.33cm",
    marginLeft: "120px",
  },

  logoObras: {
    marginTop: "5px",
    width: "3.99cm",
    height: "1.14cm",
    marginLeft: "440px",
  },

  bold: {
    fontFamily: "PTSans-Bold",
    // marginLeft: "15px",
    fontSize: 10,
  },

  normal: {
    fontFamily: "PTSans",
    // marginLeft: "15px",
    fontSize: 10,
  },

  normalRight: {
    fontFamily: "PTSans",
    // marginLeft: "15px",
    fontSize: 10,

    textAlign: "right",
  },

  indentedSpace: {
    color: "transparent",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 9,
    bottom: -15,
    left: 30,
    right: 30,
    textAlign: "right",
    color: "black",
    fontFamily: "PTSans-Bold",
  },
});

const wt = "/OBRAS.png";
const logoMuni = "/images/MUNI.jpg";
const logoLuqueDiferente = "/images/luque_diferente.png";
const logoFonacide = "/images/FONACIDE.png";
const logoObras = "/images/OBRAS.png";

//Create component

const BudgetRequest = () => {
  return (
    <PDFViewer style={{ width: "100%", height: "100%" }} height={"100%"}>
      <Document>
        <Page size="FOLIO" style={styles.page}>
          <View style={styles.header} fixed>
            <View style={styles.headerTitle}>
              <Image src={logoMuni} style={styles.logoMuni} />
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>
                  Dirección de Obras Públicas
                </Text>
              </View>
              <Image
                src={logoLuqueDiferente}
                style={styles.logoLuqueDiferente}
              />
              <Image src={logoFonacide} style={styles.logoLuqueDiferente} />
            </View>
            <View>
              <Text style={styles.missionText}>
                <Text style={{ fontFamily: "PTSans-Bold", fontSize: "8px" }}>
                  MISIÓN:{" "}
                </Text>{" "}
                Brindar servicios de calidad con equilibrio entre el desarrollo
                humano, económico, social, cultural y ambiental, con servidores
                públicos altamente competitivos, aplicando innovación constante
                para promover el desarrollo integral y sostenible de los
                habitantes, fortaleciendo la identidad comunitaria a través de
                una gestión inclusiva, eficiente, transparente y participativa,
                con respeto al medio ambiente.-
              </Text>
            </View>
          </View>
          <Image src={wt} style={styles.watermark} fixed />

          <Text style={styles.normalRight}> </Text>
          <Text style={styles.normalRight}> </Text>

          <Text style={styles.normalRight}>
            Luque, 21 de Febrero del 2024. -
          </Text>

          <Text style={styles.normalRight}> </Text>

          <Text style={styles.bold}>SEÑORES</Text>
          <Text style={styles.bold}>LBB CONSTRUCCIONES</Text>
          <Text style={styles.normal}>Empresa Contratista</Text>
          <Text style={styles.bold}>PRESENTE</Text>
          <Text style={styles.text}>
            <Text style={styles.indentedSpace}>{"______"}</Text>
            Por la presente, la{" "}
            <Text style={{ fontFamily: "PTSans-Bold" }}>
              DIRECCIÓN DE OBRAS PÚBLICAS
            </Text>{" "}
            de la{" "}
            <Text style={{ fontFamily: "PTSans-Bold" }}>
              MUNICIPALIDAD DE LUQUE
            </Text>{" "}
            se dirige a ustedes en su carácter de administrador del{" "}
            <Text style={{ fontFamily: "PTSans-Bold" }}>
              CONTRATO DE OBRA Nro.
            </Text>{" "}
          </Text>

          <View style={styles.footer} fixed>
            <View>
              <Text style={styles.visionText}>
                <Text style={{ fontFamily: "PTSans-Bold", fontSize: "8px" }}>
                  VISIÓN:{" "}
                </Text>{" "}
                Entidad reconocida por la sociedad como Institución modelo de
                desarrollo local, a través de la innovación constante de sus
                procesos, productos y servicios y la promoción de la cultura de
                la participación de los ciudadanos, preservando su identidad y
                patrimonio cultural, con servidores públicos competentes y
                comprometidos.{" "}
                <Text style={{ fontFamily: "PTSans-Bold", fontSize: "8px" }}>
                  |Dirección:{" "}
                </Text>{" "}
                Avda. Guillermo Leoz esq. Pasaje Santa Catalina 2060 Luque{" "}
                <Text style={{ fontFamily: "PTSans-Bold", fontSize: "8px" }}>
                  |Tel.:{" "}
                </Text>{" "}
                (+595) 21 642-215,{" "}
                <Text style={{ fontFamily: "PTSans-Bold", fontSize: "8px" }}>
                  Interno:{" "}
                </Text>{" "}
                116{" "}
                <Text style={{ fontFamily: "PTSans-Bold", fontSize: "8px" }}>
                  | Web:{" "}
                </Text>{" "}
                www.luque.gov.py{" "}
                <Text style={{ fontFamily: "PTSans-Bold", fontSize: "8px" }}>
                  |{" "}
                </Text>{" "}
                municipalidad@luque.com.py{" "}
                <Text style={{ fontFamily: "PTSans-Bold", fontSize: "8px" }}>
                  |{" "}
                </Text>
              </Text>
            </View>
            <Image src={logoObras} style={styles.logoObras} />
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `PÁGINA ${pageNumber} de ${totalPages} | FECHA: ${formattedDate}`
              }
              fixed
            />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default BudgetRequest;
