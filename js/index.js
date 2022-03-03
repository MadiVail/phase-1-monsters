const url = 'http://localhost:3000/';
let page = 1;

const getMonsters = (page) => {
    fetch(url + "monsters/?_limit=50&_page=" + page)
    .then(resp => resp.json())
    .then( json => 
        json.forEach(Monster => {
            createMonsterCard(Monster)
        })
    )
}

createMonsterCard = (monster) => {
    const card = document.createElement("div")
    const name = document.createElement("h2")
    const age = document.createElement("h4")
    const dscript = document.createElement("p")

    name.innerHTML = monster.name;
    age.innerHTML = monster.age;
    dscript.innerHTML = monster.description;
    
    card.appendChild(name)
    card.appendChild(age)
    card.appendChild(dscript)

    document.getElementById("monster-container")
    .appendChild(card)
}

createMonsterForm = () => {
    const form = document.createElement("form");
    const nameInpt = document.createElement("input");
    const ageInpt = document.createElement("input");
    const dInpt = document.createElement("input");
    const submitBtn = document.createElement("button");

    form.id = "monster-form";
    nameInpt.id = "name";
    ageInpt.id = "age";
    dInpt.id = "description";

    nameInpt.placeholder = "name...";
    ageInpt.placeholder = "age...";
    dInpt.placeholder = "description...";
    submitBtn.innerHTML = "create";

    form.appendChild(nameInpt);
    form.appendChild(ageInpt);
    form.appendChild(dInpt);
    form.appendChild(submitBtn);

    document.getElementById("create-monster").appendChild(form)
    addSubmitEventListener();
}

addSubmitEventListener = () => {
    document.getElementById("monster-form")
    .addEventListener('submit', (e) => { 
        e.preventDefault()

        postNewMonster(getFormData())
        clearForm();
    });
}

getFormData = () => {
    const monName = document.getElementById("name");
    const monAge = document.getElementById("age");
    const monDes = document.getElementById("description");

    return {name: monName.value, age: parseFloat(monAge.value), description: monDes.value};
};

postNewMonster = (monster) => {
    fetch(url + 'monsters', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(monster),
    })
}

clearForm = () => {
    document.getElementById("monster-form").reset();
}

clearCards = () => {
    const container = document.getElementById("monster-container");
    let child = container.lastElementChild;

    while (child) {
        container.removeChild(child)
        child = container.lastElementChild;
    }
}

addNavListeners = () => {
    const backBtn = document.getElementById("back")
    const fwdBtn = document.getElementById("forward")

    backBtn.addEventListener('click', () => {
        pageDown();
    })

    fwdBtn.addEventListener('click', () => {
        pageUp();
    })
}

pageUp = () => {
    clearCards();
    page++, getMonsters(page);
}

pageDown = () => {
    clearCards();
    1 < page ? (page--, getMonsters(page)) : alert("you're already on the first page");
}

init = () => {
    getMonsters(), createMonsterForm(), addNavListeners();
};

document.addEventListener("DOMContentLoaded", init);