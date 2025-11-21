const startBtn = document.getElementById('start-btn');
const logDiv = document.getElementById('logs');

startBtn.addEventListener('click', async () => {
    logDiv.innerText = " Initializing Sandbox Environment...";
    
    
    const result = await window.sandboxAPI.startSandbox();
    
  
    logDiv.innerText = result;
});
