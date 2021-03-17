function populateVoiceList(){
    // checking for speech synthesis capibilities
    if(typeof speechSynthesis === 'undefined')
        return;

    let voices = speechSynthesis.getVoices();

    voices.forEach( voice => {
        let option = document.createElement('option')
        option.textContent = voice.name + ' (' + voice.lang + ')';

        if(voice.default){
            option.textContent += ' --  DEFAULT';
        }

        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)

        document.getElementById('languageVoiceSelection').appendChild(option);        
    })
}




populateVoiceList();


if(typeof speechSynthesis !== undefined && speechSynthesis.onvoiceschanged !== undefined){
    speechSynthesis.onvoiceschanged = populateVoiceList;
}