import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import Reminder from "./component/ReminderManagement/Reminder";
import Header from "./component/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Reminder />
      </div>
    </div>
  );
}

export default App;
