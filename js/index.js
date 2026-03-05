const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>`;
    levelContainer.appendChild(btnDiv);
  });
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-base-100 card-lg shadow-sm text-center py-4 h-full">
            <div class="card-body space-y-3">
                <h2 class="card-title justify-center pt-4 text-2xl font-bold">${word.word}</h2>
                <p class="font-medium">Meaning / Pronounciation</p>
                <p class="text-2xl font-bangla font-semibold text-primary">"${word.meaning} / ${word.pronunciation}"</p>
                <div class="flex justify-between items-center pt-10">
                    <button class="btn btn-gray-200 bg-[#1A91FF10] hover:bg-[#1A91FF40]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn btn-gray-200 bg-[#1A91FF10] hover:bg-[#1A91FF40]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        </div>
        
        `;
    wordContainer.append(card);
  });
};

loadLessons();
