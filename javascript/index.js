
const recordBtn = document.querySelector(".record"),
result = document.querySelector(".result"),
inputLanguage = document.querySelector("#language");

let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition,
recognition;

function populateLanguages() {
languages.forEach((lang) => {
  const option = document.createElement("option");
  option.value = lang.code;
  option.innerHTML = lang.name;
  inputLanguage.appendChild(option);
});
}

populateLanguages();

function speechToText() {
try {
  recognition = new SpeechRecognition();
  recognition.lang = inputLanguage.value;
  recognition.interimResults = true;
  recordBtn.classList.add("recording");
  recognition.start();
  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    
    if (event.results[0].isFinal) {
        result.innerHTML += " " + speechResult;
        result.querySelector("p").remove();
      } else {
  
      }
  };
  recognition.onspeechend = () => {
    speechToText();
  };

} catch (error) {
  recording = false;

  console.log(error);
}
}

recordBtn.addEventListener("click", () => {
if (!recording) {
  speechToText();
  recording = true;
} else {
  stopRecording();
}
});

function stopRecording() {
    recognition.stop();
    recordBtn.querySelector("p").innerHTML = "Start Listening";
    recordBtn.classList.remove("recording");
    recording = false;
    }
    

    $("#stop-btn").click (function (event) {

        recognition.stop()
    });





/* second test */
let voicelist = document.querySelector('#voicelist')
let txtinput = document.querySelector('#textarea')
let btnspeak = document.querySelector('#btnspeak')
let tts = window.speechSynthesis
let voices=[];
GetVoices();
if(speechSynthesis !== undefined)
{
    speechSynthesis.onvoiceschanged =GetVoices;
}
    btnspeak.addEventListener('click',()=>{
    var tospeak = new SpeechSynthesisUtterance(txtinput.value);
    var selectedvoicename = voicelist.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice)=>{
        if(voice.name === selectedvoicename)
        {
            tospeak.voice = voice;
        }
    })
    tts.speak(tospeak);
})
function GetVoices()
{
    voices = tts.getVoices()
    voicelist.innerHTML = '';
    voices.forEach((voice)=>{
    var listitem = document.createElement('option')
        listitem.textContent = voice.name;
        listitem.setAttribute('data-lang',voice.lang)
        listitem.setAttribute('data-name',voice.name)
        voicelist.appendChild(listitem);
    
});
    voicelist.SelectedIndex=0;
}








/* save */


function saveFunction(){
    var txt  = document.getElementById("textarea").value;
    var data =[];
    data.push(txt)
    var data_string =JSON.stringify(data);
    var file =new Blob ([data_string],{type:"textarea"});
    var SaveTxt = document.createElement("A");
    SaveTxt.href = URL.createObjectURL(file);
    SaveTxt.download="book.txt";
    SaveTxt.click();

}
/* clear */
function clearText(){
    document.getElementById("textarea").value="";
}

/* copy */
function copy()
{
    let text =document.getElementById("textarea");
    text.select();
    document.execCommand("copy");
    let copy =document.getElementById("copybtn");
    window.getSelection().removeAllRanges();
}




