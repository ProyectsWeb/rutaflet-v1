
 /* function getUbicacion(){
    const ubicacion = navigator.geolocation.getCurrentPosition((position)=>{
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log(lat)
    console.log(lng)    
   })
 
 return ubicacion
}
getUbicacion()   */


//
/* navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    getLocation(latitude, longitude);
  }
); */

navigator.geolocation.watchPosition(
  ({ coords }) => getLocation(coords.latitude, coords.longitude)
);



async function getLocation(latitude, longitude) {
  
  console.log(latitude)
  console.log(longitude)
  const response = await fetch('https://opensheet.elk.sh/1lVrfhkCEHef29pcx2h2TVvJD9cqQY1GRh-YhTqABI_I/ubicacion');   
  const data = await response.json();
  
 /* let map = L.map('mapa').setView([32.485075,-116.810834], 16); */
 /* let map = L.map('mapa').setView([32.485075,-116.810834], 16); */
 let map = L.map('mapa').setView([latitude, longitude], 16); 
 

 var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
  maxZoom: 19, 
  attribution: '© OpenStreetMap'
 }).addTo(map);


const grouped = {};

 data.forEach((item)=>{
        //
        const key = item.COORDENADAS;
          if (!grouped[key]){
            grouped[key] = {
            coords: key,
            clientes: [],
            nameClients: []           
           };
            console.log(grouped[key].clientes)
         }

        grouped[key].clientes.push(item.NO);
        grouped[key].nameClients.push(item.NOMBRE);
          console.log(grouped)
          console.log(grouped[key].clientes)
          console.log(grouped[key].nameClients)
         
        ///


   if(!item.COORDENADAS) return
     const [lat, lng] = item.COORDENADAS.split(',').map(Number);     
     const marker = L.marker([lat, lng]).addTo(map);



  const userIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

   const userMarker = L.marker([latitude, longitude], { icon: userIcon }).addTo(map)


   marker.bindPopup(`       
    
    <div class="recuadro">       
     <span class="no-cliente"><b>${grouped[key].clientes}</b></span><br>
     <span class="names">${grouped[key].nameClients}</span><br> 
     <span class="coords"> ${lat}, ${lng} </span><br> 
      <div class="controls">
       <button class="btn-maps">Abrir en Maps 📍 </button>  
       <button class="btn-delete">Eliminar</button>
      </div>
    </div>      
   `);


      function openInMaps(lat, lng) {
  const url = `https://www.google.com/maps?q=${lat},${lng}`;
  window.open(url, '_blank');
}

        
  marker.on('popupopen', (e) => {
    console.log(e)
    const el = e.popup.getElement();


    el.querySelector('.btn-maps').addEventListener('click', () => {
    const { lat, lng } = marker.getLatLng();
    openInMaps(lat, lng);
   });


    el.querySelector('.btn-delete').addEventListener('click', (event)=>{
      console.log(event)
          map.removeLayer(marker);
          /* removeMarkerFromArray(marker); */
        });
    });
     

function openInMaps(lat, lng) {
  const url = `https://www.google.com/maps?q=${lat},${lng}`;
  window.open(url, '_blank');
}

    /* function removeMarkerFromArray(marker) {
     const index = markers.indexOf(marker);
     console.log(index)
      if (index > -1) markers.splice(index, 1);
    } */
  }); 
}

/* getLocation(); */


/* const $btns = document.querySelector('.red');
console.log($btns) */

  


