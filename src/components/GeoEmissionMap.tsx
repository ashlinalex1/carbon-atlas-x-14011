
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface StateEmission {
  States: string;
  "per capita CO2 (kg per person)": number;
  "per capita CO (kg per person)": number;
  "per capita CH4 (kg per person)": number;
  lat: number;
  lon: number;
}

const GeoEmissionMap: React.FC = () => {
  const [data, setData] = useState<StateEmission[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/geo_emissions")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching emissions:", err));
  }, []);

  console.log("Emission data:", data);

  const getColor = (v: number) => {
    if (v < 400) return "#16a34a"; // green
    if (v < 800) return "#facc15"; // yellow
    if (v < 1200) return "#f97316"; // orange
    return "#dc2626";              // red
  };

  return (
    <div className="w-full h-[80vh] rounded-lg overflow-hidden">
      <MapContainer
        center={[22.97, 78.65]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {data.map((item, i) => {
          const co2 = Number(item["per capita CO2 (kg per person)"]);
          const co = Number(item["per capita CO (kg per person)"]);
          const ch4 = Number(item["per capita CH4 (kg per person)"]);
          const lat = Number(item.lat);
          const lon = Number(item.lon);

          // ✅ Skip any invalid data
          if (!item.States || isNaN(lat) || isNaN(lon) || lat === 0 || lon === 0 || isNaN(co2)) {
            console.warn("Skipping invalid entry:", item);
            return null;
          }

          const color = getColor(co2);

          return (
            <CircleMarker
              key={i}
              center={[lat, lon]}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.8,
                weight: 2,
              }}
              radius={10 + co2 / 300} // adjust radius based on emission
            >
              <Tooltip direction="top" offset={[0, -10]}>
                <div className="text-sm">
                  <strong>{item.States}</strong>
                  <br />
                  🌫️ CO₂: {co2.toFixed(2)} kg/person
                  <br />
                  💨 CO: {co.toFixed(2)} kg/person
                  <br />
                  🔥 CH₄: {ch4.toFixed(2)} kg/person
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default GeoEmissionMap;




// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import indiaStates from "../data/india_states.geojson"; // Your Kaggle file

// interface StateEmission {
//   States: string;
//   "per capita CO2 (kg per person)": number;
//   "per capita CO (kg per person)": number;
//   "per capita CH4 (kg per person)": number;
// }

// const GeoEmissionMap: React.FC = () => {
//   const [data, setData] = useState<StateEmission[]>([]);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/geo_emissions")
//       .then((res) => setData(res.data))
//       .catch((err) => console.error("Error fetching emissions:", err));
//   }, []);

//   const getColor = (v: number) => {
//     if (v < 400) return "#16a34a"; // green
//     if (v < 800) return "#facc15"; // yellow
//     if (v < 1200) return "#f97316"; // orange
//     return "#dc2626"; // red
//   };

//   const onEachFeature = (feature: GeoJSON.Feature<GeoJSON.Geometry, { st_nm: string }>, layer: L.GeoJSON) => {
//     const stateName = feature.properties.st_nm; // 🧩 Kaggle key
//     const matched = data.find(
//       (d) => d.States.toLowerCase().trim() === stateName.toLowerCase().trim()
//     );

//     const co2 = matched
//       ? Number(matched["per capita CO2 (kg per person)"])
//       : 0;
//     const color = matched ? getColor(co2) : "#d1d5db"; // gray if no data

//     layer.setStyle({
//       fillColor: color,
//       fillOpacity: 0.8,
//       color: "#ffffff",
//       weight: 1,
//     });

//     const tooltip = matched
//       ? `
//         <div>
//           <strong>${stateName}</strong><br/>
//           🌫️ CO₂: ${co2.toFixed(2)} kg/person<br/>
//           💨 CO: ${matched["per capita CO (kg per person)"].toFixed(2)} kg/person<br/>
//           🔥 CH₄: ${matched["per capita CH4 (kg per person)"].toFixed(2)} kg/person
//         </div>
//       `
//       : `<strong>${stateName}</strong><br/>No emission data`;

//     layer.bindTooltip(tooltip, { sticky: true });
//   };

//   return (
//     <div className="w-full h-[80vh] rounded-lg overflow-hidden shadow-lg">
//       <MapContainer
//         center={[22.97, 78.65]}
//         zoom={5}
//         style={{ height: "100%", width: "100%" }}
//         scrollWheelZoom={true}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />

//         <GeoJSON data={indiaStates as any} onEachFeature={onEachFeature} />
//       </MapContainer>
// //     </div>
// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import type { GeoJSON as GeoJSONType, Layer } from 'leaflet';
// import indiaStates from "../data/india_states.geojson";
// import { FeatureCollection } from "geojson";

// interface StateEmission {
//   States: string;
//   "per capita CO2 (kg per person)": number;
//   "per capita CO (kg per person)": number;
//   "per capita CH4 (kg per person)": number;
// }

// const GeoEmissionMap: React.FC = () => {
//   const [data, setData] = useState<StateEmission[]>([]);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/geo_emissions")
//       .then((res) => setData(res.data))
//       .catch((err) => console.error("Error fetching emissions:", err));
//   }, []);

//   const getColor = (v: number) => {
//     if (v < 400) return "#16a34a"; // green
//     if (v < 800) return "#facc15"; // yellow
//     if (v < 1200) return "#f97316"; // orange
//     return "#dc2626"; // red
//   };

//   const onEachFeature = (feature: GeoJSON.Feature<GeoJSON.Geometry, { st_nm: string }>, layer: L.GeoJSON) => {
//     const stateName = feature.properties.st_nm;
//     const matched = data.find(
//       (d) => d.States.toLowerCase().trim() === stateName.toLowerCase().trim()
//     );

//     const co2 = matched
//       ? Number(matched["per capita CO2 (kg per person)"])
//       : 0;
//     const color = matched ? getColor(co2) : "#d1d5db";

//     layer.setStyle({
//       fillColor: color,
//       fillOpacity: 0.8,
//       color: "#ffffff",
//       weight: 1,
//     });

//     const tooltip = matched
//       ? `
//         <div>
//           <strong>${stateName}</strong><br/>
//           🌫️ CO₂: ${co2.toFixed(2)} kg/person<br/>
//           💨 CO: ${matched["per capita CO (kg per person)"].toFixed(2)} kg/person<br/>
//           🔥 CH₄: ${matched["per capita CH4 (kg per person)"].toFixed(2)} kg/person
//         </div>
//       `
//       : `<strong>${stateName}</strong><br/>No emission data`;

//     layer.bindTooltip(tooltip, { sticky: true });
//   };

//   return (
//     <div className="w-full h-[80vh] rounded-lg overflow-hidden shadow-lg">
//       <MapContainer
//         center={[22.97, 78.65]}
//         zoom={5}
//         style={{ height: "100%", width: "100%" }}
//         scrollWheelZoom={true}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />
//         <GeoJSON data={indiaStates as FeatureCollection} onEachFeature={onEachFeature} />
//       </MapContainer>
//     </div>
//   );
// };

// // export default GeoEmissionMap;
// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import indiaStates from "../data/india_states.geojson";
// import type { FeatureCollection, Geometry } from "geojson";
// import type { Layer } from "leaflet";

// // ✅ Your dataset type (from backend)
// interface StateEmission {
//   States: string;
//   "per capita CO2 (kg per person)": number;
//   "per capita CO (kg per person)": number;
//   "per capita CH4 (kg per person)": number;
// }

// // ✅ Start of Component
// const GeoEmissionMap: React.FC = () => {
//   const [data, setData] = useState<StateEmission[]>([]);

//   // --- Fetch emission data ---
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/geo_emissions")
//       .then((res) => setData(res.data))
//       .catch((err) => console.error("Error fetching emissions:", err));
//   }, []);

//   // --- Color logic ---
//   const getColor = (v: number) => {
//     if (v < 400) return "#16a34a"; // green
//     if (v < 800) return "#facc15"; // yellow
//     if (v < 1200) return "#f97316"; // orange
//     return "#dc2626"; // red
//   };

//   // --- Called for each state feature ---
//   const onEachFeature = (
//     feature: GeoJSON.Feature<Geometry, any>,
//     layer: Layer
//   ) => {
//     const stateName = feature.properties?.st_nm;
//     if (!stateName) return;

//     const matched = data.find(
//       (d) => d.States.toLowerCase().trim() === stateName.toLowerCase().trim()
//     );

//     const co2 = matched
//       ? Number(matched["per capita CO2 (kg per person)"])
//       : 0;
//     const color = matched ? getColor(co2) : "#d1d5db"; // gray for missing data

//     // ✅ Cast layer safely
//     (layer as any).setStyle?.({
//       fillColor: color,
//       fillOpacity: 0.8,
//       color: "#ffffff",
//       weight: 1,
//     });

//     const tooltipContent = matched
//       ? `
//         <div>
//           <strong>${stateName}</strong><br/>
//           🌫️ CO₂: ${co2.toFixed(2)} kg/person<br/>
//           💨 CO: ${matched["per capita CO (kg per person)"].toFixed(2)} kg/person<br/>
//           🔥 CH₄: ${matched["per capita CH4 (kg per person)"].toFixed(2)} kg/person
//         </div>
//       `
//       : `<strong>${stateName}</strong><br/>No emission data available`;

//     (layer as any).bindTooltip(tooltipContent, { sticky: true });
//   };

//   // --- Render Map ---
//   return (
//     <div className="w-full h-[80vh] rounded-lg overflow-hidden shadow-lg">
//       <MapContainer
//         center={[22.97, 78.65]}
//         zoom={5}
//         style={{ height: "100%", width: "100%" }}
//         scrollWheelZoom
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />
//         {/* ✅ Type-safe GeoJSON render */}
//         <GeoJSON
//           data={indiaStates as FeatureCollection}
//           onEachFeature={onEachFeature}
//         />
//       </MapContainer>
//     </div>
//   );
// };

// // export default GeoEmissionMap;
// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import indiaStates from "../data/india_states.geojson";
// import type { FeatureCollection, Feature, Geometry } from "geojson";
// import type { Layer, PathOptions } from "leaflet";

// // ✅ Backend emission data model
// interface StateEmission {
//   States: string;
//   "per capita CO2 (kg per person)": number;
//   "per capita CO (kg per person)": number;
//   "per capita CH4 (kg per person)": number;
// }

// // ✅ GeoJSON feature type with known properties
// interface StateFeatureProperties {
//   st_nm: string;
// }

// // ✅ Main Component
// const GeoEmissionMap: React.FC = () => {
//   const [data, setData] = useState<StateEmission[]>([]);

//   // Fetch emission dataset from backend
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/geo_emissions")
//       .then((res) => setData(res.data))
//       .catch((err) => console.error("Error fetching emissions:", err));
//   }, []);

//   // Determine color based on CO₂ intensity
//   const getColor = (v: number): string => {
//     if (v < 400) return "#16a34a"; // green
//     if (v < 800) return "#facc15"; // yellow
//     if (v < 1200) return "#f97316"; // orange
//     return "#dc2626"; // red
//   };

//   // Apply style + tooltip to each state feature
//   const onEachFeature = (
//     feature: Feature<Geometry, StateFeatureProperties> | undefined,
//     layer: Layer
//   ): void => {
//     if (!feature || !feature.properties) return;

//     const stateName = feature.properties.st_nm;
//     const matched = data.find(
//       (d) => d.States.toLowerCase().trim() === stateName.toLowerCase().trim()
//     );

//     const co2 = matched
//       ? Number(matched["per capita CO2 (kg per person)"])
//       : 0;
//     const color = matched ? getColor(co2) : "#d1d5db"; // gray if no match

//     // Set style (works only for Path layers)
//     const pathLayer = layer as L.Path;
//     const style: PathOptions = {
//       fillColor: color,
//       fillOpacity: 0.8,
//       color: "#ffffff",
//       weight: 1,
//     };
//     pathLayer.setStyle(style);

//     // Tooltip content
//     const tooltipContent = matched
//       ? `
//         <div>
//           <strong>${stateName}</strong><br/>
//           🌫️ CO₂: ${co2.toFixed(2)} kg/person<br/>
//           💨 CO: ${matched["per capita CO (kg per person)"].toFixed(2)} kg/person<br/>
//           🔥 CH₄: ${matched["per capita CH4 (kg per person)"].toFixed(2)} kg/person
//         </div>
//       `
//       : `<strong>${stateName}</strong><br/>No emission data`;

//     // Bind tooltip safely
//     if ("bindTooltip" in layer && typeof (layer as any).bindTooltip === "function") {
//       (layer as L.Layer & { bindTooltip: (html: string, opts: { sticky: boolean }) => void })
//         .bindTooltip(tooltipContent, { sticky: true });
//     }
//   };

//   // Render Map
//   return (
//     <div className="w-full h-[80vh] rounded-lg overflow-hidden shadow-lg">
//       <MapContainer
//         center={[22.97, 78.65]}
//         zoom={5}
//         style={{ height: "100%", width: "100%" }}
//         scrollWheelZoom
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />
//         {/* ✅ Typed GeoJSON */}
//         <GeoJSON
//           data={indiaStates as FeatureCollection<Geometry, StateFeatureProperties>}
//           onEachFeature={onEachFeature}
//         />
//       </MapContainer>
//     </div>
//   );
// };

// // export default GeoEmissionMap;
// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import indiaStates from "../data/india_states.geojson";
// import type { FeatureCollection, Feature, Geometry } from "geojson";
// import type { Layer, Path, PathOptions } from "leaflet";

// interface StateEmission {
//   States: string;
//   "per capita CO2 (kg per person)": number;
//   "per capita CO (kg per person)": number;
//   "per capita CH4 (kg per person)": number;
// }

// interface StateFeatureProperties {
//   st_nm: string;
// }

// const GeoEmissionMap: React.FC = () => {
//   const [data, setData] = useState<StateEmission[]>([]);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/geo_emissions")
//       .then((res) => setData(res.data))
//       .catch((err) => console.error("Error fetching emissions:", err));
//   }, []);

//   const getColor = (v: number): string => {
//     if (v < 400) return "#16a34a";
//     if (v < 800) return "#facc15";
//     if (v < 1200) return "#f97316";
//     return "#dc2626";
//   };

//   const onEachFeature = (
//     feature: Feature<Geometry, StateFeatureProperties> | undefined,
//     layer: Layer
//   ): void => {
//     if (!feature?.properties) return;

//     const stateName = feature.properties.st_nm;
//     const matched = data.find(
//       (d) => d.States.toLowerCase().trim() === stateName.toLowerCase().trim()
//     );

//     const co2 = matched
//       ? Number(matched["per capita CO2 (kg per person)"])
//       : 0;
//     const color = matched ? getColor(co2) : "#d1d5db";

//     // ✅ Strongly type `layer` as a `Path`
//     if ("setStyle" in layer) {
//       const pathLayer = layer as Path;
//       const style: PathOptions = {
//         fillColor: color,
//         fillOpacity: 0.8,
//         color: "#ffffff",
//         weight: 1,
//       };
//       pathLayer.setStyle(style);

//       const tooltipContent = matched
//         ? `
//           <div>
//             <strong>${stateName}</strong><br/>
//             🌫️ CO₂: ${co2.toFixed(2)} kg/person<br/>
//             💨 CO: ${matched["per capita CO (kg per person)"].toFixed(2)} kg/person<br/>
//             🔥 CH₄: ${matched["per capita CH4 (kg per person)"].toFixed(2)} kg/person
//           </div>
//         `
//         : `<strong>${stateName}</strong><br/>No emission data`;

//       // ✅ Safely bind tooltip if available
//       if ("bindTooltip" in pathLayer && typeof (pathLayer as Path).bindTooltip === "function") {
//         (pathLayer as Path).bindTooltip(tooltipContent, { sticky: true });
//       }
//     }
//   };

//   return (
//     <div className="w-full h-[80vh] rounded-lg overflow-hidden shadow-lg">
//       <MapContainer
//         center={[22.97, 78.65]}
//         zoom={5}
//         style={{ height: "100%", width: "100%" }}
//         scrollWheelZoom
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />
//         <GeoJSON
//           data={
//             indiaStates as FeatureCollection<Geometry, StateFeatureProperties>
//           }
//           onEachFeature={onEachFeature}
//         />
//       </MapContainer>
//     </div>
//   );
// };

// // export default GeoEmissionMap;import React, { useMemo, useEffect, useState } from "react";
// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import indiaStates from "../data/india_states.geojson";
// import type { FeatureCollection, Feature, Geometry, GeoJsonProperties } from "geojson";
// import type { Layer, Path, PathOptions, TooltipOptions } from "leaflet";
// import { useEffect, useMemo, useState } from "react";
// import type { 
//   Polygon, 
//   MultiPolygon, 
//   Point, 
//   MultiPoint, 
//   LineString, 
//   MultiLineString 
// } from 'geojson';

// interface StateEmission {
//   States: string;
//   "per capita CO2 (kg per person)": number;
//   "per capita CO (kg per person)": number;
//   "per capita CH4 (kg per person)": number;
// }

// interface StateFeatureProperties extends NonNullable<GeoJsonProperties> {
//   st_nm?: string;
//   ST_NM?: string;
// }

// /* ---------- Component ---------- */
// const GeoEmissionMap: React.FC = () => {
//   const [data, setData] = useState<StateEmission[]>([]);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   /* --- Fetch emission data --- */
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/geo_emissions")
//       .then((res) => setData(res.data))
//       .catch((err) => {
//         console.error("Error fetching emissions:", err);
//         setErrorMsg("Failed to fetch emission data.");
//       });
//   }, []);

//   /* --- Prepare valid GeoJSON (already typed) --- */
//   const cleanedGeo: FeatureCollection<Geometry, StateFeatureProperties> | null =
//     useMemo(() => {
//       if (
//         !indiaStates ||
//         indiaStates.type !== "FeatureCollection" ||
//         !Array.isArray(indiaStates.features)
//       ) {
//         console.error("❌ Invalid GeoJSON file structure:", indiaStates);
//         setErrorMsg("Invalid GeoJSON structure.");
//         return null;
//       }

//       // Filter valid features
//       const valid = indiaStates.features.filter(
//         (f): f is Feature<Polygon | MultiPolygon | Point | MultiPoint | LineString | MultiLineString, StateFeatureProperties> =>
//           !!f.geometry && 
//           (f.geometry.type === 'Polygon' || 
//            f.geometry.type === 'MultiPolygon' || 
//            f.geometry.type === 'Point' || 
//            f.geometry.type === 'MultiPoint' || 
//            f.geometry.type === 'LineString' || 
//            f.geometry.type === 'MultiLineString') &&
//           Array.isArray(f.geometry.coordinates)
//       );

//       if (valid.length === 0) {
//         setErrorMsg("No valid state geometries found.");
//         return null;
//       }

//       return { type: "FeatureCollection", features: valid };
//     }, []);

//   /* --- Color logic --- */
//   const getColor = (v: number): string => {
//     if (v < 400) return "#16a34a"; // green
//     if (v < 800) return "#facc15"; // yellow
//     if (v < 1200) return "#f97316"; // orange
//     return "#dc2626"; // red
//   };

//   /* --- Feature styling & tooltip --- */
//   const onEachFeature = (
//     feature: Feature<Geometry, StateFeatureProperties> | undefined,
//     layer: Layer
//   ): void => {
//     if (!feature?.properties) return;

//     const stateName =
//       (feature.properties.st_nm ??
//         feature.properties.ST_NM ??
//         "Unknown") as string;

//     const matched = data.find(
//       (d) =>
//         d.States.toLowerCase().replace(/\s+/g, "") ===
//         stateName.toLowerCase().replace(/\s+/g, "")
//     );

//     const co2 = matched
//       ? Number(matched["per capita CO2 (kg per person)"])
//       : NaN;

//     const color = !isNaN(co2) ? getColor(co2) : "#d1d5db";

//     if ("setStyle" in layer) {
//       (layer as Path).setStyle({
//         fillColor: color,
//         fillOpacity: 0.8,
//         color: "#ffffff",
//         weight: 1,
//       } as PathOptions);
//     }

//     const tooltipContent = matched
//       ? `<strong>${stateName}</strong><br/>🌫️ CO₂: ${co2.toFixed(
//           2
//         )} kg/person<br/>💨 CO: ${matched[
//           "per capita CO (kg per person)"
//         ].toFixed(2)} kg/person<br/>🔥 CH₄: ${matched[
//           "per capita CH4 (kg per person)"
//         ].toFixed(2)} kg/person`
//       : `<strong>${stateName}</strong><br/>No emission data`;

//     if ("bindTooltip" in layer) {
//       const l = layer as Path & {
//         bindTooltip: (html: string, options?: TooltipOptions) => void;
//       };
//       l.bindTooltip(tooltipContent, { sticky: true });
//     }
//   };

//   /* --- Render Map --- */
//   return (
//     <div className="w-full h-[80vh] rounded-lg overflow-hidden shadow-lg">
//       {errorMsg ? (
//         <div className="p-6 bg-red-50 text-red-700">
//           <strong>Map Error:</strong> {errorMsg}
//           <div className="mt-2 text-xs text-gray-500">
//             Check console for details.
//           </div>
//         </div>
//       ) : cleanedGeo ? (
//         <MapContainer
//           center={[22.97, 78.65]}
//           zoom={5}
//           style={{ height: "100%", width: "100%" }}
//           scrollWheelZoom
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="&copy; OpenStreetMap contributors"
//           />
//           <GeoJSON data={cleanedGeo} onEachFeature={onEachFeature} />
//         </MapContainer>
//       ) : (
//         <div className="p-6 text-gray-600">Loading GeoJSON map...</div>
//       )}
//     </div>
//   );
// };

// export default GeoEmissionMap;
