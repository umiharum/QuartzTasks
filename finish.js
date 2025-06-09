const finalConclusion = Number(localStorage.getItem("finalProgress"));
const success = document.getElementById("success-task");
const failure = document.getElementById("failure-task");
const title = document.getElementById("finish-title");
const conclusion = document.getElementById("conclusion");

console.log("Final conclusion:", finalConclusion);
console.log("Type of final conclusion:", typeof finalConclusion);

// Check if finalConclusion is a number
if (isNaN(finalConclusion)) {
    console.error("Final conclusion is not a valid number.");
} 
else if (finalConclusion === 100) {
    success.removeAttribute("hidden");
    title.textContent = "Congratulations!";
    conclusion.textContent = `Your progress: ${Math.round(finalConclusion)}%`; 
}
else {
    failure.removeAttribute("hidden");
    title.textContent = "Not quite there yet!";
    conclusion.textContent = `Your progress: ${Math.round(finalConclusion)}%`;
}

// restart button
const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', () => {
    window.electronAPI.loadPage('start.html');
});