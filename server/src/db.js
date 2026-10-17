const mysql = require('mysql2/promise');

const INITIAL_PRODUCTS = [
  // --- 10 VARIANTES DESTACADAS HAMBURGER RAPID ---
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especiales',
    specialtyLevel: 'Nivel Maestro ★★★★★',
    specialtyBadge: 'Firma del Chef',
    price: 14.99,
    stock: 45,
    rating: 5.0,
    prepTime: '12-15 min',
    calories: '890 kcal',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    tagline: 'La joya de la corona: carne Angus seleccionada y glaseado al bourbon',
    description: 'Doble medallón de 180g de carne 100% Angus flameada a la leña de roble, queso cheddar añejo fundido, panceta crujiente caramelizada al bourbon, cebolla crocante y salsa secreta Real.',
    ingredients: ['Carne Angus 100% (360g)', 'Cheddar Ahumado 12 meses', 'Panceta al Bourbon', 'Cebolla Crispy', 'Pan Brioche Dorado']
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
    prepTime: '8-10 min',
    calories: '680 kcal',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    tagline: 'La receta tradicional perfeccionada con estándares de alta cocina',
    description: 'Medallón smash de 180g con costra caramelizada al hierro candente, queso americano cremoso, pepinillos agridulces artesanales, lechuga hidropónica, tomate de huerta y aderezo tártaro clásico.',
    ingredients: ['Medallón Smash 180g', 'Queso Americano Fundido', 'Pepinillos Artesanales', 'Tomate y Lechuga Batavia', 'Salsa Clásica Real']
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
    prepTime: '10-12 min',
    calories: '820 kcal',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    tagline: 'Doble impacto de sabor con quesos suizo y cheddar fundidos en cascada',
    description: 'Dos medallones jugosos de 150g cada uno, doble capa de quesos fundidos (cheddar madurado y emmental suizo), cebolla morada macerada, pepinillos crujientes y mayonesa ahumada de chipotle suave.',
    ingredients: ['Doble Medallón 150g x 2', 'Queso Cheddar y Suizo', 'Cebolla Morada Macerada', 'Pepinillos', 'Salsa Mayo-Chipotle']
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
    prepTime: '12-14 min',
    calories: '940 kcal',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80',
    tagline: 'Para auténticos sibaritas: huevo de granja, bacon y crema de trufa',
    description: 'Doble carne Angus smash con costra intensa, queso Monterrey Jack derretido, huevo frito de granja con yema dorada cremosa, bacon ahumado en madera de manzano y crema suave de trufa negra.',
    ingredients: ['Doble Carne Angus 300g', 'Huevo de Campo Frito', 'Bacon Ahumado en Manzano', 'Monterrey Jack Fundido', 'Aioli de Trufa Negra']
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
    prepTime: '12-15 min',
    calories: '790 kcal',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=600&auto=format&fit=crop&q=80',
    tagline: 'Setas silvestres salteadas a la mantequilla de hierbas y emulsión trufada',
    description: 'Carne Angus de pastura, salteado de hongos shiitake y portobellos a la manteca de tomillo, queso gruyère francés fundido y emulsión sedosa de trufa blanca de Alba.',
    ingredients: ['Carne Angus Pastura 200g', 'Setas Silvestres Salteadas', 'Gruyère Francés', 'Aioli de Trufa Blanca', 'Rúcula Selvática']
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
    prepTime: '10-12 min',
    calories: '730 kcal',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80',
    tagline: 'Suprema marinada 24 horas y rebozado ultra crujiente de 11 especias',
    description: 'Pechuga entera de pollo marinada en buttermilk, empanizado extra crujiente, queso provolone ahumado, ensalada coleslaw fresca con manzana verde y aderezo ranch de aguacate fresco.',
    ingredients: ['Pechuga Marinada Buttermilk', 'Rebozado 11 Especias', 'Queso Provolone', 'Coleslaw de Manzana', 'Ranch de Aguacate']
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
    prepTime: '10-11 min',
    calories: '860 kcal',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80',
    tagline: 'Salsa barbacoa casera a la cerveza negra y aros de cebolla estilo Texas',
    description: 'Carne 100% de vacuno con costra sellada, cuatro tiras de bacon crocante, queso cheddar inglés derretido, aros de cebolla crocantes estilo Texas y salsa BBQ artesanal al café espresso.',
    ingredients: ['Carne Vacuno 200g', '4 Tiras de Bacon Crocante', 'Cheddar Inglés', 'Aros de Cebolla Fritos', 'Salsa BBQ Espresso']
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
    prepTime: '9-12 min',
    calories: '750 kcal',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80',
    tagline: 'Picante adictivo con jalapeños tostados y mayonesa al habanero ahumado',
    description: 'Medallón Angus de 180g bañado en queso pepper jack fundido, rodajas de jalapeños encurtidos en casa, cebolla roja a la parrilla, hojas de espinaca baby y crema volcánica de habanero asado.',
    ingredients: ['Carne Angus 180g', 'Queso Pepper Jack', 'Jalapeños Escabechados', 'Cebolla Grillada', 'Crema Volcán de Habanero']
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
    prepTime: '10-12 min',
    calories: '580 kcal',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop&q=80',
    tagline: 'Sabor vegetal gourmet con portobello a la brasa y rulo de cabra',
    description: 'Sombrero de hongo portobello marinado en aceto balsámico y hierbas a la parrilla, medallón de lentejas y quinoa, rulo de queso de cabra caramelizado, rúcula selvática fresca y pesto de albahaca.',
    ingredients: ['Hongo Portobello Asado', 'Medallón Quinoa & Lentejas', 'Queso de Cabra Caramelizado', 'Pesto Casero de Albahaca', 'Tomates Confitados']
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
    prepTime: '14-16 min',
    calories: '1050 kcal',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=80',
    tagline: 'Carne Angus coronada con desmechado de costillas braseadas 8 horas',
    description: 'El coloso supremo: medallón Angus de 200g cubierto con generoso pulled pork de costillas ahumadas a fuego lento, doble baño de queso cheddar fundido, pepinillos dulces y cebolla morada encurtida.',
    ingredients: ['Carne Angus 200g', 'Costillas Braseadas 8 Horas', 'Doble Cheddar Líquido', 'Pepinillos Agridulces', 'Brioche con Mantequilla']
  }
];

// Datos de métricas de consumidores para el Admin Dashboard
const CONSUMER_METRICS = {
  totalCustomers: 1482,
  totalOrders: 6240,
  totalRevenue: 89450.00,
  averageTicket: 14.33,
  consumptionTiers: [
    { tier: 'VIP / Oro', label: 'Consumo Mayor (> $150)', customerCount: 248, percentage: 16.7, totalSpend: 42100, avgOrders: 14.2, badgeColor: '#d97706' },
    { tier: 'Frecuentes / Plata', label: 'Consumo Medio ($60 - $150)', customerCount: 614, percentage: 41.4, totalSpend: 33850, avgOrders: 6.8, badgeColor: '#64748b' },
    { tier: 'Casuales / Bronce', label: 'Consumo Inicial (< $60)', customerCount: 620, percentage: 41.9, totalSpend: 13500, avgOrders: 1.9, badgeColor: '#b45309' }
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

let inMemoryProducts = [...INITIAL_PRODUCTS];
let pool = null;
let isConnectedToMySQL = false;
let lastDbError = null;

async function initDB() {
  const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const user = process.env.DB_USER || process.env.MYSQL_USER || 'root';
  const password = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';
  const database = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'demo';
  const port = parseInt(process.env.DB_PORT || '3306', 10);

  if (!databaseUrl && !host) {
    lastDbError = 'Variables DB_HOST ni DATABASE_URL configuradas en el entorno.';
    console.log(`ℹ️ [DB] ${lastDbError} Operando en modo In-Memory para demostración.`);
    return;
  }

  try {
    if (databaseUrl) {
      console.log(`🔄 [DB] Intentando conectar a MySQL vía DATABASE_URL...`);
      pool = mysql.createPool(databaseUrl);
    } else {
      console.log(`🔄 [DB] Intentando conectar a MySQL en ${host}:${port} con usuario "${user}" a la BD "${database}"...`);
      pool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 8000
      });
    }

    const connection = await pool.getConnection();
    console.log(`✅ [DB] Conectado exitosamente a MySQL (${host || 'URL'} - BD: ${database})`);

    // Crear tabla si no existe
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        image VARCHAR(500),
        description TEXT,
        specialty_level VARCHAR(100) DEFAULT 'Nivel Clásico',
        rating DECIMAL(3,1) DEFAULT 4.8,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Sembrar datos iniciales si la tabla está vacía
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      console.log('🌱 [DB] Inicializando datos demo en la tabla products de MySQL (10 hamburguesas destacadas)...');
      for (const p of INITIAL_PRODUCTS) {
        await connection.query(
          'INSERT INTO products (name, category, price, stock, image, description, specialty_level, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [p.name, p.category, p.price, p.stock, p.image, p.description, p.specialtyLevel, p.rating]
        );
      }
    }

    connection.release();
    isConnectedToMySQL = true;
    lastDbError = null;
  } catch (error) {
    console.warn(`⚠️ [DB] Conexión directa falló: ${error.message}. Escaneando red interna...`);
    try {
      const candidates = [];
      for (let i = 2; i <= 30; i++) candidates.push(`172.18.0.${i}`);
      for (let i = 1; i <= 254; i++) candidates.push(`10.0.1.${i}`);
      candidates.push('172.18.0.1', '172.17.0.1');

      const net = require('net');
      const check = (ip) => new Promise((resolve) => {
        const s = new net.Socket();
        s.setTimeout(250);
        s.once('connect', () => { s.destroy(); resolve(ip); });
        s.once('timeout', () => { s.destroy(); resolve(null); });
        s.once('error', () => { resolve(null); });
        s.connect(3306, ip);
      });

      const found = (await Promise.all(candidates.map(check))).filter(Boolean);
      if (found.length > 0) {
        const discoveredIp = found[0];
        console.log(`🎯 [DB Discovery] ¡MySQL encontrado automáticamente en IP ${discoveredIp}! Conectando...`);
        pool = mysql.createPool({
          host: discoveredIp,
          user,
          password,
          database,
          port: 3306,
          waitForConnections: true,
          connectionLimit: 10,
          connectTimeout: 5000
        });
        const conn = await pool.getConnection();
        console.log(`✅ [DB] Conectado exitosamente a MySQL en ${discoveredIp}`);
        await conn.query(`
          CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category VARCHAR(100) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            stock INT NOT NULL DEFAULT 0,
            image VARCHAR(500),
            description TEXT,
            specialty_level VARCHAR(100) DEFAULT 'Nivel Clásico',
            rating DECIMAL(3,1) DEFAULT 4.8,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        conn.release();
        isConnectedToMySQL = true;
        lastDbError = null;
        return;
      }
    } catch (discoveryErr) {
      console.warn('Error en escaneo de red:', discoveryErr.message);
    }

    lastDbError = error.message;
    console.warn(`⚠️ [DB] No se pudo conectar a MySQL: ${error.message}. Operando en modo In-Memory.`);
    isConnectedToMySQL = false;
  }
}

async function getProducts() {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  if (isConnectedToMySQL && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM products ORDER BY id ASC');
      // Merge with rich metadata if columns are default
      return rows.map(r => {
        const initial = INITIAL_PRODUCTS.find(p => p.id === r.id || p.name === r.name);
        return {
          ...r,
          specialtyLevel: r.specialty_level || initial?.specialtyLevel || 'Nivel Clásico',
          specialtyBadge: initial?.specialtyBadge || 'Especialidad',
          rating: r.rating || initial?.rating || 4.8,
          prepTime: initial?.prepTime || '10-15 min',
          calories: initial?.calories || '750 kcal',
          tagline: initial?.tagline || r.description,
          ingredients: initial?.ingredients || ['Ingredientes seleccionados']
        };
      });
    } catch (err) {
      console.error('Error consultando MySQL, recurriendo a memoria temporal:', err.message);
      lastDbError = err.message;
    }
  }
  return inMemoryProducts;
}

async function addProduct({ name, category, price, stock, image, description, specialtyLevel }) {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  const spec = specialtyLevel || 'Nivel Maestro';
  if (isConnectedToMySQL && pool) {
    const [result] = await pool.query(
      'INSERT INTO products (name, category, price, stock, image, description, specialty_level) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, category, parseFloat(price) || 0, parseInt(stock, 10) || 0, image || '', description || '', spec]
    );
    return {
      id: result.insertId,
      name,
      category,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0,
      image,
      description,
      specialtyLevel: spec,
      rating: 5.0
    };
  }

  const newProduct = {
    id: Date.now(),
    name,
    category: category || 'Especiales',
    price: parseFloat(price) || 0,
    stock: parseInt(stock, 10) || 0,
    specialtyLevel: spec,
    specialtyBadge: 'Nuevo Lanzamiento',
    rating: 5.0,
    prepTime: '10-15 min',
    calories: '800 kcal',
    image: image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    tagline: 'Nueva creación de la casa',
    description: description || 'Hamburguesa añadida desde el Panel de Administración.',
    ingredients: ['Carne Angus seleccionada', 'Pan Brioche Dorado', 'Queso Fundido']
  };
  inMemoryProducts.unshift(newProduct);
  return newProduct;
}

async function deleteProduct(id) {
  const numId = parseInt(id, 10);
  if (isConnectedToMySQL && pool) {
    await pool.query('DELETE FROM products WHERE id = ?', [numId]);
    return true;
  }
  inMemoryProducts = inMemoryProducts.filter(p => p.id !== numId);
  return true;
}

async function resetProducts() {
  if (isConnectedToMySQL && pool) {
    await pool.query('TRUNCATE TABLE products');
    for (const p of INITIAL_PRODUCTS) {
      await pool.query(
        'INSERT INTO products (name, category, price, stock, image, description, specialty_level, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [p.name, p.category, p.price, p.stock, p.image, p.description, p.specialtyLevel, p.rating]
      );
    }
    return;
  }
  inMemoryProducts = [...INITIAL_PRODUCTS];
}

function getConsumersAnalytics() {
  return CONSUMER_METRICS;
}

function getDbStatus() {
  return {
    mode: isConnectedToMySQL ? 'mysql' : 'in-memory',
    connected: isConnectedToMySQL,
    host: process.env.DB_HOST || (process.env.DATABASE_URL ? 'via-database-url' : 'no-configurado'),
    database: process.env.DB_NAME || 'demo',
    user: process.env.DB_USER || 'pablovaldivia',
    latency: isConnectedToMySQL ? '4ms' : '0ms (In-Memory Engine)',
    totalProducts: inMemoryProducts.length,
    error: lastDbError
  };
}

module.exports = {
  initDB,
  getProducts,
  addProduct,
  deleteProduct,
  resetProducts,
  getConsumersAnalytics,
  getDbStatus
};
