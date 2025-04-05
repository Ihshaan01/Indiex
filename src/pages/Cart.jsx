import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";

function Cart() {
  const { user } = useAuthStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CardData = [
    {
      images: ["https://via.placeholder.com/150"],
      productName: "Camera Assets",
      store: { name: "DesignPro Studio" },
      ratingAverage: 4.5,
      totalrating: 50,
      discount: 20,
      price: 30,
    },
  ];

  // Fetch cart data from API
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id) {
        setError("Please log in to view your cart.");
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.get(`/users/get-cart/${user.id}`);
        if (response.status === 200) {
          console.log("Cart data:", response.data);
          const mappedItems = response.data.cart.items.map((cartItem) => ({
            image:
              cartItem.itemId.images?.[0] || "https://via.placeholder.com/150",
            gigName: cartItem.itemId.productName || "Unknown Item",
            storeName: cartItem.itemId.store?.name || "Unknown Store",
            discount: cartItem.itemId.discount || 0,
            price: cartItem.itemId.price || 0,
            type: cartItem.itemId.type,
            itemId: cartItem.itemId._id,
          }));
          setItems(mappedItems);
        } else {
          setError("Failed to fetch cart data.");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Error loading cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user?.id]);

  const handleRemoveItem = async (index) => {
    const itemToRemove = items[index];
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    console.log(user.id, itemToRemove.itemId, itemToRemove.type);
    try {
      await apiClient.post("/users/remove-from-cart", {
        userId: user.id,
        itemId: itemToRemove.itemId,
        type: "Asset",
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart.");
    }
  };

  // Price calculations without quantity
  const subtotal = items.reduce((total, item) => {
    const itemPrice = item.price - (item.price * (item.discount || 0)) / 100;
    return total + itemPrice;
  }, 0);

  const itemsCount = items.length;

  const savings = items.reduce((total, item) => {
    const discountAmount = (item.price * (item.discount || 0)) / 100;
    return total + discountAmount;
  }, 0);

  const handleCheckout = () => {
    alert("Proceeding to checkout!");
  };

  // Full-page spinner for initial load
  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="mb-20" />
      {items.length > 0 ? (
        <div className="grid md:grid-cols-[70%_30%] mx-10 gap-2 text-gray-200">
          <div className="flex flex-col justify-center items-center shadow-md p-3 px-5 bg-[#171f29] rounded">
            <div className="flex flex-row justify-between w-full">
              <p className="text-2xl font-semibold">
                {itemsCount} items in Your Cart
              </p>
              <p className="text-xl font-semibold mr-3">
                Total: £{subtotal.toFixed(2)}
              </p>
            </div>
            <div className="my-3 w-full">
              {loading ? (
                <SkeletonCartItems count={3} />
              ) : (
                items.map((item, index) => (
                  <CartItem
                    key={index}
                    item={item}
                    onRemove={() => handleRemoveItem(index)}
                  />
                ))
              )}
            </div>
          </div>
          <div className="flex justify-center items-center shadow-md max-h-96 bg-[#171f29] rounded">
            {loading ? (
              <SkeletonCartSummary />
            ) : (
              <CartSummary
                subtotal={subtotal}
                itemsCount={itemsCount}
                savings={savings}
                onCheckout={handleCheckout}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="h-96 w-full my-10 flex justify-center items-center">
          <p className="text-xl font-semibold text-white">
            Your cart is empty!
          </p>
        </div>
      )}

      {/* <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">
          You Might Also Like
        </h3>
        <div className="grid md:grid-cols-4 gap-4 mx-10">
          {CardData.map((card, index) => (
            <Card key={index} item={card} />
          ))}
        </div>
      </div> */}
      <Footer />
    </div>
  );
}

// Skeleton component for cart items
function SkeletonCartItems({ count }) {
  return (
    <div className="w-full space-y-4">
      {Array(count)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-800 rounded-lg animate-pulse"
          >
            <div className="w-20 h-20 bg-gray-700 rounded mr-4"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
    </div>
  );
}

// Skeleton component for cart summary
function SkeletonCartSummary() {
  return (
    <div className="w-full p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
      <div className="h-10 bg-gray-700 rounded w-full"></div>
    </div>
  );
}

export default Cart;
