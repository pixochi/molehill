import L from 'leaflet';

import UserIcon from 'app/assets/images/user-icon.png';

const UserLeafletIcon = new L.Icon({
    iconUrl: UserIcon,
    iconSize: new L.Point(69, 65),
});

export default UserLeafletIcon;
