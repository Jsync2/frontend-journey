export default function OrderConfirmation({ cartItems, totalPrice, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-160">
        <div className="flex mb-6">
          <img src="/assets/images/icon-order-confirmed.svg" alt="order confirmed" />
        </div>
        <h2 className="text-2xl font-bold text-(--color-Rose-900) mb-2">Order Confirmed</h2>
        <p className="text-(--color-Rose-500) text-sm mb-6">We hope you enjoy your food!</p>

        <div className="bg-(--color-Rose-50) rounded-lg p-4 max-h-64 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between mb-4 pb-4 border-b border-(--color-Rose-100) last:border-b-0 last:mb-0 last:pb-0">

              <div className="flex items-center gap-4">
                <img src={item.image.thumbnail} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="font-semibold text-(--color-Rose-900) text-sm">{item.name}</p>
                  <p className="text-(--color-Rose-500) text-sm"><span className="font-bold text-(--color-Red)">{item.quantity}x</span> @ ${item.price.toFixed(2)}</p>
                </div>
              </div>

              <p className="font-semibold text-(--color-Rose-900)">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="bg-(--color-Rose-50) text-white rounded-b-2xl p-4 mb-6 flex justify-between items-center">
          <p className="text-(--color-Rose-900)">Order Total</p>
          <p className="text-2xl font-bold text-(--color-Rose-900)">${totalPrice.toFixed(2)}</p>
        </div>

        <button
          onClick={onConfirm}
          className="w-full bg-(--color-Red) text-white font-semiboldbold py-3 rounded-full cursor-pointer"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}
