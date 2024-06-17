import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import ReadAndShowFileContent from "./components/ReadAndShowFileContent";
import BudgetRequest from "./components/BudgetRequest/BudgetRequest";

function App() {
  return (
    <div className="w-full">
      <BudgetRequest />
      {/* <ReadAndShowFileContent /> */}
    </div>
  );
}

export default App;
