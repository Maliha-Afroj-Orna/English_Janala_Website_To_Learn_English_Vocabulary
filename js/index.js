const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      clickedBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayWordDetails(data.data);
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>`;
    levelContainer.appendChild(btnDiv);
  });
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div class="text-center col-span-full space-y-6 py-8 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png" alt="Alert" />
        <p class="text-base font-medium text-gray-600">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="text-4xl font-bold text-[#18181B]">
          নেক্সট Lesson এ যান
        </h2>
      </div>
    `;
    manageSpinner(false);
    return;
  } else {
    words.forEach((word) => {
      const card = document.createElement("div");
      card.innerHTML = `
        <div class="card bg-base-100 card-lg shadow-sm text-center py-4 h-full">
            <div class="card-body space-y-3">
                <h2 class="card-title justify-center pt-4 text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-medium">Meaning / Pronounciation</p>
                <p class="text-2xl font-bangla font-semibold text-primary">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</p>
                <div class="flex justify-between items-center pt-10">
                    <button onclick="loadWordDetail(${word.id})" class="btn btn-gray-200 bg-[#1A91FF10] hover:bg-[#1A91FF40]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn btn-gray-200 bg-[#1A91FF10] hover:bg-[#1A91FF40]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        </div>
        
        `;
      wordContainer.append(card);
    });
  }
  manageSpinner(false);
};

const displayWordDetails = (word) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
          <div>
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
          </div>
          <div>
            <h2 class="font-bold pb-3">Meaning</h2>
            <p class="font-bangla">${word.meaning}</p>
          </div>
          <div>
            <h2 class="font-bold pb-3">Example</h2>
            <p class="">${word.sentence}</p>
          </div>
          <div>
            <h2 class="font-bangla font-semibold pb-3">সমার্থক শব্দ গুলো</h2>
            <div>${createElements(word.synonyms)}</div>
          </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

loadLessons();
