import { useCarritoStore } from "../store/useCarritoStore";
function Encabezado() {
  const items = useCarritoStore((state) => state.items);
  const totalUnidades = items.reduce((suma, item) => suma + item.cantidad, 0);
  return (
    <header className="encabezado">
      <div className="marca">
        <span className="marca-icono" aria-hidden="true">
          ✦
        </span>
        <div>
          <h1>Mi Tienda</h1>
          <small>Detalles que te encantan</small>
        </div>
      </div>
      <span className="insignia" aria-label={`${totalUnidades} productos en el carrito`}>
        <span aria-hidden="true">◈</span>
        {totalUnidades}
      </span>
    </header>
  );
}
export default Encabezado;
