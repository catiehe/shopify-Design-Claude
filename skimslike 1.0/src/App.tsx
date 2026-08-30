import { useState } from "react";

/* ─── Types ─────────────────────────────────────────── */
type Page = "collection" | "pdp" | "faq";

/* ─── Data ───────────────────────────────────────────── */
const NAV_LINKS = ["New", "Best Sellers", "Clothing", "Bras", "Underwear", "Shapewear", "Mens", "Accessories", "Sale"];
const FILTERS = ["SORT", "GENDER", "SIZE", "BAND", "CUP", "TYPE", "COLOR", "COLLECTION", "MATERIAL", "SLEEVE LENGTH", "INSEAM"];

const GRID_PRODUCTS = [
  { id: 1, collection: "FITS EVERYBODY", name: "BODYSUIT", price: "$62", img: "https://images.unsplash.com/photo-1542513217-0b0eedf7005d?w=480&h=600&fit=crop&auto=format", tag: "Best Seller" },
  { id: 2, collection: "SOFT LOUNGE", name: "LONG SLIP DRESS", price: "$88", img: "https://images.unsplash.com/photo-1664076458686-3449062080ac?w=480&h=600&fit=crop&auto=format", tag: "New" },
  { id: 3, collection: "FITS EVERYBODY", name: "TRIANGLE BRALETTE", price: "$34", img: "https://images.unsplash.com/photo-1779400204302-d2c3ed9d003d?w=480&h=600&fit=crop&auto=format", tag: null },
  { id: 4, collection: "VELVET", name: "SCULPT SHORTS", price: "$54", img: "https://images.unsplash.com/photo-1718963892337-b6729c302b8f?w=480&h=600&fit=crop&auto=format", tag: "New" },
  { id: 5, collection: "FITS EVERYBODY", name: "SCOOP BRALETTE", price: "$34", img: "https://images.unsplash.com/photo-1586897345495-148587f40163?w=480&h=600&fit=crop&auto=format", tag: null },
  { id: 6, collection: "SEAMLESS SCULPT", name: "TANK TOP", price: "$48", img: "https://images.unsplash.com/photo-1728403905706-ea497d26262c?w=480&h=600&fit=crop&auto=format", tag: null },
  { id: 7, collection: "FITS EVERYBODY", name: "THONG", price: "$20", img: "https://images.unsplash.com/photo-1611042553484-d61f84d22784?w=480&h=600&fit=crop&auto=format", tag: null },
  { id: 8, collection: "COTTON RIB", name: "SHORTS", price: "$38", img: "https://images.unsplash.com/photo-1659522761084-79196b64abe4?w=480&h=600&fit=crop&auto=format", tag: "New" },
];

const SHADES = [
  { name: "Sand", hex: "#C9A882" },
  { name: "Dune", hex: "#B8906E" },
  { name: "Clay", hex: "#A67C5B" },
  { name: "Camel", hex: "#8B6345" },
  { name: "Sienna", hex: "#7A5030" },
  { name: "Umber", hex: "#5E3A1E" },
  { name: "Espresso", hex: "#3D2010" },
  { name: "Onyx", hex: "#1a1a1a" },
];

const SIZES = ["XXS", "XS", "S", "M", "L", "XL", "2X", "3X"];

const COMPLETE_LOOK = [
  { id: 1, collection: "FITS EVERYBODY", name: "TRIANGLE BRALETTE", price: "$34", color: "Onyx", img: "https://images.unsplash.com/photo-1536293283170-b4604bbe272f?w=400&h=500&fit=crop&auto=format", styled: true },
  { id: 2, collection: "FITS EVERYBODY", name: "SCOOP BRALETTE", price: "$34", color: "Onyx", img: "https://images.unsplash.com/photo-1586897345495-148587f40163?w=400&h=500&fit=crop&auto=format", styled: false },
  { id: 3, collection: "FITS EVERYBODY", name: "CROSSOVER BRALETTE", price: "$34", color: "Onyx", img: "https://images.unsplash.com/photo-1779400204302-d2c3ed9d003d?w=400&h=500&fit=crop&auto=format", styled: false },
];

const SIMILAR = [
  { id: 1, collection: "FITS EVERYBODY", name: "DIPPED FRONT THONG", price: "$20", img: "https://images.unsplash.com/photo-1542513217-0b0eedf7005d?w=400&h=500&fit=crop&auto=format" },
  { id: 2, collection: "FITS EVERYBODY", name: "ADAPTIVE THONG", price: "$20", img: "https://images.unsplash.com/photo-1586897345495-148587f40163?w=400&h=500&fit=crop&auto=format" },
  { id: 3, collection: "FITS EVERYBODY", name: "ADAPTIVE BRIEF", price: "$20", img: "https://images.unsplash.com/photo-1728403905706-ea497d26262c?w=400&h=500&fit=crop&auto=format" },
  { id: 4, collection: "INVISIBLE", name: "THONG", price: "$20", img: "https://images.unsplash.com/photo-1664076458686-3449062080ac?w=400&h=500&fit=crop&auto=format" },
];

const REVIEWS = [
  { id: 1, name: "J.C", verified: true, type: "Reviewer", rating: 5, title: "COMFY", body: "Easily the most comfortable thong that I have ever worn.", likes: 3, ago: "2 months ago", age: null, size: null },
  { id: 2, name: "M.R", verified: true, type: "Buyer", rating: 5, title: "SO COMFY!", body: "Fits perfectly true to size. The fabric is incredibly soft and smooth.", likes: 1, ago: "3 months ago", age: "35 - 44", size: "S" },
  { id: 3, name: "A.T", verified: true, type: "Buyer", rating: 4, title: "GREAT FIT", body: "Love the seamless design. Barely noticeable under clothing.", likes: 5, ago: "1 month ago", age: "25 - 34", size: "M" },
];

const FAQ_CATS = ["RETURNS", "ORDERING", "SHIPPING", "INTERNATIONAL", "FAQS", "SIZE GUIDES", "PROMO TERMS", "STOCKISTS"];
const FAQ_ITEMS = [
  { q: "CAN I REPRINT MY LABEL OR OBTAIN MOBILE CODE AGAIN?", a: "Yes, you can access your return label from your order confirmation email or through your account dashboard. Visit our Return Center and enter your order number to retrieve your label." },
  { q: "WHERE IS MY RETURN?", a: "Returns typically take 5-7 business days to process once received at our warehouse. You will receive an email confirmation once your return has been processed and your refund has been issued." },
  { q: "CAN I EXCHANGE MY ITEM?", a: "We currently offer exchanges for different sizes of the same item. To initiate an exchange, please visit our Return Center and select 'Exchange' when prompted." },
  { q: "CAN YOU HELP WITH A DAMAGED PRODUCT?", a: "We stand behind the quality of our products. If you received a damaged item, please contact our customer care team within 30 days of delivery with photos of the damage." },
  { q: "WHAT IF MY ITEM IS FAULTY?", a: "If your item is faulty, please reach out to our customer care team immediately. We will work to resolve the issue as quickly as possible, whether through a replacement or refund." },
];

/* ─── Helpers ────────────────────────────────────────── */
function Stars({ n, size = 16 }: { n: number; size?: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= n ? "#1a1a1a" : "none"} stroke="#1a1a1a" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </span>
  );
}

/* ─── Nav ────────────────────────────────────────────── */
function Navbar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Announcement */}
      <div className="border-b border-[#e8e8e8] text-center text-[11px] tracking-[0.08em] py-2.5 text-[#1a1a1a] font-normal" style={{ fontFamily: "var(--font-body)" }}>
        Free Shipping on Domestic Orders $75+
      </div>

      {/* Main nav */}
      <div className="border-b border-[#e8e8e8] px-6 md:px-10">
        <div className="flex items-center h-[52px] gap-6">
          {/* Logo */}
          <button
            onClick={() => setPage("collection")}
            className="text-[28px] font-extrabold tracking-[-0.02em] leading-none shrink-0 mr-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SKIMS
          </button>

          {/* Nav links desktop */}
          <nav className="hidden lg:flex items-center gap-5 flex-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => l === "Best Sellers" ? setPage("collection") : undefined}
                className="text-[13px] font-normal text-[#1a1a1a] hover:underline underline-offset-4 whitespace-nowrap"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {l}
              </button>
            ))}
          </nav>

          <div className="flex-1 lg:flex-none" />

          {/* Right icons */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="hidden md:flex" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </button>
            <button aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </button>
            <button className="hidden md:flex" aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            </button>
            <button className="relative" aria-label="Bag">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
              <span className="absolute -top-1 -right-1.5 bg-[#1a1a1a] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-medium">2</span>
            </button>
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5">
                {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-[#e8e8e8] px-6 py-4 flex flex-col gap-4" style={{ fontFamily: "var(--font-body)" }}>
          {NAV_LINKS.map((l) => (
            <button key={l} className="text-[14px] text-left text-[#1a1a1a]" onClick={() => setMenuOpen(false)}>{l}</button>
          ))}
          <div className="flex gap-4 pt-2 border-t border-[#e8e8e8]">
            <button className="text-[13px] text-[#1a1a1a]" onClick={() => { setPage("collection"); setMenuOpen(false); }}>Collection</button>
            <button className="text-[13px] text-[#1a1a1a]" onClick={() => { setPage("pdp"); setMenuOpen(false); }}>Product</button>
            <button className="text-[13px] text-[#1a1a1a]" onClick={() => { setPage("faq"); setMenuOpen(false); }}>FAQ</button>
          </div>
        </div>
      )}

      {/* Module nav bar */}
      <div className="bg-[#f5f3f0] border-b border-[#e8e8e8] px-6 md:px-10 flex gap-0 overflow-x-auto">
        {(["collection", "pdp", "faq"] as Page[]).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 border-b-2 transition-colors whitespace-nowrap ${page === p ? "border-[#1a1a1a] text-[#1a1a1a] font-semibold" : "border-transparent text-[#888] font-normal"}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {p === "collection" ? "Collection Page" : p === "pdp" ? "Product Detail" : "FAQ + Help"}
          </button>
        ))}
      </div>
    </header>
  );
}

/* ─── Collection Page ────────────────────────────────── */
function CollectionPage({ setPage }: { setPage: (p: Page) => void }) {
  const [wishlist, setWishlist] = useState<number[]>([]);

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Page header */}
      <div className="px-6 md:px-10 pt-8 pb-6 border-b border-[#e8e8e8]">
        <h1 className="text-[36px] md:text-[52px] font-extrabold uppercase tracking-[-0.01em] leading-none" style={{ fontFamily: "var(--font-display)" }}>
          BEST SELLERS
        </h1>
        <p className="mt-3 text-[14px] text-[#444]">The must-haves all your friends have been telling you about</p>
        <p className="mt-1.5 text-[12px] text-[#888]">
          <span className="hover:underline cursor-pointer">Home</span>
          {" / "}
          <span className="text-[#1a1a1a]">Best Sellers</span>
        </p>
      </div>

      {/* Filter bar */}
      <div className="border-b border-[#e8e8e8] px-6 md:px-10">
        <div className="flex items-center gap-5 py-3 overflow-x-auto">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className="text-[11px] tracking-[0.12em] uppercase whitespace-nowrap flex items-center gap-1 font-medium text-[#1a1a1a] hover:underline underline-offset-4"
            >
              {f}
              {i > 0 && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="px-6 md:px-10 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {GRID_PRODUCTS.map((p) => (
            <div key={p.id} className="group cursor-pointer" onClick={() => setPage("pdp")}>
              <div className="relative bg-[#f0ede8] overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                {p.tag && (
                  <span className="absolute top-2.5 left-2.5 bg-[#1a1a1a] text-white text-[10px] tracking-[0.08em] uppercase px-2 py-1 font-medium">
                    {p.tag}
                  </span>
                )}
                <button
                  className="absolute top-2.5 right-2.5"
                  onClick={(e) => { e.stopPropagation(); setWishlist(w => w.includes(p.id) ? w.filter(x => x !== p.id) : [...w, p.id]); }}
                  aria-label="Wishlist"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.includes(p.id) ? "#1a1a1a" : "none"} stroke="#1a1a1a" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                {/* Quick add overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 text-[#1a1a1a] text-center text-[11px] tracking-[0.15em] uppercase py-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Quick Add
                </div>
              </div>
              <div className="mt-3">
                <p className="text-[10px] tracking-[0.1em] uppercase text-[#888]">{p.collection}</p>
                <p className="text-[13px] font-bold uppercase tracking-[0.04em] mt-0.5">{p.name}</p>
                <p className="text-[13px] mt-0.5 text-[#1a1a1a]">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Product Detail Page ────────────────────────────── */
function PDPPage() {
  const [selectedShade, setSelectedShade] = useState(7);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [similarPage, setSimilarPage] = useState(0);
  const [completeSizes, setCompleteSizes] = useState<Record<number, string>>({});

  const shade = SHADES[selectedShade];

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* PDP split layout */}
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        {/* Image */}
        <div className="relative lg:w-[55%] bg-[#e8e5e0]" style={{ minHeight: 480 }}>
          <img
            src="https://images.unsplash.com/photo-1542513217-0b0eedf7005d?w=900&h=1100&fit=crop&auto=format"
            alt="Fits Everybody Thong"
            className="w-full h-full object-cover object-top"
            style={{ maxHeight: "85vh" }}
          />
          <button className="absolute top-4 left-4 flex items-center gap-1 text-[11px] tracking-[0.1em] uppercase bg-white/80 px-2.5 py-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
          </button>
          <button className="absolute top-4 right-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          </button>
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 px-3 py-2 text-[11px] tracking-[0.08em] uppercase">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3z" /><path d="M9 9h6v6H9z" /></svg>
            MODEL SIZING
          </div>
        </div>

        {/* Info panel */}
        <div className="lg:w-[45%] px-6 lg:px-12 py-8 lg:py-12 flex flex-col gap-5">
          <div>
            <p className="text-[11px] tracking-[0.12em] uppercase text-[#1a1a1a] underline underline-offset-4 cursor-pointer">FITS EVERYBODY</p>
            <h1 className="text-[40px] md:text-[48px] font-extrabold uppercase tracking-[-0.01em] leading-tight mt-1" style={{ fontFamily: "var(--font-display)" }}>
              THONG
            </h1>
            <p className="text-[20px] font-normal mt-2">$20</p>
            <p className="text-[13px] text-[#8B6345] mt-0.5">or 3 for $39</p>
          </div>

          {/* Returns */}
          <div className="flex items-start gap-3 py-4 border-y border-[#e8e8e8]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
            <div>
              <p className="text-[12px] font-semibold">Returns are free for SKIMS rewards members</p>
              <p className="text-[12px] text-[#1a1a1a] underline underline-offset-2 cursor-pointer">Click here to download the SKIMS app and join today.</p>
            </div>
          </div>

          {/* Color section */}
          <div>
            <div className="flex gap-3 mb-3">
              <div>
                <p className="text-[11px] tracking-[0.08em] uppercase text-[#888] mb-1.5">Limited Edition</p>
                <div className="w-8 h-8 rounded-sm border-2 border-[#e8e8e8] cursor-pointer" style={{ backgroundColor: "#e8a0b0" }} title="Pink" />
              </div>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.08em] uppercase text-[#888] mb-1.5">
                Classic Shades <span className="text-[#1a1a1a] font-semibold">{shade.name}</span>
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {SHADES.map((s, i) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedShade(i)}
                    title={s.name}
                    className={`w-8 h-8 rounded-sm border-2 transition-all ${selectedShade === i ? "border-[#1a1a1a]" : "border-transparent"}`}
                    style={{ backgroundColor: s.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] tracking-[0.08em] uppercase text-[#888]">Size</p>
              <button className="text-[11px] tracking-[0.08em] uppercase text-[#1a1a1a] underline underline-offset-2">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`h-10 border text-[12px] font-medium tracking-[0.04em] transition-all ${selectedSize === s ? "border-[#1a1a1a] bg-[#1a1a1a] text-white" : "border-[#c8c8c8] text-[#1a1a1a] hover:border-[#1a1a1a]"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ATC */}
          <button
            className={`w-full py-4 text-[12px] tracking-[0.2em] uppercase font-semibold border transition-all ${selectedSize ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "bg-white text-[#888] border-[#c8c8c8]"}`}
          >
            {selectedSize ? `ADD TO BAG — ${selectedSize}` : "SELECT A SIZE"}
          </button>
        </div>
      </div>

      {/* Complete the Look */}
      <section className="px-6 md:px-10 py-12 bg-[#f5f3f0]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[22px] font-extrabold uppercase tracking-[0.05em]" style={{ fontFamily: "var(--font-display)" }}>COMPLETE THE LOOK</h2>
          <p className="text-[12px] text-[#888]">1 / 1</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COMPLETE_LOOK.map((p) => (
            <div key={p.id} className="bg-white p-4">
              <div className="relative bg-[#f0ede8]" style={{ aspectRatio: "4/5" }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover object-top" />
                {p.styled && (
                  <span className="absolute top-2.5 left-2.5 bg-[#1a1a1a] text-white text-[10px] tracking-[0.06em] uppercase px-2.5 py-1 font-medium">
                    Styled With
                  </span>
                )}
              </div>
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#888]">{p.collection}</p>
                  <p className="text-[14px] font-semibold">{p.price}</p>
                </div>
                <p className="text-[13px] font-bold uppercase tracking-[0.04em] mt-0.5">{p.name}</p>
                <p className="text-[12px] text-[#555] mt-0.5">Color <span className="font-semibold text-[#1a1a1a]">{p.color}</span></p>
                <div className="mt-3 relative">
                  <select
                    className="w-full border border-[#c8c8c8] text-[12px] py-2.5 px-3 appearance-none bg-white cursor-pointer"
                    value={completeSizes[p.id] || ""}
                    onChange={(e) => setCompleteSizes(s => ({ ...s, [p.id]: e.target.value }))}
                  >
                    <option value="">Select Size</option>
                    {SIZES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                <button className="w-full mt-2 border border-[#c8c8c8] py-2.5 text-[11px] tracking-[0.15em] uppercase font-semibold text-[#888] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Styles */}
      <section className="px-6 md:px-10 py-12 border-t border-[#e8e8e8]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[22px] font-extrabold uppercase tracking-[0.05em]" style={{ fontFamily: "var(--font-display)" }}>SIMILAR STYLES</h2>
          <div className="flex items-center gap-3">
            <button onClick={() => setSimilarPage(p => Math.max(0, p - 1))} className="w-8 h-8 border border-[#c8c8c8] flex items-center justify-center hover:border-[#1a1a1a] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <span className="text-[12px] text-[#888]">1 / 5</span>
            <button onClick={() => setSimilarPage(p => Math.min(4, p + 1))} className="w-8 h-8 border border-[#c8c8c8] flex items-center justify-center hover:border-[#1a1a1a] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-l border-t border-[#e8e8e8]">
          {SIMILAR.map((p) => (
            <div key={p.id} className="border-r border-b border-[#e8e8e8] p-4 group cursor-pointer">
              <div className="relative bg-[#f5f3f0]" style={{ aspectRatio: "4/5" }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover object-top" />
                <button className="absolute top-2 right-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                </button>
              </div>
              <div className="mt-3">
                <p className="text-[10px] tracking-[0.1em] uppercase text-[#888]">{p.collection}</p>
                <p className="text-[13px] font-bold uppercase tracking-[0.04em] mt-0.5">{p.name}</p>
                <p className="text-[13px] mt-0.5">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-6 md:px-10 py-12 border-t border-[#e8e8e8]">
        <h2 className="text-[32px] font-extrabold uppercase tracking-[0.02em] mb-6" style={{ fontFamily: "var(--font-display)" }}>REVIEWS</h2>

        {/* Rating summary */}
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8 pb-8 border-b border-[#e8e8e8]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[40px] font-bold">4.8</span>
            </div>
            <Stars n={5} size={18} />
            <p className="text-[12px] text-[#888] mt-1">Based on 2,830 reviews</p>
          </div>
          {/* Fit slider */}
          <div className="flex-1 max-w-md">
            <div className="relative h-1 bg-[#e8e8e8] rounded-full">
              <div className="absolute left-[48%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#555] border-2 border-white shadow" />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[11px] text-[#888]">Runs Small</span>
              <span className="text-[11px] text-[#888]">True to Size</span>
              <span className="text-[11px] text-[#888]">Runs Large</span>
            </div>
          </div>
          <button className="border border-[#c8c8c8] px-4 py-2.5 flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-semibold hover:border-[#1a1a1a] transition-colors">
            FILTERS
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>

        {/* Individual reviews */}
        <div className="flex flex-col divide-y divide-[#e8e8e8]">
          {REVIEWS.map((r) => (
            <div key={r.id} className="py-8 flex flex-col md:flex-row gap-6">
              {/* Left: reviewer info */}
              <div className="md:w-48 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold">{r.name}</span>
                  <span className="text-[11px] text-[#888]">Verified {r.type}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#555" stroke="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                </div>
                {r.age && <p className="text-[11px] text-[#888] mt-1">Age Range: <span className="text-[#1a1a1a]">{r.age}</span></p>}
                {r.size && <p className="text-[11px] text-[#888]">Size Purchased: <span className="text-[#1a1a1a]">{r.size}</span></p>}
              </div>
              {/* Right: content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Stars n={r.rating} size={14} />
                    <p className="text-[14px] font-bold uppercase tracking-[0.06em] mt-1">{r.title}</p>
                  </div>
                  <span className="text-[11px] text-[#888] shrink-0 ml-4">{r.ago}</span>
                </div>
                <p className="text-[13px] text-[#444] mt-2 leading-relaxed">{r.body}</p>
                <button className="mt-3 flex items-center gap-1.5 text-[11px] text-[#888] hover:text-[#1a1a1a] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                  {r.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More in this color */}
      <section className="px-6 md:px-10 py-10 bg-[#f5f3f0] border-t border-[#e8e8e8]">
        <h2 className="text-center text-[22px] font-extrabold uppercase tracking-[0.05em] mb-8" style={{ fontFamily: "var(--font-display)" }}>MORE IN THIS COLOR</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GRID_PRODUCTS.slice(0, 4).map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="relative bg-white overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="mt-2">
                <p className="text-[10px] tracking-[0.1em] uppercase text-[#888]">{p.collection}</p>
                <p className="text-[12px] font-bold uppercase tracking-[0.04em] mt-0.5">{p.name}</p>
                <p className="text-[12px] mt-0.5">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* ─── FAQ Page ───────────────────────────────────────── */
function FAQPage() {
  const [activeCat, setActiveCat] = useState("FAQS");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Hero image */}
      <div className="w-full overflow-hidden" style={{ height: 260 }}>
        <img
          src="https://images.unsplash.com/photo-1715559522419-db7face19c1c?w=1600&h=400&fit=crop&auto=format"
          alt="SKIMS collection editorial"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="md:w-52 shrink-0 px-6 md:px-8 py-8 md:border-r border-[#e8e8e8]">
          {/* Breadcrumb */}
          <p className="text-[11px] text-[#888] mb-6">
            <span className="hover:underline cursor-pointer">Home</span>
            {" / "}
            <span className="hover:underline cursor-pointer">Help</span>
            {" / "}
            <span className="text-[#1a1a1a]">FAQs</span>
          </p>
          <h1 className="text-[32px] font-extrabold uppercase tracking-[0.01em] mb-8" style={{ fontFamily: "var(--font-display)" }}>FAQS</h1>
          <nav className="flex flex-col gap-4">
            {FAQ_CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`text-[13px] font-bold uppercase tracking-[0.06em] text-left transition-colors ${activeCat === c ? "text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-0.5 w-fit" : "text-[#888] hover:text-[#1a1a1a]"}`}
              >
                {c}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 px-6 md:px-12 py-8">
          <h2 className="text-[22px] font-extrabold uppercase tracking-[0.04em] mb-6" style={{ fontFamily: "var(--font-display)" }}>
            RETURNS & EXCHANGES
          </h2>
          <div className="flex flex-col divide-y divide-[#e8e8e8] border-t border-[#e8e8e8]">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                >
                  <span className="text-[13px] font-bold uppercase tracking-[0.06em]">{item.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`shrink-0 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openIdx === i && (
                  <div className="pb-6 text-[13px] text-[#555] leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────── */
function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-[#e8e8e8] bg-white" style={{ fontFamily: "var(--font-body)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {/* Help */}
        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-6">HELP</h3>
          {["Return Center", "Order & Return Tracking", "Size Guides", "Ordering", "Shipping", "FAQs", "Contact Us"].map((l) => (
            <p key={l} className="mb-3">
              <a href="#" className="text-[13px] text-[#1a1a1a] hover:underline underline-offset-4">{l}</a>
            </p>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-[24px] font-extrabold uppercase tracking-[0.05em] mb-3" style={{ fontFamily: "var(--font-display)" }}>
            STAY IN THE KNOW
          </h3>
          <p className="text-[13px] text-[#555] mb-6 leading-relaxed">
            Be the first to discover new drops, special offers, and all things SKIMS
          </p>
          <form className="flex border border-[#c8c8c8] max-w-xs mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 text-[13px] outline-none placeholder:text-[#aaa]"
            />
            <button type="submit" className="bg-[#1a1a1a] text-white px-4 flex items-center justify-center hover:bg-[#333] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          </form>
          <p className="text-[11px] text-[#888] mt-4 leading-relaxed">
            By submitting your email you agree to receive recurring automated marketing messages from SKIMS.{" "}
            <a href="#" className="underline">Terms</a> &amp; <a href="#" className="underline">Privacy</a>
          </p>
          <p className="text-[13px] mt-6">
            Text <strong>SKIMS</strong> to <strong>68805</strong> to never miss a drop!
          </p>
        </div>

        {/* More */}
        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-6">MORE</h3>
          {["About", "SKIMS Rewards", "E-Gift Card", "Store Locator", "Environmental and Social Partnerships", "Careers", "Blog"].map((l) => (
            <p key={l} className="mb-3">
              <a href="#" className="text-[13px] text-[#1a1a1a] hover:underline underline-offset-4">{l}</a>
            </p>
          ))}
        </div>
      </div>

      {/* Social + legal */}
      <div className="border-t border-[#e8e8e8] py-8 flex flex-col items-center gap-5">
        <div className="flex gap-6">
          {[
            { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
            { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
            { label: "YouTube", path: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" },
            { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
            { label: "TikTok", path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
          ].map(({ label, path }) => (
            <a key={label} href="#" aria-label={label} className="text-[#888] hover:text-[#1a1a1a] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg>
            </a>
          ))}
        </div>
        <p className="text-[11px] text-[#aaa]">© 2026 SKIMS Body Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>("collection");

  return (
    <div className="min-h-full bg-white text-[#1a1a1a] flex flex-col overflow-x-hidden">
      <Navbar page={page} setPage={setPage} />
      <main className="flex-1">
        {page === "collection" && <CollectionPage setPage={setPage} />}
        {page === "pdp" && <PDPPage />}
        {page === "faq" && <FAQPage />}
      </main>
      <Footer />
    </div>
  );
}
