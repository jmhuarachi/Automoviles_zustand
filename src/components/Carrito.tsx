import { useCartStore } from "../store/zustand"

export default function Carrito() {

    const { cart, eliminarDelCarrito , vaciarCarrito, actualizarCantidad , cantidadTotal} = useCartStore()
    const montoTotal = cantidadTotal()
    return (
        <div id="carrito-content" className="carrito-content">
            {cart.length === 0 ? (

                <p className="text-center">El carrito esta vacio</p>
            ) : (
                <>
                    <table className="w-100 table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(({ id, name, price, image, quantity }) => (


                                <tr
                                    key={id}
                                >
                                    <td className="align-middle">
                                        <img className="img-fluid" src={`img/${image}.jpg`} alt={name} />
                                    </td>
                                    <td className="align-middle">{name}</td>
                                    <td className="fw-bold align-middle">$ {price.toLocaleString()}</td>
                                    <td className="align-middle">
                                        <div className="d-flex align-items-center gap-4">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => actualizarCantidad(id, -1)}
                                            >
                                                -
                                            </button>
                                            {quantity}
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => actualizarCantidad(id, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="align-middle border-top-0">
                                        <button
                                            type="button"
                                            className="btn-close"
                                            aria-label="Close"
                                            onClick={() => eliminarDelCarrito(id)}
                                        ></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <p className="text-end">Total a pagar: <span className="fw-bold">$ {montoTotal.toLocaleString()}</span></p>
                </>

            )}
            <button
                className="btn btn-dark w-100 mt-3 p-2"
                type="button"
                onClick={() => vaciarCarrito()}
            >Vaciar Carrito</button>


        </div>
    )
}
