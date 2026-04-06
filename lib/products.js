// lib/products.js - Central product data store (simulated DB)

export function formatLkr(amount) {
  const numeric = typeof amount === 'number' ? amount : Number(amount)
  if (!Number.isFinite(numeric)) return '—'

  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric)
}

export const initialProducts = [
  {
    id: '1',
    name: 'Obsidian Oversized Tee',
    price: 89.00,
    code: 'OOT-001',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    description: 'A premium heavyweight oversized tee crafted from 100% organic cotton. Features a dropped shoulder silhouette, ribbed collar, and a subtle tonal logo embroidery at the chest. The fabric has a slight brushed texture for a luxuriously soft hand feel that only gets better with every wash. Perfect for layering or wearing solo.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Tops',
  },
  {
    id: '2',
    name: 'Slate Wide-Leg Trousers',
    price: 145.00,
    code: 'SWT-002',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148e49b34e?w=800&q=80',
    description: 'Tailored wide-leg trousers in a refined slate grey fabric with a subtle herringbone weave. Features a high-rise waist, hidden side zip closure, and two deep side pockets. The hem is left raw for a modern edge. Fully lined for comfort and structure.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Bottoms',
  },
  {
    id: '3',
    name: 'Void Longline Jacket',
    price: 299.00,
    code: 'VLJ-003',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    description: 'A statement longline jacket in deep charcoal, structured with a canvas interlining for shape and drape. Features a hidden button placket, two slit pockets, and a back vent for ease of movement. The collar can be worn open or fastened for a more tailored look.',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Outerwear',
  },
  {
    id: '4',
    name: 'Ashen Knit Cardigan',
    price: 175.00,
    code: 'AKC-004',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    description: 'A cocooning oversized cardigan in a soft ash grey merino wool blend. Features an open-front silhouette, ribbed trim throughout, and two patch pockets. The relaxed gauge knit provides warmth without weight, making it the ultimate transitional layer.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Knitwear',
  },
  {
    id: '5',
    name: 'Monolith Crewneck',
    price: 120.00,
    code: 'MCN-005',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
    description: 'A heavyweight French terry crewneck sweatshirt with a boxy, relaxed fit. Features a thick ribbed collar, cuffs, and hem. Garment-dyed for a rich, uneven colour depth that gives each piece a unique character. Made from 500gsm fleece-backed cotton.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Tops',
  },
  {
    id: '6',
    name: 'Eclipse Wide Joggers',
    price: 135.00,
    code: 'EWJ-006',
    image: 'https://images.unsplash.com/photo-1580906853135-f1f27dbcd64f?w=800&q=80',
    description: 'Premium wide-leg joggers constructed from a heavyweight cotton-modal blend. Features an elasticated waistband with a drawstring, two side pockets, and tapered cuffs. The fabric has a luxuriously smooth face with a subtle sheen that elevates the casual silhouette.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Bottoms',
  },
  {
    id: '7',
    name: 'Phantom Coach Jacket',
    price: 215.00,
    code: 'PCJ-007',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    description: 'A lightweight coach jacket in a technical ripstop nylon with a subtle gunmetal sheen. Features a full-zip front, snap collar, and two zip chest pockets. Fully lined in a contrasting tonal fabric. Water-resistant finish for light weather protection.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Outerwear',
  },
  {
    id: '8',
    name: 'Charcoal Utility Vest',
    price: 165.00,
    code: 'CUV-008',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    description: 'A functional utility vest in durable charcoal canvas with multiple pockets. Features a zip-front closure, two chest bellows pockets, two side hand pockets, and an interior zip pocket. Adjustable side tabs for a customised fit. Washed for a lived-in aesthetic.',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Outerwear',
  },
];

// Simulated localStorage-based store for admin
export function getProducts() {
  if (typeof window === 'undefined') return initialProducts;
  const stored = localStorage.getItem('shop_products');
  return stored ? JSON.parse(stored) : initialProducts;
}

export function saveProducts(products) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('shop_products', JSON.stringify(products));
  }
}

export function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === id) || null;
}
