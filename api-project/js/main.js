import "../styles/style.css";
import { list } from "./list";
import { DOMSelectors } from "./dom";

DOMSelectors.dogwater.addEventListener("click", () => createDisplay("dogwater"));

DOMSelectors.mid.addEventListener("click", () => createDisplay("mid"));
DOMSelectors.good.addEventListener("click", () => createDisplay("good"));

document.body.onload = () => {createDisplay("dogwater")}

const form = document.getElementById("form1");
form.addEventListener("submit", async function(event) {
  event.preventDefault();
  document.querySelectorAll(".card1").forEach(async (card) => {
    let data = await getquote(document.getElementById("input1").value)
    console.log(data)
    card.innerHTML = ""
    card.insertAdjacentHTML(
    "beforeend",
    `<figcaption class="quote">${data.content}</figcaption>`
  );})
  
});

const getquote = async (input) => {
  try {
    let response = await fetch(
      `https://api.quotable.io/random?tags=${input}`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("test");
  }
};

DOMSelectors.theme.addEventListener("click", () => {
  if (document.body.classList.contains("cool")) {
    document.body.classList.add("warm");
    document.body.classList.remove("cool");
  } else {
    document.body.classList.add("cool");
    document.body.classList.remove("warm");
  }
});
function createDisplay(universityRating) {
  DOMSelectors.Display.innerHTML = "";

  list
    .filter((university) => university.grade.includes(universityRating))
    .forEach((university) => {
      DOMSelectors.Display.insertAdjacentHTML(
        "beforeend",
        `<figure class="card">
            <h2>${university.name}</h2>
            <img class="image" src="${university.image}" alt="">
            <div class="card1"></div>
          </figure>`
      );

      // const freshCard = DOMSelectors.Display.lastElementChild;
      // const appendQuoteToFreshestCard = async () => {
      //   const quote = await getquote(data);

      //   freshCard.insertAdjacentHTML(
      //     "beforeend",
      //     `<figcaption class="quote">${quote.data}</figcaption>`
      //   );
      // };
      // appendQuoteToFreshestCard();
    });
}
