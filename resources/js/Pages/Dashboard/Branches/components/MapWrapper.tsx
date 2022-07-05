import React from "react";
import Map from "./Map";
import Marker from "./Marker";

const MapWrapper = () => {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(12); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 21.55831196915245,
        lng: 39.1931836853401,
    });
    const [selectedPosition, setSelectedPosition] = React.useState({
        lat: 0,
        lng: 0,
    });

    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        console.log({ selectedPosition });
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
    return (
        <>
            <Map
                center={center}
                onClick={onClick}
                onIdle={onIdle}
                zoom={zoom}
                style={{ flexGrow: "1", height: "100%" }}
            >
                {clicks.map((latLng, i) => (
                    <Marker key={i} position={latLng} />
                ))}
            </Map>
        </>
    );
};

export default MapWrapper;
