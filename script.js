const start = document.querySelector(".start");
const settings = document.querySelector(".settings");
const game = document.querySelector(".game-container");
const gameField = document.querySelector(".game-field")
const operations = document.querySelectorAll(".operation")
const edit = document.querySelector(".edit")
const answerField = document.querySelector(".input-bar")

const minusButton  = document.querySelector(".sb")
const plusButton = document.querySelector(".sb1")

const healthContainer = document.querySelector(".health")

const scoreContainer = document.querySelector('.score-container') 
const score = document.querySelector('.score')
const newScore = document.querySelector('.newScore')
const bestScore = document.querySelector('.bestScore')
const restartButton = document.querySelector(".restart")

const healthInput = document.querySelector(".healthInput")
const minusHealth  = document.querySelector(".sb2")
const plusHealth = document.querySelector(".sb3")

const radios = document.getElementsByName("maxvalue")

const state = {
    "operations" : [],
    "operationAmout": 1,
    "health": 3,
    "maxNum": 10,
    "score": 0,
    "answers": [],
    "maxAmountOfTasks": 7,
    "bestScore": 0,
    "intervalId": 0
}

start.addEventListener('click', () => {
    startGame()
})

const startGame = () => {
    settings.classList.add("hide")
    game.classList.remove("hide")

    answerField.focus()

    updateState()

    createBubble(createTask())

    // Добавляем сердечки
    for (let i = 0; i < state["health"]; i++) {
    const heart = document.createElement("img")
    heart.setAttribute("src", "/heart.svg")  
    heart.setAttribute("alt", "heart")
    heart.classList.add("heart")

    healthContainer.appendChild(heart)
    }

    // Обнуляем результат
    score.textContent = state["score"]

    state["intervalId"] = setInterval(() => {
        if (state["maxAmountOfTasks"] == state["answers"].length) {

        } else if(state["health"] == 0) {
            endGame()
        } else {
            createBubble(createTask())
        }
    }, 1000)
}

const updateState = () => {
    state["operations"] = []

    operations.forEach((operation) => {
        if (operation.checked == 1) {
            state["operations"].push(operation.value)
        }
    })

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            state["maxNum"] = radios[i].value 
            break;
        }
      }

    state["operationAmout"] = edit.value
    state["health"] = healthInput.value
    state["score"] = 0
    state["answers"] = []
}

const createBubble = (task) => {
    // Создаем пузырь
    const bubble = document.createElement("div")
    bubble.classList.add('bubble')
    bubble.style.left = `${Math.floor(Math.random() * 500)}px`
    bubble.style.top = "0px"

    const bubbleText = document.createTextNode(task)
    bubble.appendChild(bubbleText)
    gameField.appendChild(bubble)

    moveBubble(bubble)

    // Обновляем состояние
    const answer = [bubble, eval(task)]
    state['answers'].push(answer)
}

const moveBubble = (el) => {
    const max = 438

    function animate() {
        let current = parseInt(window.getComputedStyle(el).top);
        if(current < max) {
            el.style.top = `${current + 1}px`
        }
        if(current !== max) {
            requestAnimationFrame(animate);
        } else {
            // Удаляем шарик и уменьшаем рекорд и убираем жизнь
            removeBubble(el)
            removeHealth()
        }
    }
    animate()
}

const createTask = () => {
    const nums = []
    let task = ''

    for (let i = 0; i <= state["operationAmout"]; i++) {
        nums.push(Math.floor(Math.random() * state["maxNum"]) + 1)
    }

    if (state.operationAmout == 1) {
        task = `${nums[0]} ${state["operations"][Math.floor(Math.random() * state["operations"].length)]} ${nums[1]}`
    }

    if (state.operationAmout == 2) {
        task = `${nums[0]} ${state["operations"][Math.floor(Math.random() * state["operations"].length)]} ${nums[1]} ${state["operations"][Math.floor(Math.random() * state["operations"].length)]} ${nums[2]}`
    }

    if (state.operationAmout == 3) {
        task = `${nums[0]} ${state["operations"][Math.floor(Math.random() * state["operations"].length)]} ${nums[1]} ${state["operations"][Math.floor(Math.random() * state["operations"].length)]} ${nums[2]} ${state["operations"][Math.floor(Math.random() * state["operations"].length)]} ${nums[3]}`
    }

    return task
}

answerField.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        state["answers"].forEach(answer => {
            if (answer[1] == answerField.value) {
                // Добавляем к рекорду
                updateScore()
                // Удаляем из списка
                removeBubble(answer[0])
            }
        })
        answerField.value = ''
    }
})

const removeBubble = (bubble) => {
    bubble.remove()

    state['answers'].forEach(el => {
        if (el[0] == bubble) {
            const ind = state["answers"].indexOf(el)
            state['answers'].splice(ind, 1)
        }
    })
}

const removeHealth = () => {
    if (state["health"] > 0) {
        state["health"] = state["health"] - 1
        
        const hearts = document.querySelectorAll('.heart')
        const heartsArr = Array.from(hearts)
        
        heartsArr[heartsArr.length - 1].remove()
    } 
}

const updateScore = () => {
    state["score"] = state["score"] + 1
    score.textContent = state["score"]
}

const endGame = () => {
    clearInterval(state["intervalId"])

    if (state["score"] > state["bestScore"]) {
        state["bestScore"] = state["score"]
    }

    newScore.textContent = state["score"]
    bestScore.textContent = state["bestScore"]
    
    game.classList.add("hide")
    scoreContainer.classList.remove("hide")

    // Убираем все пузырики
    state["answers"].forEach(answer => {
        answer[0].remove()
    })
}

const restartGame = () => {
    scoreContainer.classList.add("hide")
    settings.classList.remove("hide")
}

restartButton.addEventListener("click", () => {
    restartGame()
})










plusButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (edit.value <= 2) {
        edit.value = parseInt(edit.value) + 1
    }
}
)
minusButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (edit.value >= 2) {
        edit.value = parseInt(edit.value) - 1
    }
})

minusHealth.addEventListener('click', (e) => {
    e.preventDefault()

    if (healthInput.value != 1) {
        healthInput.value = parseInt(healthInput.value) - 1
    }
}
)
plusHealth.addEventListener('click', (e) => {
    e.preventDefault()

    if (healthInput.value != 5) {
        healthInput.value = parseInt(healthInput.value) + 1
    }
})