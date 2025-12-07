export default function Cart({cartItems, onDelete, onConfirmOrder}) {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
    <div className="rounded-lg overflow-hidden bg-white p-6">
        <h1 className="text-2xl text-(--color-Red) font-bold pb-6">Your Cart ({totalItems})</h1>
        {cartItems.length === 0 ? (
            <div className="items-center justify-center flex flex-col">
                <img src="/assets/images/illustration-empty-cart.svg" alt="empty cart" />
                <p className="text-(--color-Rose-500) font-bold text-sm pt-6">Your added items will appear here</p>
            </div>
        ) : (
            <div>
                {cartItems.map((item) => (
                    <div key={item.name} className="flex justify-between items-center py-4 border-b border-(--color-Rose-100)">
                        <div>
                            <p className="font-semibold text-(--color-Rose-900)">{item.name}</p>
                            <p className="text-sm text-(--color-Rose-500) flex gap-2"><b className="text-(--color-Red)">{item.quantity}x</b> @ ${item.price.toFixed(2)} <b>${(item.price * item.quantity).toFixed(2)}</b></p>
                        </div>
                        <button onClick={() => onDelete(item.name)}
                        className="cursor-pointer p-1 border-2 border-(--color-Rose-300) rounded-full">
                            <img src="/assets/images/icon-remove-item.svg" alt="delete" />
                        </button>
                    </div>
                ))}
                <div className="pt-6 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <p className="text-(--color-Rose-900)">Order Total</p>
                        <p className="text-2xl font-bold text-(--color-Rose-900)">${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex p-4 bg-(--color-Rose-50) rounded-lg justify-center">
                        <img src="/assets/images/icon-carbon-neutral.svg" alt="delivery" />
                        <p className="text-sm">This is a <b className="text-(--color-Rose-900)">carbon-neutral</b> delivery</p>
                    </div>
                    <button onClick={onConfirmOrder} className="cursor-pointer">
                        <p className="bg-(--color-Red) text-white font-semibold text-center py-3 rounded-full hover:bg-red-950 transition-colors">Confirm Order</p>
                    </button>
                </div>
            </div>
        )}
    </div>
    );
}