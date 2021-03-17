const speakBtn = document.getElementById('speakBtn');
const languageVoiceSelectionElement = document.getElementById('languageVoiceSelection')
const speechContentTextArea = document.getElementById('speechContentTextArea')

function setupSpeakBtn(){
    speakBtn.addEventListener('click', (event) => {
        const speechContent = speechContentTextArea.value 

        if(speechContent.length == 0){
            alert('Please provide text')
            return;
        }

        const synth = window.speechSynthesis;
        const languageVoice = languageVoiceSelectionElement.value;        
        let voices = speechSynthesis.getVoices();
        const utterConfig = new SpeechSynthesisUtterance(speechContent)

        voices.forEach( (voice) => {
            if(languageVoice.includes(voice.name)){
                utterConfig.voice = voice
            }
        })

        synth.speak(utterConfig)
    })
}

function setupVoiceSelectionEventListener(){    
    languageVoiceSelectionElement.addEventListener('change', (event) => {
        const languageVoice = event.target.value;
        if(languageVoice != ""){            
            speakBtn.removeAttribute('disabled')            
        }else{
            speakBtn.setAttribute('disabled', 'disabled')
        }
    })
}

setupSpeakBtn();
setupVoiceSelectionEventListener()