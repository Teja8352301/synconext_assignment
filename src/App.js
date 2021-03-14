import React, { useState } from "react";
import { Main } from "./container/Main/Main";
function App() {
  const [selectedDate, handleDateChange] = useState(new Date());
  return <Main />;
}

export default App;
