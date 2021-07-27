const populateMain = (target, template) => {
  const newTarget = document.querySelector(target);
  newTarget.innerHTML = "";
  newTarget.innerHTML = template;
};

const fetchData = (endpoint) => {
  const response = fetch(endpoint).then((res) => res.json());
  return response;
};

const templateDog = (dog) => {
  const { url, breeds } = dog;
  console.log("dog", dog);
  
  if (breeds.length === 0) {
    return `<div class="m-auto flex flex-col">
    <figure class="rounded-full overflow-hidden w-64">
    <img
    src="https://media.giphy.com/media/9SJl4x8M7wm44zQl5L/source.gif"
    />
    </figure>
    <button onClick="window.location.href=window.location.href" class="rounded-full py-3 px-6 font-bold m-3.5 bg-red-700 text-white hover:bg-red-500">Try Again</button>
    </div>`;
  }
  
  const { name, life_span, temperament, bred_for, height, weight } = breeds[0];
  return `<div class="md:grid grid-flow-col grid-cols-2 gap-4 items-center bg-white">
  <figure class="imageDog ">
    <img src="${url || "https://via.placeholder.com/500x500.png?text=Image+unavailable"}" alt="${name}" />
  </figure>
  <div class="dogDetails p-3.5">
    <h3 class="text-4xl mb-5 mt-4">${name}</h3>
    <p><b>Average life span</b>: ${life_span}</p>
    <p><b>Temperament</b>: ${temperament}</p>
    <p><b>Bred for</b>: ${bred_for}</p>
    <p><b>Height</b>: ${height.metric} cm</p>
    <p><b>Weight</b>: ${weight.metric} kg</p>
  </div>
  </div>
  <button onClick="window.location.href=window.location.href" class="rounded-full py-3 px-6 bg-yellow-700  m-3.5 font-bold text-white hover:bg-yellow-500">Load Another</button>
  
  `;
};

const searchDog = async () => {
  const response = await fetchData(
    "https://api.thedogapi.com/v1/images/search"
  );
  let template = "";
  console.log(response);
  for (let i = 0; i < response.length; i++) {
    template += templateDog(response[i]);
  }

  populateMain(".container", template);
};

searchDog();
