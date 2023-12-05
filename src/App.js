import React,{useState} from 'react';
  import '././index.css';
  
  
  function App() {
    function subscribeToPush() {
      if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            navigator.serviceWorker.ready.then(registration => {
              // Obtenemos la suscripción actual o la creamos si no existe
              registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('Tu clave pública de VAPID'),
              })
              .then(subscription => {
                console.log('Suscripción exitosa:', subscription);
                // Envía la suscripción al servidor para futuras notificaciones
                sendSubscriptionToServer(subscription);
              })
              .catch(error => {
                console.error('Error al suscribirse:', error);
              });
            });
          }
        });
      }
    }

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
    
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
    
      return outputArray;
    }
    
    // Enviar la suscripción al servidor (simulado)
    function sendSubscriptionToServer(subscription) {
      // Aquí deberías enviar la suscripción a tu servidor
      console.log('Suscripción enviada al servidor:', subscription);
    }
    
    const addDataIntoCache = (cacheName, url, response) => {
      // Converting our response into Actual Response form
      const data = new Response(JSON.stringify(response));
    
      if ('caches' in window) {
        // Opening given cache and putting our data into it
        caches.open(cacheName).then((cache) => {
          cache.put(url, data);
          alert('Datos Agregados al caché!')
        });
      }
    };
   

    return (
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', border:0}}>
        <div className="container">
        <h1>GeoloCity</h1>
        <button  onClick={subscribeToPush}>Habilitar notificaciones</button>
        <div style={{ height: 500, width: '80%' }}>
      <h4>How to store data into cache in ReactJS?</h4>
      <button onClick={()=>addDataIntoCache('MyCache',
      'https://localhost:300','SampleData')} >
        Add Data Into Cache</button>
    </div>
     
      </div>
       
        <iframe   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60502.52117857576!2d-98.47396214999999!3d18.600729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cf00199790a25b%3A0xfe50642632b2f2c7!2sIz%C3%BAcar%20de%20Matamoros%2C%20Pue.!5e0!3m2!1ses-419!2smx!4v1701701320506!5m2!1ses-419!2smx" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    );
  }
  
  export default App;
  