document.addEventListener("DOMContentLoaded", function () {
    const API = "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";
    const inp = document.getElementById("inp");
    const images = document.querySelector(".images");
    const generateButton = document.getElementById("generateButton");
    
  

    const getImage = async () => {
      // Disable the button during the fetch operation
      generateButton.disabled = true;
  
      // Making request to OpenAI API
      const methods = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API}`,
        },
        body: JSON.stringify({
          "prompt": inp.value,
          "n": 4,
          "size": "256x256",
        }),
      };
  
      try {
        const res = await fetch("https://api.openai.com/v1/images/generations", methods);
  
        // Check if the response is successful
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        // Parse the response as JSON
        const data = await res.json();
  
        // Check if 'data' property is defined
        if (data.data) {
          // Clear existing images
          images.innerHTML = "";
  
          // Iterate over the images and create elements
          data.data.forEach(photo => {
            const container = document.createElement("div");
            const img = document.createElement("img");
  
            container.appendChild(img);
            images.appendChild(container);
  
            img.src = photo.url;
          });
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error('Error:', error);
      } 
      
      finally {
        // Enable the button after the fetch operation is complete
        generateButton.disabled = false;
      }
    };
  
    // Attach the getImage function to the button click event
    generateButton.addEventListener("click", getImage);
  });
  