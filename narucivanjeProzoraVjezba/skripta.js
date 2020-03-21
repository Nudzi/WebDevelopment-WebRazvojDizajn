
$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

$("#forma").validate({
    rules:{
        ime:{
            required:true,
            regex:/^[A-Z]{1}[a-z]{1,}\s[A-Z]{1}/
        },
        adresa:{
            required:true,
            regex:/^[^0-9]+$/
        }
    }
});
function tabela(){
    document.getElementById("tabelaID").innerHTML = "<tdead><tr>"+
            "<th>Proizvod ID</th>"+
            "<th>Naziv</th>"+
            " <th>Cijena</th>"+
            "<th>Jedinica mjere</th>"+
            "<th>Like counter</th>"+
            "<th>Like</th>"+
            "<th>Odaberi</th>"+
            " </tr>"+
            " </tdead>"+
            "<tbody>"+
            " </tbody>";
}
function tabela2(){
    document.getElementById("tabelaID2").innerHTML = "<tdead><tr>"+
            "<th>ID</th>"+
            "<th>Naziv</th>"+
            " <th>Cijena</th>"+
            "<th>Kolicina</th>"+
            "<th>Dostava ime</th>"+
            "<th>Dostava adresa</th>"+
            "<th>Dostava telefon</th>"+
            " </tr>"+
            " </tdead>"+
            "<tbody>"+
            " </tbody>";
}
klik();
    function klik(){
        document.getElementById("tabelaID").innerHTML = '';
        var mojUrl = 'https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetProizvodiAll';
        var zahtjev = new XMLHttpRequest();

        zahtjev.onload  = function() { 
                if (zahtjev.status === 200) { 
                    var n = zahtjev.responseText;
                    var x = JSON.parse(n);
                    for (let index = 0; index < x.length; index++) {
                        var r = x[index];
                        var novired = ("<tr><td>" +
                                     r.proizvodID + "</td><td>" + r.naziv + "</td><td>" + r.cijena + "</td><td>" 
                                + r.jedinicaMjere + "</td><td>" + r.likeCounter + "</td><td>" +
                                "<button onclick = 'like(" + r.proizvodID + ")'>LIKE</button>" + "</td><td>" +
                                "<button onclick = 'izaberi(" + r.proizvodID + ")'>IZABERI</button>" + "</td></tr>"
                        );
                        document.getElementById("tabelaID").innerHTML += novired;
                    }
                }
                else {  
                    alert("Server javlja grešku: " + zahtjev.statusText);  
                }  
        }

        zahtjev.onerror = function() {
            alert("Greška u komunikaciji sa serverom.");  
        };

        zahtjev.open("GET", mojUrl, true);
        zahtjev.send(null);
    }
        function like(id){
            var mojUrl = 'https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Like?proizvodId=' + id;
            var zahtjev = new XMLHttpRequest();
            zahtjev.onload  = function() { 
                if (zahtjev.status === 200) { 
                    var n = zahtjev.responseText;
                    var x = JSON.parse(n);
                    x.likeCounter = Number(x.likeCounter ) + 1;
                    klik();
                }
                else {  
                    alert("Server javlja grešku: " + zahtjev.statusText);  
                }  
        }

        zahtjev.onerror = function() {
            alert("Greška u komunikaciji sa serverom.");  
        };

        zahtjev.open("GET", mojUrl, true);
        zahtjev.send(null);
        };

        function izaberi(id){
             document.getElementById("id").value = id;
            };

var posljednji=0;
ucitaj();
         function naruci(){
            var z = new Object();
            z.dostavaGrad = document.getElementById("grad").value;
            z.dostavaAdresa = document.getElementById("adresa").value;
            z.dostavaIme = document.getElementById("ime").value;
            z.dostavaTelefon = document.getElementById("telefon").value;
            z.proizvodID = document.getElementById("id").value;
            z.kolicina = document.getElementById("kolicina").value;

            var strJson = JSON.stringify(z);
            posljednji = document.getElementById("ime").value;

            var mojUrl = 'http://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Dodaj';
            var zahtjev = new XMLHttpRequest(); 
            zahtjev.onload = function(){
                 if (zahtjev.status === 200){ 
                     var x =  JSON.parse(zahtjev.responseText); 
                     ucitaj();
                     }
                else{
                     alert("Greska");
                     }
                }
            zahtjev.onerror = function() {
                alert("Greška u komunikaciji sa serverom.");  
            }

            zahtjev.open("POST", mojUrl, true);
           zahtjev.setRequestHeader("Content-Type", "application/json");
            zahtjev.send(strJson);
        };

        function ucitaj(){
            document.getElementById("tabelaID2").innerHTML = "";
            var mojUrl = 'https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetNarudzbeAll';
            var zahtjev = new XMLHttpRequest();
    
            zahtjev.onload  = function() { 
                    if (zahtjev.status === 200) { 
                        var n = zahtjev.responseText;
                        var x = JSON.parse(n);
                        for (var index = 0; index < x.length; index++) {
                        //var  m = document.getElementById("ime").value;
                        var r = x[index];
                        //if(r.dostavaIme.startsWith(m)){
                        // var novired = ("<tr id = 'tr'><td>"+
                        //      r.proizvodID + "</td><td>" + r.naziv + "</td><td>" + r.cijena + "</td><td>" 
                        //             + r.kolicina + "</td><td>" + r.dostavaIme + "</td><td>" +
                        //              r.dostavaAdresa +"</td><td>" + r.dostavaTelefon +"</td></tr>"
                        //     );
                        //     if(posljednji != 0){
                        //         if(posljednji === r.dostavaIme){
                        //             document.getElementById("tr").style.color = "red";
                        //         }
                        //     }
                        // document.getElementById("tabelaID2").innerHTML += novired;

                       // }
                        var tr = document.createElement('tr');
                       // tr.id = "red-" + r.id;
                       document.getElementById("tabelaID2").appendChild(tr);
                       var td2 = document.createElement('tr');
                       var td3 = document.createElement('td');
                       var td4 = document.createElement('td');
                       var td5 = document.createElement('td');
                       var td6 = document.createElement('td');
                       var td7 = document.createElement('td');
                       var td8 = document.createElement('td');
                      tr.appendChild(td2);
                      tr.appendChild(td3);
                      tr.appendChild(td4);
                      tr.appendChild(td5);
                      tr.appendChild(td6);
                      tr.appendChild(td7);
                      tr.appendChild(td8);
                      td2.innerText = r.proizvodID;
                      td3.innerText = r.naziv;
                      td4.innerText = r.cijena;
                      td5.innerText = r.kolicina;
                      td6.innerText = r.dostavaIme;
                      td7.innerText = r.dostavaAdresa;
                      td8.innerText = r.dostavaTelefon;
                      if(posljednji != 0){
                        if(r.dostavaIme === posljednji){
                            tr.style.color = "red";
                        }
                    }
                     }
                    }
                    else {  
                        alert("Server javlja grešku: " + zahtjev.statusText);  
                    }  
            }
    
            zahtjev.onerror = function() {
                alert("Greška u komunikaciji sa serverom.");  
            };
    
            zahtjev.open("GET", mojUrl, true);
            zahtjev.send(null);
        }

        $( "#accordion" ).accordion({
            heightStyle: "content"
          });
    function dodajAccordion(){
        var naziv = document.getElementById("ime").value;
        var vrijednost = document.getElementById("adresa").value;
        $("#accordion").append("<h3>"+naziv + "</h3><div>"+vrijednost+"</div>");
        $("#accordion").accordion("refresh");
    }
