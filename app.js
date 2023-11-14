const api = "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"

const inp = document.getElementById("inp")
const images = document.querySelector(".images")

const getImage = async () => {

    const methods = {
        method:"post",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${api}`
            },
        body:JSON.stringify(
            {
                
            }
        )    
    }
    const res = await fetch("https://api.openai.com/v1/images/generations", methods)
}

