const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then(res => res.json())
        .then(data => displayLessons(data.data));
}
const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    lessons.forEach(lesson => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `<button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>`;
        levelContainer.appendChild(btnDiv);
    })
}

loadLessons();