const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = 'hi-IN'; // Set language to Hindi

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("सुप्रभात बॉस...");
    } else if (hour >= 12 && hour < 17) {
        speak("शुभ दोपहर मास्टर...");
    } else {
        speak("शुभ शाम सर...");
    }
}

window.addEventListener('load', () => {
    speak("मिस्टर टीवी को आरंभ कर रहा हूँ...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'hi-IN'; // Set language to Hindi

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "सुन रहा हूँ...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('नमस्ते')) {
        speak("नमस्ते सर, मैं आपकी कैसे मदद कर सकता हूँ?");
    } else if (message.includes("गूगल खोलो")) {
        window.open("https://google.com", "_blank");
        speak("गूगल खोल रहा हूँ...");
    } else if (message.includes("यूट्यूब खोलो")) {
        window.open("https://youtube.com", "_blank");
        speak("यूट्यूब खोल रहा हूँ...");
    } else if (message.includes("फेसबुक खोलो")) {
        window.open("https://facebook.com", "_blank");
        speak("फेसबुक खोल रहा हूँ...");
    } 
    // Add more commands in Hindi as needed
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "मैंने " + message + " के बारे में कुछ जानकारी गूगल पर पाई है";
        speak(finalText);
    }
}
