let kits = []; 

function displaykits() {
  const kitsList = document.getElementById("cartItems");
  kitsList.innerHTML = "";

  if (kits.length === 0) {
    kitsList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  kits.forEach((kit, index) => {
    const box = document.createElement("div");
    box.className = "kit-box";
    box.innerHTML = `
      <strong>Kit:</strong> ${kit.kitname}<br>
      <strong>Size:</strong> ${kit.size}<br>
      <strong>Quantity:</strong> ${kit.quantity}<br>
      <strong>Price:</strong> ${kit.price}<br>
      <button onclick="deleteKit(${index})">Delete</button>
      <button onclick="editKit(${index})">Edit</button>
      <hr>
    `;
    kitsList.appendChild(box);

    total += parseFloat(kit.price) * parseInt(kit.quantity);
  });

  const totalDiv = document.createElement("div");
  totalDiv.style.marginTop = "15px";
  totalDiv.style.fontWeight = "bold";
  totalDiv.style.textAlign = "right";
  totalDiv.innerHTML = `Total: ${total.toFixed(2)}`;
  kitsList.appendChild(totalDiv);
}

function addKit() {
  const kitname = document.getElementById("kitname").innerText;
  const sizeRadio = document.querySelector('input[name="size"]:checked');
  const size = sizeRadio ? sizeRadio.value : "";
  const quantity = parseInt(document.getElementById("quantity").value);   
  const price = document.getElementById("pri").innerText.trim();

  if (!kitname || !size || !quantity || !price) {
    alert("Please fill all fields.");
    return;
  }

  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  
  const existingIndex = kits.findIndex(
    kit => kit.kitname === kitname && kit.size === size
  );

  if (existingIndex !== -1) {
   
    kits[existingIndex].quantity = parseInt(kits[existingIndex].quantity) + 1;
  } else {
    kits.push({ kitname, size, quantity, price });
  }

  sessionStorage.setItem("cart", JSON.stringify(kits)); 
  updateCartCount(kits.length); 
  displaykits();
}

function deleteKit(index) {
  kits.splice(index, 1);
  sessionStorage.setItem("cart", JSON.stringify(kits)); 
  updateCartCount(kits.length); 
  displaykits(); 
}

function editKit(index) {
  const kit = kits[index];
  let newQuantity = prompt("Enter new quantity", kit.quantity);

  if (newQuantity === null) return; 

  newQuantity = parseInt(newQuantity);

  if (isNaN(newQuantity)) {
    alert("Please enter a valid number.");
    return;
  }

  if (newQuantity > 10) {
    alert("Quantity cannot exceed 10.");
    return;
  }
  if (newQuantity < 1) {
   
    deleteKit(index);
    return;
  }

  kits[index] = {
    kitname: kit.kitname,
    size: kit.size,
    quantity: newQuantity,
    price: kit.price
  };
  sessionStorage.setItem("cart", JSON.stringify(kits));
  displaykits();
}

window.onload = function () {
  const storedCart = sessionStorage.getItem("cart");
  kits = storedCart ? JSON.parse(storedCart) : [];
  updateCartCount(kits.length);
  displaykits();
};

function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

document.addEventListener("DOMContentLoaded", function() {
const allKits = [
  { kitname: "Arsenal Home Kit", page: "arsenalhome.html" },
  { kitname: "Arsenal Away Kit", page: "arsenalaway.html" },
  { kitname: "man city Home Kit", page: "mancityhome.html" },
  { kitname: "man city Away Kit", page: "mancityaway.html" },
  { kitname: "liverpool Home Kit", page: "liverhome.html" },
  { kitname: "liverpool Away Kit", page: "liveraway.html" },
  { kitname: "france Kit", page: "france.html" },
  { kitname: "italy Kit", page: "italy.html" },
  { kitname: "argentina Kit", page: "argentina.html" },
  { kitname: "england Kit", page: "england.html" },
  { kitname: "Germany Kit", page: "germany.html" },
  { kitname: "Spain Kit", page: "spain.html" },
  { kitname: "AC Milan Home Kit", page: "milanhome.html" },
  { kitname: "AC Milan Away Kit", page: "milanaway.html" },
  { kitname: "AC Milan Third Kit", page: "milanthird.html" },
  { kitname: "Juventus Home Kit", page: "juvehome.html" },
  { kitname: "Juventus Away Kit", page: "juveaway.html" },
  { kitname: "Juventus Third Kit", page: "juvethird.html" },
  { kitname: "Barcelona Home Kit", page: "barcelonahome.html" },
  { kitname: "Barcelona Away Kit", page: "barcelonaaway.html" },
  { kitname: "Barcelona Third Kit", page: "barcelonathird.html" },
  { kitname: "Real Madrid Home Kit", page: "madridhome.html" },
  { kitname: "Real Madrid Away Kit", page: "madridaway.html" },
  { kitname: "Real Madrid Third Kit", page: "madridthird.html" },
  { kitname: "Paris Saint-Germain Home Kit", page: "psghomedetails.html" },
  { kitname: "Paris Saint-Germain Away Kit", page: "psgaway.html" },
  { kitname: "Paris Saint-Germain Third Kit", page: "psgthirddetails.html" },
  { kitname: "Paris Saint-Germain Special Kit", page: "psgspecial.html" },
  { kitname: "Bayern Munich Home Kit", page: "bayernhome.html" },
  { kitname: "Bayern Munich Away Kit", page: "bayernaway.html" },
  { kitname: "Bayern Munich Third Kit", page: "bayernthird.html" },
  { kitname: "BvB Home Kit", page: "bvbhome.html" },
  { kitname: "BvB Away Kit", page: "bvbaway.html" },
  { kitname: "Bayer Leverkusen Home Kit", page: "bayer04.html" },
];

const searchBar = document.getElementById("searchbar");
const suggestionsDiv = document.getElementById("search-suggestions");

searchBar.addEventListener("input", function() {
  const query = this.value.toLowerCase();
  suggestionsDiv.innerHTML = "";

  if (query.length === 0) return;
  
  const matches = allKits.filter(kit =>
    kit.kitname.toLowerCase().includes(query)
  );

  matches.forEach(kit => {
    const suggestion = document.createElement("div");
    suggestion.textContent = kit.kitname;
    suggestion.className = "suggestion-item";
    suggestion.style.cursor = "pointer";
    suggestion.onclick = function() {
      window.location.href = kit.page;
    };
    suggestionsDiv.appendChild(suggestion);
  });
});
});
