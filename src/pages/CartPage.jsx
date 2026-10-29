import { Link } from 'react-router-dom';
import Layout from './Layout';
import Section from '../components/Section';
import { formatPrice } from '../data/products';
import { useStore } from '../context/StoreContext';
import './CartPage.css';

export default function CartPage() {
  const { cart, cartSubtotal, updateQuantity } = useStore();

  return (
    <Layout>
      <div className="container cart-page">
        <Section title="Meu carrinho" titleAlign="left">
          {!cart.length ? (
            <div className="cart-page__empty">
              <p>Seu carrinho está vazio.</p>
              <Link to="/products">Continuar comprando</Link>
            </div>
          ) : (
            <div className="cart-page__layout">
              <div className="cart-page__items">
                {cart.map((item) => (
                  <article className="cart-item" key={item.key}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item__details">
                      <h2>{item.name}</h2>
                      {item.size && <p>Tamanho: {item.size}</p>}
                      {item.color && <p>Cor: {item.color}</p>}
                      <button type="button" onClick={() => updateQuantity(item.key, 0)}>Remover</button>
                    </div>
                    <div className="cart-item__quantity">
                      <label htmlFor={`quantity-${item.key}`}>Quantidade</label>
                      <input
                        id={`quantity-${item.key}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.key, Number(event.target.value))}
                      />
                    </div>
                    <strong>{formatPrice((item.priceDiscount ?? item.price) * item.quantity)}</strong>
                  </article>
                ))}
              </div>
              <aside className="cart-summary">
                <h2>Resumo do pedido</h2>
                <div><span>Subtotal</span><strong>{formatPrice(cartSubtotal)}</strong></div>
                <div><span>Frete</span><strong>Calcular no checkout</strong></div>
                <hr />
                <div><span>Total parcial</span><strong>{formatPrice(cartSubtotal)}</strong></div>
                <p>O frete será estimado pelo CEP no checkout. Pagamentos desta versão são apenas simulações.</p>
                <Link to="/checkout">IR PARA CHECKOUT</Link>
              </aside>
            </div>
          )}
        </Section>
      </div>
    </Layout>
  );
}
