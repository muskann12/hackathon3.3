"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface Product {
  title: string;
  price: number;
  imgSrc: string;
  rating: number;
  description: string;
  ratingBreakdown: { stars: number; count: number }[] | null;
}

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [moreProducts, setMoreProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && _id == $id][0]{
          title,
          price,
          "imgSrc": imgSrc.asset->url,
          rating,
          description,
          ratingBreakdown
        }`;
        const data = await client.fetch(query, { id });
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMoreProducts = async () => {
      try {
        const query = `*[_type == "product" && _id != $id][0..3]{
          title,
          price,
          "imgSrc": imgSrc.asset->url,
          rating
        }`;
        const data = await client.fetch(query);
        setMoreProducts(data);
      } catch (error) {
        console.error("Error fetching more products:", error);
      }
    };

    fetchProduct();
    fetchMoreProducts();
  }, [id]);

  const addToCart = (product: Product) => {
    console.log("Product added to cart:", product);
    setLikeCount((prevCount) => prevCount + 1);
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{product.title}</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2">
            <Image
              src={product.imgSrc || "/placeholder-image.png"}
              alt={product.title}
              width={600}
              height={600}
              className="rounded-lg shadow-lg transition-transform transform hover:scale-105 border "
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <p className="text-3xl font-semibold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
            <div className="mb-4">
              <div className="flex items-center">
                {Array.from({ length: product.rating }, (_, i) => (
                  <AiFillStar key={i} className="text-yellow-500 text-xl" />
                ))}
                {Array.from({ length: 5 - product.rating }, (_, i) => (
                  <AiFillStar key={i} className="text-gray-300 text-xl" />
                ))}
                <span className="ml-2 text-gray-600">{product.rating}/5</span>
              </div>
            </div>

            <div className="mb-4">
              <p className={`text-gray-700 text-lg leading-relaxed ${!showFullDescription ? "line-clamp-3" : ""}`}>
                {product.description}
              </p>
              <button onClick={() => setShowFullDescription(!showFullDescription)} className="text-blue-600 underline mt-2">
                {showFullDescription ? "View Less" : "View More"}
              </button>
            </div>

            {/* Select Size */}
            <div className="mb-6">
              <label htmlFor="size" className="block text-gray-700 font-medium">Select Size:</label>
              <select id="size" className="mt-2 w-full border rounded-lg px-3 py-2 text-gray-700">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            {/* Select Color */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">Select Color:</label>
              <div className="flex space-x-4 mt-2">
                <div className="w-8 h-8 bg-red-950 rounded-full cursor-pointer" title="Red"></div>
                <div className="w-8 h-8 bg-blue-900 rounded-full cursor-pointer" title="Blue"></div>
                <div className="w-8 h-8 bg-green-950 rounded-full cursor-pointer" title="Green"></div>
                <div className="w-8 h-8 bg-pink-950 rounded-full cursor-pointer" title="pink"></div>
                <div className="w-8 h-8 bg-yellow-950 rounded-full cursor-pointer" title="musturd"></div>
                <div className="w-8 h-8 bg-gray-950 rounded-full cursor-pointer" title="gray"></div>
              </div>
            </div>

            {/* Like Button */}
            <button onClick={toggleLike} className={`flex items-center gap-2 mb-4 text-lg transition-transform ${liked ? "text-red-500" : "text-gray-500"} hover:scale-110`}>
              {liked ? <AiFillHeart className="text-2xl" /> : <AiOutlineHeart className="text-2xl" />}
              <span>{likeCount} Likes</span>
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              className="mt-2 px-6 py-3 bg-black text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
          <ul className="space-y-4">
            <li className="border-b pb-4">
              <p className="text-gray-600"><strong>Ayesha Khan:</strong> Amazing product! Great quality and fast delivery.</p>
            </li>
            <li className="border-b pb-4">
              <p className="text-gray-600"><strong>Ali Ahmed:</strong> Loved the design and fit. Would recommend!</p>
            </li>
            <li>
              <p className="text-gray-600"><strong>Fatima Malik:</strong> Perfect for daily use. Worth the price.</p>
            </li>
          </ul>
        </div>

        {/* FAQs Section */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">FAQs</h2>
          <ul className="space-y-4">
            <li className="border-b pb-2">
              <p className="text-gray-600"><strong>What is the return policy?</strong> You can return the product within 30 days of purchase.</p>
            </li>
            <li className="border-b pb-2">
              <p className="text-gray-600"><strong>How to care for the product?</strong> Follow the care instructions on the label.</p>
            </li>
            <li>
              <p className="text-gray-600"><strong>Is international shipping available?</strong> Yes, we offer international shipping options.</p>
            </li>
          </ul>
        </div>

        {/* More Products Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">More Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreProducts.map((prod, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <Image src={prod.imgSrc} alt={prod.title} width={200} height={200} className="rounded-md mb-4" />
                <h3 className="text-lg font-semibold">{prod.title}</h3>
                <p className="text-xl font-bold">${prod.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
