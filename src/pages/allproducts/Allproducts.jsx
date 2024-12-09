import React, { useContext, useEffect } from 'react';
import Filter from '../../components/filter/Filter';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function Allproducts() {
  const context = useContext(myContext);
  const { mode, product, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Filter />
      <section className="text-gray-600 body-font">
        <div className="container px-4 py-8 md:py-16 mx-auto max-w-full sm:max-w-screen-lg overflow-hidden">
          {/* Title Section - Improved Responsiveness */}
          <div className="w-full mb-6 lg:mb-10 text-center lg:text-left">
            <h1
              className="text-2xl sm:text-3xl font-medium title-font mb-2 text-gray-900"
              style={{ color: mode === 'dark' ? 'white' : '' }}
            >
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded mx-auto lg:mx-0"></div>
          </div>

          {/* Product Grid - Fully Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product
              .filter((obj) => obj.title.toLowerCase().includes(searchkey))
              .filter((obj) => obj.category.toLowerCase().includes(filterType))
              .filter((obj) => obj.price.includes(filterPrice))
              .map((item, index) => {
                const { title, price, description, imageUrl, id } = item;
                return (
                  <div key={index} className="w-full drop-shadow-lg">
                    <div
                      className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                        color: mode === 'dark' ? 'white' : '',
                      }}
                    >
                      {/* Image Section */}
                      <div
                        className="flex justify-center items-center h-48 sm:h-60 bg-gray-100 overflow-hidden cursor-pointer"
                        onClick={() => (window.location.href = `/productinfo/${id}`)}
                      >
                        <img
                          className="w-full h-full object-contain p-2 max-w-full"
                          src={imageUrl}
                          alt={title}
                        />
                      </div>

                      {/* Content Section */}
                      <div className="p-4 flex flex-col justify-between h-auto">
                        <div>
                          <h2
                            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                            style={{ color: mode === 'dark' ? 'white' : '' }}
                          >
                            E-Bharat
                          </h2>
                          <h1
                            className="title-font text-sm sm:text-lg font-medium text-gray-900 mb-2 line-clamp-2"
                            style={{
                              color: mode === 'dark' ? 'white' : '',
                            }}
                            title={title}
                          >
                            {title}
                          </h1>
                          <p
                            className="text-sm leading-relaxed mb-2 font-bold"
                            style={{
                              color: mode === 'dark' ? 'white' : '',
                            }}
                          >
                            ₹{price}
                          </p>
                        </div>
                      </div>

                      {/* Button Section */}
                      <div className="p-3">
                        <button
                          type="button"
                          onClick={() => addCart(item)}
                          className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs sm:text-sm w-full py-2"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Allproducts;
