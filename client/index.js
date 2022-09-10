document.addEventListener("DOMContentLoaded", () => {
  const localhost = "http://localhost:4000";
  const products = [];
  const orders = [];
  const stateUsers = [];
  const stateUser = [];
  const stateCoins = [];
  const stateBalance = [];

  const getProducts = (async () => {
    const response = await fetch(`${localhost}/products`);
    const data = await response.json();
    data.forEach((element) => {
      products.push(element);
    });
  })();

  const getOrders = (async () => {
    const response = await fetch(`${localhost}/orders`);
    const data = await response.json();
    data.forEach((element) => {
      orders.push(element);
    });
  })();

  const getUsers = (async () => {
    const response = await fetch(`${localhost}/users`);
    const data = await response.json();
    data.forEach((element) => {
      stateUsers.push(element);
    });
  })();

  const getCoins = (async () => {
    const response = await fetch(`${localhost}/coins`);
    const data = await response.json();
    data.forEach((element) => {
      stateCoins.push(element);
    });
  })();

  const getUserByLogin = (login) => {
    const item = stateUsers.filter((item) => item.login === login);
    if (!stateUser.length) {
      stateUser.push(...item);
    }
    stateUser.length = 0;
    stateUser.push(...item);
    stateBalance.length = 0;
  };

  const getUserBalance = (id) => {
    const items = stateCoins.filter((item) => item.user_id === id);
    const uniqueActions = [...new Set(items.map((item) => item.action))];
    const uniqueItems = [];
    for (let i = 0; i <= uniqueActions.length; i++) {
      for (let j = 0; j <= uniqueActions.length; j++) {
        if (uniqueActions[i] === items[j].action) {
          uniqueItems.push(items[j]);
          break;
        }
      }
    }
    const balance = uniqueItems.reduce((accum, item) => {
      return accum + item.price;
    }, 0);
    stateBalance.push(balance);
  };

  const getUserInfo = (login) => {
    getUserByLogin(login);
    if (stateUser.length) {
      getUserBalance(stateUser[0].id);
      renderBalance();
      renderProducts();
    }
    if (!stateBalance.length) {
      renderBalance();
    }
    renderProducts();
  };

  const renderBalance = () => {
    const userBalance = document.createElement("div");
    userBalance.classList.add("user__balance");
    const coin = document.createElement("img");
    coin.src = "./assets/coin.svg";
    coin.alt = "Coin";
    const balance = document.createElement("h1");
    balance.innerHTML = stateBalance[0] || 0;
    const currency = document.createElement("img");
    currency.src = "./assets/et.svg";
    currency.alt = "Currency";

    userBalance.append(coin, balance, currency);
    const replaceable = document.querySelector(".user__balance");
    replaceable.replaceWith(userBalance);
  };

  const renderProducts = () => {
    const initialPrice = document.querySelectorAll(".product__price p");
    const initialState = [50, 70, 100, 139];
    if (!stateUser.length) {
      initialState.forEach((item, index) => {
        const priceText = document.createElement("p");
        priceText.innerHTML = item;

        initialPrice[index].replaceWith(priceText);
      });
      return;
    }
    console.log(products);
    console.log(orders);
    products.forEach((item, index) => {
      const priceText = document.createElement("p");
      priceText.innerHTML = item.price;

      initialPrice[index].replaceWith(priceText);
    });
  };

  const login = document.getElementById("username");
  login.addEventListener("input", () => getUserInfo(login.value));
});