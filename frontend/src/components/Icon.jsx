import L from 'leaflet';

import redIcon from '../assets/red-icon.png';

const customIcon = new L.Icon({
    iconUrl: redIcon,
    iconRetinaUrl: redIcon,
    iconAnchor: null,
    popupAnchor: [0, -32], 
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

export { customIcon };