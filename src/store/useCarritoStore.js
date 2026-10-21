import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCarritoStore = create(
  persist(
    (set) => ({
      items: [],
      agregarProducto: (producto) =>
        set((state) => {
          const productoEnCarrito = state.items.find(
            (item) => item.id === producto.id,
          );

          if (productoEnCarrito) {
            return {
              items: state.items.map((item) =>
                item.id === producto.id
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, { ...producto, cantidad: 1 }],
          };
        }),
      disminuirProducto: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item,
            )
            .filter((item) => item.cantidad > 0),
        })),
      eliminarProducto: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      vaciarCarrito: () => set({ items: [] }),
    }),
    { name: "carrito-zustand" },
  ),
);