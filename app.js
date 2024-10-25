// const form = document.getElementById("chat-form");
// const input=document.getElementById("chat-input");
// const messages =document.getElementById("chat-messages");
// const apikey="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";
// form.addEventListener("submit", async(e)=>{
//   e.preventDefault();
//   const message =input.value;
//   input.value="";
//   messages.innerHTML += `<div class= "message user-message">
//   <img src="./icons/user.png" alt="user icon"><span> ${message} </span>
//      </div>`;
//   const response = await axios.post(
//     "https://api.openai.com/v1/completions",
//     {
//       prompt: message,
//       model: "text-davinci-003",
//       temperature: 0,
//       max_tokens: 1000,
//       top_p: 1,
//       frequency_penalty: 0.0,
//       presence_penalty: 0.0,
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apikey}`,
//       },
//     }
//   );
//   const chatbotResponse = response.data.choices[0].text;
//     messages.innerHTML +=`<div class= "message bot-message">  
//     <span>${chatbotResponse}</span>
//     </div>`;
// });

const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apikey = "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";
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

// Speech recognition event
recognition.onresult = async (event) => {
  const voiceMessage = event.results[0][0].transcript;
  input.value = voiceMessage;
  form.dispatchEvent(new Event("submit"));
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = "";
  messages.innerHTML += `<div class="message user-message">
    <img src="./icons/user.png" alt="user icon"><span>${message}</span>
  </div>`;

  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: message,
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
    }
  );

  // const chatbotResponse = response.data.choices[0].text;
  // messages.innerHTML += `<div class="message bot-message">
  //   <span>${chatbotResponse}</span>
  // </div>`;

  const chatbotResponse = response.data.choices[0].text;
messages.innerHTML += `<div class="message bot-message">
  <span>${chatbotResponse}</span>
</div>`;
speakText(chatbotResponse);


  // Text-to-speech synthesis
  const speech = new SpeechSynthesisUtterance();
  speech.text = chatbotResponse;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
});

// Voice input trigger
function startVoiceInput() {
  recognition.start();
}

// Voice output function
function speakText(text) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}
