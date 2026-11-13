document.addEventListener("DOMContentLoaded", function() {

    /* ==========================================================================
       1. NIGHT-VISION "CABIN MODE" TOGGLE
       ========================================================================== */
    const themeToggle = document.getElementById("theme-toggle");
    
    if (themeToggle) {
        if (localStorage.getItem("cabinMode") === "active") {
            document.body.classList.add("cabin-mode");
            themeToggle.innerText = "Normal Vision Mode";
        }

        themeToggle.addEventListener("click", function() {
            document.body.classList.toggle("cabin-mode");
            
            if (document.body.classList.contains("cabin-mode")) {
                this.innerText = "Normal Vision Mode";
                localStorage.setItem("cabinMode", "active");
            } else {
                this.innerText = "Toggle Cabin Mode";
                localStorage.setItem("cabinMode", "inactive");
            }
        });
    }

    /* ==========================================================================
       2. LIVE SPACESHIP TRACKING COUNTER (HOME PAGE)
       ========================================================================== */
    const distanceElement = document.getElementById("distance-counter");
    const reactorElement = document.getElementById("reactor-level");

    if (distanceElement && reactorElement) {
        let currentDistance = 142000500;
        
        setInterval(() => {
            currentDistance += Math.floor(Math.random() * 15) + 5;
            distanceElement.innerText = currentDistance.toLocaleString();
            
            const flux = (98 + Math.random() * 0.8).toFixed(2);
            reactorElement.innerText = flux;
        }, 1000);
    }

    /* ==========================================================================
       3. STUDENT BOARDING PASS GENERATOR (HOME PAGE)
       ========================================================================== */
    const cadetForm = document.getElementById("cadet-form");
    const passOutput = document.getElementById("pass-output");

    if (cadetForm && passOutput) {
        cadetForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("cadet-name").value.trim();
            const track = document.getElementById("cadet-track").value;

            passOutput.className = "success-msg ticket";
            passOutput.innerHTML = `
                <h3>🎫 OFFICIAL MISSION BOARDING PASS</h3>
                <p style="margin: 0.5rem 0 0.2rem 0; color: #fff;"><strong>Explorer Name:</strong> ${name}</p>
                <p style="margin: 0; color: #fff;"><strong>Crew Role:</strong> ${track}</p>
                <p style="margin: 0.2rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">Status: Cleared for Launch • Spaceship Aetheris-IV</p>
            `;
        });
    }

    /* ==========================================================================
       4. CREW FILTER BUTTONS (CREW PAGE)
       ========================================================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const crewCards = document.querySelectorAll(".crew-card");

    if (filterButtons.length > 0 && crewCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function() {
                if (this.id === "theme-toggle") return;

                filterButtons.forEach(btn => { 
                    if (btn.id !== "theme-toggle") btn.classList.remove("active"); 
                });
                this.classList.add("active");

                const targetFilter = this.getAttribute("data-filter");

                crewCards.forEach(card => {
                    const cardDept = card.getAttribute("data-dept");
                    if (targetFilter === "all" || cardDept === targetFilter) {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }
                });
            });
        });
    }

    /* ==========================================================================
       5. ROCKET WEIGHT & FUEL CALCULATOR (TECHNOLOGY PAGE)
       ========================================================================== */
    const calcForm = document.getElementById("calc-form");
    const calcResult = document.getElementById("calc-result");

    if (calcForm && calcResult) {
        calcForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const cargo = parseFloat(document.getElementById("cargo-input").value);
            const fuel = parseFloat(document.getElementById("fuel-input").value);
            const maxAllowedWeight = (fuel * 3.5) + 80;

            calcResult.className = ""; 

            if (cargo <= maxAllowedWeight) {
                calcResult.classList.add("success-msg");
                calcResult.innerHTML = `<strong>🚀 READY FOR LIFTOFF!</strong> At ${fuel}% fuel power, our engines can lift up to ${maxAllowedWeight} tons. Your cargo weight of ${cargo} tons is safe to fly!`;
            } else {
                calcResult.classList.add("error-msg");
                calcResult.innerHTML = `<strong>💥 TOO HEAVY TO LAUNCH!</strong> At ${fuel}% fuel power, the rocket can only lift ${maxAllowedWeight} tons. Try lowering your cargo weight or increasing your fuel power.`;
            }
        });
    }

    /* ==========================================================================
       6. CLICKABLE SPACESHIP BLUEPRINT POP-UP (TECHNOLOGY PAGE)
       ========================================================================== */
    const techTriggers = document.querySelectorAll(".tech-trigger");
    const techModal = document.getElementById("tech-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    
    const modalTitle = techModal ? techModal.querySelector("h2") : null;
    const modalDesc = techModal ? techModal.querySelector("p") : null;

    if (techTriggers.length > 0 && techModal && modalTitle && modalDesc) {
        techTriggers.forEach(area => {
            area.addEventListener("click", function(event) {
                event.preventDefault();
                
                modalTitle.innerText = this.getAttribute("data-title");
                modalDesc.innerText = this.getAttribute("data-desc");
                
                techModal.style.display = "flex";
            });
        });

        closeModalBtn.addEventListener("click", () => techModal.style.display = "none");
        
        techModal.addEventListener("click", function(e) {
            if (e.target === techModal) techModal.style.display = "none";
        });
    }
});
