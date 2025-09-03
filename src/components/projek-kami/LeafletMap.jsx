"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = ({
  projects = [],
  latitude = null,
  longitude = null,
  zoom = 10,
}) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer || mapContainer._leaflet_id) return;

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    const map = L.map("map", {
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const bounds = L.latLngBounds([]);
    const statusIcons = {
      "Masih Berlangsung": new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      "Sudah Selesai": new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      "Sedang Dinilai": new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    };

    // Jika lat & lng manual
    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        const markerIcon = new L.Icon.Default();

        L.marker([lat, lng], { icon: markerIcon })
          .addTo(map)
          .bindPopup("Lokasi proyek ini");

        map.setView([lat, lng], zoom);
      } else {
        map.setView([-2.5489, 118.0149], 5);
      }

      return;
    }

    // Jika dari daftar projects
    if (projects.length > 0) {
      projects.forEach((item) => {
        if (item.geohex && typeof item.geohex === "string") {
          const [latStr, lngStr] = item.geohex.split(",");
          const lat = parseFloat(latStr);
          const lng = parseFloat(lngStr);

          if (!isNaN(lat) && !isNaN(lng)) {
            const markerIcon =
              statusIcons[item.status?.trim()] || new L.Icon.Default();

            L.marker([lat, lng], { icon: markerIcon })
              .addTo(map)
              .bindPopup(
                `<b>${item.title}</b><br>${
                  item.desc?.slice(0, 100) ?? ""
                }...<br><i>Status: ${item.status}</i>`
              );

            bounds.extend([lat, lng]);
          }
        }
      });

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [30, 30] });
      } else {
        map.setView([-2.5489, 118.0149], 5);
      }
    } else {
      map.setView([-2.5489, 118.0149], 5);
    }
  }, [projects, latitude, longitude, zoom]);

  return <div id="map" className="lg:h-[60vh] h-[30vh] w-full rounded" />;
};

export default LeafletMap;
