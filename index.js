import { actualizarUbicacion, agruparClientes, obtenerClientes, pintarMarcadores } from "./mapa/utilsMapa.js"; 
 

let map = L.map('mapa').setView([32.473255, -116.804404], 14);        
console.log(map)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);


 navigator.geolocation.watchPosition(({coords})=>{ actualizarUbicacion(map, coords.latitude, coords.longitude); });

   async function iniciarApp() {
   const data = await obtenerClientes();     
   const grouped = agruparClientes(data);    
   pintarMarcadores(map, grouped); 
   }

 iniciarApp(); 