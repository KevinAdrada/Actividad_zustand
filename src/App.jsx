import "./App.css";
import Encabezado from './components/Encabezado'
import ListaProductos from './components/ListaProductos'
import Carrito from './components/Carrito'

function App() {
  return (
    <div className="app">
      <Encabezado />
      <section className="introduccion">
        <p className="eyebrow">Selección para ti</p>
        <h2>Encuentra tus favoritos.</h2>
        <p>Explora nuestros productos y arma tu carrito ideal.</p>
      </section>
      <main className="contenido">
        <ListaProductos />
        <Carrito />
      </main>
    </div>
  );
}

export default App