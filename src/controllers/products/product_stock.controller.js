import { useState } from 'react'
import { useEffect } from 'react'

export const useProductStockController = () => {
  const [sku, setSku] = useState('');
  const [tax, setTax] = useState(0);
  const [addons,setAddons] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
}