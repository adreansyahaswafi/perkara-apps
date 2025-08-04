import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { useEffect } from "react";
import useCustomEvent from "../../hooks/useCustomEvent";

const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    if (map.getContainer()) { //Check if the map container exists
      resizeObserver.observe(map.getContainer());
    }

    return () => {
      if (map.getContainer()) { //Check if the map container exists before disconnecting observer
        resizeObserver.disconnect();
      }

    };
  }, [map]);

  return null;
};


const IndonesiaMap = ({ data = null }) => {
  const { responseEvents } = useCustomEvent();
  const customIcon = L.divIcon({
    className: 'animate-pulse',
    html:
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path d="M257.208 65.484v-.066c-.408 0-.804.026-1.206.026s-.802-.026-1.21-.026v.066a150.28 150.28 0 0 0-147.887 150.244c0 110.769 130.054 215.918 149.097 230.854 19.042-14.935 149.093-120.082 149.093-230.854A150.28 150.28 0 0 0 257.208 65.484zm78.507 106.66-30.38 28.425 27.37 91.451-15.33 15.331a4.31 4.31 0 0 1-6.085 0l-40.822-74.167-37.532 37.017 5.989 29.177-9.563 9.553a3.24 3.24 0 0 1-4.588.007l-54.065-54.065a3.244 3.244 0 0 1 0-4.592l9.559-9.559 28.639 5.846 37.036-37.68-73.648-40.535a4.313 4.313 0 0 1-.007-6.091l15.339-15.331 90.835 27.198 28.632-30.607c8.366-8.366 21.546-8.742 29.449-.831 7.907 7.9 7.538 21.09-.828 29.452z" fill="teal" data-name="Airport"/>
</svg>`,
    iconSize: [40, 60]
  });

  const indonesiaBounds = [
    [-15, 90],
    [25, 150],
  ];

  useEffect(() => {
    responseEvents({ eventName: 'OPEN_SIDEBAR' });
  }, [responseEvents]);

  return (
    <div>
      <MapContainer
        scrollWheelZoom={false}
        center={[-2.5, 118]}
        zoom={5}
        maxBounds={indonesiaBounds}
        maxBoundsViscosity={1.0}
        minZoom={5}
        maxZoom={10}
        style={{ height: 400, width: '100%' }} // Important: width 100%
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ResizeMap /> {/* Add the ResizeMap component */}

        {data && data.map((item, index) => (
          <Marker key={index} icon={customIcon} position={[item.lat, item.lon]}>
            <Popup>
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium">Name</div>
                  <div className="flex-none">:</div>
                  <div className="flex-1 ml-2">{item?.name}</div>
                </div>
                <div className="flex items-center ">
                  <div className="w-24 text-sm font-medium">Code</div>
                  <div className="flex-none">:</div>
                  <div className="flex-1 ml-2">{item?.code}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium">Address</div>
                  <div className="flex-none">:</div>
                  <div className="flex-1 ml-2">{item?.address}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IndonesiaMap;

