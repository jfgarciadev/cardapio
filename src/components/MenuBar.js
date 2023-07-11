
const MenuBar = ({ cart, openCart, setModalOpen, setCart }) => {


    return (
        <div className="fixed bottom-0 left-0 w-full shadow-lg flex justify-center items-center backdrop-filter backdrop-blur-sm border-t border-gray-200 
        " style={{ backgroundColor: "rgba(255,255,255,0.8)" }}>
            <div className="max-w-2xl w-full flex justify-between items-center py-2 px-4">
                <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <p className="text-sm">Home</p>
                </div>
                <div className="flex flex-col items-center relative" 
                    onClick={() => openCart()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <p className="text-sm">Carrinho</p>
                    {cart.length > 0 &&
                        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full">
                            <p className="text-xs text-white text-center font-semibold leading-2 leading-tight">{cart.length}</p>
                        </span>
                    }
                </div>
                <div className="flex flex-col items-center relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                    <p className="text-sm">Pedidos</p>
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                </div>

            </div>
        </div>
    );
}



export default MenuBar;