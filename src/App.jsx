import React, { useEffect, useState, useRef } from "react";
import { regSw, subscribe } from "./helper";

const App = () => {
  useEffect(() => {
    async function registerAndSubscribe() {
      try {
        const serviceWorkerReg = await regSw();
        if (serviceWorkerReg) {
          await subscribe(serviceWorkerReg);
        }
      } catch (error) {
        console.error(
          "Error during service worker registration and subscription:",
          error
        );
      }
    }

    registerAndSubscribe();
  }, []);
  return (
    <div className="p-2 bg-red-800 text-white z-50">
      <button>Service worker</button>
    </div>
  );
};

export default App;
