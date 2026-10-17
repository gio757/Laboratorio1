import React, { useState, useEffect } from 'react';

// Catálogo base de 10 Variantes Hamburger Rapid con compatibilidad offline/standalone
const INITIAL_BURGER_MENU = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especiales',
    specialtyLevel: 'Nivel Maestro ★★★★★',
    specialtyBadge: 'Firma del Chef',
    price: 14.99,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    tagline: 'Doble Angus 360g, cheddar ahumado y panceta al bourbon',
    description: 'Doble medallón de 180g flameado a la leña, cheddar añejo 12 meses y salsa secreta Real.'
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Clásicas',
    specialtyLevel: 'Nivel Clásico Real ★★★★☆',
    specialtyBadge: 'Clásica de Autor',
    price: 9.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    tagline: 'Smash 180g, queso americano y pepinillos caseros',
    description: 'Receta tradicional perfeccionada con costra sellada al hierro candente.'
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Clásicas',
    specialtyLevel: 'Nivel Doble Gourmet ★★★★☆',
    specialtyBadge: 'Doble Poder',
    price: 12.50,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    tagline: 'Doble medallón 300g, cheddar y queso suizo emmental',
    description: 'Quesos derretidos en cascada, cebolla morada macerada y mayo-chipotle.'
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Especiales',
    specialtyLevel: 'Nivel Reserva Especial ★★★★★',
    specialtyBadge: 'Edición Limitada',
    price: 13.90,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80',
    tagline: 'Huevo de campo, bacon ahumado en manzano y aioli de trufa',
    description: 'Doble Angus smash, yema cremosa, queso Monterrey Jack fundido y crema trufada.'
  },
  {
    id: 5,
    name: 'Truffle Mushroom Melt',
    category: 'Especiales',
    specialtyLevel: 'Nivel Alta Cocina ★★★★★',
    specialtyBadge: 'Gourmet Exclusivo',
    price: 15.50,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=600&auto=format&fit=crop&q=80',
    tagline: 'Hongos shiitake y portobellos a la mantequilla trufada',
    description: 'Angus de pastura 200g, queso gruyère francés y emulsión de trufa blanca.'
  },
  {
    id: 6,
    name: 'Royal Crispy Chicken Ranch',
    category: 'Pollo & Crispy',
    specialtyLevel: 'Nivel Crispy Dorado ★★★★☆',
    specialtyBadge: 'Crujiente Secreto',
    price: 11.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80',
    tagline: 'Pechuga marinada 24h con rebozado crujiente de 11 especias',
    description: 'Queso provolone ahumado, ensalada coleslaw fresca con manzana verde y ranch de aguacate.'
  },
  {
    id: 7,
    name: 'Smash Bacon Barbecue Supreme',
    category: 'Clásicas',
    specialtyLevel: 'Nivel Ahumado Clásico ★★★★☆',
    specialtyBadge: 'Smoked Master',
    price: 11.90,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80',
    tagline: 'Salsa barbacoa casera al espresso y aros de cebolla Texas',
    description: '4 tiras de bacon crocante, cheddar inglés fundido y salsa BBQ a la cerveza negra.'
  },
  {
    id: 8,
    name: 'Spicy Flame Volcano Habanero',
    category: 'Especiales',
    specialtyLevel: 'Nivel Fuego Bravo ★★★★★',
    specialtyBadge: 'Picante Bravo',
    price: 12.80,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80',
    tagline: 'Jalapeños asados y crema volcánica de habanero',
    description: 'Queso pepper jack fundido, cebolla a la leña y toque picante de alta intensidad.'
  },
  {
    id: 9,
    name: 'Veggie Portobello & Queso de Cabra',
    category: 'Vegetarianas',
    specialtyLevel: 'Nivel Verde Gourmet ★★★★☆',
    specialtyBadge: 'Plant Premium',
    price: 10.50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop&q=80',
    tagline: 'Portobello asado, rulo de cabra caramelizado y pesto',
    description: 'Medallón de quinoa y lentejas rojas, rúcula fresca y tomates secos confitados.'
  },
  {
    id: 10,
    name: 'Doble Monster Ribs Cheddar Melt',
    category: 'Especiales',
    specialtyLevel: 'Nivel Legendario XXL ★★★★★',
    specialtyBadge: 'Coloso XXL',
    price: 16.90,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=80',
    tagline: 'Angus 200g y costillas de cerdo braseadas por 8 horas',
    description: 'Bañada en doble cheddar líquido, pepinillos dulces y cebolla morada encurtida.'
  }
];

const PROMOTIONS = [
  {
    id: 'promo-1',
    name: 'Combo Corona Real 👑',
    badge: 'Ahorra $8.00',
    price: 22.99,
    originalPrice: 30.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: '2x Rey de las Burgers + Papas Fritas Trufadas + 2 Bebidas Grandes.',
    tag: 'Más Popular'
  },
  {
    id: 'promo-2',
    name: 'Rapid Lunch 2x1 Clásico',
    badge: '2x1 Exclusivo',
    price: 9.99,
    originalPrice: 19.98,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    description: 'Paga 1 Burger Real Clásica y llévate la 2da totalmente gratis.',
    tag: '12:00 a 16:00'
  },
  {
    id: 'promo-3',
    name: 'Fiesta Crispy & Aros',
    badge: '25% OFF',
    price: 14.50,
    originalPrice: 19.00,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80',
    description: '1x Royal Crispy Chicken Ranch + Aros de Cebolla Texas + Bebida.',
    tag: 'Combo Familiar'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'ofertas' | 'ordenes' | 'perfil'
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Products & Filter
  const [products, setProducts] = useState(INITIAL_BURGER_MENU);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Orders State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBurgerForModal, setSelectedBurgerForModal] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState({
    bacon: false,
    cheddar: false,
    truffleDip: false
  });

  // Simulated Orders
  const [orders, setOrders] = useState([
    {
      id: 'RAPID-78241',
      date: 'Hoy, 13:45',
      status: 'En camino',
      step: 3,
      items: [
        { name: 'Rey de las Burgers', qty: 1, price: 14.99 },
        { name: 'Papas Trufadas', qty: 1, price: 3.99 }
      ],
      total: 18.98,
      address: 'Av. Las Condes 9200, Depto 402',
      paymentMethod: 'Tarjeta Visa •••• 4821'
    }
  ]);
  const [orderSuccessModal, setOrderSuccessModal] = useState(null);

  // Network & PWA listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    // Try fetching products from backend if server is active
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          // If server returns burgers, sync them
          const burgerList = data.data.filter(p => p.category !== 'Computadoras' && p.category !== 'Audio');
          if (burgerList.length > 0) {
            setProducts(burgerList);
          }
        }
      })
      .catch(() => {
        // Standalone or offline fallback is already INITIAL_BURGER_MENU
      });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.tagline && p.tagline.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Add to Cart
  const handleAddToCart = (burger, quantity = 1, extras = {}) => {
    let extraCost = 0;
    const extrasList = [];
    if (extras.bacon) { extraCost += 1.50; extrasList.push('Extra Bacon (+ $1.50)'); }
    if (extras.cheddar) { extraCost += 1.00; extrasList.push('Queso Cheddar Fundido (+ $1.00)'); }
    if (extras.truffleDip) { extraCost += 1.80; extrasList.push('Dip Trufa Blanca (+ $1.80)'); }

    const itemUnitPrice = burger.price + extraCost;
    const cartItemId = `${burger.id}-${extras.bacon ? 'b' : ''}-${extras.cheddar ? 'c' : ''}-${extras.truffleDip ? 't' : ''}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          burgerId: burger.id,
          name: burger.name,
          price: itemUnitPrice,
          image: burger.image,
          qty: quantity,
          extrasList
        }
      ];
    });

    setSelectedBurgerForModal(null);
    setModalQuantity(1);
    setSelectedExtras({ bacon: false, cheddar: false, truffleDip: false });
    setIsCartOpen(true);
  };

  const updateCartQty = (cartItemId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryFee = cartTotal > 20 || cartTotal === 0 ? 0 : 1.99;
  const finalTotal = cartTotal + deliveryFee;

  // Simulate Purchase Checkout
  const handleSimulatePurchase = async () => {
    if (cart.length === 0) return;

    const newOrderData = {
      customer: 'Carlos Valdivia',
      items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      total: finalTotal,
      paymentMethod: 'Tarjeta Visa •••• 4821'
    };

    // Attempt to register in backend API if online
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrderData)
      });
    } catch (e) {
      // Offline fallback works seamlessly
    }

    const orderNumber = 'RAPID-' + Math.floor(10000 + Math.random() * 90000);
    const createdOrder = {
      id: orderNumber,
      date: 'Ahora mismo',
      status: 'En cocina',
      step: 2,
      items: [...cart],
      total: finalTotal,
      address: 'Av. Providencia 1450, Piso 5',
      paymentMethod: 'Tarjeta Visa •••• 4821'
    };

    setOrders(prev => [createdOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    setOrderSuccessModal(createdOrder);
    setActiveTab('ordenes');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-app)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Top Mobile App Bar */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #ede8df',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 30
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem' }}>🍔</span>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1c1917', lineHeight: 1.1 }}>
              Hamburger <span style={{ color: '#d97706' }}>Rapid</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#78716c', fontWeight: '600' }}>
              📍 Av. Providencia 1450 &bull; 20 min
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.68rem',
            padding: '3px 8px',
            borderRadius: '999px',
            fontWeight: '700',
            background: isOnline ? 'rgba(5, 150, 105, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: isOnline ? '#059669' : '#dc2626'
          }}>
            {isOnline ? '🟢 En línea' : '🔴 Offline'}
          </span>

          {/* Cart Floating Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: '#fef3c7',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              color: '#92400e',
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer'
            }}
          >
            🛒 {cart.reduce((n, i) => n + i.qty, 0)}
          </button>
        </div>
      </header>

      {/* Main Scrollable View Area */}
      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '76px' }} className="fade-in">
        
        {/* ==================== TAB: MENÚ ==================== */}
        {activeTab === 'menu' && (
          <div style={{ padding: '14px 16px' }}>
            
            {/* Promo Header Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '16px 18px',
              marginBottom: '16px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 20px -4px rgba(28, 25, 23, 0.15)'
            }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fbbf24', fontWeight: '800' }}>
                👑 Especialidad de la Semana
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '4px 0 6px' }}>
                Rey de las Burgers
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#d6d3d1', lineHeight: '1.4', maxWidth: '240px' }}>
                Doble Angus a la leña, cheddar añejo 12 meses y panceta al bourbon.
              </p>
              <button
                onClick={() => handleAddToCart(INITIAL_BURGER_MENU[0], 1)}
                style={{
                  marginTop: '10px',
                  background: '#d97706',
                  color: '#ffffff',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Pedir $14.99 ⚡
              </button>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="Buscar hamburguesa favorita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 36px',
                  borderRadius: '12px',
                  border: '1px solid #ede8df',
                  background: '#ffffff',
                  fontSize: '0.88rem',
                  color: '#1c1917',
                  outline: 'none'
                }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#a8a29e' }}>🔍</span>
            </div>

            {/* Category Chips */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '10px' }}>
              {['Todas', 'Especiales', 'Clásicas', 'Pollo & Crispy', 'Vegetarianas'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? '#d97706' : '#ede8df',
                    background: selectedCategory === cat ? '#d97706' : '#ffffff',
                    color: selectedCategory === cat ? '#ffffff' : '#78716c',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Burger List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredProducts.map(burger => (
                <div
                  key={burger.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #ede8df',
                    borderRadius: '16px',
                    padding: '12px',
                    display: 'flex',
                    gap: '12px',
                    boxShadow: '0 2px 8px rgba(28,25,23,0.04)',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={burger.image}
                    alt={burger.name}
                    style={{ width: '84px', height: '84px', objectFit: 'cover', borderRadius: '12px' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: '800',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: '#fef3c7',
                        color: '#92400e'
                      }}>
                        {burger.specialtyBadge || 'Gourmet'}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1c1917', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {burger.name}
                    </h3>
                    <p style={{ fontSize: '0.74rem', color: '#78716c', lineHeight: '1.3', marginTop: '2px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {burger.tagline || burger.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1c1917' }}>
                        ${burger.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => setSelectedBurgerForModal(burger)}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #d97706',
                          color: '#d97706',
                          padding: '4px 12px',
                          borderRadius: '999px',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        + Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB: OFERTAS ==================== */}
        {activeTab === 'ofertas' && (
          <div style={{ padding: '16px' }} className="fade-in">
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1c1917', marginBottom: '4px' }}>
              Ofertas & Combos Exclusivos 🔥
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#78716c', marginBottom: '16px' }}>
              Promociones activas disponibles únicamente en nuestra PWA Mobile.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {PROMOTIONS.map(promo => (
                <div
                  key={promo.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #ede8df',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 14px rgba(28,25,23,0.06)'
                  }}
                >
                  <div style={{ position: 'relative', height: '140px' }}>
                    <img src={promo.image} alt={promo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: '#ea580c',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '999px'
                    }}>
                      {promo.badge}
                    </span>
                    <span style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: 'rgba(28,25,23,0.85)',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      {promo.tag}
                    </span>
                  </div>

                  <div style={{ padding: '14px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1c1917' }}>
                      {promo.name}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#78716c', margin: '4px 0 12px' }}>
                      {promo.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1c1917' }}>
                          ${promo.price.toFixed(2)}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#a8a29e', textDecoration: 'line-through', marginLeft: '6px' }}>
                          ${promo.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddToCart({
                          id: 999,
                          name: promo.name,
                          price: promo.price,
                          image: promo.image
                        }, 1)}
                        style={{
                          background: '#d97706',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '999px',
                          fontSize: '0.82rem',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        Reclamar Oferta 🎁
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB: ORDENES ==================== */}
        {activeTab === 'ordenes' && (
          <div style={{ padding: '16px' }} className="fade-in">
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1c1917', marginBottom: '4px' }}>
              Tus Órdenes & Pedidos 🛵
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#78716c', marginBottom: '16px' }}>
              Seguimiento en vivo y simulación del estado de tu cocina.
            </p>

            {orders.map(order => (
              <div
                key={order.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #ede8df',
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '14px',
                  boxShadow: '0 4px 12px rgba(28,25,23,0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#d97706' }}>{order.id}</span>
                    <div style={{ fontSize: '0.72rem', color: '#a8a29e' }}>{order.date}</div>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    background: '#ecfdf5',
                    color: '#059669',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    border: '1px solid #a7f3d0'
                  }}>
                    {order.status}
                  </span>
                </div>

                {/* Progress Stepper */}
                <div style={{
                  background: '#f7f5f0',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: '700', color: '#78716c', marginBottom: '6px' }}>
                    <span style={{ color: order.step >= 1 ? '#d97706' : '#a8a29e' }}>1. Recibido</span>
                    <span style={{ color: order.step >= 2 ? '#d97706' : '#a8a29e' }}>2. Cocinando</span>
                    <span style={{ color: order.step >= 3 ? '#d97706' : '#a8a29e' }}>3. En Camino</span>
                    <span style={{ color: order.step >= 4 ? '#059669' : '#a8a29e' }}>4. Entregado</span>
                  </div>
                  <div style={{ height: '6px', background: '#ede8df', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: order.step === 1 ? '25%' : order.step === 2 ? '55%' : order.step === 3 ? '85%' : '100%',
                      background: 'linear-gradient(90deg, #d97706, #059669)',
                      borderRadius: '999px'
                    }}></div>
                  </div>
                </div>

                {/* Items List */}
                <div style={{ borderTop: '1px solid #f3efe6', paddingTop: '10px', marginBottom: '10px' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                      <span style={{ color: '#1c1917' }}>{item.qty}x {item.name}</span>
                      <span style={{ fontWeight: '700', color: '#1c1917' }}>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ede8df', paddingTop: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#78716c' }}>
                    Pago: {order.paymentMethod}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#1c1917' }}>
                    Total: ${order.total.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================== TAB: PERFIL ==================== */}
        {activeTab === 'perfil' && (
          <div style={{ padding: '16px' }} className="fade-in">
            {/* User Header Card */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #ede8df',
              borderRadius: '16px',
              padding: '18px',
              textAlign: 'center',
              marginBottom: '16px',
              boxShadow: '0 4px 12px rgba(28,25,23,0.05)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                color: '#b45309',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                margin: '0 auto 10px',
                border: '2px solid #d97706'
              }}>
                👨‍💼
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1c1917' }}>
                Carlos Valdivia
              </h2>
              <span style={{
                display: 'inline-block',
                background: '#fef3c7',
                color: '#92400e',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '999px',
                marginTop: '4px'
              }}>
                👑 Socio Rapid Oro
              </span>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid #f3efe6'
              }}>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#d97706' }}>1,450</div>
                  <div style={{ fontSize: '0.72rem', color: '#78716c' }}>RapidPoints ($14.50)</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1c1917' }}>14</div>
                  <div style={{ fontSize: '0.72rem', color: '#78716c' }}>Hamburguesas Pedidas</div>
                </div>
              </div>
            </div>

            {/* Navigation Options */}
            <div style={{ background: '#ffffff', border: '1px solid #ede8df', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ padding: '14px', borderBottom: '1px solid #f3efe6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#1c1917' }}>📍 Direcciones Guardadas</span>
                <span style={{ fontSize: '0.78rem', color: '#78716c' }}>Providencia 1450 ›</span>
              </div>
              <div style={{ padding: '14px', borderBottom: '1px solid #f3efe6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#1c1917' }}>💳 Método de Pago</span>
                <span style={{ fontSize: '0.78rem', color: '#78716c' }}>Visa •••• 4821 ›</span>
              </div>
              <div style={{ padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#1c1917' }}>⭐ Hamburguesa Favorita</span>
                <span style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: '700' }}>Rey de las Burgers</span>
              </div>
            </div>

            {/* Cross Links to Web & Admin */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="/"
                style={{
                  background: '#ffffff',
                  border: '1px solid #ede8df',
                  padding: '12px',
                  borderRadius: '12px',
                  color: '#1c1917',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                🌐 Ir al Portal E-commerce
              </a>
              <a
                href="/admin"
                style={{
                  background: '#1c1917',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                ⚙️ Ir al Panel Administrativo
              </a>
            </div>
          </div>
        )}
      </main>

      {/* ==================== BOTTOM TAB BAR ==================== */}
      <nav style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '66px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid #ede8df',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        alignItems: 'center',
        zIndex: 40
      }}>
        {[
          { key: 'menu', label: 'Menú', icon: '🍔' },
          { key: 'ofertas', label: 'Ofertas', icon: '🔥' },
          { key: 'ordenes', label: 'Ordenes', icon: '🛵' },
          { key: 'perfil', label: 'Perfil', icon: '👤' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: activeTab === tab.key ? '#d97706' : '#78716c',
              fontWeight: activeTab === tab.key ? '800' : '600',
              gap: '2px'
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{tab.icon}</span>
            <span style={{ fontSize: '0.72rem' }}>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* ==================== MODAL: CUSTOMIZE & ADD BURGER ==================== */}
      {selectedBurgerForModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(28,25,23,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 60,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#ffffff',
            width: '100%',
            maxWidth: '460px',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '20px',
            boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#d97706' }}>
                  {selectedBurgerForModal.specialtyLevel}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1c1917' }}>
                  {selectedBurgerForModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBurgerForModal(null)}
                style={{ background: '#f3efe6', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontWeight: '800' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#78716c', marginBottom: '14px' }}>
              {selectedBurgerForModal.description}
            </p>

            {/* Extras Selector */}
            <div style={{ background: '#f7f5f0', borderRadius: '12px', padding: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#1c1917', marginBottom: '8px' }}>
                Personaliza con Extras Gourmet:
              </div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', cursor: 'pointer' }}>
                <span>🥓 Extra Bacon Ahumado (+ $1.50)</span>
                <input
                  type="checkbox"
                  checked={selectedExtras.bacon}
                  onChange={e => setSelectedExtras({ ...selectedExtras, bacon: e.target.checked })}
                />
              </label>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', cursor: 'pointer' }}>
                <span>🧀 Doble Cheddar Líquido (+ $1.00)</span>
                <input
                  type="checkbox"
                  checked={selectedExtras.cheddar}
                  onChange={e => setSelectedExtras({ ...selectedExtras, cheddar: e.target.checked })}
                />
              </label>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', cursor: 'pointer' }}>
                <span>🍄 Dip Aioli Trufa Blanca (+ $1.80)</span>
                <input
                  type="checkbox"
                  checked={selectedExtras.truffleDip}
                  onChange={e => setSelectedExtras({ ...selectedExtras, truffleDip: e.target.checked })}
                />
              </label>
            </div>

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1c1917' }}>Cantidad:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ede8df', background: '#ffffff', fontWeight: '800', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ fontWeight: '800', fontSize: '1rem' }}>{modalQuantity}</span>
                <button
                  onClick={() => setModalQuantity(modalQuantity + 1)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ede8df', background: '#ffffff', fontWeight: '800', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => handleAddToCart(selectedBurgerForModal, modalQuantity, selectedExtras)}
              style={{
                width: '100%',
                background: '#d97706',
                color: '#ffffff',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(217, 119, 6, 0.3)'
              }}
            >
              Añadir a mi Orden &bull; ${(
                (selectedBurgerForModal.price +
                  (selectedExtras.bacon ? 1.50 : 0) +
                  (selectedExtras.cheddar ? 1.00 : 0) +
                  (selectedExtras.truffleDip ? 1.80 : 0)) * modalQuantity
              ).toFixed(2)}
            </button>
          </div>
        </div>
      )}

      {/* ==================== CART DRAWER ==================== */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(28,25,23,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 70,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            background: '#ffffff',
            width: '100%',
            maxWidth: '380px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              padding: '16px',
              borderBottom: '1px solid #ede8df',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1c1917' }}>
                Tu Carrito Rapid 🛒 ({cart.reduce((a, b) => a + b.qty, 0)})
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: '#f3efe6', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontWeight: '800' }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 10px', color: '#78716c' }}>
                  <span style={{ fontSize: '3rem' }}>🛍️</span>
                  <p style={{ marginTop: '10px', fontWeight: '600' }}>Tu carrito está vacío.</p>
                  <p style={{ fontSize: '0.8rem', color: '#a8a29e' }}>Elige tus hamburguesas favoritas en el menú.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cart.map(item => (
                    <div key={item.cartItemId} style={{
                      background: '#fbfbfa',
                      border: '1px solid #ede8df',
                      borderRadius: '12px',
                      padding: '10px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center'
                    }}>
                      <img src={item.image} alt={item.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1c1917' }}>{item.name}</div>
                        {item.extrasList && item.extrasList.length > 0 && (
                          <div style={{ fontSize: '0.68rem', color: '#d97706' }}>
                            {item.extrasList.join(', ')}
                          </div>
                        )}
                        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1c1917', marginTop: '2px' }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => updateCartQty(item.cartItemId, -1)}
                          style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #ede8df', background: '#ffffff', cursor: 'pointer', fontWeight: '800' }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>{item.qty}</span>
                        <button
                          onClick={() => updateCartQty(item.cartItemId, 1)}
                          style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #ede8df', background: '#ffffff', cursor: 'pointer', fontWeight: '800' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '16px', borderTop: '1px solid #ede8df', background: '#faf9f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px', color: '#78716c' }}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '8px', color: '#78716c' }}>
                  <span>Envío Express</span>
                  <span>{deliveryFee === 0 ? '¡Gratis!' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800', color: '#1c1917', marginBottom: '14px', borderTop: '1px solid #ede8df', paddingTop: '6px' }}>
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleSimulatePurchase}
                  style={{
                    width: '100%',
                    background: '#d97706',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(217, 119, 6, 0.3)'
                  }}
                >
                  ⚡ Simular Compra Ahora (${finalTotal.toFixed(2)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== MODAL: ORDER CONFIRMED ==================== */}
      {orderSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(28,25,23,0.6)',
          backdropFilter: 'blur(6px)',
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '28px 24px',
            maxWidth: '380px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>🎉</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1c1917', marginBottom: '6px' }}>
              ¡Compra Simulada con Éxito!
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#78716c', marginBottom: '16px' }}>
              Tu orden <strong>{orderSuccessModal.id}</strong> ha ingresado a la cocina de Hamburger Rapid.
            </p>

            <div style={{ background: '#f7f5f0', borderRadius: '12px', padding: '12px', textAlign: 'left', marginBottom: '20px', fontSize: '0.8rem' }}>
              <div>• <strong>Total pagado:</strong> ${orderSuccessModal.total.toFixed(2)}</div>
              <div>• <strong>Entrega estimada:</strong> 18-22 minutos</div>
              <div>• <strong>Destino:</strong> {orderSuccessModal.address}</div>
            </div>

            <button
              onClick={() => setOrderSuccessModal(null)}
              style={{
                width: '100%',
                background: '#1c1917',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Ver Estado en Ordenes
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
