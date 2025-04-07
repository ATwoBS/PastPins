import L from 'leaflet';

import markerPerson from '../assets/marker-icon-2x.png';

const customIcon = new L.Icon({
    iconUrl: markerPerson,
    iconRetinaUrl: markerPerson,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

export { customIcon };