import { useEffect, useState } from "react";
function GoogleMapsScriptLoader ()  {
  const googleMapsScriptSrc = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=Function.prototype`
  let [state, setState] = useState(googleMapsScriptSrc ? "loading" : "idle");
  
  useEffect(() => {
    if (!googleMapsScriptSrc) {
      setState("idle");
      return;
     }
    let script = document.querySelector(`script[src="${googleMapsScriptSrc}"]`);
    
    const handleScript = (e) => {
      setState(e.type === "load" ? "ready" : "error");
    };
    
    if (!script) {
      script = document.createElement("script");
      script.type = "application/javascript";
      script.src = googleMapsScriptSrc;
      script.async = true;
      document.body.appendChild(script);
      script.addEventListener("load", handleScript);
      script.addEventListener("error", handleScript);
    }
   
   script.addEventListener("load", handleScript);
   script.addEventListener("error", handleScript);
   
   return () => {
     script.removeEventListener("load", handleScript);
     script.removeEventListener("error", handleScript);
   };
  }, [googleMapsScriptSrc]);
  
  return state;
};

export default GoogleMapsScriptLoader;