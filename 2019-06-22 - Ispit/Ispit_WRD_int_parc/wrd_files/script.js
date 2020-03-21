var slika = document.getElementsByClassName("VilaKolonaOkvir");
function funkcija(x){
    for (let index = 0; index < slika.length; index++) {
        slika[index].style.borderStyle = "";
        slika[index].style.borderColor = "";
        
    }
    slika[x].style.borderStyle = "double";
    slika[x].style.borderColor = "yellow";
}

var sadrzaj = document.getElementById("Izbornik");

sadrzaj.style.height = "0px";
document.getElementById("IzbornikDugme").onclick = function(){
  if( sadrzaj.style.height === "0px"){
    sadrzaj.style.height  = sadrzaj.scrollHeight + "px";
  } 
  else{
    sadrzaj.style.height = "0px";
    }
}