const modelViewer = document.querySelector("model-viewer");

function createHotspot() { 
    const hotspot = document.createElement("button"); 
    const hotspotDiv = document.createElement("div"); 
   
    hotspot.setAttribute("class", "Hotspot"); 
    hotspot.setAttribute("slot", `hotspot-1`); 
    hotspot.setAttribute("data-surface", '86 0 221 242 211 0.239 0.186 0.575'); 
    hotspot.setAttribute("data-visibility-attribute", "visible"); 
    hotspot.setAttribute("data-animation", 'Left'); 
    hotspotDiv.setAttribute("class", "HotspotAnnotation"); 
    hotspotDiv.textContent = 'Left door'; 
    hotspot.appendChild(hotspotDiv); 
 
    hotspot.addEventListener("mousedown", moveHS); 
   
    modelViewer.appendChild(hotspot);

    return hotspot;
}

const hotspot = createHotspot();
const observer = new MutationObserver((mutationsList) => { 
  for (let mutation of mutationsList) { 
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-surface') { 
      console.log("data-surface changed to:", mutation.target.getAttribute('data-surface')); 
    } 
  } 
});

observer.observe(hotspot, { attributes: true });

function moveHS(event) { 
  function onMouseMove(moveEvent) { 
    const newSurface = modelViewer.surfaceFromPoint(moveEvent.clientX, moveEvent.clientY); 
    if (newSurface) { 
      const updatedSurface = { 
        name: 'hotspot-1', 
        surface: `${newSurface}`, 
      }; 

      console.log("A new surface:", newSurface); 

      modelViewer.updateHotspot(updatedSurface);

      console.log("data-surface changed to:", newSurface); 
    } 
  } 
 
  document.addEventListener("mousemove", onMouseMove); 
 
  document.addEventListener("mouseup", () => { 
    document.removeEventListener("mousemove", onMouseMove); 
  }, { once: true }); 
}