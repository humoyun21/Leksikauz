let baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en";
let input = $("#input");
let value = null;
let wrapper = $("#wrapper");
let cardClass =
  "w-[847px] block mx-auto py-4 px-8 bg-white shadow-lg rounded-[20px] ";

input.addEventListener("keyup", (e) => {
  if (e.keyCode == 13 && e.target.value.trim().length) {
    value = e.target.value;
    console.log(value);
    getData(value);
  }
});

async function getData(value) {
  try {
    let response = await fetch(`${baseUrl}/${value}`);
    let result = await response.json();
    let array = result[0];
    console.log(array);
    renderData(array);
  } catch (err) {
    InfoError(err);
  }
}

function renderData(data) {
  wrapper.innerHTML = "";
  let card = render(
    "div",
    cardClass,
    `
    
          <h1 class="text-[24px] font-bold my-4">${data.word}</h1>
          <p class="text-gray-500 my-4">${data.meanings[0].partOfSpeech}, ${data.meanings[1].partOfSpeech}</p>
          <div class="flex gap-[5px] my-4">
            <button><img src="./assets/img/Volume.svg" alt="smthimg" /></button>
            <p class="text-gray-500">/${data.phonetics[1].text}/</p>
          </div>
          <p>${data.phonetics[1].text}</p>
          <p>${data.meanings[0].definitions[0].definition}</p>
    
    
    
    `
  );
  wrapper.appendChild(card);
}

function InfoError(data) {
  wrapper.innerHTML = "";
  let card = render(
    "div",
    cardClass,
    `
  
  <div
          class=" bg-white flex gap-6 items-center justify-center mx-auto py-4 px-8 relative"
        >
          <img src="./assets/img/sheksper 1.png" alt="smthimg" />
          <div>
            <img
              src="./assets/img/bg.svg"
              alt="smthimg"
              class="absolute top-[100px]"
            />
            <p class="text-[18px] w-[500px]">
              If you believe there is such a word in the language of
              Shakespeare, please take a few seconds to report it via
              <span class="text-[#01756C]">Telegram</span>
              or <span class="text-[#01756C]">Gmail</span> and we will add it
              asap!
            </p>
          </div>
        </div>
  `
  );
  wrapper.appendChild(card);
}
