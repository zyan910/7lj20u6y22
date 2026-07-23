const beginBtn = document.getElementById("beginBtn");

beginBtn.addEventListener("click", ()=>{

    document.getElementById("page1").classList.add("hidden");

    document.getElementById("page2").classList.remove("hidden");

});