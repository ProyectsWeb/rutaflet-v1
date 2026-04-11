/* OPTENER LOS CLIENTES */
export async function obtenerClientes(){ 
  const res = await fetch(`https://opensheet.elk.sh/1lVrfhkCEHef29pcx2h2TVvJD9cqQY1GRh-YhTqABI_I/ubicacion`);
  return await res.json();
} 


/* AGRUPAR CLIENTES */
export function agruparClientes(data){
  const grouped = {};

  console.log(data)

  data.forEach(item =>{
   if (!item.COORDENADAS) return;
   const key = item.COORDENADAS;

   if(!grouped[key]){
     grouped[key] = {
      coords: key,
      clientes: [],
      contratos: [],
      nameClients: [], 
      direcciones: [],
      colonias: [],
      periodos: []     
     };
   }

   grouped[key].clientes.push(item.NO);
   grouped[key].contratos.push(item.CONTRATO);
   grouped[key].nameClients.push(item.NOMBRE);   
   grouped[key].direcciones.push(item.DIRECCION);       
   grouped[key].colonias.push(item.COLONIA);       
   grouped[key].periodos.push(item.PERIODO);       
  });

 return grouped;
}


const markers = {};
/* PINTAR LOS MARCADORES */
export function pintarMarcadores(map, grouped){
  Object.values(grouped).forEach(grupo =>{
    const [lat, lng] = grupo.coords.split(',').map(Number);    
    
    const marker = L.marker([lat, lng]).addTo(map);
     marker.bindPopup(`
       <div class="recuadro">       
          <div class="frecuencia"> 
            <span class="no-cliente"><b>${grupo.clientes}</b></span>
            <span class="periodos"><b>${grupo.periodos[0]}</b></span><br>
          </div>
         <span class="names">${grupo.nameClients}</span><br> <br>  
         <hr>           
         <span class="coords"> ${grupo.direcciones[0]} </span><br>              
         <b><span class="coords"> ${grupo.colonias[0]} </span><br><b>             
           <div class="controls">
            <button class="btn btn-maps">Navegar</button>            
            <button class="btn btn-delete">Eliminar</button>
           </div>                 
         </div>
       `);
     
     marker.on('popupopen',(e)=>{        
      const el = e.popup.getElement();

        el.querySelector('.btn-maps').addEventListener('click',()=>{
          const {lat, lng} = marker.getLatLng();
          openInMaps(lat, lng);
        });

        /* el.querySelector('.marcar-visitado').addEventListener('click',(event)=>{          
          marcarVisitado(event.target.value); 
          alert('Visitado');                   
        }); */

        el.querySelector('.btn-delete').addEventListener('click',(event)=>{          
          map.removeLayer(marker);              
        });

        function openInMaps(lat, lng){
          const url = `https://www.google.com/maps?q=${lat},${lng}`;
          window.open(url, '_blank');
        }

     });  
  });
}     


/* ACTUALIZAR UBICACION */
let userMarker;
export function actualizarUbicacion(map, lat, lng){    
  if(!userMarker){
    const userIcon = L.icon({
     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
     shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
     iconSize: [25, 41],
     iconAnchor: [12, 41]
   });

    userMarker = L.marker([lat, lng], {icon: userIcon}).addTo(map);
  }else{
    userMarker.setLatLng([lat, lng]); // 🔥 solo se mueve
  }
}


{/* <button class="btn marcar-visitado" value="${grupo.contratos}">Visitado</button>  */}