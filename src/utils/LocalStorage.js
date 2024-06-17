const KEY_USER = "user";
class LocalStorage {
  // Retrieve an item from localStorage
  get(key, fallback) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.error(error);
      return fallback;
    }
  }

  // Save an item to localStorage
  set(key, value, callback) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      if (typeof callback === "function") {
        callback();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Remove an item from localStorage
  remove(key, callback) {
    try {
      window.localStorage.removeItem(key);
      if (typeof callback === "function") {
        callback();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Clear all items in localStorage
  clear() {
    window.localStorage.clear();
  }
  // get user
  getUser(fallback) {
    try {
      const item = window.localStorage.getItem(KEY_USER);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.error(error);
      return fallback;
    }
  }
  //set token authen
  setTokenUser(value) {
    try {
      window.localStorage.setItem("user_token", JSON.stringify(value));
      // if (typeof callback === "function") {
      //   callback();
      // }
    } catch (error) {
      console.error(error);
    }
  }
  // set to Cart
  getCart(fallback) {
    try {
      const item = window.localStorage.getItem("cart");
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.error(error);
      return fallback;
    }
  }
  setCartUser(value) {
    try {
      const cartLocal = this.get("cart", []);
      const existingItemIndex = cartLocal.findIndex(
        (item) => item.key === value.key
      );
      if (
        existingItemIndex !== -1 &&
        cartLocal[existingItemIndex].status === "Chờ thanh toán"
      ) {
        cartLocal[existingItemIndex].quantity += value.quantity;
        cartLocal[existingItemIndex].totalPrice =
          cartLocal[existingItemIndex].quantity *
          cartLocal[existingItemIndex].price;
      } else {
        cartLocal.push(value);
      }
      this.set("cart", cartLocal);
    } catch (error) {
      console.error("Error updating cart in local storage:", error);
    }
  }
  //set history
  getHistory(fallback) {
    try {
      const item = window.localStorage.getItem("history");
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.error(error);
      return fallback;
    }
  }
  setHistory(value) {
    try {
      const history = this.get("history", []);
      history.push(value);
      this.set("history", history);
    } catch (error) {
      console.error("Error updating history in local storage:", error);
    }
  }
  async removeItemPaid(keyItem) {
    const currentCart = await this.get("cart", []);
    if (currentCart.length === 1) return this.remove("cart");
    const newCart = currentCart.filter((item) => item.key !== keyItem);
    if (!newCart) return;
    // await this.remove("cart");
    this.set("cart", newCart);
  }
  getCollection() {
    return this.get("collection");
  }
  async setCollection(values) {
    const currentCollection = await this.get("collection", []);
    currentCollection.push(values);
    this.set("collection", currentCollection);
  }
  async removeCollection(id) {
    const currentCollection = await this.get("collection", []);
    const newCollect = currentCollection.filter((item) => item._id !== id);
    this.set("collection", newCollect);
  }
}

// Export an instance of LocalStorage
export default new LocalStorage();
