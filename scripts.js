/* ---------------- countdown ---------------- */
const targetDate = new Date("January 31, 2026 14:00:00").getTime();
let countdownInterval = null;

function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (diff <= 0) {
        daysEl.innerText = '0';
        hoursEl.innerText = '0';
        minutesEl.innerText = '0';
        secondsEl.innerText = '0';
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.innerText = String(days);
    hoursEl.innerText = String(hours);
    minutesEl.innerText = String(minutes);
    secondsEl.innerText = String(seconds);
}

countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

/* ---------------- audio / music button ---------------- */
const music = document.getElementById('background-music');
const musicBtn = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon') || document.createElement('span');
let isPlaying = false;

musicBtn.addEventListener('click', async () => {
    try {
        // improve chance browser treats this as user gesture
        music.load();

        if (isPlaying) {
            music.pause();
            musicIcon.textContent = '▶️';
            isPlaying = false;
        } else {
            await music.play();
            musicIcon.textContent = '⏸️';
            isPlaying = true;
        }
    } catch (err) {
        // reintento silencioso (Safari/Chrome bloquean autoplay a veces)
        console.warn('Reintento de reproducción debido a bloqueo del navegador', err);
        music.play().then(() => {
            musicIcon.textContent = '⏸️';
            isPlaying = true;
        }).catch(e => {
            console.warn('No fue posible reproducir en el segundo intento', e);
        });
    }
});

/* ---------------- remove transition overlay so links work ---------------- */
const overlay = document.getElementById("transition-overlay");
if (overlay) overlay.addEventListener("animationend", () => overlay.remove());

/* ---------------- pétalos ---------------- */
setInterval(() => {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.innerHTML = "🌸";

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (Math.random() * 5 + 4) + "s";
    petal.style.fontSize = (Math.random() * 20 + 12) + "px";

    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 9000);
}, 600);


// Close when clicking outside panel on desktop
document.addEventListener('click', (e) => {
    if (!invitePanel.classList.contains('open')) return;
    const isInside = invitePanel.contains(e.target) || (openInviteBtn && openInviteBtn.contains(e.target));
    if (!isInside) closeInvite();
});
