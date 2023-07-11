import { useState, useEffect } from "react";
const ModalItem = ({ item, handleAddToCart, handleCancel, setCart, cart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [price, setPrice] = useState(0);
    const [observations, setObservations] = useState('');

    const handleQuantityChange = (e) => {
        // verify that the value is a number
        if (isNaN(e.target.value)) {
            return;
        }
        setQuantity(e.target.value);
    };


    const handleOptionChange = (e) => {
        const { name, value } = e.target;
        setSelectedOptions((prev) => ({
            ...prev,
            [name]: {
                name,
                value,
                price: e.target.price,
            }

        }));
    };

    useEffect(() => {
        let newPrice = parseFloat(item?.price);
        Object.values(selectedOptions).forEach((option) => {
            newPrice += option.price;
        });
        setPrice(newPrice * quantity);
    }, [selectedOptions, quantity, item]);

    useEffect(() => {
        setPrice(parseFloat(item?.price));
        setSelectedOptions({});
        setQuantity(1);
    }, []);

    const handleCloseClick = () => {
        setPrice(0);
        setSelectedOptions({});
        setQuantity(1);
        handleCancel();
    };



    return item && (
        <div className="bg-gray-100/90 flex flex-col justify-center items-center fixed left-0 top-0 w-full h-full backdrop-filter backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg  m-4 max-h-full" style={{ transform: "translateY(-5%)" }}>
                <div className="p-4 flex">
                    <div className="relative h-24 w-24 mr-4">
                        <div className="flex items-center h-full">
                            <img src={item.image} className="h-full w-full object-cover border-gray-300 rounded-lg" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                        <p className="text-gray-500">${item.price}</p>
                        <p className="text-gray-500 mt-2">{item.description}</p>
                    </div>
                </div>
                <hr />
                <div className="p-4 pb-0 overflow-y-auto" style={{ maxHeight: "calc(100vh - 360px)" }}>
                    {item.options?.map((option, index) => (
                        <div key={index} className="mb-2">
                            <h4 className="text-lg font-medium mb-2">{option.name}</h4>
                            <div className="flex flex-wrap  flex-col">
                                {option.choices?.map((choice) => (
                                    <div key={choice.name} className="px-2 mb-4">
                                        <label className="flex items-center bg-gray-100 rounded-lg p-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name={option.name}
                                                value={choice.name}
                                                className="mr-2 flex items-center justify-center"
                                                onChange={() => handleOptionChange({
                                                    target: {
                                                        name: option.name,
                                                        value: choice.name,
                                                        price: choice.price,
                                                    },
                                                })}
                                            />
                                            {choice.name}
                                            {choice.price > 0 && (
                                                <span className="ml-2 text-gray-500 ml-auto
                                                ">+${choice.price}</span>
                                            )}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="mb-2">
                        <h4 className="text-lg font-medium mb-2">Observations</h4>
                        <div className="flex flex-wrap  flex-col">
                            <div className="px-2 mb-4">
                                <label className="flex items-center bg-gray-100 rounded-lg p-0">
                                    <textarea
                                        type="text"
                                        name="observations"
                                        value={observations}
                                        placeholder="Add your observations here"
                                        className="m-0 flex items-center justify-center bg-gray-100 rounded-lg p-2 w-full resize-none"
                                        onChange={(e) => setObservations(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <h4 className="text-lg font-medium m-4">Total:
                    <span className="text-gray-500 ml-2">${price}</span>
                </h4>
                <hr />
                <div className="p-4 flex justify-between items-center">
                    <div className="flex mr-5">
                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="border-gray-300 rounded-l-lg p-0 w-24 text-center bg-gray-100 focus:outline-none postion-relative"
                        />
                        <button
                            className="bg-blue-500 text-white px-2 md:px-4 py-2 rounded-r-lg"
                            onClick={() => {
                                handleAddToCart({
                                    ...item,
                                    quantity,
                                    price,
                                    selectedOptions,
                                    observations,
                                });
                                handleCloseClick();
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleCloseClick}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}


export default ModalItem;