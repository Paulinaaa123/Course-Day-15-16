let products = [
  {
    flower: "Rose red",
    image: "RedRose.jpg",
    price: 5,
    qtty: 1,
    description:
      "One beautiful red rose. Freshly cut every morning, long lasting guarantee.",
  },
  {
    flower: "Rose white",
    image: "WhiteRose.jpg",
    price: 5,
    qtty: 1,
    description:
      "One beautiful white rose. Freshly cut every morning, long lasting guarantee.",
  },
  {
    flower: "Rose yellow",
    image: "YellowRose.jpg",
    price: 5,
    qtty: 1,
    description:
      "One beautiful yellow rose. Freshly cut every morning, long lasting guarantee.",
  },
  {
    flower: "Rose orange",
    image: "OrangeRose.jpg",
    price: 5,
    qtty: 1,
    description:
      "One beautiful orange rose. Freshly cut every morning, long lasting guarantee.",
  },
  {
    flower: "Peony",
    image: "Peony.jpg",
    price: 3,
    qtty: 1,
    description:
      "One beautiful peony. Freshly cut every morning, long lasting guarantee.",
  },
  {
    flower: "Daisy",
    image: "Daisy.jpg",
    price: 1,
    qtty: 1,
    description:
      "2-3 beautiful daisys. Freshly cut every morning, long lasting guarantee.",
  },
  {
    flower: "Tulip pink",
    image: "PinkTulip.jpg",
    price: 2,
    qtty: 1,
    description:
      "One beautiful pink tulip. Freshly cut every morning, long lasting guarantee.",
  },
  {
    flower: "Tulip white",
    image: "WhiteTulip.jpg",
    price: 2,
    qtty: 1,
    description:
      "One beautiful white tulip. Freshly cut every morning, long lasting guarantee.",
  },
  {
    flower: "Tulip purple",
    image: "PurpleTulip.jpg",
    price: 2,
    qtty: 1,
    description:
      "One beautiful purple tulip. Freshly cut every morning, long lasting guarantee.",
  },
  {
    flower: "Tulip orange",
    image: "OrangeTulip.jpg",
    price: 2,
    qtty: 1,
    description:
      "One beautiful orange tulip. Freshly cut every morning, long lasting guarantee.",
  },
  {
    flower: "Hydrangea",
    image: "Hydrangea.jpg",
    price: 4,
    qtty: 1,
    description:
      "Two beautiful Hydrangeas (One blue and one purple. Freshly cut every morning, long lasting guarantee.",
  },
  {
    flower: "Make it into a bouquet!",
    image: "Bouquet.jpg",
    price: 10,
    qtty: 1,
    description:
      "Make your whole flower order into a beautiful bouquet with additional filler greens and little flower bunches!",
  },
];

for (let val of products) {
  document.getElementById("result").innerHTML += `
    <div class="mt-4">
        <div class="card" style="width: 18rem;">
            <img src="images/${val.image}" class="card-img-top" alt="${val.flower}">
            <div class="card-body">
                <h5 class="card-title">${val.flower}</h5>
                <p class="card-text">${val.description}</br>Price: ${val.price} €</p>
                <a class="btn btn-success addToCart">Add to cart</a>
            </div>
        </div>
    </div>
    `;
}

let amountItems = 0;
let cart = [];
let btns = document.querySelectorAll(".addToCart");
btns.forEach((element, index) => {
  element.addEventListener("click", function () {
    if (cart.find((val) => val.flower == products[index].flower)) {
      products[index].qtty++;
    } else {
      cart.push(products[index]);
      amountItems++;
    }
    document.getElementById(
      "itemCount"
    ).innerHTML = `Total Items: ${amountItems}`;
    createCart();
    calculateTotal();
  });
});

function createCart() {
  document.getElementById("cart").innerHTML = "";
  for (let val of cart) {
    document.getElementById("cart").innerHTML += `
            <div class="d-flex align-items-center">
                <div class="p-2"><img src="images/${val.image}" width="50" height="100"></div>
                <div class="p-2 flex-fill">${val.flower}</div>
                <div class="p-2 flex-fill">${val.price} €</div>
                <div class="d-flex justify-content-center align-items-center">
                    <div class="p-2 flex-fill"><button class="btn btn-warning rounded-circle minusBtn changeButton">-</button></div>
                    <div class="p-2 flex-fill qtty">${val.qtty}</div>
                    <div class="p-2 flex-fill"><button class="btn btn-success rounded-circle plusBtn changeButton">+</button></div>
                </div>
                <div class="d-flex justify-content-end align-items-center">
                <div class="p-2 flex-fill"><button class="btn btn-danger deleteBtn">X</button></div></div>
            </div>
                `;
  }

  let plusBtn = document.querySelectorAll(".plusBtn");
  plusBtn.forEach((element, index) => {
    element.addEventListener("click", function () {
      cart[index].qtty++;
      document.querySelectorAll(".qtty")[index].innerHTML = cart[index].qtty;
      calculateTotal();
    });
  });

  let minusBtn = document.querySelectorAll(".minusBtn");
  minusBtn.forEach((element, index) => {
    element.addEventListener("click", function () {
      if (cart[index].qtty == 1) {
        cart.splice(index, 1);
        amountItems--;
        document.getElementById(
          "itemCount"
        ).innerHTML = `Total Items: ${amountItems}`;
        createCart();
      } else {
        cart[index].qtty--;
        document.querySelectorAll(".qtty")[index].innerHTML = cart[index].qtty;
      }
      calculateTotal();
    });
  });

  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((element, index) => {
    element.addEventListener("click", function () {
      cart[index].qtty = 1;
      cart.splice(index, 1);
      amountItems--;
      document.getElementById(
        "itemCount"
      ).innerHTML = `Total Items: ${amountItems}`;
      createCart();
      calculateTotal();
    });
  });
}

function calculateTotal() {
  let total = 0;

  for (let product of cart) {
    total = total + product.price * product.qtty;
  }

  if (total >= 100) {
    total = total * 0.9;
    document.getElementById(
      "discount"
    ).innerHTML = `A 10% discount has been applied to your order`;
  }

  document.getElementById("total").innerHTML = total.toFixed(2) + " €";
}

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

(async () => {
  const { value: email } = await Swal.fire({
    title: "Newsletter!",
    input: "email",
    inputLabel: "Sign up for our Newsletter, get 15% off",
    showCancelButton: true,
    inputPlaceholder: "Enter your email address",
  });
  if (email) {
    Swal.fire(`Entered email: ${email}`);
  }
})();

particlesJS("particles-js", {
  particles: {
    number: {
      value: 197,
      density: { enable: true, value_area: 1199.520191923231 },
    },
    color: { value: "#7209b7" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 10,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: false,
      distance: 500,
      color: "#ffffff",
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "bottom",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "bubble" },
      onclick: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 0.5 } },
      bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
