import { useCarritoStore } from "../store/useCarritoStore";

const formatoPrecio = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "USD",
});

function Carrito() {
  const items = useCarritoStore((state) => state.items);
  const disminuirProducto = useCarritoStore(
    (state) => state.disminuirProducto,
  );
  const eliminarProducto = useCarritoStore((state) => state.eliminarProducto);
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito);
  const total = items.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0,
  );
  if (items.length === 0) {
    return (
      <section className="panel">
        <h2>Carrito</h2>
        <p className="vacio">Tu carrito está vacío</p>
      </section>
    );
  }
  return (
    <section className="panel">
      <h2>Carrito</h2>
      {items.map((item) => (
        <div key={item.id} className="fila">
          <div className="fila-producto">
            {item.imagen && (
              <img
                className="miniatura miniatura-carrito"
                src={item.imagen}
                alt=""
                loading="lazy"
              />
            )}
            <div className="fila-texto">
              <p className="fila-nombre">{item.nombre}</p>
              <p className="fila-detalle">
                {item.cantidad} x {formatoPrecio.format(item.precio)}
              </p>
              <p className="fila-subtotal">
                Subtotal: {formatoPrecio.format(item.precio * item.cantidad)}
              </p>
            </div>
          </div>
          <div className="acciones-fila">
            <button
              className="btn btn-disminuir"
              onClick={() => disminuirProducto(item.id)}
              aria-label={`Disminuir cantidad de ${item.nombre}`}
            >
              −
            </button>
            <button
              className="btn btn-secundario"
              onClick={() => eliminarProducto(item.id)}
            >
              Quitar
            </button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total</span>
        <strong>{formatoPrecio.format(total)}</strong>
      </div>
      <button className="btn btn-secundario btn-bloque" onClick={vaciarCarrito}>
        Vaciar carrito
      </button>
    </section>
  );
}

export default Carrito;