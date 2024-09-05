import axios from "axios";
let url = "test.com";
async function regSw() {
  if ("serviceWorker" in navigator) {
    // let url = "http://localhost:5173" + '/service-worker.js';
    // const reg = await navigator.serviceWorker.register(url, { scope: '/' });
    const reg = await navigator.serviceWorker.register("/service-worker.js");
    console.log("service config is", { reg });
    return reg;
  }
  throw Error("serviceworker not supported");
}

async function subscribe(serviceWorkerReg) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription();
  if (subscription === null) {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw Error("Permission not granted for Notification");
    }
    subscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: "12345",
    });

    const payload = {
      subscription,
      user_id: "666338b4138b22cb860e3bdb",
    };
    const response = await axios.post(url, payload);

    return response;
  }
}
export { regSw, subscribe };
