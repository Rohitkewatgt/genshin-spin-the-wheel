// ---------- Application state ----------

const MAX_PLAYERS = 4;
let players = [];
let currentRound = 1;
let currentPlayerIndex = 0;
let turnOrder = [];
let playerShuffleEnabled = false;
let battleHistory = [];

let mapViewerScale = 1;
let mapViewerX = 0;
let mapViewerY = 0;

let mapViewerDragging = false;
let mapViewerDragStartX = 0;
let mapViewerDragStartY = 0;
let mapViewerStartX = 0;
let mapViewerStartY = 0;

let mapViewerTouchMode = null;

let mapViewerTouchStartX = 0;
let mapViewerTouchStartY = 0;
let mapViewerTouchStartMapX = 0;
let mapViewerTouchStartMapY = 0;

let mapViewerPinchStartDistance = 0;
let mapViewerPinchStartScale = 1;
let mapViewerPinchCenterX = 0;
let mapViewerPinchCenterY = 0;

// ---------- Wheel state ----------

const wheelState = {
    character: {
        rotation: 0,
        result: null,
        spinning: false
    },

    boss: {
        rotation: 0,
        result: null,
        spinning: false
    }
};

let activeWheel = "character";


// ---------- DOM references ----------

const setupScreen = document.getElementById("setupScreen");
const challengeScreen = document.getElementById("challengeScreen");

const playerForm = document.getElementById("playerForm");
const playerList = document.getElementById("playerList");

const addPlayerButton = document.getElementById("addPlayerButton");
const setupError = document.getElementById("setupError");

const roundLabel = document.getElementById("roundLabel");
const playerTurn = document.getElementById("playerTurn");

const spinButton = document.getElementById("spinButton");
const historyButton = document.getElementById("historyButton");

const rerollControls =
    document.getElementById("rerollControls");

const rerollCharacterButton =
    document.getElementById("rerollCharacterButton");

const rerollBossButton =
    document.getElementById("rerollBossButton");

const characterResult = document.getElementById("characterResult");
const bossResult = document.getElementById("bossResult");

const battleResultControls =
    document.getElementById("battleResultControls");

const winButton =
    document.getElementById("winButton");

const lossButton =
    document.getElementById("lossButton");

    const historyOverlay =
    document.getElementById("historyOverlay");

const historyClose =
    document.getElementById("historyClose");

const historyContent =
    document.getElementById("historyContent");

    const summaryButton =
    document.getElementById("summaryButton");

const summaryOverlay =
    document.getElementById("summaryOverlay");

const summaryClose =
    document.getElementById("summaryClose");

const summaryContent =
    document.getElementById("summaryContent");

    const bossLocationButton =
    document.getElementById("bossLocationButton");

const locationOverlay =
    document.getElementById("locationOverlay");

const locationClose =
    document.getElementById("locationClose");

const locationBossName =
    document.getElementById("locationBossName");

const locationMap =
    document.getElementById("locationMap");

const locationRegion =
    document.getElementById("locationRegion");

const locationDescription =
    document.getElementById("locationDescription");

const locationLayer =
    document.getElementById("locationLayer");

    const resetButton =
    document.getElementById("resetButton");

    const resetOverlay =
    document.getElementById("resetOverlay");

const cancelResetButton =
    document.getElementById("cancelResetButton");

const confirmResetButton =
    document.getElementById("confirmResetButton");

    const mapViewerOverlay =
    document.getElementById("mapViewerOverlay");

const mapViewerClose =
    document.getElementById("mapViewerClose");

const mapViewerImage =
    document.getElementById("mapViewerImage");

const mapViewerContainer =
    document.getElementById("mapViewerContainer");

    const shuffleOption =
    document.getElementById("shuffleOption");

const shufflePlayers =
    document.getElementById("shufflePlayers");

    shufflePlayers.addEventListener("change", function () {

        // Update the shuffle state when the checkbox is toggled.
    playerShuffleEnabled =
        shufflePlayers.checked;

});

// ---------- Player setup ----------

// Creates a player input row and adds it to the setup form.
function addPlayerInput() {

    if (playerList.children.length >= MAX_PLAYERS) {
        return;
    }

    const playerNumber = playerList.children.length + 1;

    const row = document.createElement("div");
    row.className = "player-row";

    const number = document.createElement("span");
    number.className = "player-number";
    number.textContent = playerNumber;

    const input = document.createElement("input");
    input.className = "player-input";
    input.type = "text";
    input.placeholder = `Player ${playerNumber}`;
    input.maxLength = 30;
    input.autocomplete = "off";

    const removeButton = document.createElement("button");
    removeButton.className = "remove-player";
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute(
        "aria-label",
        `Remove player ${playerNumber}`
    );

    removeButton.addEventListener("click", function () {
row.remove();
updatePlayerNumbers();
updateAddButton();
updateShuffleVisibility();
    });

    row.appendChild(number);
    row.appendChild(input);
    row.appendChild(removeButton);

    playerList.appendChild(row);

    updatePlayerNumbers();
updateAddButton();
updateShuffleVisibility();
}

// Updates the Player Shuffle option based on player count.
function updateShuffleVisibility() {

    const playerCount =
        playerList.children.length;

    if (playerCount >= 3) {
        shuffleOption.classList.remove("hidden");
    } else {
        shuffleOption.classList.add("hidden");

        playerShuffleEnabled = false;
        shufflePlayers.checked = false;
    }
}

// Keeps player numbers and placeholders sequential after a player is removed.
function updatePlayerNumbers() {

    const rows = playerList.querySelectorAll(".player-row");

    rows.forEach(function (row, index) {

        const playerNumber = index + 1;

        row.querySelector(".player-number").textContent = playerNumber;

        const input = row.querySelector(".player-input");
        input.placeholder = `Player ${playerNumber}`;

        row.querySelector(".remove-player").setAttribute(
            "aria-label",
            `Remove player ${playerNumber}`
        );
    });
}


// Disables the add button once the player limit is reached.
function updateAddButton() {

    const playerCount = playerList.children.length;

    addPlayerButton.disabled = playerCount >= MAX_PLAYERS;

    if (playerCount >= MAX_PLAYERS) {
        addPlayerButton.textContent = "Maximum 4 Players";
    } else {
        addPlayerButton.textContent = "+ Add Player";
    }
}

// Generates the turn order for the current round.
function generateTurnOrder(previousLastPlayer) {

    if (!playerShuffleEnabled) {
        turnOrder = [...players];
        return;
    }

    let shuffledOrder = [];

    do {
        shuffledOrder = [...players];

        for (let i = shuffledOrder.length - 1; i > 0; i--) {
            const randomIndex =
                Math.floor(Math.random() * (i + 1));

            const temp =
                shuffledOrder[i];

            shuffledOrder[i] =
                shuffledOrder[randomIndex];

            shuffledOrder[randomIndex] =
                temp;
        }

    } while (
        shuffledOrder.length > 1 &&
        shuffledOrder[0] === previousLastPlayer
    );

    turnOrder = shuffledOrder;
}

// ---------- Challenge initialization ----------

// Collects player names and begins the challenge session.
function startChallenge() {

    const inputs = playerList.querySelectorAll(".player-input");

    const names = Array.from(inputs)
        .map(function (input) {
            return input.value.trim();
        })
        .filter(function (name) {
            return name.length > 0;
        });


    if (names.length === 0) {
        setupError.textContent = "Enter at least one player name.";
        return;
    }


    // Prevent duplicate names from making the history ambiguous.
    const uniqueNames = new Set(
        names.map(function (name) {
            return name.toLowerCase();
        })
    );

    if (uniqueNames.size !== names.length) {
        setupError.textContent = "Each player needs a unique name.";
        return;
    }


    players = names;

const availableBosses =
    players.length === 1
        ? bosses
        : bosses.filter(function (boss) {
            return !soloOnlyBosses.includes(boss);
        });

createWheel("boss", availableBosses);

currentRound = 1;
currentPlayerIndex = 0;

generateTurnOrder(null);

    setupError.textContent = "";

    setupScreen.classList.add("hidden");
challengeScreen.classList.remove("hidden");

    updateTurnDisplay();

    resetChallengeResults();
}

// Records the current battle outcome and advances the challenge.
function recordBattleResult(outcome) {

    if (
        wheelState.character.result === null ||
        wheelState.boss.result === null
    ) {
        return;
    }

    battleHistory.push({
        round: currentRound,
        player: turnOrder[currentPlayerIndex],
        character: wheelState.character.result,
        boss: wheelState.boss.result,
        outcome: outcome
    });

    // Remember the player who completed the final turn of this round.
    const previousLastPlayer =
        turnOrder[currentPlayerIndex];

    // Move to the next player.
    currentPlayerIndex++;

    // Start a new round after all players have completed their turn.
    if (currentPlayerIndex >= turnOrder.length) {
        currentPlayerIndex = 0;
        currentRound++;

        generateTurnOrder(previousLastPlayer);
    }

    // Reset both wheel results for the next battle.
    wheelState.character.result = null;
    wheelState.boss.result = null;

    wheelState.character.spinning = false;
    wheelState.boss.spinning = false;

    activeWheel = "character";

    updateWheelResult("character", null);
    updateWheelResult("boss", null);

    battleResultControls.classList.remove("visible");

    updateWheelLayers();
    updateSpinButton();

    roundLabel.textContent =
        `ROUND ${currentRound}`;

    playerTurn.textContent =
        `${turnOrder[currentPlayerIndex]}'s Turn`;
}


// Updates the battle history display.
function updateHistory() {

    if (battleHistory.length === 0) {

        historyContent.innerHTML =
            `<p class="history-empty">
                No battles completed yet.
            </p>`;

        return;
    }


    historyContent.innerHTML = "";

    let currentHistoryRound = null;
    let roundContainer = null;


    battleHistory.forEach(function (battle) {

        if (battle.round !== currentHistoryRound) {

            currentHistoryRound = battle.round;

            roundContainer =
                document.createElement("div");

            roundContainer.className =
                "history-round";


            const roundTitle =
                document.createElement("h3");

            roundTitle.textContent =
                `Round ${battle.round}`;


            roundContainer.appendChild(
                roundTitle
            );

            historyContent.appendChild(
                roundContainer
            );
        }


        const battleEntry =
            document.createElement("div");

        battleEntry.className =
            "history-entry";


        battleEntry.innerHTML = `
            <div class="history-player">
                ${battle.player}
            </div>

            <div class="history-match">
                <span>${battle.character}</span>
                <span class="history-vs">VS</span>
                <span>${battle.boss}</span>
            </div>

            <div class="history-outcome ${battle.outcome.toLowerCase()}">
                ${battle.outcome}
            </div>
        `;


        roundContainer.appendChild(
            battleEntry
        );
    });
}

// Updates the challenge summary display.
function updateSummary() {

    if (players.length === 0) {
        summaryContent.innerHTML =
            `<p class="summary-empty">
                No players in the current challenge.
            </p>`;

        return;
    }


    summaryContent.innerHTML = "";


    players.forEach(function (player) {

        const playerBattles =
            battleHistory.filter(
                battle => battle.player === player
            );

        const battles =
            playerBattles.length;

        const wins =
            playerBattles.filter(
                battle => battle.outcome === "Win"
            ).length;

        const losses =
            playerBattles.filter(
                battle => battle.outcome === "Loss"
            ).length;

        const winRate =
            battles > 0
                ? ((wins / battles) * 100).toFixed(1)
                : "0.0";


        const playerSummary =
            document.createElement("div");

        playerSummary.className =
            "summary-player";


        playerSummary.innerHTML = `
            <div class="summary-player-name">
                ${player}
            </div>

            <div class="summary-stats">

                <div class="summary-stat">
                    <span>BATTLES</span>
                    <strong>${battles}</strong>
                </div>

                <div class="summary-stat">
                    <span>WINS</span>
                    <strong>${wins}</strong>
                </div>

                <div class="summary-stat">
                    <span>LOSSES</span>
                    <strong>${losses}</strong>
                </div>

                <div class="summary-stat">
                    <span>WIN RATE</span>
                    <strong>${winRate}%</strong>
                </div>

            </div>
        `;


        summaryContent.appendChild(
            playerSummary
        );
    });
}

// Updates the round and player information shown above the wheel.
function updateTurnDisplay() {

    roundLabel.textContent = `ROUND ${currentRound}`;

    playerTurn.textContent =
    `${turnOrder[currentPlayerIndex]}'s Turn`;
}


// Resets wheel selections and prepares the next challenge.
function resetChallengeResults() {

    wheelState.character.result = null;
    wheelState.character.spinning = false;

    wheelState.boss.result = null;
    wheelState.boss.spinning = false;

    activeWheel = "character";

    characterResult.textContent = "Character";
    bossResult.textContent = "Boss";

    updateWheelLayers();
    updateSpinButton();
}

// Updates the visual stacking of the two wheels.
function updateWheelLayers() {

    const characterWheel =
        document.querySelector(".character-wheel");

    const bossWheel =
        document.querySelector(".boss-wheel");


    if (activeWheel === "character") {

        characterWheel.classList.add("wheel-active");
        characterWheel.classList.remove("wheel-inactive");

        bossWheel.classList.add("wheel-inactive");
        bossWheel.classList.remove("wheel-active");

    } else if (activeWheel === "boss") {

        bossWheel.classList.add("wheel-active");
        bossWheel.classList.remove("wheel-inactive");

        characterWheel.classList.add("wheel-inactive");
        characterWheel.classList.remove("wheel-active");

    }
}


// Updates the primary action and reroll controls.
function updateSpinButton() {

    if (activeWheel === "character") {
        spinButton.textContent = "SPIN CHARACTER";
    }

    else if (activeWheel === "boss") {
        spinButton.textContent = "SPIN BOSS";
    }

    else {
    spinButton.textContent = "BATTLE READY";
}

spinButton.disabled =
    activeWheel === "complete";

spinButton.classList.toggle(
    "battle-ready",
    activeWheel === "complete"
);


    const hasCharacter =
        wheelState.character.result !== null;

    const hasBoss =
        wheelState.boss.result !== null;

        bossLocationButton.style.display =
    hasBoss ? "inline-flex" : "none";


    // Show reroll controls once at least one result exists.
    if (hasCharacter || hasBoss) {
        rerollControls.classList.add("visible");
    }

    else {
        rerollControls.classList.remove("visible");
    }


    // Show only the reroll buttons whose results exist.
    rerollCharacterButton.style.display =
        hasCharacter ? "inline-block" : "none";

    rerollBossButton.style.display =
        hasBoss ? "inline-block" : "none";


    rerollCharacterButton.disabled =
        wheelState.character.spinning;

    rerollBossButton.disabled =
        wheelState.boss.spinning;


    // Show Win/Loss controls only when both selections are complete.
    if (activeWheel === "complete") {
        battleResultControls.classList.add("visible");
    }

    else {
        battleResultControls.classList.remove("visible");
    }
}

  


// Rerolls a previously selected wheel without changing the other result.
function rerollWheel(type, items) {

    const state = wheelState[type];

    if (state.spinning) {
        return;
    }


    activeWheel = type;

    updateWheelLayers();
    updateSpinButton();


    // Clear the previous selection before spinning again.
    state.result = null;

    if (type === "character") {
        characterResult.textContent = "Character";
    }

    if (type === "boss") {
        bossResult.textContent = "Boss";
    }


    // Wait for the wheel to finish coming forward
    // before starting the spin animation.
    setTimeout(function () {

        spinWheel(
            type,
            items
        );

    }, 500);
}

// ---------- Wheel creation ----------

// Creates an SVG wheel from a supplied data list.
function createWheel(type, items) {

    const wheelElement =
        document.querySelector(`.${type}-wheel`);

    wheelElement.innerHTML = "";

    const svgNamespace = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(
        svgNamespace,
        "svg"
    );

    svg.setAttribute("viewBox", "0 0 1000 1000");
    svg.classList.add("wheel-svg");

    const center = 500;
    const radius = 490;

    const sliceAngle = 360 / items.length;

// Draw each wheel segment.
items.forEach(function (item, index) {

    const startAngle =
        index * sliceAngle - sliceAngle / 2;

    const endAngle =
        startAngle + sliceAngle;

        const startPoint =
            polarToCartesian(
                center,
                center,
                radius,
                startAngle
            );

        const endPoint =
            polarToCartesian(
                center,
                center,
                radius,
                endAngle
            );

        const largeArcFlag =
            sliceAngle > 180 ? 1 : 0;

        const pathData = [
            `M ${center} ${center}`,
            `L ${startPoint.x} ${startPoint.y}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`,
            "Z"
        ].join(" ");

        const path =
            document.createElementNS(
                svgNamespace,
                "path"
            );

        path.setAttribute("d", pathData);
        path.classList.add("wheel-slice");

        // Alternate segment appearance without requiring
        // individual colors in the data.
        if (index % 2 === 0) {
            path.classList.add("wheel-slice-alt");
        }

        svg.appendChild(path);


        // Create the label for the segment.
        const textAngle =
            startAngle + sliceAngle / 2;

        const textRadius = radius * 0.67;

        const textPosition =
            polarToCartesian(
                center,
                center,
                textRadius,
                textAngle
            );

        const text =
            document.createElementNS(
                svgNamespace,
                "text"
            );

        text.setAttribute("x", textPosition.x);
        text.setAttribute("y", textPosition.y);

        text.setAttribute(
            "transform",
            `rotate(${textAngle + 90} ${textPosition.x} ${textPosition.y})`
        );

        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");

        text.classList.add("wheel-label");

        text.textContent = item;

        svg.appendChild(text);
    });


    // Central hub.
    const hub =
        document.createElementNS(
            svgNamespace,
            "circle"
        );

    hub.setAttribute("cx", center);
    hub.setAttribute("cy", center);
    hub.setAttribute("r", 72);

    hub.classList.add("wheel-hub");

    svg.appendChild(hub);


    wheelElement.appendChild(svg);

    wheelElement.dataset.type = type;
}


// Converts an angle measured clockwise from the top of the wheel
// into SVG coordinates.
function polarToCartesian(
    centerX,
    centerY,
    radius,
    angleInDegrees
) {

    const angleInRadians =
        angleInDegrees * Math.PI / 180;

    return {
        x:
            centerX +
            radius * Math.sin(angleInRadians),

        y:
            centerY -
            radius * Math.cos(angleInRadians)
    };
}


// ---------- Wheel spinning ----------

// Spins the currently active wheel and returns its selected item.
function spinWheel(type, items) {

    const state = wheelState[type];

    if (state.spinning) {
        return;
    }

    state.spinning = true;

    const selectedIndex =
        Math.floor(Math.random() * items.length);

    const selectedItem =
        items[selectedIndex];

   const sliceAngle =
    360 / items.length;

// The selected segment's center is measured clockwise from the top.
const selectedAngle =
    selectedIndex * sliceAngle;

const extraSpins =
    5 + Math.floor(Math.random() * 3);

const currentRotation =
    state.rotation;

// Rotate the selected segment back to the pointer position.
const currentAngle =
    ((currentRotation % 360) + 360) % 360;

const targetRotation =
    currentRotation +
    extraSpins * 360 -
    selectedAngle -
    currentAngle;

    state.rotation = targetRotation;

    const wheel =
        document.querySelector(`.${type}-wheel svg`);

    wheel.style.transform =
        `rotate(${targetRotation}deg)`;

    wheel.addEventListener(
    "transitionend",
    function handleTransition() {

        wheel.removeEventListener(
            "transitionend",
            handleTransition
        );

        state.spinning = false;
        state.result = selectedItem;

        updateWheelResult(type, selectedItem);

        handleWheelCompletion(type);
    }
);}

// Advances the wheel sequence after a selection is completed.
function handleWheelCompletion(type) {

    if (type === "character") {

        // Automatically advance to the boss wheel when
        // generating a new challenge.
        if (wheelState.boss.result === null) {
            activeWheel = "boss";
        } else {
            activeWheel = "complete";
        }

        updateWheelLayers();
        updateSpinButton();

        return;
    }


    if (type === "boss") {

        // Return to the completed state when both results exist.
        if (wheelState.character.result !== null) {
            activeWheel = "complete";
        }

        updateWheelLayers();
        updateSpinButton();
    }
}

// Updates the result display after a wheel finishes spinning.
function updateWheelResult(type, result) {

    if (type === "character") {
        characterResult.textContent = result;
    }

    if (type === "boss") {
        bossResult.textContent = result;
    }
}


// ---------- Wheel progression ----------

// Spins the wheel currently designated as active.
function spinCurrentWheel() {
    if (activeWheel === "character") {
        spinWheel("character", characters);
        return;
    }

    if (activeWheel === "boss") {
        const availableBosses =
            players.length === 1
                ? bosses
                : bosses.filter(function (boss) {
                    return !soloOnlyBosses.includes(boss);
                });

        spinWheel("boss", availableBosses);
        return;
    }
}

// Resets both wheel visuals to their initial orientation.
function resetWheelVisuals() {

    const characterWheel =
        document.querySelector(".character-wheel svg");

    const bossWheel =
        document.querySelector(".boss-wheel svg");


    if (characterWheel) {
        characterWheel.style.transition = "none";
        characterWheel.style.transform = "rotate(0deg)";
    }

    if (bossWheel) {
        bossWheel.style.transition = "none";
        bossWheel.style.transform = "rotate(0deg)";
    }


    requestAnimationFrame(function () {

        if (characterWheel) {
            characterWheel.style.removeProperty("transition");
        }

        if (bossWheel) {
            bossWheel.style.removeProperty("transition");
        }

    });
}

// Resets the current challenge and returns to player setup.
function resetChallenge() {

    players = [];

    currentRound = 1;
    currentPlayerIndex = 0;

    battleHistory = [];

    wheelState.character.rotation = 0;
    wheelState.character.result = null;
    wheelState.character.spinning = false;

    wheelState.boss.rotation = 0;
    wheelState.boss.result = null;
    wheelState.boss.spinning = false;

    activeWheel = "character";

    resetWheelVisuals();

    historyOverlay.classList.add("hidden");
    summaryOverlay.classList.add("hidden");
    resetOverlay.classList.add("hidden");

    challengeScreen.classList.add("hidden");
setupScreen.classList.remove("hidden");

    playerList.innerHTML = "";

    addPlayerInput();
    addPlayerInput();

    updateWheelResult("character", null);
    updateWheelResult("boss", null);

    updateWheelLayers();
    updateSpinButton();

    roundLabel.textContent = "ROUND 1";
    playerTurn.textContent = "Player's Turn";
}

// Confirms and performs the challenge reset.
confirmResetButton.addEventListener(
    "click",
    function () {

        resetChallenge();
    }
);

// ---------- Event listeners ----------

// Opens the reset confirmation dialog.
resetButton.addEventListener(
    "click",
    function () {

        resetOverlay.classList.remove("hidden");
    }
);


// Cancels the reset operation.
cancelResetButton.addEventListener(
    "click",
    function () {

        resetOverlay.classList.add("hidden");
    }
);

addPlayerButton.addEventListener("click", function () {
    addPlayerInput();
});


playerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    startChallenge();

});


spinButton.addEventListener("click", function () {

    spinCurrentWheel();

});

rerollCharacterButton.addEventListener("click", function () {

    rerollWheel(
        "character",
        characters
    );

});


rerollBossButton.addEventListener("click", function () {

    rerollWheel(
        "boss",
        bosses
    );

});


// Opens the battle history overlay.
historyButton.addEventListener(
    "click",
    function () {

        updateHistory();

        summaryOverlay.classList.add("hidden");
        historyOverlay.classList.remove("hidden");
    }
);


// Closes the battle history overlay.
historyClose.addEventListener(
    "click",
    function () {

        historyOverlay.classList.add("hidden");
    }
);


// Opens the challenge summary overlay.
summaryButton.addEventListener(
    "click",
    function () {

        updateSummary();

        historyOverlay.classList.add("hidden");
        summaryOverlay.classList.remove("hidden");
    }
);


// Closes the challenge summary overlay.
summaryClose.addEventListener(
    "click",
    function () {

        summaryOverlay.classList.add("hidden");
    }
);

// Closes the history overlay when clicking outside the panel.
historyOverlay.addEventListener(
    "click",
    function (event) {

        if (event.target === historyOverlay) {
            historyOverlay.classList.add("hidden");
        }
    }
);


// Closes the summary overlay when clicking outside the panel.
summaryOverlay.addEventListener(
    "click",
    function (event) {

        if (event.target === summaryOverlay) {
            summaryOverlay.classList.add("hidden");
        }
    }
);

// Opens the location information for the selected boss.
bossLocationButton.addEventListener(
    "click",
    function () {

                const boss =
            wheelState.boss.result;

        if (!boss) {
            return;
        }

        const location =
            bossLocations[boss];

        if (!location) {
            return;
        }

        locationBossName.textContent =
            boss;

        locationRegion.textContent =
            location.region;

        locationDescription.textContent =
            location.location;

        locationMap.src =
            location.mapImage;

        locationLayer.innerHTML = "";

const layers =
    location.layers ||
    (
        location.layer
            ? [location.layer]
            : []
    );

if (layers.length > 0) {

    locationLayer.classList.remove(
        "hidden"
    );

    layers.forEach(function (layer) {

        const layerIcon =
            document.createElement("div");

        layerIcon.classList.add(
            "location-layer-icon"
        );

        const icon =
            document.createElement("span");

        const tooltip =
            document.createElement("span");

        tooltip.classList.add(
            "location-layer-tooltip"
        );

        if (layer === "below") {

            icon.textContent = "↓";
            tooltip.textContent = "Below";

        }

        else if (layer === "above") {

            icon.textContent = "↑";
            tooltip.textContent = "Above";

        }

        else if (layer === "underwater") {

            icon.textContent = "≋";
            tooltip.textContent = "Underwater";

        }

        else if (layer === "night-kingdom") {

    icon.textContent = "✦";
    tooltip.textContent = "Night Kingdom";

    tooltip.classList.add(
        "night-kingdom-tooltip"
    );

}

        layerIcon.appendChild(icon);
        layerIcon.appendChild(tooltip);

        locationLayer.appendChild(layerIcon);

    });

}

        else {

            locationLayer.classList.add(
                "hidden"
            );

        }

        locationOverlay.classList.remove(
            "hidden"
        );

    }
);


// Closes the location information.
locationClose.addEventListener(
    "click",
    function () {

        locationOverlay.classList.add(
            "hidden"
        );
    }
);


// Closes the location information when
// clicking outside the panel.
locationOverlay.addEventListener(
    "click",
    function (event) {

        if (event.target === locationOverlay) {

            locationOverlay.classList.add(
                "hidden"
            );
        }
    }
);

// Opens the map viewer overlay when the map image is clicked.
locationMap.addEventListener(
    "click",
    function () {

        if (!locationMap.src) {
            return;
        }

        mapViewerScale = 1;
        mapViewerX = 0;
        mapViewerY = 0;

        mapViewerImage.src =
            locationMap.src;

        updateMapViewerTransform();

        mapViewerOverlay.classList.remove(
            "hidden"
        );
    }
);

// Closes the map viewer overlay when the close button is clicked.
mapViewerClose.addEventListener(
    "click",
    function () {
        mapViewerOverlay.classList.add(
            "hidden"
        );
    }
);

// Closes the map viewer overlay when clicking outside the image.
mapViewerOverlay.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            mapViewerOverlay
        ) {
            mapViewerOverlay.classList.add(
                "hidden"
            );
        }

    }
);

// Updates the map viewer's transform based on current scale and position.
function updateMapViewerTransform() {

    mapViewerImage.style.transform =
        `translate(${mapViewerX}px, ${mapViewerY}px) scale(${mapViewerScale})`;

}

// Handles zooming in and out of the map viewer with the mouse wheel.
mapViewerContainer.addEventListener(
    "wheel",
    function (event) {

        event.preventDefault();

        const oldScale =
            mapViewerScale;

        const zoomFactor =
            event.deltaY < 0 ? 1.15 : 0.87;

        const newScale =
            Math.min(
                5,
                Math.max(
                    1,
                    oldScale * zoomFactor
                )
            );

        if (newScale === oldScale) {
            return;
        }

        const rect =
            mapViewerContainer.getBoundingClientRect();

        const mouseX =
            event.clientX -
            (rect.left + rect.width / 2);

        const mouseY =
            event.clientY -
            (rect.top + rect.height / 2);

        mapViewerX =
            mouseX -
            (mouseX - mapViewerX) *
            (newScale / oldScale);

        mapViewerY =
            mouseY -
            (mouseY - mapViewerY) *
            (newScale / oldScale);

        mapViewerScale =
            newScale;

        updateMapViewerTransform();

    },
    {
        passive: false
    }
);

// Calculates the distance between two touch points for pinch zooming.
function getTouchDistance(touch1, touch2) {

    const dx =
        touch2.clientX -
        touch1.clientX;

    const dy =
        touch2.clientY -
        touch1.clientY;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}


function getTouchCenter(touch1, touch2) {

    return {
        x:
            (touch1.clientX +
             touch2.clientX) / 2,

        y:
            (touch1.clientY +
             touch2.clientY) / 2
    };

}

// Handles dragging the map viewer image with the mouse.
mapViewerContainer.addEventListener(
    "mousedown",
    function (event) {

        if (
            event.button !== 0 ||
            mapViewerScale <= 1
        ) {
            return;
        }

        mapViewerDragging = true;

        mapViewerDragStartX =
            event.clientX;

        mapViewerDragStartY =
            event.clientY;

        mapViewerStartX =
            mapViewerX;

        mapViewerStartY =
            mapViewerY;

        mapViewerContainer.style.cursor =
            "grabbing";

    }
);

// Handles touch gestures for panning and pinching the map viewer images.
mapViewerContainer.addEventListener(
    "touchmove",
    function (event) {

        event.preventDefault();

        if (
            mapViewerTouchMode === "pan" &&
            event.touches.length === 1 &&
            mapViewerScale > 1
        ) {

            const touch =
                event.touches[0];

            mapViewerX =
                mapViewerTouchStartMapX +
                (
                    touch.clientX -
                    mapViewerTouchStartX
                );

            mapViewerY =
                mapViewerTouchStartMapY +
                (
                    touch.clientY -
                    mapViewerTouchStartY
                );

            updateMapViewerTransform();

        }

        else if (
            mapViewerTouchMode === "pinch" &&
            event.touches.length === 2
        ) {

            const currentDistance =
                getTouchDistance(
                    event.touches[0],
                    event.touches[1]
                );

            const scaleRatio =
                currentDistance /
                mapViewerPinchStartDistance;

            const newScale =
                Math.min(
                    5,
                    Math.max(
                        1,
                        mapViewerPinchStartScale *
                        scaleRatio
                    )
                );

            const oldScale =
                mapViewerScale;

            if (newScale !== oldScale) {

                mapViewerX =
                    mapViewerPinchCenterX -
                    (
                        mapViewerPinchCenterX -
                        mapViewerX
                    ) *
                    (newScale / oldScale);

                mapViewerY =
                    mapViewerPinchCenterY -
                    (
                        mapViewerPinchCenterY -
                        mapViewerY
                    ) *
                    (newScale / oldScale);

                mapViewerScale =
                    newScale;

                updateMapViewerTransform();

            }

        }

    },
    {
        passive: false
    }
);

// Resets touch mode when all fingers are lifted from the map viewer.
mapViewerContainer.addEventListener(
    "touchend",
    function (event) {

        if (event.touches.length === 0) {

            mapViewerTouchMode =
                null;

        }

        else if (event.touches.length === 1) {

            const touch =
                event.touches[0];

            mapViewerTouchMode =
                "pan";

            mapViewerTouchStartX =
                touch.clientX;

            mapViewerTouchStartY =
                touch.clientY;

            mapViewerTouchStartMapX =
                mapViewerX;

            mapViewerTouchStartMapY =
                mapViewerY;

        }

    }
);

// Updates the map viewer's position while dragging.
window.addEventListener(
    "mousemove",
    function (event) {

        if (!mapViewerDragging) {
            return;
        }

        mapViewerX =
            mapViewerStartX +
            (event.clientX -
             mapViewerDragStartX);

        mapViewerY =
            mapViewerStartY +
            (event.clientY -
             mapViewerDragStartY);

        updateMapViewerTransform();

    }
);

// Handles touch gestures for panning and pinching the map viewer images.
mapViewerContainer.addEventListener(
    "touchstart",
    function (event) {

        if (event.touches.length === 1) {

            const touch =
                event.touches[0];

            mapViewerTouchMode =
                "pan";

            mapViewerTouchStartX =
                touch.clientX;

            mapViewerTouchStartY =
                touch.clientY;

            mapViewerTouchStartMapX =
                mapViewerX;

            mapViewerTouchStartMapY =
                mapViewerY;

        }

        else if (event.touches.length === 2) {

            mapViewerTouchMode =
                "pinch";

            mapViewerPinchStartDistance =
                getTouchDistance(
                    event.touches[0],
                    event.touches[1]
                );

            mapViewerPinchStartScale =
                mapViewerScale;

            const center =
                getTouchCenter(
                    event.touches[0],
                    event.touches[1]
                );

            const rect =
                mapViewerContainer.getBoundingClientRect();

            mapViewerPinchCenterX =
                center.x -
                (rect.left + rect.width / 2);

            mapViewerPinchCenterY =
                center.y -
                (rect.top + rect.height / 2);

        }

        event.preventDefault();

    },
    {
        passive: false
    }
);

// Updates the map viewer's position and scale while dragging or pinching.
window.addEventListener(
    "mouseup",
    function () {

        if (!mapViewerDragging) {
            return;
        }

        mapViewerDragging = false;

        mapViewerContainer.style.cursor =
            "";

    }
);

// Records a win for the current player and advances the challenge.
winButton.addEventListener(
    "click",
    () => recordBattleResult("Win")
);

// Records a loss for the current player and advances the challenge.
lossButton.addEventListener(
    "click",
    () => recordBattleResult("Loss")
);

// ---------- Initial state ----------

addPlayerInput();
addPlayerInput();


// ---------- Wheel initialization ----------

createWheel("character", characters);
createWheel("boss", bosses);

updateWheelLayers();
updateSpinButton();