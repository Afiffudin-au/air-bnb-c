import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'
import { LocationMarkerIcon } from '@heroicons/react/solid'
function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({})
  const coordinates = searchResults?.map((item) => ({
    longitude: item.long,
    latitude: item.lat,
  }))
  const center = getCenter(coordinates)
  const [viewport, setViewport] = useState({
    height: '100%',
    width: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  })
  return (
    <ReactMapGL
      mapStyle='mapbox://styles/afiffudin/cks9xntxt4h5617p4la3xqt2l'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}>
      {searchResults?.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}>
            <LocationMarkerIcon
              role='img'
              aria-label='push-pin'
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer h-6 w-6 text-red-400 animate-bounce'
            />
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}>
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
        // click marker
      ))}
    </ReactMapGL>
  )
}

export default Map
