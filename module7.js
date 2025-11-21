const loadAllProduct = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
    .then((res) => res.json())
    .then((data) => {
      displayProduct(data.drinks);
    })
    .catch(error => console.error('Error fetching products:', error));
};

const displayProduct = (products) => {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = '';

  if (!products) {
    productContainer.innerHTML = '<p>No products found</p>';
    return;
  }

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <img class="card-img" src="${product.strDrinkThumb}" alt="${product.strDrink}" />
        <h3>${product.strDrink}</h3>
        <h5>Category: ${product.strCategory}</h5>
        <p>Instructions: ${product.strInstructions ? product.strInstructions.slice(0, 15) + '...' : 'No instructions'}</p>
        <button onclick="singleProduct('${product.idDrink}')">Details</button>
        <button onclick="handleAddToCart('${product.strDrink}', '${product.strDrinkThumb}')">Add to Group</button>
        `;

    productContainer.appendChild(div);
  });
};

const searchDrinks = () => {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm == '') {
        loadAllProduct();
        return;
    }
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then((res) => res.json())
    .then((data) => {
        displayProduct(data.drinks);
    })
    .catch(error => console.error('Error searching:', error));
};

const handleAddToCart = (name, imageUrl) => {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    
    const existingItems = cartItems.querySelectorAll('.cart-item');
    for (let item of existingItems) {
        const itemName = item.querySelector('p').textContent;
        if (itemName === name) {
            alert('Already in group!');
            return;
        }
    }
    
    if (existingItems.length >= 7) {
        alert('Maximum 7 drinks allowed!');
        return;
    }
    
    const serialNumber = existingItems.length + 1;
    
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
        <div class="cart-item-content">
            <span class="serial-number">${serialNumber}.</span>
            
            <p><img src="${imageUrl}" alt="${name}" class="cart-item-img">${name}</p>
        </div>
    `;
    cartItems.appendChild(itemDiv);
    
    cartCount.textContent = existingItems.length + 1;
    
    
};



const singleProduct = (id) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayProductDetails(data.drinks[0]);
    })
    .catch(error => console.error('Error fetching product details:', error));
};

const displayProductDetails = (product) => {


  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img src="${product.strDrinkThumb}" alt="${product.strDrink}" class="modal-img">
      <h2>${product.strDrink}</h2>
      <div class="modal-details">
        <div class="detail-item">
          <strong>Category:</strong> ${product.strCategory}
        </div>
        <div class="detail-item">
          <strong>Alcoholic:</strong> ${product.strAlcoholic}
        </div>
        <div class="detail-item">
          <strong>Glass:</strong> ${product.strGlass}
        </div>
        <div class="detail-item">
          <strong>Instructions:</strong> ${product.strInstructions}
        </div>
        
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.onclick = () => {
    modal.remove();
  };


};

loadAllProduct();