import "../styles/style.css";
import { list } from "./list";
import { DOMSelectors } from "./dom";

const apiURL = "https://api.quotable.io/random";

const getData = async (apiURL) => {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

DOMSelectors.dogwater.addEventListener("click", () =>
  createDisplay("dogwater")
);
DOMSelectors.mid.addEventListener("click", () => createDisplay("mid"));
DOMSelectors.good.addEventListener("click", () => createDisplay("good"));

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
          </figure>`
      );

      const freshCard = DOMSelectors.Display.lastElementChild;
      const appendQuoteToFreshestCard = async () => {
        const quote = await getData(apiURL);

        freshCard.insertAdjacentHTML(
          "beforeend",
          `<figcaption class="quote">${quote.content}</figcaption>`
        );
      };
      appendQuoteToFreshestCard();
    });
}
