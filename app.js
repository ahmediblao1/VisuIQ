document.addEventListener("DOMContentLoaded", function () {
    const API = "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";
    const inp = document.getElementById("inp");
    const images = document.querySelector(".images");
    const generateButton = document.getElementById("generateButton");
  
    const showLoadingIndicator = () => {
        // Create a loading text element and append it to the images container
        const loadingText = document.createElement("div");
        loadingText.className = "loading-text";
        loadingText.textContent = "Processing...";
        images.appendChild(loadingText);
      };
    
      const hideLoadingIndicator = () => {
        // Remove the loading text element from the images container
        const loadingText = document.querySelector(".loading-text");
        if (loadingText) {
          loadingText.remove();
        }
      };
    
  
    const getImage = async () => {
      // Disable the button during the fetch operation
      generateButton.disabled = true;
  
      // Show loading indicator
      showLoadingIndicator();
  
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
          const errorResponse = await res.json();
          console.error('Error Response:', errorResponse);
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        // Parse the response as JSON
        const data = await res.json();
  
        // Check if 'data' property is defined
        if (data.data) {
          // Clear existing images
          images.innerHTML = '';
  
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
      } finally {
        // Hide loading indicator and enable the button after the fetch operation is complete
        hideLoadingIndicator();
        generateButton.disabled = false;
      }
    };
  
    // Attach the getImage function to the button click event
    generateButton.addEventListener("click", getImage);
  });
  
