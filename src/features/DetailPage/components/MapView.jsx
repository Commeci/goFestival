import { useEffect, useState, useCallback } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

export function MapView({ mapx, mapy, category, onPlacesFound }) {
    const [info, setInfo] = useState();
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState();
    const [center, setCenter] = useState({ lat: mapy, lng: mapx });
    const [level, setLevel] = useState(3);

    const searchPlaces = useCallback(
        (map, category) => {
            if (!map || !category) return;
            const ps = new kakao.maps.services.Places();

            ps.keywordSearch(
                category,
                (data, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        let markers = [];
                        let nearbyPlaces = [];

                        for (var i = 0; i < data.length; i++) {
                            const place = {
                                position: {
                                    lat: data[i].y,
                                    lng: data[i].x,
                                },
                                content: data[i].place_name,
                                distance: data[i].distance,
                            };
                            markers.push(place);
                            nearbyPlaces.push({
                                name: data[i].place_name,
                                distance: `${(data[i].distance / 1000).toFixed(
                                    1
                                )}km`,
                                type: category,
                                lat: data[i].y,
                                lng: data[i].x,
                            });
                        }
                        setMarkers(markers);
                        onPlacesFound(nearbyPlaces.slice(0, 4));
                    }
                },
                {
                    location: new kakao.maps.LatLng(mapy, mapx),
                    radius: 2000,
                    sort: kakao.maps.services.SortBy.DISTANCE,
                }
            );
        },
        [mapy, mapx, onPlacesFound]
    );

    useEffect(() => {
        if (map && category) {
            searchPlaces(map, category);
        }
    }, [map, category, searchPlaces]);

    const handleCenterChanged = (map) => {
        setCenter({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
        });
    };

    const handleZoomChanged = (map) => {
        setLevel(map.getLevel());
    };

    return (
        <Map
            center={center}
            style={{ width: "100%", height: "500px" }}
            level={level}
            onCreate={setMap}
            onCenterChanged={handleCenterChanged}
            onZoomChanged={handleZoomChanged}
        >
            {/* 축제 위치 마커 */}
            <MapMarker
                position={{ lat: mapy, lng: mapx }}
                image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                    size: { width: 30, height: 45 },
                }}
            />
            <CustomOverlayMap position={{ lat: mapy, lng: mapx }}>
                <div className="customoverlay">
                    <span className="title">축제 위치</span>
                </div>
            </CustomOverlayMap>

            {/* 주변 장소 마커 */}
            {markers.map((marker) => (
                <MapMarker
                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                    position={marker.position}
                    onClick={() => setInfo(marker)}
                >
                    {info && info.content === marker.content && (
                        <div style={{ color: "#000" }}>{marker.content}</div>
                    )}
                </MapMarker>
            ))}
        </Map>
    );
}
