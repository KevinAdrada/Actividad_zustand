import { useEffect, useState } from "react";
import { useCarritoStore } from "../store/useCarritoStore";

const formatoPrecio = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "USD",
});

function ListaProductos() {
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProductos() {
      try {
        const respuesta = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          throw new Error(`La API respondió con el estado ${respuesta.status}.`);
        }

        const datos = await respuesta.json();
        if (
          !Array.isArray(datos) ||
          !datos.every(
            (producto) =>
              Number.isInteger(producto.id) &&
              typeof producto.title === "string" &&
              Number.isFinite(producto.price) &&
              typeof producto.image === "string",
          )
        ) {
          throw new Error("La API devolvió productos con un formato inválido.");
        }

        setProductos(
          datos.map((producto) => ({
            id: producto.id,
            nombre: producto.title,
            precio: producto.price,
            imagen: producto.image,
          })),
        );
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los productos.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => controller.abort();
  }, []);

  return (
    <section className="panel">
      <h2>Productos</h2>
      {cargando && (
        <p className="estado-api" role="status">
          Cargando productos...
        </p>
      )}
      {error && (
        <p className="estado-api estado-error" role="alert">
          No fue posible cargar los productos: {error}
        </p>
      )}
      {!cargando && !error && productos.length === 0 && (
        <p className="estado-api">No hay productos disponibles.</p>
      )}
      {!cargando &&
        !error &&
        productos.map((producto) => (
          <div key={producto.id} className="fila">
            <div className="fila-producto">
              <img
                className="miniatura"
                src={producto.imagen}
                alt=""
                loading="lazy"
              />
              <div className="fila-texto">
                <p className="fila-nombre">{producto.nombre}</p>
                <p className="fila-detalle">
                  {formatoPrecio.format(producto.precio)}
                </p>
              </div>
            </div>
            <button
              className="btn btn-primario"
              onClick={() => agregarProducto(producto)}
            >
              Agregar
            </button>
          </div>
        ))}
    </section>
  );
}

export default ListaProductos;
