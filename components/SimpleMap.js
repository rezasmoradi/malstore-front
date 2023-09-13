import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/userSlice';

const Map = dynamic(() => import("react-neshan-map-leaflet/dist/NeshanMap"), {
  ssr: false
});

function SimpleMap({ onChangeMarker = null }) {

  const theme = useSelector(selectTheme)

  return (
    <Map
      style={{ width: 'auto', marginLeft: 16 }}
      options={{
        key: 'web.8935ab2c2e144fe7a66f8f853b1c1eb8',
        center: [35.699739, 51.338097],
        zoom: 13,
        poi: true,
        traffic: false,
        maptype: theme === 'dark' ? 'standard-night' : 'dreamy'
      }}
      onInit={(L, myMap) => {
        let marker = L.marker([35.699739, 51.338097])
          .addTo(myMap)
          .bindPopup('تعیین موقعیت');

        myMap.on('click', function (e) {
          marker.setLatLng(e.latlng)
          if (typeof onChangeMarker === 'function') onChangeMarker(e.latlng)
        });
      }}
    />
  );
}

export default SimpleMap;