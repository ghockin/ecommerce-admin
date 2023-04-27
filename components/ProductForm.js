import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Layout from "./Layout";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGotoProducts] = useState('');
    const router = useRouter();
    const data = { title, description, price };

    async function createProduct(ev) {
        ev.preventDefault();
        if (_id) {
            //update
            await axios.put('/api/products', { ...data, _id });
        } else {
            //create
            await axios.post('/api/products', data);
        }
        setGotoProducts(true);
    }
    if (goToProducts) {
        router.push('/products');
    }


    return (
        <form onSubmit={createProduct}>
            <label>Product name</label>
            <input type='text' placeholder='product name'
                value={title} onChange={ev => setTitle(ev.target.value)}></input>
            <label>Description</label>
            <textarea placeholder='description'
                value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
            <label>Price (in USD)</label>
            <input type='number' placeholder='price'
                value={price}
                onChange={ev => setPrice(ev.target.value)}></input>
            <button type='submit' className="btn-primary">Save</button>
        </form>
    )
}