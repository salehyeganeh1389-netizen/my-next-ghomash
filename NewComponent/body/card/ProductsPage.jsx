"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const API_URL = "https://dummyjson.com/products?limit=30";

export default function ProductsPage() {
  const { type } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Products not found");
        }

        const result = await response.json();

        // خروجی واقعی DummyJSON داخل result.products است
        const data = result.products;

        // تبدیل ساختار API به ساختار مورد استفاده پروژه
        const formattedProducts = data.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.thumbnail || product.images?.[0],
          rating: {
            rate: product.rating,
          },
          category: product.category,
          description: product.description,
        }));

        const half = Math.ceil(formattedProducts.length / 2);

        let selectedProducts = [];

        if (type === "fabric") {
          selectedProducts = formattedProducts.slice(0, half);
        }

        if (type === "clothing") {
          selectedProducts = formattedProducts.slice(half);
        }

        setProducts(selectedProducts);
      } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [type]);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minPrice) {
      result = result.filter(
        (product) => product.price >= Number(minPrice)
      );
    }

    if (maxPrice) {
      result = result.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    if (category) {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (rating) {
      result = result.filter(
        (product) => product.rating?.rate >= Number(rating)
      );
    }

    if (sort === "cheap") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "expensive") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort(
        (a, b) =>
          (b.rating?.rate || 0) - (a.rating?.rate || 0)
      );
    }

    if (sort === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title, "fa")
      );
    }

    return result;
  }, [
    products,
    search,
    minPrice,
    maxPrice,
    category,
    rating,
    sort,
  ]);

  if (type !== "fabric" && type !== "clothing") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            دسته‌بندی پیدا نشد
          </h1>

          <Link
            href="/"
            className="text-green-700 hover:underline"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg">در حال دریافت محصولات...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f0] px-4 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#173a2c]">
            {type === "fabric" ? "محصولات پارچه" : "محصولات پوشاک"}
          </h1>

          <p className="mt-2 text-gray-600">
            {filteredProducts.length} محصول
          </p>
        </div>

        {/* فیلترها */}
        <div className="bg-white rounded-2xl p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">

            <input
              type="text"
              placeholder="جستجوی محصول..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
            />

            <input
              type="number"
              placeholder="حداقل قیمت"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
            />

            <input
              type="number"
              placeholder="حداکثر قیمت"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option value="">همه دسته‌ها</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option value="">همه امتیازها</option>
              <option value="4">۴ به بالا</option>
              <option value="4.5">۴.۵ به بالا</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option value="">مرتب‌سازی</option>
              <option value="cheap">ارزان‌ترین</option>
              <option value="expensive">گران‌ترین</option>
              <option value="rating">بیشترین امتیاز</option>
              <option value="name">نام محصول</option>
            </select>

          </div>
        </div>

        {/* محصولات */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              محصولی پیدا نشد
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                type={type}
              />
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

function ProductCard({ product, type }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">

        <h2 className="font-bold text-[#173a2c] line-clamp-2 min-h-[48px]">
          {product.title}
        </h2>

        <div className="flex items-center justify-between mt-4">

          <span className="font-bold text-[#166534]">
            ${product.price}
          </span>

          <span className="text-sm text-gray-600">
            ⭐ {product.rating?.rate?.toFixed(1)}
          </span>

        </div>

        <div className="mt-3 text-sm text-gray-500">
          {product.category}
        </div>

      </div>
    </Link>
  );
}
