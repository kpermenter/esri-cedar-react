import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

// react hooks component
export const WebMapView = () => {
    const mapRef = useRef();

    useEffect(
        () => {
            // lazy load the required ArcGIS API for JavaScript modules and CSS
            loadModules(['esri/Map', 'esri/views/SceneView', 'esri/layers/FeatureLayer'], { css: true })
                .then(([ArcGISMap, SceneView, FeatureLayer]) => {
                    const layer = new FeatureLayer({
                        url: "https://gulfpub-gisstg.esriemcs.com/server/rest/services/EWA_Global_Assets/MapServer/3"
                    })

                    const layer2 = new FeatureLayer({
                        url: "https://gulfpub-gisstg.esriemcs.com/server/rest/services/EWA_Global_Assets/MapServer/4"
                    })

                    const map = new ArcGISMap({
                        basemap: 'topo-vector',
                        layers: [layer, layer2]
                    });

                    // load the map view at the ref's DOM node
                    const view = new SceneView({
                        container: mapRef.current,
                        map: map,
                        // center: [-118, 34],
                        zoom: 2
                    });



                    return () => {
                        if (view) {
                            // destroy the map view
                            view.destroy();
                        }
                    };
                });
        }
    );

    return <div className="viewDiv" ref={mapRef} />;
};

export default WebMapView

// import React from 'react';
// import {  WebScene } from 'react-arcgis';

// const WebMapView = function (props) {
//     return (
//     <div className='viewDiv' style={{ width: '100vw', height: '100vh' }}>
//     <WebScene id="f8aa0c25485a40a1ada1e4b600522681" />
// </div>
// )
//   }