setTimeout(logoHiden, 6000);

function logoHiden() {
    let logo = document.getElementById("logo");
    logo.style.display = "none";
    let hre = document.getElementById("hra");
    hre.style.display = "block";
}

let score = 0;
let clickValue = 1;
let upgrade1Purchased = false;
let upgrades = {
    upgrade2: { count: 0, cost: 50, increment: 1 },
    upgrade3: { count: 0, cost: 100, increment: 2 },
    upgrade4: { count: 0, cost: 200, increment: 5 },
    upgrade5: { count: 0, cost: 500, increment: 7 },
    upgrade6: { count: 0, cost: 5000, increment: 100 },
};
let incrementPerInterval = 0;
let nextMilestone = 1500;
let clickSequence = [];
const requiredSequence = ['upgrade6', 'upgrade3', 'upgrade2', 'upgrade5', 'upgrade4'];

document.getElementById('click-image').addEventListener('click', function() {
    score += clickValue;
    document.getElementById('score').textContent = Math.floor(score);
});

document.getElementById('shop-image').addEventListener('click', function() {
    document.getElementById('shop-modal').style.display = 'block';
});

document.getElementById('close-shop').addEventListener('click', function() {
    document.getElementById('shop-modal').style.display = 'none';
});

document.getElementById('upgrade1').addEventListener('click', function() {
    if (upgrade1Purchased) {
        alert('Tento upgrade již byl zakoupen!');
    } else if (score >= 10) {
        score -= 10;
        clickValue += 1;
        upgrade1Purchased = true;
        document.getElementById('score').textContent = Math.floor(score);
        document.getElementById('upgrade1').disabled = true; 
    } else {
        alert('Nedostatečný počet kubíků pro tento upgrade!');
    }
});

document.getElementById('upgrade2').addEventListener('click', function() {
    purchaseUpgrade('upgrade2');
});

document.getElementById('upgrade3').addEventListener('click', function() {
    purchaseUpgrade('upgrade3');
});

document.getElementById('upgrade4').addEventListener('click', function() {
    purchaseUpgrade('upgrade4');
});
document.getElementById('upgrade5').addEventListener('click', function() {
    purchaseUpgrade('upgrade5');
});
document.getElementById('upgrade6').addEventListener('click', function() {
    purchaseUpgrade('upgrade6');
});

function purchaseUpgrade(upgrade) {
    if (score >= upgrades[upgrade].cost) {
        score -= upgrades[upgrade].cost;
        upgrades[upgrade].count += 1;
        upgrades[upgrade].cost *= 2; 
        updateIncrementPerInterval();
        document.getElementById('score').textContent = Math.floor(score);
        updateUpgradeButtonText(upgrade); 
        updateClickSequence(upgrade); 
    } else {
        alert('Nedostatečný počet kubíků pro tento upgrade!');
    }
}

function updateUpgradeButtonText(upgrade) {
    const buttonTextMap = {
        upgrade2: 'michalovo šachové skills',
        upgrade3: 'honzův 130kg deadlift',
        upgrade4: 'petrův jojo reference',
        upgrade5: 'adamovo rychlé prsty',
        upgrade6: 'kristián'
    };
    document.getElementById(upgrade).textContent = `${buttonTextMap[upgrade]} (${upgrades[upgrade].cost} kubíků)`;
}

function updateIncrementPerInterval() {
    incrementPerInterval = 0;
    for (let key in upgrades) {
        incrementPerInterval += upgrades[key].count * upgrades[key].increment;
    }
}

function incrementScoreByUpgrades() {
    score += incrementPerInterval / 10;
    document.getElementById('score').textContent = Math.floor(score);
    checkMilestone();
}

function checkMilestone() {
    if (score >= nextMilestone) {
        triggerBlinkingEffect();
        clickValue += 3;
        nextMilestone += 1500;
    }
}

function triggerBlinkingEffect() {
    let body = document.body;
    body.classList.add('blinking');
    setTimeout(() => {
        body.classList.remove('blinking');
    }, 3000);
}

function updateClickSequence(upgrade) {
    clickSequence.push(upgrade);
    if (clickSequence.length > requiredSequence.length) {
        clickSequence.shift();
    }
    checkSequence();
}

function checkSequence() {
    if (clickSequence.join() === requiredSequence.join()) {
        window.location.href = 'http://127.0.0.1:5500/secret.html'; 
    }
}

setInterval(incrementScoreByUpgrades, 100);
