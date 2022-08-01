import { Status, Wrapper } from "@googlemaps/react-wrapper";
import React from "react";
import Map from "./Map";
import Marker from "./Marker";

const MapWrapper = ({ setSelectedPosition, staticMarker }) => {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(12); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 21.55831196915245,
        lng: 39.1931836853401,
    });

    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setSelectedPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
        setClicks([e.latLng!]);
    };

    const onIdle = (m: google.maps.Map) => {
        console.log("onIdle");
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
    };
    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };
    return (
        <Wrapper
            apiKey={"AIzaSyDHqnCUbpApAczIlH7VrOdw4tU8SNpi5l8"}
            render={render}
        >
            <Map
                center={center}
                onClick={onClick}
                onIdle={onIdle}
                zoom={zoom}
                style={{ flexGrow: "1", height: "100%" }}
            >
                {staticMarker != null && <Marker position={staticMarker} />}
                {clicks.map((latLng, i) => (
                    <Marker key={i} position={latLng} />
                ))}
            </Map>
        </Wrapper>
    );
};

export default MapWrapper;
