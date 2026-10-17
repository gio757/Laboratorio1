import React, { useState, useEffect } from 'react';

const INITIAL_BURGER_LIST = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especiales',
    specialtyLevel: 'Nivel Maestro ★★★★★',
    specialtyBadge: 'Firma del Chef',
    price: 14.99,
    stock: 45,
    rating: 5.0,
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Clásicas',
    specialtyLevel: 'Nivel Clásico Real ★★★★☆',
    specialtyBadge: 'Clásica de Autor',
    price: 9.99,
    stock: 60,
    rating: 4.8,
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Clásicas',
    specialtyLevel: 'Nivel Doble Gourmet ★★★★☆',
    specialtyBadge: 'Doble Poder',
    price: 12.50,
    stock: 50,
    rating: 4.9,
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Especiales',
    specialtyLevel: 'Nivel Reserva Especial ★★★★★',
    specialtyBadge: 'Edición Limitada',
    price: 13.90,
    stock: 38,
    rating: 5.0,
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    name: 'Truffle Mushroom Melt',
    category: 'Especiales',
    specialtyLevel: 'Nivel Alta Cocina ★★★★★',
    specialtyBadge: 'Gourmet Exclusivo',
    price: 15.50,
    stock: 30,
    rating: 4.9,
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    name: 'Royal Crispy Chicken Ranch',
    category: 'Pollo & Crispy',
    specialtyLevel: 'Nivel Crispy Dorado ★★★★☆',
    specialtyBadge: 'Crujiente Secreto',
    price: 11.00,
    stock: 42,
    rating: 4.8,
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 7,
    name: 'Smash Bacon Barbecue Supreme',
    category: 'Clásicas',
    specialtyLevel: 'Nivel Ahumado Clásico ★★★★☆',
    specialtyBadge: 'Smoked Master',
    price: 11.90,
    stock: 55,
    rating: 4.7,
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    name: 'Spicy Flame Volcano Habanero',
    category: 'Especiales',
    specialtyLevel: 'Nivel Fuego Bravo ★★★★★',
    specialtyBadge: 'Picante Bravo',
    price: 12.80,
    stock: 35,
    rating: 4.9,
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 9,
    name: 'Veggie Portobello & Queso de Cabra',
    category: 'Vegetarianas',
    specialtyLevel: 'Nivel Verde Gourmet ★★★★☆',
    specialtyBadge: 'Plant Premium',
    price: 10.50,
    stock: 25,
    rating: 4.8,
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 10,
    name: 'Doble Monster Ribs Cheddar Melt',
    category: 'Especiales',
    specialtyLevel: 'Nivel Legendario XXL ★★★★★',
    specialtyBadge: 'Coloso XXL',
    price: 16.90,
    stock: 28,
    rating: 5.0,
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&auto=format&fit=crop&q=80'
  }
];

const INITIAL_CONSUMER_METRICS = {
  totalCustomers: 1482,
  totalOrders: 6240,
  totalRevenue: 89450.00,
  averageTicket: 14.33,
  consumptionTiers: [
    { tier: 'VIP / Oro', label: 'Consumo Mayor (> $150)', customerCount: 248, percentage: 16.7, totalSpend: 42100, avgOrders: 14.2, badgeColor: '#d97706', badgeBg: '#fef3c7' },
    { tier: 'Frecuentes / Plata', label: 'Consumo Medio ($60 - $150)', customerCount: 614, percentage: 41.4, totalSpend: 33850, avgOrders: 6.8, badgeColor: '#475569', badgeBg: '#f1f5f9' },
    { tier: 'Casuales / Bronce', label: 'Consumo Inicial (< $60)', customerCount: 620, percentage: 41.9, totalSpend: 13500, avgOrders: 1.9, badgeColor: '#b45309', badgeBg: '#ffedd5' }
  ],
  topConsumers: [
    { id: 1, name: 'Martín Morales', email: 'martin.m@empresa.com', tier: 'VIP / Oro', totalSpent: 384.50, ordersCount: 26, favoriteBurger: 'Rey de las Burgers', lastOrder: 'Hace 2 horas', status: 'Activo' },
    { id: 2, name: 'Valentina Soto', email: 'vale.soto@gmail.com', tier: 'VIP / Oro', totalSpent: 312.00, ordersCount: 21, favoriteBurger: 'Burger Doble Especial', lastOrder: 'Hace 5 horas', status: 'Activo' },
    { id: 3, name: 'Ignacio Larraín', email: 'ilarrain@tech.io', tier: 'VIP / Oro', totalSpent: 278.40, ordersCount: 19, favoriteBurger: 'Truffle Mushroom Melt', lastOrder: 'Ayer', status: 'Activo' },
    { id: 4, name: 'Camila Henríquez', email: 'camila.h@outlook.com', tier: 'Frecuentes / Plata', totalSpent: 145.20, ordersCount: 11, favoriteBurger: 'Burger Real Doble', lastOrder: 'Hace 2 días', status: 'Activo' },
    { id: 5, name: 'Rodrigo Araya', email: 'rodrigo.a@gmail.com', tier: 'Frecuentes / Plata', totalSpent: 118.90, ordersCount: 9, favoriteBurger: 'Burger Real Clásica', lastOrder: 'Hace 3 días', status: 'Activo' },
    { id: 6, name: 'Sofía Valenzuela', email: 'sofi.v@design.cl', tier: 'Frecuentes / Plata', totalSpent: 98.50, ordersCount: 7, favoriteBurger: 'Royal Crispy Chicken Ranch', lastOrder: 'Hace 4 días', status: 'Activo' },
    { id: 7, name: 'Nicolás Rojas', email: 'nico.rojas@startup.pe', tier: 'Casuales / Bronce', totalSpent: 42.80, ordersCount: 3, favoriteBurger: 'Smash Bacon Barbecue', lastOrder: 'Hace 1 semana', status: 'Inactivo' }
  ],
  hourlyDistribution: [
    { period: '12:00 - 14:00', orders: 2150, share: '34.5%', label: 'Almuerzo Prime' },
    { period: '14:00 - 18:00', orders: 840, share: '13.5%', label: 'Tardes Gourmet' },
    { period: '18:00 - 21:30', orders: 2380, share: '38.1%', label: 'Cena Prime' },
    { period: '21:30 - 23:30', orders: 870, share: '13.9%', label: 'Late Night' }
  ]
};

export default function App() {
  const [burgers, setBurgers] = useState(INITIAL_BURGER_LIST);
  const [consumerMetrics, setConsumerMetrics] = useState(INITIAL_CONSUMER_METRICS);
  const [serverHealth, setServerHealth] = useState(null);
  const [isLoadingHealth, setIsLoadingHealth] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'consumers' | 'database'
  const [searchBurger, setSearchBurger] = useState('');
  const [tierFilter, setTierFilter] = useState('All');

  // Modal for new burger
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBurger, setNewBurger] = useState({
    name: '',
    category: 'Especiales',
    specialtyLevel: 'Nivel Maestro ★★★★★',
    price: '',
    stock: '',
    image: '',
    description: ''
  });

  const fetchHealth = () => {
    setIsLoadingHealth(true);
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setServerHealth(data);
        setIsLoadingHealth(false);
      })
      .catch(err => {
        console.error('API health error:', err);
        setIsLoadingHealth(false);
      });
  };

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const formatted = data.data.map(p => ({
            ...p,
            status: p.stock > 0 ? 'Disponible' : 'Agotado',
            specialtyLevel: p.specialtyLevel || p.specialty_level || 'Nivel Clásico'
          }));
          setBurgers(formatted);
        }
      })
      .catch(err => console.log('Products fetched offline/fallback'));
  };

  const fetchAnalytics = () => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setConsumerMetrics(data.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchHealth();
    fetchProducts();
    fetchAnalytics();
  }, []);

  const handleCreateBurger = async (e) => {
    e.preventDefault();
    if (!newBurger.name || !newBurger.price) return;

    const payload = {
      name: newBurger.name,
      category: newBurger.category,
      specialtyLevel: newBurger.specialtyLevel,
      price: parseFloat(newBurger.price),
      stock: parseInt(newBurger.stock, 10) || 20,
      image: newBurger.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
      description: newBurger.description || 'Hamburguesa creada desde el panel de administración.'
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setBurgers(prev => [{ ...data.data, status: 'Disponible' }, ...prev]);
      } else {
        setBurgers(prev => [{ id: Date.now(), ...payload, status: 'Disponible' }, ...prev]);
      }
    } catch (err) {
      setBurgers(prev => [{ id: Date.now(), ...payload, status: 'Disponible' }, ...prev]);
    }

    setIsAddModalOpen(false);
    setNewBurger({
      name: '',
      category: 'Especiales',
      specialtyLevel: 'Nivel Maestro ★★★★★',
      price: '',
      stock: '',
      image: '',
      description: ''
    });
  };

  const handleDeleteBurger = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta variante de hamburguesa?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setBurgers(prev => prev.filter(b => b.id !== id));
  };

  const filteredBurgers = burgers.filter(b =>
    b.name.toLowerCase().includes(searchBurger.toLowerCase()) ||
    b.category.toLowerCase().includes(searchBurger.toLowerCase())
  );

  const filteredConsumers = tierFilter === 'All'
    ? consumerMetrics.topConsumers
    : consumerMetrics.topConsumers.filter(c => c.tier.includes(tierFilter));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-admin)', color: 'var(--text)' }}>
      
      {/* Top Navbar */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #ede8df',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 1px 4px rgba(28,25,23,0.03)'
      }}>
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem' }}>🍔</span>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1c1917', lineHeight: 1.1 }}>
                Hamburger <span style={{ color: '#d97706' }}>Rapid</span> Admin
              </div>
              <div style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Panel Central de Control &bull; Primera Edición Comercial
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: '700',
              background: serverHealth?.database?.connected ? '#ecfdf5' : '#fef3c7',
              color: serverHealth?.database?.connected ? '#059669' : '#b45309',
              border: `1px solid ${serverHealth?.database?.connected ? '#a7f3d0' : '#fde68a'}`
            }}>
              <span>{serverHealth?.database?.connected ? '🐬' : '⚡'}</span>
              <span>{serverHealth?.database?.connected ? 'MySQL Activo' : 'In-Memory Engine'}</span>
            </div>

            <a
              href="/"
              style={{
                textDecoration: 'none',
                background: '#ffffff',
                border: '1px solid #ede8df',
                color: '#1c1917',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '700'
              }}
            >
              🌐 E-commerce
            </a>
            <a
              href="/app"
              style={{
                textDecoration: 'none',
                background: '#ffffff',
                border: '1px solid #ede8df',
                color: '#1c1917',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '700'
              }}
            >
              📱 PWA Mobile
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1360px', margin: '0 auto', padding: '28px 24px' }}>
        
        {/* KPI Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
          marginBottom: '28px'
        }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #ede8df', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Facturación Mensual
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#1c1917', margin: '6px 0 4px' }}>
              ${consumerMetrics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '700' }}>
              ↑ +18.4% vs mes anterior
            </div>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #ede8df', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pedidos Totales Registrados
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#1c1917', margin: '6px 0 4px' }}>
              {consumerMetrics.totalOrders.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: '700' }}>
              ★ Promedio 208 pedidos/día
            </div>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #ede8df', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Consumidores Frecuentes
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#1c1917', margin: '6px 0 4px' }}>
              {consumerMetrics.totalCustomers.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#78716c', fontWeight: '600' }}>
              Segmentados en 3 Tiers de Consumo
            </div>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #ede8df', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Ticket Promedio de Venta
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#1c1917', margin: '6px 0 4px' }}>
              ${consumerMetrics.averageTicket.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '700' }}>
              ↑ Óptimo con combos y extras
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid #ede8df',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}>
          {[
            { key: 'inventory', label: '🍔 Catálogo de Hamburguesas', count: burgers.length },
            { key: 'consumers', label: '👥 Métricas de Consumidores por Consumo', count: '3 Tiers' },
            { key: 'database', label: '🩺 Estado de la Base de Datos', count: serverHealth?.database?.mode || 'Status' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: activeTab === tab.key ? '#ffffff' : 'transparent',
                border: activeTab === tab.key ? '1px solid #ede8df' : 'none',
                borderBottom: activeTab === tab.key ? '2px solid #d97706' : 'none',
                padding: '10px 18px',
                borderRadius: '10px 10px 0 0',
                fontSize: '0.9rem',
                fontWeight: activeTab === tab.key ? '800' : '600',
                color: activeTab === tab.key ? '#d97706' : '#78716c',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: activeTab === tab.key ? '0 -2px 6px rgba(0,0,0,0.02)' : 'none'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: '999px',
                background: activeTab === tab.key ? '#fef3c7' : '#f1ede4',
                color: activeTab === tab.key ? '#92400e' : '#78716c',
                fontWeight: '700'
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ================= TAB 1: INVENTARIO DE HAMBURGUESAS ================= */}
        {activeTab === 'inventory' && (
          <div>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #ede8df',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1c1917' }}>
                    Hamburguesas Disponibles ({filteredBurgers.length})
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#78716c' }}>
                    Variantes comerciales activas en el E-commerce y la PWA Mobile.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Filtrar por nombre o categoría..."
                    value={searchBurger}
                    onChange={(e) => setSearchBurger(e.target.value)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #ede8df',
                      fontSize: '0.85rem',
                      outline: 'none',
                      minWidth: '240px'
                    }}
                  />
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    style={{
                      background: '#d97706',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>➕</span> Nueva Hamburguesa
                  </button>
                </div>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#faf9f6', borderBottom: '1px solid #ede8df', color: '#78716c', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '12px 16px' }}>Hamburguesa</th>
                      <th style={{ padding: '12px 16px' }}>Nivel de Especialidad</th>
                      <th style={{ padding: '12px 16px' }}>Categoría</th>
                      <th style={{ padding: '12px 16px' }}>Precio</th>
                      <th style={{ padding: '12px 16px' }}>Stock</th>
                      <th style={{ padding: '12px 16px' }}>Estado</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBurgers.map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid #f7f5f0' }}>
                        <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={b.image}
                            alt={b.name}
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                          <div>
                            <strong style={{ color: '#1c1917', fontSize: '0.92rem' }}>{b.name}</strong>
                            <div style={{ fontSize: '0.74rem', color: '#a8a29e' }}>ID: #{b.id}</div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            display: 'inline-block',
                            background: '#fef3c7',
                            color: '#92400e',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.74rem',
                            fontWeight: '700',
                            border: '1px solid rgba(217, 119, 6, 0.2)'
                          }}>
                            {b.specialtyLevel || 'Nivel Maestro'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#78716c', fontWeight: '600' }}>
                          {b.category}
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: '800', color: '#1c1917', fontSize: '1rem' }}>
                          ${parseFloat(b.price).toFixed(2)}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            fontWeight: '700',
                            color: b.stock > 30 ? '#059669' : b.stock > 10 ? '#d97706' : '#dc2626'
                          }}>
                            {b.stock} u.
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            padding: '3px 10px',
                            borderRadius: '999px',
                            fontSize: '0.72rem',
                            fontWeight: '700',
                            background: b.stock > 0 ? '#ecfdf5' : '#fee2e2',
                            color: b.stock > 0 ? '#059669' : '#dc2626'
                          }}>
                            {b.stock > 0 ? 'En Menú' : 'Agotado'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <button
                            onClick={() => handleDeleteBurger(b.id)}
                            style={{
                              background: '#fee2e2',
                              border: 'none',
                              color: '#dc2626',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: MÉTRICAS DE CONSUMIDORES ================= */}
        {activeTab === 'consumers' && (
          <div>
            {/* Tiers Breakdown */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '18px',
              marginBottom: '24px'
            }}>
              {consumerMetrics.consumptionTiers.map(tier => (
                <div
                  key={tier.tier}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #ede8df',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      background: tier.badgeBg || '#fef3c7',
                      color: tier.badgeColor || '#92400e',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      fontWeight: '800'
                    }}>
                      👑 {tier.tier}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#78716c' }}>
                      {tier.percentage}% del total
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1c1917', margin: '8px 0 4px' }}>
                    {tier.customerCount} Clientes
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: '#78716c', marginBottom: '14px' }}>
                    {tier.label}
                  </div>

                  <div style={{ borderTop: '1px solid #f3efe6', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <div>
                      <span style={{ color: '#a8a29e', display: 'block', fontSize: '0.72rem' }}>Gasto Acumulado</span>
                      <strong style={{ color: '#1c1917' }}>${tier.totalSpend.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#a8a29e', display: 'block', fontSize: '0.72rem' }}>Frecuencia Promedio</span>
                      <strong style={{ color: '#1c1917' }}>{tier.avgOrders} pedidos/cliente</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Consumers Table */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #ede8df',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1c1917' }}>
                    Consumidores Destacados según Nivel de Consumo
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#78716c' }}>
                    Listado dinámico ordenado por volumen total de consumo y lealtad.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {['All', 'Oro', 'Plata', 'Bronce'].map(f => (
                    <button
                      key={f}
                      onClick={() => setTierFilter(f)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '999px',
                        border: '1px solid #ede8df',
                        background: tierFilter === f ? '#1c1917' : '#ffffff',
                        color: tierFilter === f ? '#ffffff' : '#78716c',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {f === 'All' ? 'Todos' : `Tier ${f}`}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#faf9f6', borderBottom: '1px solid #ede8df', color: '#78716c', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '12px 14px' }}>Consumidor</th>
                      <th style={{ padding: '12px 14px' }}>Nivel / Tier</th>
                      <th style={{ padding: '12px 14px' }}>Gasto Acumulado</th>
                      <th style={{ padding: '12px 14px' }}>Pedidos</th>
                      <th style={{ padding: '12px 14px' }}>Hamburguesa Favorita</th>
                      <th style={{ padding: '12px 14px' }}>Último Pedido</th>
                      <th style={{ padding: '12px 14px' }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConsumers.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #f7f5f0' }}>
                        <td style={{ padding: '12px 14px' }}>
                          <strong style={{ color: '#1c1917', display: 'block' }}>{c.name}</strong>
                          <span style={{ fontSize: '0.74rem', color: '#a8a29e' }}>{c.email}</span>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '999px',
                            fontSize: '0.72rem',
                            fontWeight: '800',
                            background: c.tier.includes('Oro') ? '#fef3c7' : c.tier.includes('Plata') ? '#f1f5f9' : '#ffedd5',
                            color: c.tier.includes('Oro') ? '#92400e' : c.tier.includes('Plata') ? '#475569' : '#b45309'
                          }}>
                            {c.tier}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: '800', color: '#1c1917' }}>
                          ${c.totalSpent.toFixed(2)}
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#78716c' }}>
                          {c.ordersCount} órdenes
                        </td>
                        <td style={{ padding: '12px 14px', color: '#d97706', fontWeight: '700' }}>
                          {c.favoriteBurger}
                        </td>
                        <td style={{ padding: '12px 14px', color: '#78716c', fontSize: '0.8rem' }}>
                          {c.lastOrder}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: '700',
                            color: c.status === 'Activo' ? '#059669' : '#a8a29e'
                          }}>
                            ● {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Consumption Hourly Distribution */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #ede8df',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1c1917', marginBottom: '4px' }}>
                Franjas Horarias de Mayor Consumo
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#78716c', marginBottom: '16px' }}>
                Distribución de volumen de hamburguesas ordenadas por franja horaria.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                {consumerMetrics.hourlyDistribution.map(h => (
                  <div key={h.period} style={{ background: '#faf9f6', padding: '14px', borderRadius: '12px', border: '1px solid #ede8df' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#d97706' }}>{h.period}</span>
                      <strong style={{ fontSize: '0.88rem', color: '#1c1917' }}>{h.share}</strong>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1c1917' }}>{h.label}</div>
                    <div style={{ fontSize: '0.74rem', color: '#78716c', marginTop: '2px' }}>{h.orders.toLocaleString()} órdenes despachadas</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ESTADO DE LA BASE DE DATOS ================= */}
        {activeTab === 'database' && (
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #ede8df',
              padding: '32px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Infraestructura & Resiliencia
                  </span>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1c1917' }}>
                    Estado del Motor de Base de Datos
                  </h3>
                </div>
                <button
                  onClick={fetchHealth}
                  disabled={isLoadingHealth}
                  style={{
                    background: '#f7f5f0',
                    border: '1px solid #ede8df',
                    color: '#1c1917',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {isLoadingHealth ? 'Probando...' : '🔄 Probar Conexión'}
                </button>
              </div>

              {/* Status Banner */}
              <div style={{
                background: serverHealth?.database?.connected ? '#ecfdf5' : '#fef3c7',
                border: `1px solid ${serverHealth?.database?.connected ? '#a7f3d0' : '#fde68a'}`,
                borderRadius: '14px',
                padding: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>
                    {serverHealth?.database?.connected ? '🐬' : '⚡'}
                  </span>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: serverHealth?.database?.connected ? '#065f46' : '#92400e' }}>
                      {serverHealth?.database?.mode === 'mysql'
                        ? 'Base de Datos MySQL Conectada y Operativa'
                        : 'Modo In-Memory Resiliente Activo (Zero Downtime)'}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: serverHealth?.database?.connected ? '#047857' : '#b45309', marginTop: '2px' }}>
                      {serverHealth?.database?.connected
                        ? 'La plataforma está guardando datos de forma permanente en el clúster MySQL de Dokploy.'
                        : 'El sistema detectó que MySQL aún no ha sido provisionado en Dokploy o está arrancando. El backend opera sin interrupciones gracias al motor en memoria.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Parameter Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '24px' }}>
                <div style={{ background: '#faf9f6', padding: '14px', borderRadius: '10px', border: '1px solid #ede8df' }}>
                  <span style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: '700', textTransform: 'uppercase' }}>Host DB</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1c1917', marginTop: '2px' }}>
                    {serverHealth?.database?.host || 'Auto-Discovery (Dokploy Network)'}
                  </div>
                </div>

                <div style={{ background: '#faf9f6', padding: '14px', borderRadius: '10px', border: '1px solid #ede8df' }}>
                  <span style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: '700', textTransform: 'uppercase' }}>Base de Datos</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1c1917', marginTop: '2px' }}>
                    {serverHealth?.database?.database || 'demo'}
                  </div>
                </div>

                <div style={{ background: '#faf9f6', padding: '14px', borderRadius: '10px', border: '1px solid #ede8df' }}>
                  <span style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: '700', textTransform: 'uppercase' }}>Latencia</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#059669', marginTop: '2px' }}>
                    {serverHealth?.database?.latency || '< 3ms'}
                  </div>
                </div>

                <div style={{ background: '#faf9f6', padding: '14px', borderRadius: '10px', border: '1px solid #ede8df' }}>
                  <span style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: '700', textTransform: 'uppercase' }}>Variantes Cargadas</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1c1917', marginTop: '2px' }}>
                    {burgers.length} Hamburguesas
                  </div>
                </div>
              </div>

              {serverHealth?.database?.error && (
                <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', padding: '12px', borderRadius: '8px', fontSize: '0.78rem', color: '#be123c' }}>
                  <strong>Diagnóstico de Conexión:</strong> {serverHealth.database.error}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ================= MODAL: AGREGAR HAMBURGUESA ================= */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(28,25,23,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '520px',
            width: '100%',
            padding: '24px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1c1917' }}>
                Agregar Nueva Variante de Hamburguesa 🍔
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: '#f7f5f0', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontWeight: '800' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBurger} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#78716c', marginBottom: '4px' }}>
                  Nombre de la Hamburguesa:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Burger Doble Trufada"
                  value={newBurger.name}
                  onChange={e => setNewBurger({ ...newBurger, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#78716c', marginBottom: '4px' }}>
                    Categoría:
                  </label>
                  <select
                    value={newBurger.category}
                    onChange={e => setNewBurger({ ...newBurger, category: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.88rem' }}
                  >
                    <option value="Especiales">Especiales</option>
                    <option value="Clásicas">Clásicas</option>
                    <option value="Pollo & Crispy">Pollo & Crispy</option>
                    <option value="Vegetarianas">Vegetarianas</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#78716c', marginBottom: '4px' }}>
                    Nivel de Especialidad:
                  </label>
                  <select
                    value={newBurger.specialtyLevel}
                    onChange={e => setNewBurger({ ...newBurger, specialtyLevel: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.88rem' }}
                  >
                    <option value="Nivel Maestro ★★★★★">Nivel Maestro ★★★★★</option>
                    <option value="Nivel Clásico Real ★★★★☆">Nivel Clásico Real ★★★★☆</option>
                    <option value="Nivel Doble Gourmet ★★★★☆">Nivel Doble Gourmet ★★★★☆</option>
                    <option value="Nivel Reserva Especial ★★★★★">Nivel Reserva Especial ★★★★★</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#78716c', marginBottom: '4px' }}>
                    Precio ($ USD):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="12.99"
                    value={newBurger.price}
                    onChange={e => setNewBurger({ ...newBurger, price: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#78716c', marginBottom: '4px' }}>
                    Stock Inicial:
                  </label>
                  <input
                    type="number"
                    placeholder="40"
                    value={newBurger.stock}
                    onChange={e => setNewBurger({ ...newBurger, stock: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#78716c', marginBottom: '4px' }}>
                  URL de Imagen (Opcional):
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newBurger.image}
                  onChange={e => setNewBurger({ ...newBurger, image: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#78716c', marginBottom: '4px' }}>
                  Descripción de Autor:
                </label>
                <textarea
                  rows="2"
                  placeholder="Ingredientes clave, tipo de carne y aderezos..."
                  value={newBurger.description}
                  onChange={e => setNewBurger({ ...newBurger, description: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ede8df', fontSize: '0.88rem' }}
                ></textarea>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '8px',
                  background: '#d97706',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                Guardar y Publicar en Menú
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
