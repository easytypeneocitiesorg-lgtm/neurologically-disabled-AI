const talkBtn = document.getElementById("talk");
const mouth = document.getElementById("mouth");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

talkBtn.onclick = () => {
  recognition.start();
};

recognition.onresult = async (e) => {
  const text = e.results[0][0].transcript;
  const reply = await sendToAI(text);
  speak(reply);
};

async function sendToAI(text) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  return data.reply;
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1.2;

  utterance.onstart = () => animateMouth(true);
  utterance.onend = () => animateMouth(false);

  speechSynthesis.speak(utterance);
}

let mouthInterval;
function animateMouth(active) {
  if (!active) {
    clearInterval(mouthInterval);
    mouth.style.opacity = 0;
    return;
  }

  mouthInterval = setInterval(() => {
    mouth.style.opacity = Math.random() > 0.3 ? 1 : 0;
    mouth.style.height = `${8 + Math.random() * 10}px`;
  }, 100);
}
