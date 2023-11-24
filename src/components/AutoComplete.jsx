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
      props.callbackToSetDisplayedPlace(place.formatted_address);
      props.callbackToSetLat(place.geometry.viewport.eb.hi);
      props.callbackToSetLon(place.geometry.viewport.La.hi);
    });
  }, []);
  return (
    <input
      ref={inputRef}
      className="input input-bordered input-sm"
      type="text"
      name="place"
      value={props.initialValue}
      onChange={(e) => props.callbackToSetDisplayedPlace(e.target.value)}
    />
  );
};
export default AutoComplete;
