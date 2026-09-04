import { definirRuta, iniciarRouter } from './router.js';
import { crearHeader } from './components/header.js';
import { crearNavbar } from './components/navbar.js';
import { renderHome } from './pages/home.js';
import { renderBusqueda } from './pages/busqueda.js';
import { renderDetalle } from './pages/detalle.js';
import { renderFavoritos } from './pages/favoritos.js';
import { renderHistorial } from './pages/historial.js';

const app = document.querySelector('#app');

app.appendChild(crearHeader());
app.appendChild(crearNavbar());

const vista = document.createElement('div');
vista.id = 'vista';
app.appendChild(vista);

definirRuta('/', renderHome);
definirRuta('/busqueda', renderBusqueda);
definirRuta('/detalle/:id', renderDetalle);
definirRuta('/favoritos', renderFavoritos);
definirRuta('/historial', renderHistorial);

iniciarRouter(vista);
