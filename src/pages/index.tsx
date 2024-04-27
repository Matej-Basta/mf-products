"use-client"
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import  ProductType  from '../types/ProductInterface';
import Product from '../components/Product';
import styles from './home.module.css';
import productsData from '../data/productsData';

const BASE_URL = 'https://server-for-products.vercel.app/api/products';

export const getStaticProps = (async (context) => {
  // Fetch data from external API
  const res = await fetch(BASE_URL)
  const {products} = await res.json();
  // Pass data to the page via props
  return { props: { products } }
}) satisfies GetStaticProps<{ products: ProductType[] }>

export default function Home({products}: InferGetStaticPropsType<typeof getStaticProps>) {
    products = products ? products : productsData;
    return (
      <div className={styles.products}>
        {products.map((product: ProductType) => (
          <Product key={product.id} product={product}/>
        ))} 
      </div>
    );
}