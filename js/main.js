/**
 * ATELIER — main.js
 * Comprehensive Dynamic Interactions for the Atelier Minimal Clothing Store
 * Features:
 *   - Bilingual Support (English & Arabic RTL with dynamic live translation)
 *   - Complete Wishlist / Favorites System (Drawer, add/remove, move to cart, badge sync)
 *   - Interactive Product Catalog with "View All" toggle & Category Filter pills
 *   - Shopping Cart (add, adjust quantity, remove, live subtotal & item counts)
 *   - Luxury Checkout System (Egypt shipping & payment options: InstaPay, Vodafone Cash, Meeza, COD)
 *   - Simulated Order Placement & Receipt Confirmation with print support
 *   - Dynamic Copyright Year (automatic current year)
 *   - Search Overlay with real-time bilingual filtering
 *   - Newsletter form verification & toast notifications
 */

"use strict";

/* =====================================================
   1. PRODUCTS CATALOG DATA (8 Curated Pieces)
   ===================================================== */
const PRODUCTS = [
  {
    id: 1,
    name: "Oversized Wool Blazer",
    nameAr: "بليزر صوف أوفرسايز فاخر",
    price: 290,
    category: "Outerwear",
    categoryAr: "ملابس خارجية",
    rating: "4.9",
    badge: "Bestseller",
    badgeAr: "الأكثر طلباً",
    img: "images/product-blazer.jpg",
  },
  {
    id: 2,
    name: "Silk Crepe Wide Trouser",
    nameAr: "بنطال حرير كريب واسع",
    price: 185,
    category: "Bottoms",
    categoryAr: "بناطيل",
    rating: "4.8",
    badge: "New",
    badgeAr: "جديد",
    img: "images/product-trousers.jpg",
  },
  {
    id: 3,
    name: "Ribbed Cashmere Mockneck",
    nameAr: "كنزة كشمير مضلعة برقبة عالية",
    price: 210,
    category: "Knitwear",
    categoryAr: "تريكو وكشمير",
    rating: "4.9",
    badge: "Luxury",
    badgeAr: "فاخر",
    img: "images/women.jpg",
  },
  {
    id: 4,
    name: "Sculptural Minimal Loafer",
    nameAr: "حذاء لوفر جلدي كلاسيكي",
    price: 245,
    category: "Footwear",
    categoryAr: "أحذية",
    rating: "4.7",
    badge: "Artisanal",
    badgeAr: "صناعة يدوية",
    img: "images/accessories.jpg",
  },
  {
    id: 5,
    name: "Structured Wool Trench Coat",
    nameAr: "معطف ترنش صوف مهيكل",
    price: 340,
    category: "Outerwear",
    categoryAr: "ملابس خارجية",
    rating: "5.0",
    badge: "Signature",
    badgeAr: "إصدار خاص",
    img: "images/hero.jpg",
  },
  {
    id: 6,
    name: "Pleated Silk Crepe Skirt",
    nameAr: "تنورة حرير كريب ميدي بليسيه",
    price: 175,
    category: "Bottoms",
    categoryAr: "بناطيل وتنانير",
    rating: "4.8",
    badge: "Capsule",
    badgeAr: "مجموعة الربيع",
    img: "images/women.jpg",
  },
  {
    id: 7,
    name: "Tailored Linen Overshirt",
    nameAr: "قميص كتان مفصل راقٍ",
    price: 195,
    category: "Men",
    categoryAr: "أزياء رجالية",
    rating: "4.9",
    badge: "Limited",
    badgeAr: "إصدار محدود",
    img: "images/men.jpg",
  },
  {
    id: 8,
    name: "Sculptural Leather Crossbody Bag",
    nameAr: "حقيبة كروس جلدية بسيطة وراقية",
    price: 220,
    category: "Accessories",
    categoryAr: "إكسسوارات",
    rating: "4.9",
    badge: "Italian Leather",
    badgeAr: "جلد إيطالي",
    img: "images/accessories.jpg",
  },
];

/* =====================================================
   2. STATE
   ===================================================== */
const state = {
  cart: [], // [{ id, name, price, category, img, qty }]
  wishlist: [], // [{ id, name, price, category, img }]
  lang: "en", // 'en' | 'ar'
  isExpanded: false, // View all toggle
  activeFilter: "all", // Filter by category
  promoDiscount: 0, // Promo discount percentage
  paymentMethod: "card", // 'card' | 'cod' | 'wallet'
};

/* =====================================================
   3. TRANSLATIONS DICTIONARY (100% Full Bilingual Coverage)
   ===================================================== */
const I18N = {
  en: {
    langBtn: "عربي",
    drawerLangBtn: "التبديل إلى العربية",
    brandSub: "Edition",
    navHome: "Home",
    navCollections: "Collections",
    navShop: "Shop The Edit",
    navFavorites: "Favorites",
    navMembers: "Members Club",
    navAbout: "About",
    navContact: "Contact",
    drawerQuote:
      '"Timeless elegance reflecting your unique style. Discover our exclusive mirror collection."',
    heroBadge: "Edition 04 / Spring Capsule",
    heroOverline: "New Arrivals",
    heroHeadline: "Discover Your Unique Style",
    heroSub:
      "Curated minimalist essentials crafted for effortless elegance, timeless comfort, and conscious living.",
    shopNow: "Shop Now",
    heroQuote:
      '"Timeless elegance reflecting your unique style. Discover our exclusive mirror collection."',
    heroOrigin: "Modern Style — Premium Fashion",
    categoriesTitle: "Shop by Category",
    categoriesCount: "03 Curations",
    womenCount: "48 Items",
    womenTitle: "Women",
    womenDesc: "Effortless Tailoring & Silks",
    menCount: "36 Items",
    menTitle: "Men",
    menDesc: "Minimal Suiting & Cashmere",
    accCount: "24 Items",
    accTitle: "Accessories",
    accDesc: "Handcrafted Leather & Jewelry",
    val1Title: "Sustainably Sourced",
    val1Desc: "100% trace-certified European organic fibers",
    val2Title: "Complimentary Express",
    val2Desc: "Carbon-neutral courier on all orders",
    val3Title: "Artisanal Craftsmanship",
    val3Desc: "Limited batch tailoring produced",
    theEdit: "The Edit",
    curatedEssentials: "Curated Essentials",
    viewAll: "View All (8 Pieces)",
    showLess: "Show Less (4 Pieces)",
    filterAll: "All Pieces",
    filterOuterwear: "Outerwear",
    filterBottoms: "Bottoms",
    filterKnitwear: "Knitwear",
    filterFootwear: "Footwear",
    filterAccessories: "Accessories",
    filterMen: "Men",
    filterWomen: "Women",
    addToCart: "Add to Cart",
    added: "Added",
    cartTitle: "Your Cart",
    cartEmpty: "Your cart is empty",
    cartEmptySub: "Add curated pieces to begin.",
    subtotal: "Subtotal",
    checkoutBtn: "Proceed to Checkout",
    cartShippingNote: "Complimentary express shipping on all orders",
    wishlistTitle: "Your Favorites",
    wishlistEmpty: "Your favorites list is empty",
    wishlistEmptySub: "Click the heart on any piece you love to save it here.",
    moveAllToCart: "Move All Pieces to Cart",
    moveToCart: "Move to Cart",
    newsBadge: "Members Club",
    newsHeadline: "Join The Atelier Club",
    newsSub:
      "Receive exclusive early invites to seasonal private sales, architectural lookbooks, and 10% off your first curation.",
    newsJoin: "Join",
    newsDisclaimer: "Unsubscribe anytime. Zero noise policy.",
    newsSuccessTitle: "Welcome to The Atelier Club",
    newsSuccessSub: "Check your inbox for your private edition code.",
    footerBrandDesc:
      "Quiet confidence through architectural silhouettes, artisanal craft, and modern European pacing.",
    footerJournal: "The Journal",
    footerSubscribe: "Subscribe",
    footerNavLabel: "Navigation",
    footerLookbook: "Lookbook",
    footerStudio: "Atelier Studio",
    footerStockists: "Stockists",
    footerArchives: "Archives",
    footerClientCare: "Client Care",
    footerShipping: "Shipping & Returns",
    footerAppointments: "Private Appointments",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerCopy: "ATELIER INC. All rights reserved.",
    checkoutTitle: "ATELIER Checkout",
    secureBadge: "256-Bit SSL Encrypted",
    shippingTitle: "Shipping & Delivery Details",
    fullNameLabel: "Full Name *",
    emailLabel: "Email Address *",
    phoneLabel: "Phone Number *",
    addressLabel: "Street Address *",
    cityLabel: "City *",
    countryLabel: "Country / Region *",
    countryEG: "Egypt (جمهورية مصر العربية 🇪🇬)",
    countrySA: "Saudi Arabia (المملكة العربية السعودية 🇸🇦)",
    countryAE: "United Arab Emirates (الإمارات 🇦🇪)",
    countryKW: "Kuwait (الكويت 🇰🇼)",
    countryUS: "United States 🇺🇸",
    countryFR: "France 🇫🇷",
    countryUK: "United Kingdom 🇬🇧",
    paymentMethodTitle: "Payment Method (وسيلة الدفع)",
    cardNumber: "Card Number",
    cardExpiry: "Expiry (MM/YY)",
    cardCvv: "CVV / CVC",
    cardholderName: "Cardholder Name",
    payCardName: "Credit, Debit & Meeza Cards",
    payCardSub: "Visa, Mastercard, Meeza (ميزة مصر), American Express",
    payCodName: "Cash on Delivery — الدفع عند الاستلام في مصر",
    payCodSub: "Pay in cash or POS terminal upon delivery anywhere in Egypt",
    payCodNote:
      "الدفع نقدًا بالجنيه المصري (EGP) أو ببطاقة الدفع للمندوب عند وصول شحنتك لباب المنزل في كافة محافظات جمهورية مصر العربية (القاهرة، الجيزة، الإسكندرية، وجميع المحافظات).",
    payWalletName: "InstaPay, Vodafone Cash & Digital Wallets",
    payWalletSub: "انستاباي، فودافون كاش، محافظ المحمول، Apple Pay & PayPal",
    payWalletNote:
      "تحويل فوري لحظي عبر شبكة المدفوعات اللحظية InstaPay أو محفظة الهاتف الذكي، مع كود تأكيد فوري ومباشر.",
    orderSummary: "Order Summary",
    applyPromo: "Apply",
    promoPrivilege: "Atelier Privilege (10%)",
    freeShipping: "Complimentary Shipping",
    free: "FREE",
    total: "Total",
    confirmAndPay: "Confirm & Pay",
    guarantee1: "✓ 30-day effortless returns",
    guarantee2: "✓ Artisanal authenticity certificate",
    orderConfirmed: "Order Confirmed",
    thankYou: "Thank You For Your Order",
    thankYouSub:
      "Your order has been received and is being prepared with artisanal care. A confirmation email with tracking has been sent.",
    receiptRef: "Order Reference:",
    receiptRecipient: "Recipient",
    receiptAddress: "Delivery Address",
    receiptPaymentMethod: "Payment Method",
    receiptTotal: "Total Amount",
    receiptEstimateText:
      "Estimated Delivery: 2 – 4 Business Days (Carbon Neutral)",
    printReceipt: "Print Receipt",
    continueShopping: "Continue Shopping",
    searchPlaceholder: "Search pieces, collections...",
    emailPlaceholder: "Enter your email address",
    namePlaceholder: "e.g. Eleanor Vance",
    emailInputPlaceholder: "eleanor@example.com",
    phonePlaceholder: "+20 100 123 4567",
    addressPlaceholder: "128 Rue de Faubourg Saint-Honoré",
    cityPlaceholder: "Cairo / Alexandria / Paris",
    cardholderPlaceholder: "Eleanor Vance",
    promoPlaceholder: "Promo code (try ATELIER10)",
  },
  ar: {
    langBtn: "EN",
    drawerLangBtn: "Switch to English",
    brandSub: "نسخة حصرية",
    navHome: "الرئيسية",
    navCollections: "المجموعات",
    navShop: "تسوق التشكيلة",
    navFavorites: "المفضلة",
    navMembers: "نادي الأعضاء",
    navAbout: "عن المتجر",
    navContact: "تواصل معنا",
    drawerQuote:
      '"أناقة خالدة تعكس أسلوبك الفريد. اكتشف تشكيلة المرايا الحصرية لدينا."',
    heroBadge: "إصدار 04 / مجموعة الربيع الخاصة",
    heroOverline: "تشكيلة الموسم الجديدة",
    heroHeadline: "اكتشف أسلوبك الراقي والفريد",
    heroSub:
      "قطع أزياء أساسية صُممت بعناية فائقة وتناغم لراحتك وأناقتك الدائمة مع لمسات أوروبية معاصرة.",
    shopNow: "تسوق الآن",
    heroQuote:
      '"أناقة خالدة تعكس أسلوبك الفريد. اكتشف تشكيلة المرايا الحصرية لدينا."',
    heroOrigin: "موضة عصرية — أزياء فاخرة",
    categoriesTitle: "تسوق حسب المجموعة",
    categoriesCount: "03 مجموعات حصرية",
    womenCount: "48 قطعة",
    womenTitle: "المجموعة النسائية",
    womenDesc: "أقمشة حريرية وتفصيل راقٍ",
    menCount: "36 قطعة",
    menTitle: "المجموعة الرجالية",
    menDesc: "بدل كلاسيكية وكشمير خالص",
    accCount: "24 قطعة",
    accTitle: "الإكسسوارات",
    accDesc: "حقائب جلدية يدوية ومجوهرات",
    val1Title: "مصادر طبيعية مستدامة",
    val1Desc: "ألياف عضوية أوروبية موثقة 100%",
    val2Title: "شحن سريع ومجاني",
    val2Desc: "توصيل سريع وآمن لكافة الطلبات",
    val3Title: "حرفية وفن إيطالي",
    val3Desc: "إنتاج محدود بدقة متناهية",
    theEdit: "المختارات الحصرية",
    curatedEssentials: "القطع الأساسية الفاخرة",
    viewAll: "عرض الكل (8 قطع)",
    showLess: "عرض أقل (4 قطع)",
    filterAll: "جميع القطع",
    filterOuterwear: "ملابس خارجية",
    filterBottoms: "بناطيل وتنانير",
    filterKnitwear: "تريكو وكشمير",
    filterFootwear: "أحذية",
    filterAccessories: "إكسسوارات",
    filterMen: "رجالي",
    filterWomen: "نسائي",
    addToCart: "إضافة للسلة",
    added: "تمت الإضافة",
    cartTitle: "سلة المشتريات",
    cartEmpty: "سلتك فارغة حالياً",
    cartEmptySub: "أضف قطعك المفضلة لبدء التسوق.",
    subtotal: "المجموع الفرعي",
    checkoutBtn: "متابعة الدفع والطلب",
    cartShippingNote: "شحن سريع ومجاني لجميع الطلبات في مصر والعالم",
    wishlistTitle: "قائمة المفضلة",
    wishlistEmpty: "قائمة المفضلة فارغة حالياً",
    wishlistEmptySub: "اضغط على القلب على أي قطعة تنال إعجابك لحفظها هنا.",
    moveAllToCart: "نقل جميع القطع إلى السلة",
    moveToCart: "نقل للسلة",
    newsBadge: "نادي الأعضاء",
    newsHeadline: "انضم إلى نادي أتيلييه الحصري",
    newsSub:
      "احصل على دعوات حصرية للخصومات الموسمية وكتالوجات الإطلالات وخصم 10% على أول طلب لك.",
    newsJoin: "انضمام",
    newsDisclaimer: "يمكنك إلغاء الاشتراك في أي وقت. بلا أي رسائل مزعجة.",
    newsSuccessTitle: "أهلاً بك في نادي أتيلييه",
    newsSuccessSub:
      "تفقد بريدك الإلكتروني للحصول على كود العضوية والخصم الخاص بك.",
    footerBrandDesc:
      "ثقة وهدوء من خلال تصاميم معمارية، حرفية يدوية وإيقاع أوروبي معاصر لأصحاب الذوق الرفيع.",
    footerJournal: "مجلة أتيلييه",
    footerSubscribe: "اشتراك",
    footerNavLabel: "روابط سريعة",
    footerLookbook: "كتالوج الإطلالات",
    footerStudio: "استوديو أتيلييه",
    footerStockists: "الموزعون المعتمدون",
    footerArchives: "الأرشيف والتاريخ",
    footerClientCare: "خدمة العملاء",
    footerShipping: "الشحن والاسترجاع",
    footerAppointments: "مواعيد حصرية خاصة",
    footerPrivacy: "سياسة الخصوصية",
    footerTerms: "الشروط والأحكام",
    footerCopy: "شركة أتيلييه المحدودة. جميع الحقوق محفوظة.",
    checkoutTitle: "أتيلييه - إتمام الشراء الآمن",
    secureBadge: "تشفير مصرفي آمن 256-Bit",
    shippingTitle: "بيانات الشحن وعنوان التوصيل",
    fullNameLabel: "الاسم بالكامل *",
    emailLabel: "البريد الإلكتروني *",
    phoneLabel: "رقم الهاتف المحمول *",
    addressLabel: "عنوان الشارع ورقم المبنى *",
    cityLabel: "المدينة أو المحافظة *",
    countryLabel: "الدولة أو المنطقة *",
    countryEG: "جمهورية مصر العربية 🇪🇬",
    countrySA: "المملكة العربية السعودية 🇸🇦",
    countryAE: "الإمارات العربية المتحدة 🇦🇪",
    countryKW: "الكويت 🇰🇼",
    countryUS: "الولايات المتحدة 🇺🇸",
    countryFR: "فرنسا 🇫🇷",
    countryUK: "المملكة المتحدة 🇬🇧",
    paymentMethodTitle: "وسيلة الدفع المعتمدة",
    cardNumber: "رقم البطاقة البنكية",
    cardExpiry: "تاريخ الانتهاء (MM/YY)",
    cardCvv: "رمز الأمان (CVV)",
    cardholderName: "الاسم كما هو مدون على البطاقة",
    payCardName: "بطاقات الائتمان وميزة (Meeza) والخصم",
    payCardSub: "فيزا، ماستركارد، بطاقة ميزة المصرية، أمريكان إكسبريس",
    payCodName: "الدفع عند الاستلام في مصر (كافة المحافظات)",
    payCodSub: "الدفع نقدًا أو بالبطاقة عند استلام الشحنة لباب منزلك",
    payCodNote:
      "الدفع نقدًا بالجنيه المصري (EGP) أو ببطاقة الدفع للمندوب عند وصول شحنتك لباب المنزل في كافة محافظات جمهورية مصر العربية (القاهرة، الجيزة، الإسكندرية، وجميع المحافظات).",
    payWalletName: "انستاباي، فودافون كاش، والمحافظ الرقمية",
    payWalletSub:
      "تحويل لحظي فوري عبر InstaPay، محافظ المحمول، Apple Pay & PayPal",
    payWalletNote:
      "تحويل فوري لحظي عبر شبكة المدفوعات اللحظية InstaPay أو محفظة الهاتف الذكي، مع كود تأكيد فوري ومباشر.",
    orderSummary: "ملخص الطلب",
    applyPromo: "تطبيق الخصم",
    promoPrivilege: "خصم أعضاء أتيلييه (10%)",
    freeShipping: "شحن سريع ومجاني",
    free: "مجاناً",
    total: "الإجمالي النهائي",
    confirmAndPay: "تأكيد الطلب والدفع",
    guarantee1: "✓ إمكانية الاسترجاع والاستبدال خلال 30 يوماً",
    guarantee2: "✓ شهادة جودة وأصالة لجميع القطع المعروضة",
    orderConfirmed: "تم تأكيد الطلب بنجاح",
    thankYou: "شكراً لطلبك من متجر أتيلييه",
    thankYouSub:
      "تم استلام طلبك وبدأت عملية التجهيز والتغليف الفاخر بعناية. تم إرسال تفاصيل التتبع لبريدك الإلكتروني.",
    receiptRef: "الرقم المرجعي للطلب:",
    receiptRecipient: "اسم المستلم",
    receiptAddress: "عنوان التوصيل",
    receiptPaymentMethod: "وسيلة الدفع المستخدمة",
    receiptTotal: "المبلغ الإجمالي",
    receiptEstimateText:
      "موعد التوصيل المتوقع: من 2 إلى 4 أيام عمل (شحن آمن وسريع)",
    printReceipt: "طباعة الفاتورة",
    continueShopping: "متابعة التسوق",
    searchPlaceholder: "ابحث عن القطع، التشكيلات، المنتجات...",
    emailPlaceholder: "أدخل بريدك الإلكتروني هنا",
    namePlaceholder: "مثال: سارة أحمد / محمد محمود",
    emailInputPlaceholder: "name@example.com",
    phonePlaceholder: "+20 100 123 4567",
    addressPlaceholder: "العنوان، اسم الشارع، رقم العقار",
    cityPlaceholder: "القاهرة / الجيزة / الإسكندرية",
    cardholderPlaceholder: "الاسم المدون على البطاقة",
    promoPlaceholder: "أدخل كود الخصم (جرب ATELIER10)",
  },
};

/* =====================================================
   4. DOM REFERENCES
   ===================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// Header & Navigation
const header = $("#site-header");
const menuBtn = $("#menu-btn");
const menuOverlay = $("#menu-overlay");
const drawerMenu = $("#drawer-menu");
const drawerCloseBtn = $("#drawer-close-btn");
const langToggleBtn = $("#lang-toggle-btn");
const langLabel = $("#lang-label");
const drawerLangBtn = $("#drawer-lang-btn");
const drawerLangLabel = $("#drawer-lang-label");
const searchBtn = $("#search-btn");
const searchOverlay = $("#search-overlay");
const searchInput = $("#search-input");
const searchCloseBtn = $("#search-close-btn");
const searchResults = $("#search-results");

// Cart Drawer
const cartBtn = $("#cart-btn");
const cartOverlay = $("#cart-overlay");
const cartDrawer = $("#cart-drawer");
const cartCloseBtn = $("#cart-close-btn");
const cartCount = $("#cart-count");
const cartItemsList = $("#cart-items-list");
const cartEmptyState = $("#cart-empty-state");
const cartFooter = $("#cart-footer");
const cartTotalDisplay = $("#cart-total-display");
const checkoutBtn = $("#checkout-btn");

// Wishlist Drawer
const wishlistBtn = $("#wishlist-btn");
const wishlistCount = $("#wishlist-count");
const wishlistOverlay = $("#wishlist-overlay");
const wishlistDrawer = $("#wishlist-drawer");
const wishlistCloseBtn = $("#wishlist-close-btn");
const wishlistItemsList = $("#wishlist-items-list");
const wishlistEmptyState = $("#wishlist-empty-state");
const wishlistFooter = $("#wishlist-footer");
const wishlistMoveAllBtn = $("#wishlist-move-all-btn");
const drawerWishlistLink = $("#drawer-wishlist-link");
const drawerWishlistCount = $("#drawer-wishlist-count");

// Products & Filters
const productsGrid = $("#products-grid");
const viewAllBtn = $("#view-all-btn");
const filterPills = $$(".filter-pill");

// Toast
const cartToast = $("#cart-toast");
const toastText = $("#toast-text");

// Checkout Modal
const checkoutOverlay = $("#checkout-overlay");
const checkoutModal = $("#checkout-modal");
const checkoutCloseBtn = $("#checkout-close-btn");
const checkoutForm = $("#checkout-form");
const checkoutFormView = $("#checkout-form-view");
const checkoutSuccessView = $("#checkout-success-view");
const checkoutSummaryItems = $("#checkout-summary-items");
const checkoutSubtotalVal = $("#checkout-subtotal-val");
const checkoutDiscountRow = $("#checkout-discount-row");
const checkoutDiscountVal = $("#checkout-discount-val");
const checkoutTotalVal = $("#checkout-total-val");
const checkoutSubmitBtn = $("#checkout-submit-btn");
const checkoutPromoInput = $("#checkout-promo-input");
const checkoutPromoBtn = $("#checkout-promo-btn");
const promoFeedback = $("#promo-feedback");
const paymentMethodInputs = $$('input[name="payment_method"]');
const paneCard = $("#pane-card");
const paneCod = $("#pane-cod");
const paneWallet = $("#pane-wallet");
const checkoutPrintBtn = $("#checkout-print-btn");
const checkoutContinueBtn = $("#checkout-continue-btn");
const cardNumberInput = $("#card-number");
const cardExpiryInput = $("#card-expiry");
const cardCvvInput = $("#card-cvv");

// Newsletter & Footer
const newsletterForm = $("#newsletter-form");
const newsletterSuccess = $("#newsletter-success");
const footerSubscribeBtn = $("#footer-subscribe-btn");
const copyrightYearEl = $("#copyright-year");
const bottomNavItems = $$(".bottom-nav-item");

/* =====================================================
   5. UTILITY: FORMAT PRICE & TOAST
   ===================================================== */
function formatPrice(amount) {
  if (state.lang === "ar") {
    return amount + " ج.م";
  }
  return "$" + amount;
}

let toastTimer = null;
function showToast(message) {
  if (!cartToast || !toastText) return;
  toastText.textContent = message;
  cartToast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => cartToast.classList.remove("show"), 2600);
}

/* =====================================================
   6. DYNAMIC COPYRIGHT YEAR
   ===================================================== */
if (copyrightYearEl) {
  copyrightYearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   7. LANGUAGE SWITCHER SYSTEM (100% Arabic & English)
   ===================================================== */
function setLanguage(lang) {
  state.lang = lang;
  const isAr = lang === "ar";
  const t = I18N[lang];

  // Set HTML attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = isAr ? "rtl" : "ltr";
  document.body.classList.toggle("lang-ar", isAr);

  // Update Page Title
  document.title = isAr
    ? "أتيلييه — متجر الأزياء الفاخرة والبسيطة"
    : "ATELIER — Modern Minimalist Clothing Store";

  // Update language buttons labels
  if (langLabel) langLabel.textContent = t.langBtn;
  if (drawerLangLabel) drawerLangLabel.textContent = t.drawerLangBtn;

  // Update text for all elements having [data-i18n]
  $$("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // Update input placeholders having [data-i18n-placeholder]
  $$("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // Update View All button text with current expanded state
  if (viewAllBtn) {
    viewAllBtn.textContent = state.isExpanded ? t.showLess : t.viewAll;
  }

  // Update products grid
  renderProducts();

  // Update cart & wishlist & checkout UI
  updateCartUI();
  updateWishlistUI();
  if (checkoutModal && !checkoutModal.classList.contains("hidden")) {
    renderCheckoutSummary();
  }

  showToast(isAr ? "تم تفعيل اللغة العربية بالكامل" : "Switched to English");
}

langToggleBtn?.addEventListener("click", () => {
  setLanguage(state.lang === "en" ? "ar" : "en");
});

drawerLangBtn?.addEventListener("click", () => {
  setLanguage(state.lang === "en" ? "ar" : "en");
  closeMenu();
});

/* =====================================================
   8. MENU DRAWER (Mobile)
   ===================================================== */
function openMenu() {
  drawerMenu?.classList.add("open");
  menuOverlay?.classList.add("open");
  drawerMenu?.setAttribute("aria-hidden", "false");
  menuOverlay?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  drawerCloseBtn?.focus();
}

function closeMenu() {
  drawerMenu?.classList.remove("open");
  menuOverlay?.classList.remove("open");
  drawerMenu?.setAttribute("aria-hidden", "true");
  menuOverlay?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

menuBtn?.addEventListener("click", openMenu);
drawerCloseBtn?.addEventListener("click", closeMenu);
menuOverlay?.addEventListener("click", closeMenu);
$$("a", drawerMenu)?.forEach((link) =>
  link.addEventListener("click", closeMenu),
);

/* =====================================================
   9. PRODUCTS CATALOG & "VIEW ALL" & CATEGORY FILTERS
   ===================================================== */
function getFilteredProducts() {
  let list = PRODUCTS;
  if (state.activeFilter !== "all") {
    list = list.filter(
      (p) => p.category.toLowerCase() === state.activeFilter.toLowerCase(),
    );
  }
  if (!state.isExpanded && state.activeFilter === "all") {
    return list.slice(0, 4); // First 4 curated pieces by default
  }
  return list;
}

function renderProducts() {
  if (!productsGrid) return;
  const items = getFilteredProducts();
  const isAr = state.lang === "ar";
  const t = I18N[state.lang];

  productsGrid.innerHTML = "";

  items.forEach((product) => {
    const isWished = state.wishlist.some((item) => item.id === product.id);
    const name = isAr ? product.nameAr : product.name;
    const category = isAr ? product.categoryAr : product.category;
    const badge = isAr ? product.badgeAr : product.badge;

    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.productId = product.id;
    card.setAttribute("role", "listitem");
    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${product.img}" alt="${name}" class="product-img" loading="lazy" />
        <span class="product-badge badge-primary">${badge}</span>
        <button class="wishlist-btn ${isWished ? "wished" : ""}" data-product-id="${product.id}" aria-label="Toggle Wishlist" data-wished="${isWished}">
          <span class="material-symbols-outlined">${isWished ? "favorite" : "favorite"}</span>
        </button>
      </div>
      <div class="product-meta">
        <div class="product-meta-top">
          <span class="product-category">${category}</span>
          <div class="product-rating"><span class="material-symbols-outlined star-icon">star</span><span>${product.rating}</span></div>
        </div>
        <h3 class="product-name">${name}</h3>
        <div class="product-footer">
          <span class="product-price">${formatPrice(product.price)}</span>
          <button class="btn-add-cart" data-product-id="${product.id}" aria-label="Add to cart">
            <span class="material-symbols-outlined">add</span><span>${t.addToCart}</span>
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });

  // Re-bind click events for card buttons
  $$(".btn-add-cart", productsGrid).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.productId);
      addToCart(id);

      const orig = btn.innerHTML;
      btn.innerHTML = `<span class="material-symbols-outlined">done</span><span>${t.added}</span>`;
      btn.classList.add("added");
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.classList.remove("added");
      }, 1400);
    });
  });

  $$(".wishlist-btn", productsGrid).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.productId);
      toggleWishlist(id);
    });
  });
}

// "View All" Button Handler
viewAllBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  state.isExpanded = !state.isExpanded;
  state.activeFilter = "all";

  // Reset active filter pill to 'all'
  filterPills.forEach((p) =>
    p.classList.toggle("active", p.dataset.category === "all"),
  );

  const t = I18N[state.lang];
  viewAllBtn.textContent = state.isExpanded ? t.showLess : t.viewAll;

  renderProducts();

  // Smooth scroll to products section
  $("#products")?.scrollIntoView({ behavior: "smooth" });
  showToast(
    state.isExpanded
      ? state.lang === "ar"
        ? "عرض جميع القطع الثمانية"
        : "Showing all 8 curated pieces"
      : state.lang === "ar"
        ? "عرض القطع الأساسية"
        : "Showing essentials",
  );
});

// Category Filter Pills Handler
filterPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    filterPills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");

    state.activeFilter = pill.dataset.category;
    state.isExpanded = true; // Auto-expand when user filters
    const t = I18N[state.lang];
    if (viewAllBtn) viewAllBtn.textContent = t.showLess;

    renderProducts();
  });
});

// Category Cards in Collections section can also trigger filters
$$(".category-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const titleEl = card.querySelector(".category-title");
    const catName = titleEl ? titleEl.textContent.trim().toLowerCase() : "";

    filterPills.forEach((p) => {
      const match =
        p.dataset.category.toLowerCase().includes(catName) ||
        catName.includes(p.dataset.category.toLowerCase());
      p.classList.toggle("active", match);
      if (match) state.activeFilter = p.dataset.category;
    });

    state.isExpanded = true;
    renderProducts();
    $("#products")?.scrollIntoView({ behavior: "smooth" });
  });
});

/* =====================================================
   10. WISHLIST / FAVORITES SYSTEM (قائمة الفيفورت)
   ===================================================== */
function toggleWishlist(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const idx = state.wishlist.findIndex((p) => p.id === productId);
  const isAr = state.lang === "ar";
  const prodName = isAr ? product.nameAr : product.name;

  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast(
      isAr
        ? `تمت إزالة ${prodName} من المفضلة`
        : `Removed from favorites: ${prodName}`,
    );
  } else {
    state.wishlist.push({ ...product });
    showToast(
      isAr
        ? `تمت إضافة ${prodName} إلى المفضلة`
        : `Added to favorites: ${prodName}`,
    );
  }

  updateWishlistUI();
  renderProducts(); // Refresh heart states on cards
}

function updateWishlistUI() {
  const count = state.wishlist.length;

  // Header and drawer badges
  if (wishlistCount) {
    wishlistCount.textContent = count;
    wishlistCount.classList.add("bump");
    setTimeout(() => wishlistCount.classList.remove("bump"), 300);
  }
  if (drawerWishlistCount) {
    drawerWishlistCount.textContent = count;
  }

  // Empty state vs items list
  if (!wishlistEmptyState || !wishlistFooter) return;
  if (count === 0) {
    wishlistEmptyState.style.display = "flex";
    wishlistFooter.style.display = "none";
  } else {
    wishlistEmptyState.style.display = "none";
    wishlistFooter.style.display = "block";
  }

  renderWishlistItems();
}

function renderWishlistItems() {
  if (!wishlistItemsList) return;
  $$(".wishlist-item", wishlistItemsList).forEach((el) => el.remove());

  const isAr = state.lang === "ar";
  const t = I18N[state.lang];

  state.wishlist.forEach((item) => {
    const el = document.createElement("div");
    el.className = "wishlist-item";
    el.dataset.id = item.id;
    const name = isAr ? item.nameAr : item.name;
    const category = isAr ? item.categoryAr : item.category;

    el.innerHTML = `
      <img class="wishlist-item-img" src="${item.img}" alt="${name}" />
      <div class="wishlist-item-info">
        <span class="wishlist-item-category">${category}</span>
        <span class="wishlist-item-name">${name}</span>
        <span class="wishlist-item-price">${formatPrice(item.price)}</span>
      </div>
      <div class="wishlist-item-actions">
        <button class="btn-wishlist-add-cart" data-id="${item.id}" aria-label="Add to cart">
          <span class="material-symbols-outlined" style="font-size:14px;">add_shopping_cart</span>
          <span>${t.moveToCart}</span>
        </button>
        <button class="btn-wishlist-remove" data-id="${item.id}" aria-label="Remove from favorites">
          <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
        </button>
      </div>
    `;
    wishlistItemsList.appendChild(el);
  });

  // Action listeners inside wishlist items
  $$(".btn-wishlist-add-cart", wishlistItemsList).forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      addToCart(id);
      toggleWishlist(id); // remove from wishlist once moved to cart
      showToast(isAr ? "تم نقل القطعة للسلة" : "Moved to cart");
    });
  });

  $$(".btn-wishlist-remove", wishlistItemsList).forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      toggleWishlist(id);
    });
  });
}

function openWishlist() {
  wishlistDrawer?.classList.add("open");
  wishlistOverlay?.classList.add("open");
  wishlistDrawer?.setAttribute("aria-hidden", "false");
  wishlistOverlay?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  wishlistCloseBtn?.focus();
}

function closeWishlist() {
  wishlistDrawer?.classList.remove("open");
  wishlistOverlay?.classList.remove("open");
  wishlistDrawer?.setAttribute("aria-hidden", "true");
  wishlistOverlay?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

wishlistBtn?.addEventListener("click", openWishlist);
wishlistCloseBtn?.addEventListener("click", closeWishlist);
wishlistOverlay?.addEventListener("click", closeWishlist);
drawerWishlistLink?.addEventListener("click", (e) => {
  e.preventDefault();
  closeMenu();
  openWishlist();
});

// Move all pieces from Wishlist to Cart
wishlistMoveAllBtn?.addEventListener("click", () => {
  if (state.wishlist.length === 0) return;
  state.wishlist.forEach((item) => {
    addToCart(item.id);
  });
  state.wishlist = [];
  updateWishlistUI();
  renderProducts();
  closeWishlist();
  openCart();
  showToast(
    state.lang === "ar"
      ? "تم نقل كافة القطع المفضلة إلى السلة!"
      : "All favorites moved to cart!",
  );
});

/* =====================================================
   11. SHOPPING CART SYSTEM
   ===================================================== */
function openCart() {
  cartDrawer?.classList.add("open");
  cartOverlay?.classList.add("open");
  cartDrawer?.setAttribute("aria-hidden", "false");
  cartOverlay?.setAttribute("aria-hidden", "false");
  cartBtn?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  cartCloseBtn?.focus();
}

function closeCart() {
  cartDrawer?.classList.remove("open");
  cartOverlay?.classList.remove("open");
  cartDrawer?.setAttribute("aria-hidden", "true");
  cartOverlay?.setAttribute("aria-hidden", "true");
  cartBtn?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  cartBtn?.focus();
}

cartBtn?.addEventListener("click", openCart);
cartCloseBtn?.addEventListener("click", closeCart);
cartOverlay?.addEventListener("click", closeCart);

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existing = state.cart.find((p) => p.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  const name = state.lang === "ar" ? product.nameAr : product.name;
  showToast(`${state.lang === "ar" ? "تمت الإضافة:" : "Added:"} ${name}`);
}

function updateCartUI() {
  const totalQty = state.cart.reduce((s, item) => s + item.qty, 0);
  const totalPrice = state.cart.reduce(
    (s, item) => s + item.price * item.qty,
    0,
  );

  // Badge count
  if (cartCount) {
    cartCount.textContent = totalQty;
    cartCount.classList.add("bump");
    setTimeout(() => cartCount.classList.remove("bump"), 300);
  }

  // Empty state vs items list
  if (!cartEmptyState || !cartFooter) return;
  if (state.cart.length === 0) {
    cartEmptyState.style.display = "flex";
    cartFooter.style.display = "none";
  } else {
    cartEmptyState.style.display = "none";
    cartFooter.style.display = "flex";
  }

  // Total
  if (cartTotalDisplay) {
    cartTotalDisplay.textContent = formatPrice(totalPrice);
  }

  // Render items
  renderCartItems();

  // Sync with checkout summary if modal is open
  if (
    typeof renderCheckoutSummary === "function" &&
    checkoutModal &&
    !checkoutModal.classList.contains("hidden")
  ) {
    renderCheckoutSummary();
  }
}

function renderCartItems() {
  if (!cartItemsList) return;
  $$(".cart-item", cartItemsList).forEach((el) => el.remove());

  const isAr = state.lang === "ar";

  state.cart.forEach((item) => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.dataset.id = item.id;
    const name = isAr ? item.nameAr : item.name;
    const category = isAr ? item.categoryAr : item.category;

    el.innerHTML = `
      <img class="cart-item-img" src="${item.img}" alt="${name}" />
      <div class="cart-item-info">
        <span class="cart-item-category label-caps">${category}</span>
        <span class="cart-item-name">${name}</span>
        <span class="cart-item-price">${formatPrice(item.price)}</span>
        <div class="cart-item-qty">
          <button aria-label="Decrease quantity" data-action="dec" data-id="${item.id}">-</button>
          <span>${item.qty}</span>
          <button aria-label="Increase quantity" data-action="inc" data-id="${item.id}">+</button>
          <span class="material-symbols-outlined cart-item-remove" data-action="remove" data-id="${item.id}" role="button" tabindex="0" aria-label="Remove item">delete</span>
        </div>
      </div>
    `;
    cartItemsList.appendChild(el);
  });

  $$("[data-action]", cartItemsList).forEach((btn) => {
    btn.addEventListener("click", handleCartAction);
  });
}

function handleCartAction(e) {
  const { action, id } = e.currentTarget.dataset;
  const productId = parseInt(id);
  const item = state.cart.find((p) => p.id === productId);
  if (!item) return;

  if (action === "inc") {
    item.qty++;
  } else if (action === "dec") {
    item.qty--;
    if (item.qty <= 0)
      state.cart = state.cart.filter((p) => p.id !== productId);
  } else if (action === "remove") {
    state.cart = state.cart.filter((p) => p.id !== productId);
  }
  updateCartUI();
}

checkoutBtn?.addEventListener("click", () => {
  if (state.cart.length === 0) {
    showToast(
      state.lang === "ar"
        ? "سلة التسوق فارغة! أضف قطعاً للمتابعة."
        : "Your cart is empty. Add curated pieces first!",
    );
    return;
  }
  closeCart();
  openCheckout();
});

/* =====================================================
   12. CHECKOUT & PAYMENT SYSTEM (مصر ووسائل الدفع)
   ===================================================== */
function getCurrentCheckoutTotal() {
  const subtotal = state.cart.reduce((s, item) => s + item.price * item.qty, 0);
  const discount = subtotal * state.promoDiscount;
  return Math.max(0, subtotal - discount);
}

function updateSubmitButtonText() {
  if (!checkoutSubmitBtn) return;
  const btnText = checkoutSubmitBtn.querySelector(".btn-submit-text");
  if (!btnText) return;
  const totalStr = formatPrice(getCurrentCheckoutTotal());
  const isAr = state.lang === "ar";

  if (state.paymentMethod === "cod") {
    btnText.textContent = isAr
      ? `تأكيد الطلب (${totalStr} عند الاستلام)`
      : `Confirm Order (${totalStr} upon Delivery)`;
  } else if (state.paymentMethod === "wallet") {
    btnText.textContent = isAr
      ? `دفع ${totalStr} عبر انستاباي / المحفظة`
      : `Pay ${totalStr} via InstaPay / Wallet`;
  } else {
    btnText.textContent = isAr
      ? `دفع ${totalStr} بأمان`
      : `Pay ${totalStr} Securely`;
  }
}

function renderCheckoutSummary() {
  if (!checkoutSummaryItems) return;
  checkoutSummaryItems.innerHTML = "";

  const isAr = state.lang === "ar";

  state.cart.forEach((item) => {
    const el = document.createElement("div");
    el.className = "checkout-item";
    const name = isAr ? item.nameAr : item.name;
    el.innerHTML = `
      <img src="${item.img}" alt="${name}" class="checkout-item-img" />
      <div class="checkout-item-info">
        <span class="checkout-item-name">${name}</span>
        <span class="checkout-item-sub">Qty: ${item.qty} &times; ${formatPrice(item.price)}</span>
      </div>
      <span class="checkout-item-price">${formatPrice(item.price * item.qty)}</span>
    `;
    checkoutSummaryItems.appendChild(el);
  });

  const subtotal = state.cart.reduce((s, item) => s + item.price * item.qty, 0);
  const discount = subtotal * state.promoDiscount;
  const grandTotal = Math.max(0, subtotal - discount);

  if (checkoutSubtotalVal)
    checkoutSubtotalVal.textContent = formatPrice(subtotal);

  if (checkoutDiscountRow && checkoutDiscountVal) {
    if (state.promoDiscount > 0) {
      checkoutDiscountRow.style.display = "flex";
      checkoutDiscountVal.textContent = `-${formatPrice(discount)}`;
    } else {
      checkoutDiscountRow.style.display = "none";
    }
  }

  if (checkoutTotalVal) checkoutTotalVal.textContent = formatPrice(grandTotal);

  updateSubmitButtonText();
}

function openCheckout() {
  if (state.cart.length === 0) {
    showToast(
      state.lang === "ar" ? "سلة التسوق فارغة!" : "Your cart is empty.",
    );
    return;
  }
  renderCheckoutSummary();
  checkoutFormView?.classList.remove("hidden");
  checkoutSuccessView?.classList.add("hidden");
  checkoutOverlay?.classList.remove("hidden");
  checkoutModal?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  checkoutOverlay?.classList.add("hidden");
  checkoutModal?.classList.add("hidden");
  document.body.style.overflow = "";
}

checkoutCloseBtn?.addEventListener("click", closeCheckout);
checkoutOverlay?.addEventListener("click", closeCheckout);
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    checkoutModal &&
    !checkoutModal.classList.contains("hidden")
  ) {
    closeCheckout();
  }
});

// Payment method radio listeners
paymentMethodInputs.forEach((input) => {
  input.addEventListener("change", () => {
    state.paymentMethod = input.value;
    $$(".payment-card-option").forEach((opt) => opt.classList.remove("active"));
    input.closest(".payment-card-option")?.classList.add("active");

    if (paneCard)
      paneCard.classList.toggle("hidden", state.paymentMethod !== "card");
    if (paneCod)
      paneCod.classList.toggle("hidden", state.paymentMethod !== "cod");
    if (paneWallet)
      paneWallet.classList.toggle("hidden", state.paymentMethod !== "wallet");

    updateSubmitButtonText();
  });
});

// Card inputs live formatting
cardNumberInput?.addEventListener("input", (e) => {
  let val = e.target.value.replace(/\D/g, "").substring(0, 16);
  val = val.replace(/(.{4})/g, "$1 ").trim();
  e.target.value = val;
});

cardExpiryInput?.addEventListener("input", (e) => {
  let val = e.target.value.replace(/\D/g, "").substring(0, 4);
  if (val.length >= 2) {
    val = val.substring(0, 2) + "/" + val.substring(2);
  }
  e.target.value = val;
});

cardCvvInput?.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").substring(0, 4);
});

// Promo code handling
checkoutPromoBtn?.addEventListener("click", () => {
  if (!checkoutPromoInput || !promoFeedback) return;
  const code = checkoutPromoInput.value.trim().toUpperCase();
  const isAr = state.lang === "ar";

  if (code === "ATELIER10") {
    state.promoDiscount = 0.1;
    promoFeedback.textContent = isAr
      ? "✓ تم تطبيق خصم 10% الخاص بأعضاء أتيلييه!"
      : "✓ 10% Member Privilege applied!";
    promoFeedback.className = "promo-feedback success";
    promoFeedback.classList.remove("hidden");
    renderCheckoutSummary();
    showToast(isAr ? "تم تطبيق خصم 10%" : "Privilege discount applied: -10%");
  } else if (code.length > 0) {
    promoFeedback.textContent = isAr
      ? "كود غير صحيح. جرب ATELIER10"
      : "Invalid code. Use ATELIER10 for 10% off.";
    promoFeedback.className = "promo-feedback error";
    promoFeedback.classList.remove("hidden");
  }
});

// Checkout Form Submission (Simulated Order Confirmation)
checkoutForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const isAr = state.lang === "ar";
  const nameVal = ($("#checkout-name")?.value || "").trim();
  const emailVal = ($("#checkout-email")?.value || "").trim();
  const addressVal = ($("#checkout-address")?.value || "").trim();
  const cityVal = ($("#checkout-city")?.value || "").trim();

  if (!nameVal || !emailVal || !addressVal || !cityVal) {
    showToast(
      isAr
        ? "يرجى إكمال جميع حقول بيانات التوصيل المطلوبة."
        : "Please complete all required delivery fields.",
    );
    return;
  }

  if (!emailVal.includes("@") || !emailVal.includes(".")) {
    showToast(
      isAr
        ? "يرجى إدخال بريد إلكتروني صالح."
        : "Please enter a valid email address.",
    );
    return;
  }

  if (state.paymentMethod === "card") {
    const cardNum = (cardNumberInput?.value || "").replace(/\s/g, "");
    if (cardNum.length < 12) {
      showToast(
        isAr
          ? "يرجى إدخال رقم بطاقة صالح."
          : "Please enter a valid card number.",
      );
      cardNumberInput?.focus();
      return;
    }
  }

  // Loading animation state
  const btnText = checkoutSubmitBtn?.querySelector(".btn-submit-text");
  const originalText = btnText ? btnText.textContent : "Confirm & Pay";
  if (checkoutSubmitBtn) checkoutSubmitBtn.disabled = true;
  if (btnText)
    btnText.textContent = isAr
      ? "جاري تأمين تفويض الدفع…"
      : "Securing Payment Authorization…";

  setTimeout(() => {
    if (checkoutSubmitBtn) checkoutSubmitBtn.disabled = false;
    if (btnText) btnText.textContent = originalText;

    const orderId = "#ATL-" + Math.floor(10000 + Math.random() * 90000);
    const now = new Date();
    const formattedDate = now.toLocaleDateString(isAr ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    let paymentMethodDisplay =
      "Credit / Debit Card (•••• " +
      ((cardNumberInput?.value || "").slice(-4) || "4242") +
      ")";
    if (state.paymentMethod === "cod") {
      paymentMethodDisplay = isAr
        ? "الدفع عند الاستلام — Cash on Delivery (مصر)"
        : "Cash on Delivery in Egypt";
    } else if (state.paymentMethod === "wallet") {
      paymentMethodDisplay = isAr
        ? "انستاباي / محفظة فودافون كاش / InstaPay"
        : "InstaPay / Vodafone Cash / Wallet";
    }

    const totalPaidStr = formatPrice(getCurrentCheckoutTotal());

    if ($("#success-order-id")) $("#success-order-id").textContent = orderId;
    if ($("#success-order-date"))
      $("#success-order-date").textContent = formattedDate;
    if ($("#success-customer-name"))
      $("#success-customer-name").textContent = nameVal;
    if ($("#success-delivery-address"))
      $("#success-delivery-address").textContent =
        `${addressVal}, ${cityVal} (Egypt)`;
    if ($("#success-payment-method"))
      $("#success-payment-method").textContent = paymentMethodDisplay;
    if ($("#success-total-amount"))
      $("#success-total-amount").textContent = totalPaidStr;

    checkoutFormView?.classList.add("hidden");
    checkoutSuccessView?.classList.remove("hidden");

    // Empty cart and notify
    state.cart = [];
    updateCartUI();
    showToast(
      isAr
        ? `تم تأكيد طلبك بنجاح برقم ${orderId}`
        : `Order ${orderId} confirmed!`,
    );
  }, 1100);
});

checkoutPrintBtn?.addEventListener("click", () => {
  window.print();
});

checkoutContinueBtn?.addEventListener("click", () => {
  closeCheckout();
  checkoutForm?.reset();
  state.promoDiscount = 0;
  if (promoFeedback) promoFeedback.classList.add("hidden");
});

/* =====================================================
   13. SEARCH OVERLAY
   ===================================================== */
function openSearch() {
  searchOverlay?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  setTimeout(() => searchInput?.focus(), 50);
}

function closeSearch() {
  searchOverlay?.classList.add("hidden");
  document.body.style.overflow = "";
  if (searchInput) searchInput.value = "";
  if (searchResults) searchResults.innerHTML = "";
}

searchBtn?.addEventListener("click", openSearch);
searchCloseBtn?.addEventListener("click", closeSearch);
searchOverlay?.addEventListener("click", (e) => {
  if (e.target === searchOverlay) closeSearch();
});

searchInput?.addEventListener("input", () => {
  const query = (searchInput.value || "").trim().toLowerCase();
  if (!searchResults) return;

  if (query.length === 0) {
    searchResults.innerHTML = "";
    return;
  }

  const isAr = state.lang === "ar";
  const matches = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.nameAr.includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.categoryAr.includes(query),
  );

  if (matches.length === 0) {
    searchResults.innerHTML = `<div class="search-empty"><p>${isAr ? "لم يتم العثور على قطع تطابق بحثك" : "No pieces matching your search"}</p></div>`;
    return;
  }

  searchResults.innerHTML = matches
    .map(
      (p) => `
    <div class="search-result-item" data-id="${p.id}">
      <img src="${p.img}" alt="${isAr ? p.nameAr : p.name}" class="search-result-img" />
      <div class="search-result-info">
        <span class="search-result-name">${isAr ? p.nameAr : p.name}</span>
        <span class="search-result-cat">${isAr ? p.categoryAr : p.category}</span>
        <span class="search-result-price">${formatPrice(p.price)}</span>
      </div>
      <button class="btn-search-add" data-id="${p.id}" aria-label="Add to cart">
        <span class="material-symbols-outlined">add_shopping_cart</span>
      </button>
    </div>
  `,
    )
    .join("");

  $$(".btn-search-add", searchResults).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(parseInt(btn.dataset.id));
      closeSearch();
      openCart();
    });
  });
});

/* =====================================================
   14. NEWSLETTER & SCROLL TO TOP
   ===================================================== */
newsletterForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = $("#newsletter-email");
  if (!emailInput || !emailInput.value.includes("@")) {
    showToast(
      state.lang === "ar"
        ? "يرجى إدخال بريد إلكتروني صحيح"
        : "Please enter a valid email address.",
    );
    return;
  }
  newsletterForm.style.display = "none";
  if (newsletterSuccess) newsletterSuccess.classList.remove("hidden");
  showToast(
    state.lang === "ar"
      ? "أهلاً بك في نادي أتيلييه!"
      : "Welcome to The Atelier Club!",
  );
});

footerSubscribeBtn?.addEventListener("click", () => {
  const footerEmail = $("#footer-email");
  if (!footerEmail || !footerEmail.value.includes("@")) {
    showToast(
      state.lang === "ar"
        ? "يرجى إدخال بريد إلكتروني صحيح"
        : "Please enter a valid email address.",
    );
    return;
  }
  footerEmail.value = "";
  showToast(
    state.lang === "ar"
      ? "تم الاشتراك في مجلة أتيلييه!"
      : "Subscribed to The Journal!",
  );
});

// Scroll to top button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.className = "scroll-top-btn";
scrollTopBtn.setAttribute("aria-label", "Scroll to top");
scrollTopBtn.innerHTML =
  '<span class="material-symbols-outlined">arrow_upward</span>';
document.body.appendChild(scrollTopBtn);

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
    if (header) {
      header.style.boxShadow =
        window.scrollY > 8
          ? "0 2px 20px rgba(20,20,19,0.08)"
          : "var(--shadow-sm)";
    }
  },
  { passive: true },
);

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =====================================================
   15. INITIALIZATION
   ===================================================== */
renderProducts();
updateCartUI();
updateWishlistUI();
console.log(
  "%cATELIER — Fully Loaded with Arabic RTL & Favorites & Egypt Checkout",
  "font-family:serif;font-size:15px;color:#c85a32;",
);
