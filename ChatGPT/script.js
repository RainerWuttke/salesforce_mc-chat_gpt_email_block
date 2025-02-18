const text = document.getElementById('textDialog');
const chat = document.getElementById('chatBox');
const OPENAI_API_KEY = "xxx"

text.addEventListener('keydown', (event) => {
    if (text.value && event.key == 'Enter') {
        createUserMessage();
    }
});

function createUserMessage() {
    let message = document.createElement('div');
    let messageText = document.createElement('p');
    message.classList.add('message');
    message.classList.add('user');
    messageText.innerText = text.value;

    text.disabled = true;

    SendQuestion(text.value);
    
    text.value = '';
    message.appendChild(messageText);
    chat.appendChild(message);
}


function requestResponse(resposta) {
    let message = document.createElement('div');
    let messageText = document.createElement('p');
    message.classList.add('message');
    message.classList.add('chat');
    messageText.innerText = resposta;
    
    message.appendChild(messageText);
    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
    text.disabled = false;
}

function SendQuestion(question){
    fetch("https://api.openai.com/v1/completions",{
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:"Bearer " + OPENAI_API_KEY,
        },
        body: JSON.stringify({
            model:"text-davinci-002",
            prompt:question,
            max_tokens:2048,
            temperature:0.5,
        }),
    })
    .then((response)=> response.json())
    .then((json) => {
        let resp = json.choices[0].text.trim();
        requestResponse(resp);

    })
    .catch((error) => console.error("Error:", error))
}



/*
Qual a capital do Brasil?
*/