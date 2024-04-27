"use client";
import ProductType from '../types/ProductInterface';
import styles from './product.module.css';

const bc = new BroadcastChannel('cart');

export default function Product({ product }: { product: ProductType }) {
    
    
    const addToCart = () => {
        bc.postMessage({action: "add", product: product});
    }

    return (
        <div className={styles["product-container"]}>
            <img src={product.image} alt={product.name} className={styles["product-image"]}/>
            <div className={styles["product-text"]}>
                <div className={styles["product-header"]}>
                    <h2 className={styles["product-heading"]}>{product.name}</h2>
                    <p className={styles["product-price"]}>{product.price} DKK</p>
                </div>
                <p>{product.description}</p>
                <button onClick={addToCart} className={styles["product-button"]}>Add to Cart</button>
            </div>
        </div>
    )
}