window.PRODUCTS = [
  // Chaussures
  { id: 'p1', name: 'j.M Weston', category: 'chaussures', subcategory: 'sneakers', price: 55.00, oldPrice: 120.00, isNew: true, isPopular: true, images: ['images/chaussures/12.jpg', 'images/chaussures/13.jpg', 'images/chaussures/15.jpg'] },
  { id: 'p2', name: 'Derby classique', category: 'chaussures', subcategory: 'derbies', price: 110.00, oldPrice: 140.00, isNew: false, isPopular: true, images: ['images/chaussures/4.jpg', 'images/chaussures/5.jpg', 'images/chaussures/6.jpg'] },
  { id: 'p3', name: 'Bottes', category: 'chaussures', subcategory: 'sneakers', price: 60.00, oldPrice: null, isNew: true, isPopular: false, images: ['images/chaussures/7.jpg', 'images/chaussures/8.jpg', 'images/chaussures/9.jpg,'] },
  { id: 'p4', name: 'Campus', category: 'chaussures', subcategory: 'running', price: 30.00, oldPrice: 40.00, isNew: true, isPopular: true, images: ['images/chaussures/4.jpg', 'images/chaussures/3.jpg', 'images/chaussures/2.jpg'] },
  { id: 'p5', name: 'Loafer élégant', category: 'chaussures', subcategory: 'loafer', price: 118.00, oldPrice: 150.00, isNew: false, isPopular: true, images: ['images/chaussures/13.jpg', 'images/chaussures/14.jpg', 'images/chaussures/15.jpg'] },
  { id: 'p26', name: 'Boots street', category: 'chaussures', subcategory: 'boots', price: 126.00, oldPrice: 165.00, isNew: true, isPopular: true, images: ['images/chaussures/16.jpg', 'images/chaussures/17.jpg', 'images/chaussures/18.jpg'] },
  { id: 'p27', name: 'Sandale moderne', category: 'chaussures', subcategory: 'sandales', price: 72.00, oldPrice: 95.00, isNew: false, isPopular: false, images: ['images/chaussures/19.jpg', 'images/chaussures/20.jpg', 'images/chaussures/21.jpg'] },
  { id: 'p28', name: 'Sneaker city', category: 'chaussures', subcategory: 'sneakers', price: 55.00, oldPrice: 118.00, isNew: true, isPopular: true, images: ['images/chaussures/22.jpg', 'images/chaussures/23.jpg', 'images/chaussures/24.jpg'] },

  // Homme
  { id: 'p6', name: 'Chemise homme', category: 'homme', subcategory: 'chemises', price: 17.00, oldPrice: 25.00, isNew: true, isPopular: true, images: ['images/homme/52.jpg', 'images/homme/53.jpg', 'images/homme/54.jpg'] },
  { id: 'p7', name: 'Pantalon slim', category: 'homme', subcategory: 'pantalons', price: 49.00, oldPrice: null, isNew: false, isPopular: true, images: ['images/homme/4.jpg', 'images/homme/5.jpg', 'images/homme/1.jpg'] },
  { id: 'p8', name: 'Blazer moderne', category: 'homme', subcategory: 'blazers', price: 120.00, oldPrice: 155.00, isNew: false, isPopular: true, images: ['images/homme/2.jpg', 'images/homme/3.jpg', 'images/homme/4.jpg'] },
  { id: 'p9', name: 'Pull premium', category: 'homme', subcategory: 'pulls', price: 17.00, oldPrice: 25.00, isNew: true, isPopular: false, images: ['images/homme/38.jpg', 'images/homme/39.jpg', 'images/homme/40.jpg'] },
  { id: 'p10', name: 'Veste casual', category: 'homme', subcategory: 'vestes', price: 96.00, oldPrice: 122.00, isNew: true, isPopular: true, images: ['images/homme/9.jpg', 'images/homme/10.jpg', 'images/homme/11.jpg'] },
  { id: 'p29', name: 'T-shirt premium', category: 'homme', subcategory: 'tshirts', price: 26.00, oldPrice: 34.00, isNew: true, isPopular: true, images: ['images/homme/12.jpg', 'images/homme/13.jpg', 'images/homme/14.jpg'] },
  { id: 'p30', name: 'Jean classique', category: 'homme', subcategory: 'jeans', price: 58.00, oldPrice: 76.00, isNew: false, isPopular: true, images: ['images/homme/15.jpg', 'images/homme/16.jpg', 'images/homme/17.jpg'] },
  { id: 'p31', name: 'Costume léger', category: 'homme', subcategory: 'costumes', price: 145.00, oldPrice: 185.00, isNew: false, isPopular: true, images: ['images/homme/18.jpg', 'images/homme/19.jpg', 'images/homme/20.jpg'] },

  // Femme
  { id: 'p11', name: 'Robe élégante', category: 'femme', subcategory: 'robes', price: 68.00, oldPrice: 92.00, isNew: true, isPopular: true, images: ['images/femme/1.jpg', 'images/femme/2.jpg', 'images/femme/3.jpg'] },
  { id: 'p12', name: 'Sac à main', category: 'femme', subcategory: 'sacs', price: 55.00, oldPrice: 74.00, isNew: false, isPopular: true, images: ['images/femme/4.jpg', 'images/femme/5.jpg', 'images/femme/1.jpg'] },
  { id: 'p13', name: 'Ensemble casual', category: 'femme', subcategory: 'ensembles', price: 62.00, oldPrice: null, isNew: true, isPopular: false, images: ['images/femme/1.jpg', 'images/femme/2.jpg', 'images/femme/5.jpg'] },
  { id: 'p14', name: 'Bottines luxe', category: 'femme', subcategory: 'bottines', price: 74.00, oldPrice: 96.00, isNew: true, isPopular: true, images: ['images/femme/6.jpg', 'images/femme/7.jpg', 'images/femme/8.jpg'] },
  { id: 'p15', name: 'Écharpe mode', category: 'femme', subcategory: 'accessoires', price: 26.00, oldPrice: 36.00, isNew: false, isPopular: true, images: ['images/femme/9.jpg', 'images/femme/10.jpg', 'images/femme/11.jpg'] },
  { id: 'p32', name: 'Jupe longue', category: 'femme', subcategory: 'jupes', price: 52.00, oldPrice: 69.00, isNew: true, isPopular: true, images: ['images/femme/12.jpg', 'images/femme/13.jpg', 'images/femme/14.jpg'] },
  { id: 'p33', name: 'Top chic', category: 'femme', subcategory: 'tops', price: 31.00, oldPrice: 42.00, isNew: true, isPopular: false, images: ['images/femme/15.jpg', 'images/femme/16.jpg', 'images/femme/17.jpg'] },
  { id: 'p34', name: 'Manteau léger', category: 'femme', subcategory: 'manteaux', price: 109.00, oldPrice: 139.00, isNew: false, isPopular: true, images: ['images/femme/18.jpg', 'images/femme/19.jpg', 'images/femme/20.jpg'] },

  // Enfants
  { id: 'p16', name: 'Ensemble enfant', category: 'enfants', subcategory: 'ensembles', price: 32.00, oldPrice: 45.00, isNew: true, isPopular: true, images: ['images/enfants/1.jpg', 'images/enfants/2.jpg', 'images/enfants/3.jpg'] },
  { id: 'p17', name: 'Veste enfant', category: 'enfants', subcategory: 'vestes', price: 38.00, oldPrice: null, isNew: false, isPopular: true, images: ['images/enfants/4.jpg', 'images/enfants/5.jpg', 'images/enfants/1.jpg'] },
  { id: 'p18', name: 'Set sport enfant', category: 'enfants', subcategory: 'sport', price: 29.00, oldPrice: 39.00, isNew: true, isPopular: true, images: ['images/enfants/6.jpg', 'images/enfants/7.jpg', 'images/enfants/8.jpg'] },
  { id: 'p19', name: 'Doudoune enfant', category: 'enfants', subcategory: 'doudounes', price: 41.00, oldPrice: 57.00, isNew: false, isPopular: true, images: ['images/enfants/9.jpg', 'images/enfants/10.jpg', 'images/enfants/11.jpg'] },
  { id: 'p20', name: 'Pantalon enfant', category: 'enfants', subcategory: 'pantalons', price: 22.00, oldPrice: 31.00, isNew: true, isPopular: false, images: ['images/enfants/12.jpg', 'images/enfants/13.jpg', 'images/enfants/14.jpg'] },
  { id: 'p35', name: 'Chemise enfant', category: 'enfants', subcategory: 'chemises', price: 20.00, oldPrice: 28.00, isNew: true, isPopular: false, images: ['images/enfants/15.jpg', 'images/enfants/16.jpg', 'images/enfants/17.jpg'] },
  { id: 'p36', name: 'Pull enfant', category: 'enfants', subcategory: 'pulls', price: 24.00, oldPrice: 33.00, isNew: false, isPopular: true, images: ['images/enfants/18.jpg', 'images/enfants/19.jpg', 'images/enfants/20.jpg'] },
  { id: 'p37', name: 'Short enfant', category: 'enfants', subcategory: 'shorts', price: 18.00, oldPrice: 24.00, isNew: true, isPopular: false, images: ['images/enfants/21.jpg', 'images/enfants/22.jpg', 'images/enfants/23.jpg'] },

  // Accessoires
  { id: 'p21', name: 'Casquette premium', category: 'accessoires', subcategory: 'casquettes', price: 18.00, oldPrice: 25.00, isNew: true, isPopular: false, images: ['images/accessoires/1.jpg', 'images/accessoires/2.jpg', 'images/accessoires/3.jpg'] },
  { id: 'p22', name: 'Sautoir luxe', category: 'accessoires', subcategory: 'bijoux', price: 28.00, oldPrice: 36.00, isNew: false, isPopular: true, images: ['images/accessoires/4.jpg', 'images/accessoires/5.jpg', 'images/accessoires/1.jpg'] },
  { id: 'p23', name: 'Lunettes solaire', category: 'accessoires', subcategory: 'optique', price: 24.00, oldPrice: null, isNew: true, isPopular: false, images: ['images/accessoires/kepi1.jpg', 'images/accessoires/kepi2.jpg', 'images/accessoires/kepi3.jpg'] },
  { id: 'p24', name: 'Montre connectée', category: 'accessoires', subcategory: 'montres', price: 69.00, oldPrice: 89.00, isNew: true, isPopular: false, images: ['images/accessoires/6.jpg', 'images/accessoires/7.jpg', 'images/accessoires/8.jpg'] },
  { id: 'p25', name: 'Portfolio luxe', category: 'accessoires', subcategory: 'sacs', price: 48.00, oldPrice: 63.00, isNew: false, isPopular: true, images: ['images/accessoires/9.jpg', 'images/accessoires/10.jpg', 'images/accessoires/11.jpg'] },
  { id: 'p38', name: 'Sac de voyage', category: 'accessoires', subcategory: 'sacs', price: 54.00, oldPrice: 71.00, isNew: true, isPopular: true, images: ['images/accessoires/12.jpg', 'images/accessoires/13.jpg', 'images/accessoires/14.jpg'] },
  { id: 'p39', name: 'Bracelet luxe', category: 'accessoires', subcategory: 'bijoux', price: 32.00, oldPrice: 43.00, isNew: false, isPopular: true, images: ['images/accessoires/15.jpg', 'images/accessoires/16.jpg', 'images/accessoires/17.jpg'] },
  { id: 'p40', name: 'Ceinture premium', category: 'accessoires', subcategory: 'ceintures', price: 21.00, oldPrice: 29.00, isNew: true, isPopular: false, images: ['images/accessoires/18.jpg', 'images/accessoires/19.jpg', 'images/accessoires/20.jpg'] }
];
