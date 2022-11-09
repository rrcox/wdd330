const keyElements = document.getElementsByClassName("key")
const keys = Array.from(keyElements);
const offsets = {}
const yIncrement = 10;
const maxOffset = 90;

keys.forEach(key => {
    offsets[key.dataset.key] = 0;
});

keys.forEach(key => {   
    key.closest("div.key").addEventListener("click", e => {
        const sound = document.querySelector(`audio[data-key='${key.dataset.key}']`);
        const offset = key.dataset.key;
                
        if(offsets[offset] > maxOffset){
            offsets[offset] = 0;          
        }else{
            offsets[offset] += yIncrement;
        }
        
        key.style.transform = `translateY(${offsets[offset]}px)`;    
        key.className += " playing";
        
        sound.currentTime = 0;
        sound.play();
    });

});

const soundElements = document.getElementsByTagName("audio");
const sounds = Array.from(soundElements);

sounds.forEach(sound => {
    sound.addEventListener("ended", e => {
        const key = e.target.dataset.key;
        const clickedKey = document.querySelector(`.key[data-key='${key}']`);
        clickedKey.classList.remove("playing");
    });
})
