import { useRef, useEffect } from "react";

const AutoComplete = (props) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: {
      fields: ["address_components", "geometry", "icon", "name"],
    },
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      props.callbackToSetPlace(place.formatted_address)
    });
  }, []);
  return <input ref={inputRef} type="text" name="place" value={props.initialValue} onChange={(e) => props.callbackToSetPlace(e.target.value)} />;
};
export default AutoComplete;
