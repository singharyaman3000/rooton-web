import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: { text: string; [key: string]: unknown }) => <div>{text}</div>;

const MapSection = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    center2: {
      lat: 8.524139,
      lng: 76.936638,
    },
    zoom: 11,
  };

  return (
    <section>
      {/* Map component */}
      <div className="h-[360px] w-full">
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={defaultProps.center2}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent lat={8.501377} lng={76.949903} text="My Marker" />
        </GoogleMapReact>
      </div>
      {/* Address section */}
      <div>
        <h2>Contact Information</h2>
        <div></div>
      </div>
    </section>
  );
};

export default MapSection;
