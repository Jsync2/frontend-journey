import { useState } from 'react'
import  Card from './components/Card'
import Cart from './components/Cart'
import OrderConfirmation from './components/OrderConfirmation'
import data from './data.json'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.name === item.name)
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const decrementQuantity = (itemName) => {
    setCartItems(prevItems => 
      prevItems.map(item =>
        item.name === itemName
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const deleteFromCart = (itemName) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== itemName))
  }

  const confirmOrder = () => {
    setShowConfirmation(true)
  }

  const closeConfirmation = () => {
    setShowConfirmation(false)
    setCartItems([])
  }

  return (
   <>
   <div className="bg-(--color-Rose-50) p-6 lg:flex lg:gap-8">
    <div className='flex-1'>
      <h1 className="text-4xl font-bold mb-6 text-(--color-Rose-900)">Desserts</h1>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((item) => (
            <Card key={item.name} item={item} onAddToCart={addToCart} onDecrementQuantity={decrementQuantity} cartItems={cartItems} />
            ))}
        </div>
      </div>
    </div>
    <div className='w-full lg:w-80'>
      <Cart cartItems={cartItems} onDelete={deleteFromCart} onConfirmOrder={confirmOrder} />
    </div>
   </div>
   {showConfirmation && (
     <OrderConfirmation 
       cartItems={cartItems} 
       totalPrice={cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
       onConfirm={closeConfirmation}
     />
   )}
   </>
  )
}
export default App
