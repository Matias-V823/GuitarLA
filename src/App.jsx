import { useState, useEffect } from 'react';
import Header from './components/Header';
import Guitar from './components/Guitar';
import { db } from './data/db';

function App() {

    const initialCart = () =>{
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data, setData] = useState([])
    const [cart, setCart] = useState(initialCart)


    //Una vez que el componente esté listo se manda a llamar la información
    useEffect(() => {
        setData(db)
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    
    

    function addToCart(item) {
        const itemExists = cart.findIndex(guitar => guitar.id == item.id)
        if(itemExists >= 0){
            if(cart[itemExists].quantity >= 5) return
            const updateCart = [...cart]
            updateCart[itemExists].quantity++
            setCart(updateCart)
        }else{
            item.quantity = 1
            setCart([...cart, item])
        }
    }


    function deleteCart(id){
        setCart(prevCart => prevCart.filter(guitar => guitar.id != id))
    }


    function increaseQuantity(id){
        const updateCart = cart.map(item => {
            if(item.id === id && item.quantity < 5){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function decreaseQuantity(id){
        const decreaseUpdateCart = cart.map(item => {
            if(item.id === id && item.quantity > 1){
                return{
                    ...item,
                    quantity: item.quantity -1
                }
            }
            return item
        })
        setCart(decreaseUpdateCart)
    }

    function clearCart() {
        setCart([])
    }


    return ( //expressions
        <>
            <Header 
                cart={cart}
                deleteCart={deleteCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    { //Siempre que iteres un .map debes pasarle un identificador unico
                        data.map((guitar) => (
                            <Guitar 
                                key={guitar.id}
                                guitar={guitar}
                                setCart={setCart}
                                addToCart={addToCart}
                            />
                        ))
                    }

                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>

        </>
    )
}

export default App
