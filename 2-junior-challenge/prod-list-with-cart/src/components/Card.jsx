import AddToCartButton from "./Button";

export default function Card({item, onAddToCart, onDecrementQuantity, cartItems}){
    const cartItem = cartItems.find(cartItem => cartItem.name === item.name);
    const isActive = cartItem && cartItem.quantity > 0;
    
    return (
    <div className="rounded-lg overflow-hidden">
      <picture className={isActive ? "block border-2 border-(--color-Red) rounded-lg" : ""}>
        <source media="(min-width: 1024px)" srcSet={item.image.desktop} />
        <source media="(min-width: 768px)" srcSet={item.image.tablet} />
        <img
          src={item.image.mobile} 
          alt={item.name} 
          className="w-full object-cover rounded-lg"
        />
      </picture>
      <AddToCartButton item={item} onAddToCart={onAddToCart} onDecrementQuantity={onDecrementQuantity} cartItems={cartItems} />
      <div className="p-4">
        <p className="text-(--color-Rose-500) text-sm">{item.category}</p>
        <h2 className="text-base font-bold text-(--color-Rose-900)">{item.name}</h2>
        <p className="text-(--color-Red) font-semibold text-sm">${item.price.toFixed(2)}</p>
      </div>
    </div>
  );
}