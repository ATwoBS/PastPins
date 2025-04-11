import L from 'leaflet';

import pin from '../assets/heroicon-pin.svg';

const customIcon = new L.Icon({
    iconUrl: pin,
    iconRetinaUrl: pin,
    iconAnchor: null,
    popupAnchor: [0, -32], 
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

export { customIcon };