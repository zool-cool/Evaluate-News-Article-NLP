import axios from "axios";
const baseURL = "http://localhost:8000/"

const { isValidUrl } = require("./checkURL");

const input = document.getElementById("url");

document.addEventListener('DOMContentLoaded', function () {
    input.addEventListener("change", (e)=>{
        e.preventDefault()
        hide_error()
        show_results(false)
    })
})

async function handleSubmit(e) {
    e.preventDefault();

    const form = document.querySelector("form");

    if (!isValidUrl(input.value)) {
        show_error();
        document.getElementById("error").innerHTML = "Please, Enter a valid URL";
        input.value = "";
        return;
    }
   
    const { data } = await axios.post(baseURL, form,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
    display_results(data);
}

const display_results = data => {

   
    
    hide_error()
    show_results(true)

    document.getElementById("agreement").innerHTML = `Agreement: ${data.sample.agreement}`;
    document.getElementById("subjectivity").innerHTML = `Subjectivity: ${data.sample.subjectivity}`;
    document.getElementById("confidence").innerHTML = `Confidence: ${data.sample.confidence}`;
    document.getElementById("irony").innerHTML = `Irony: ${data.sample.irony}`;
    document.getElementById("score_tag").innerHTML = `Score Tag: ${data.sample.score_tag}`;
}

const show_results = (bool) => {
    if (bool) {
        document.querySelectorAll("ul li").forEach(element => {
            element.style.display = "block"
        })
        return;
    }
    document.querySelectorAll("ul li").forEach(element => {
        element.style.display = "none"
    })
    return;
}   

const show_error = () => document.getElementById("error").style.display = "block";
const hide_error = () => document.getElementById("error").style.display = "none";

export {
    
    handleSubmit 
}
