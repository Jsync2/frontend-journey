import { useMemo } from 'react';

export default function AddToCartButton({item, onAddToCart, onDecrementQuantity, cartItems}) {
  // Get quantity from cart state
  const cartItem = useMemo(() => 
    cartItems.find(cartItem => cartItem.name === item.name),
    [cartItems, item.name]
  );
  
  const quantity = cartItem ? cartItem.quantity : 0;

  // Function to handle adding the first item
  const addToCart = () => {
    onAddToCart(item);
  };

  // Functions to increase or decrease quantity
  const increment = () => {
    onAddToCart(item);
  };
  const decrement = () => {
    if (quantity > 0) {
      onDecrementQuantity(item.name);
    }
  };

  return (
    <div className="flex justify-center relative py-2">
      {quantity === 0 ? (
        /* STATE A: Default "Add to Cart" Button */
        <button onClick={addToCart}
          className="flex gap-2 absolute -top-6 cursor-pointer p-1.5 px-4 bg-white rounded-full border-2 border-(--color-Rose-400) hover:border-(--color-Red) hover:border-2">
          <img src="/assets/images/icon-add-to-cart.svg" alt="add to cart" />
          <span className="text-(--color-Rose-900) font-bold hover:text-(--color-Red)">Add to cart</span>
        </button>
      ) : (
        /* STATE B: Active Quantity Selector (Orange) */
        <div className="flex items-center justify-between absolute -top-6 w-1/2 p-2 px-4 rounded-full bg-(--color-Red) text-white">
          <button onClick={decrement}
            className="w-5 h-5 flex items-center justify-center border border-white rounded-full hover:bg-white transition-colors cursor-pointer hover:text-(--color-Red)">
            -
          </button>
          <span className="font-semibold">{quantity}</span>
          <button onClick={increment}
            className="w-5 h-5 flex items-center justify-center border border-white rounded-full hover:bg-white transition-colors cursor-pointer hover:text-(--color-Red)">
            +
          </button>
        </div>
      )}
    </div>
  );
}
