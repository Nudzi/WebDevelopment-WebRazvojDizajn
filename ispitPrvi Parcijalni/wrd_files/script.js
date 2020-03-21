var x = document.getElementsByClassName("VilaKolonaOkvir");
      var slike = document.getElementById("Slika");
      var iznos = document.getElementById("IznosUkupno");
      var dani = document.getElementById("BrojDana");
      var prvo = document.getElementById("prva").innerHTML;
      var drugo = document.getElementById("druga").innerHTML;
      var trece = document.getElementById("treca").innerHTML;
      var ci1 = document.getElementById("cijena1").innerHTML;
      var op1 = ci1.substr(0,3);
      var ci2 = document.getElementById("cijena2").innerHTML;
      var op2 = ci2.substr(0,3);
      var ci3 = document.getElementById("cijena3").innerHTML;
      var op3 = ci3.substr(0,3);

    function funkcija(broj){
      for (var index = 0; index < 3; index++) {
        x[index].style.borderStyle = "none";
        x[index].style.borderColor = "";
      }
      x[broj].style.borderStyle = "dotted";
      x[broj].style.borderColor = "yellow";
      if(broj == 0) {slike.value = prvo; cijena.value = op1;}
      if(broj == 1) {slike.value = drugo; cijena.value = op2;}
      if(broj == 2) {slike.value = trece; cijena.value = op3;}
    }
    function tajmer(){
      iznos.value = dani.value * cijena.value;
    }
    setInterval(tajmer, 600);


    var Izbornik = document.getElementById("Izbornik");
  Izbornik.style.height="0px";

document.getElementById("IzbornikDugme").onclick = function(){
  if ( Izbornik.style.height=="0px")
  {
    Izbornik.style.height=Izbornik.scrollHeight + "px";
  }
  else
  {
    Izbornik.style.height="0px";
  }
};