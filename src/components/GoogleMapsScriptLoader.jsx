import { useEffect, useState } from "react";
import axios from "axios";

function GoogleMapsScriptLoader() {

 // let [state, setState] = useState(googleMapsScriptSrc ? "loading" : "idle");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_NETLIFY_URL}/api`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
    // if (!googleMapsScriptSrc) {
    //   setState("idle");
    //   return;
    // }
    //let script = document.querySelector(`script[src="${googleMapsScriptSrc}"]`);

    // const handleScript = (e) => {
    //   setState(e.type === "load" ? "ready" : "error");
    // };

    // if (!script) {
    //   script = document.createElement("script");
    //   script.type = "application/javascript";
    //   script.src = googleMapsScriptSrc;
    //   script.async = true;
    //   document.body.appendChild(script);
    //   script.addEventListener("load", handleScript);
    //   script.addEventListener("error", handleScript);
    // }

    // script.addEventListener("load", handleScript);
    // script.addEventListener("error", handleScript);

    // return () => {
    //   script.removeEventListener("load", handleScript);
    //   script.removeEventListener("error", handleScript);
    // };
  }, []);
// }, [googleMapsScriptSrc]);
  //return state;
}

export default GoogleMapsScriptLoader;
