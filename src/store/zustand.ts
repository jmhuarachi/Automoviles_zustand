import { create } from "zustand";
import { Automovil, CartItem } from "../types";
import { persist } from "zustand/middleware";

const MAX_QUANTITY = 10; // Maximo de unidades por producto

type CartState = {
    cart: CartItem[];
    addToCart: (automovil: Automovil) => void;
    eliminarDelCarrito: (automovilId: number) => void;
    vaciarCarrito: () => void;
    actualizarCantidad: (automovilId: number, ajusteCantidad: number) => void;
    cantidadTotal: () => number;

}

export const useCartStore = create<CartState>()(
    persist(
        
    (set, get ) => ({
        cart: [],
        addToCart: (automovil) =>
            // Verifica si el automovil ya existe en el carrito
            
            
            set((state) => {
                const automovilExiste = state.cart.find(item => item.id === automovil.id)
                return {
                    // Si existe, aumenta la cantidad hasta el maximo permitido
                    cart: automovilExiste ? state.cart.map((item) => item.id === automovil.id ?
                        {
                            ...item,
                            quantity: Math.min(item.quantity + 1, MAX_QUANTITY)

                        } :
                        item
                    )
                     :
                     // Si no existe, lo agrega al carrito con cantidad 1
                     [
                        ...state.cart,
                        {
                            ...automovil,
                            quantity: 1
                        }
                    ]
                }
            }),
        eliminarDelCarrito: (automovilId) =>
            set((state) => ({
                cart: state.cart.filter((item) => item.id !== automovilId),
            })),

        vaciarCarrito: () =>
            set(() => ({
                cart: [],
            })),
        actualizarCantidad: (automovilId,ajusteCantidad) =>
            set((state) => (
                {
                    cart: state.cart.map((item) => item.id === automovilId ?
                        {
                            ...item,
                            quantity: Math.min(
                                Math.max(item.quantity + ajusteCantidad, 1), // Evita que la cantidad sea menor a 1
                                MAX_QUANTITY // Evita que la cantidad supere el maximo permitido    
                            ) // Evita que la cantidad sea menor a 1
                        } : item
                    )
                }
            
            ) ),
        cantidadTotal: () =>
            get().cart.reduce((total, item) =>total + item.price * item.quantity, 0) // Total de productos en el carrito
        

    }),
    {
        name: "cart-storage", // nombre del storage
        // almacenamiento local
    }
    )
)
