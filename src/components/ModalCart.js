
const ModalCart = ({ cart, setCart, setModalOpen }) => {
    return (
        <div className="bg-gray-100/90 flex flex-col justify-center items-center fixed left-0 top-0 w-full h-full backdrop-filter backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg  m-4 max-h-full" style={{ transform: "translateY(-5%)" }}>
                {cart.map((item) => (
                    <div className="p-4 flex">
                        <div className="relative h-24 w-24 mr-4">
                            <div className="flex items-center h-full">
                                <img src={item.image} className="h-full w-full object-cover border-gray-300 rounded-lg" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <div className="text-white font-bold text-xl">{item.name}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-2 flex-row">
                                <div className="text-gray-800 font-bold text-x2">{item.quantity} x {item.name}</div>
                                <div className="text-gray-800 font-bold text-xl">{item.price}</div>
                            </div>
                            <div className="text-gray-400 text-sm">{item.observations}</div>
                        </div>

                    </div>
                ))}
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
                    <div className="text-gray-800 font-bold text-xl">Total</div>
                    <div className="text-gray-800 font-bold text-xl">{cart.reduce((acc, item) => acc + item.price, 0)}</div>
                </div>
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mr-4 rounded" onClick={() => setModalOpen(false)}>Cancelar</button>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => setModalOpen(false)}>Confirmar</button>
                </div>
            </div>
        </div>

    )
}

export default ModalCart