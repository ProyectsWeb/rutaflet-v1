
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
navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    getLocation(latitude, longitude);
  }
);
//


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

 data.forEach((item)=>{
   if(!item.COORDENADAS) return
     const [lat, lng] = item.COORDENADAS.split(',').map(Number);
     L.marker([lat, lng]).addTo(map).bindPopup(`<h1 class="red">hola</h1>${item.NO} / ${item.NOMBRE} / ${lat}, ${lng}`);
 }); 
}

/* getLocation(); */


/* const $btns = document.querySelector('.red');
console.log($btns) */

  


