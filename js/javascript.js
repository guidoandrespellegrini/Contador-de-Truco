$(document).ready(function(){

  var puntosUno = 0;
  var puntosDos = 0;

/*-----------------------------------------------------*/
/*Configuro el boton de inicio*/

	$('#inicio').on('click', function() { 
    $("#Start").removeClass("visible").addClass("invisible");
    $("#Game").removeClass("invisible").addClass("visible");
    
    /*Paso los nombres de los inputs al juego*/
    $("#ne1").text($("#eq1").val());
    $("#ne2").text($("#eq2").val());

    /*Si el usuario no ingreso primer nombre, completo con Equipo 1*/
    if ($("#eq1").val() == ""){
      $("#ne1").text("Equipo 1");
    }

    /*Si el usuario no ingreso segundo nombre, completo con Equipo 2*/
    if ($("#eq2").val() == ""){
      $("#ne2").text("Equipo 2");
    }

    /*Muestro 0 en los contadores del juego*/
    $("#p1").text(puntosUno);
    $("#p2").text(puntosDos);
  } );

/*-----------------------------------------------------*/
/*Configuro funcion Fin y Back*/

	$('#Fin, #Back').on('click', function() { 
    $("#Game").removeClass("visible").addClass("invisible");
    $("#Winner").removeClass("visible").addClass("invisible");
    $("#Start").removeClass("invisible").addClass("visible");

    /*Reestablezco los valores por defecto*/
    $("#ne1").text("");
    $("#ne2").text("");
    $("#eq1").val("");
    $("#eq2").val("");
    puntosUno = 0;
    puntosDos = 0;

    /*Pinto sin puntos, por lo que se cargaran las imagenes vacias*/
    pintar(11, 16, puntosUno);
    pintar(21, 26, puntosDos);
  } );

/*-----------------------------------------------------*/
/*Configuro el estilo del tipo de juego y cargo su valor en el Game*/
	$('#a24').on('click', function() { 
    $("#a24").removeClass("inactive").addClass("active");
    $("#a30").removeClass("active").addClass("inactive");
    $("#max").text('a 24');
  } );

	$('#a30').on('click', function() { 
    $("#a30").removeClass("inactive").addClass("active");
    $("#a24").removeClass("active").addClass("inactive");
    $("#max").text('a 30');
  } );

/*-----------------------------------------------------*/
/*Suma y valida el maximo*/

  $('#s1,#s2').on('click', function() {

    /*Obtengo el ID y el TIPO DE JUEGO*/
    id = this.id;
    max = $("#max").text()
    
    /*Si juego a 30, establezco maximo, sumo y muestro los palillos*/
    if (max == 'a 30'){
      maximo = 30;
      sumarAca(id, maximo);
      mostrarPalillos();

      /*Verifico, luego de sumar y mostrar, si hay un ganador*/
      if (puntosUno == 30){
        ganoUno()
      }
      if (puntosDos == 30){
        ganoDos()
      }

    }    
    /*Sino, juego a 24, establezco maximo, sumo y muestro los palillos*/
    else{
      maximo = 24;
      sumarAca(id, maximo);
      mostrarPalillos();

      /*Verifico, luego de sumar y mostrar, si hay un ganador*/
      if (puntosUno == 24){
        ganoUno()
      }
      if (puntosDos == 24){
        ganoDos()
      }
    }

/*-----------------------------------------------------*/
/*Configuro las funciones de ganador 1 y ganador 2*/

    function ganoUno(){
      $("#Start").removeClass("visible").addClass("invisible");
      $("#Game").removeClass("visible").addClass("invisible");
      $("#Winner").removeClass("invisible").addClass("visible");
      $("#ganador").text($("#ne1").text());
    }

    function ganoDos(){
      $("#Start").removeClass("visible").addClass("invisible");
      $("#Game").removeClass("visible").addClass("invisible");
      $("#Winner").removeClass("invisible").addClass("visible");
      $("#ganador").text($("#ne2").text());
    }
    
/*-----------------------------------------------------*/
/*Configuro la funcion de Suma*/

    function sumarAca(id, maximo){

      /*Segun el ID y el maximo, decido a quien le sumare los puntos*/
      if (id == 's1'){
        if (puntosUno < maximo) {
          puntosUno++;
          $('#p1').text(puntosUno)
        }
      }
      else{
        if (puntosDos < maximo) {
          puntosDos++;
          $('#p2').text(puntosDos)
        }
      }
    }
  } );

  /*-----------------------------------------------------*/
  /*Configuro la funcion Resta y valida el minimo*/
  
  $('#r1,#r2').on('click', function() {
    id = this.id;
    restaAca(id);
    mostrarPalillos();
    })

    /*-----------------------------*/
    function restaAca(id){
      if (id == 'r1'){
        if (puntosUno > 0) {
          puntosUno--;
          $('#p1').text(puntosUno)
        }
      }
      else{
        if (puntosDos > 0) {
          puntosDos--;
          $('#p2').text(puntosDos)
        }
      }
    }
  /*-----------------------------------------------------*/

  function mostrarPalillos(){

    tempUno = puntosUno;
    tempDos = puntosDos;
    max = $("#max").text()

    if (max == 'a 30'){
      pintar(11, 16, tempUno);
      pintar(21, 26, tempDos);
    }
    else{
      pintar24(11, 16, tempUno);
      pintar24(21, 26, tempDos);
    }
  }

  function pintar(a, b, temp){
    for (let i = a; i <= b; i++) {
      if (temp>=5) {
        temp -= 5;
        $('#p'+i).attr('src', 'statics/5.png');
      }
      
      else{
        switch (temp) {
          case 1:
            temp -= 1;
            $('#p'+i).attr('src', 'statics/1.png');
          break;

          case 2:
            temp -= 2;
            $('#p'+i).attr('src', 'statics/2.png');
          break;

          case 3:
            temp -= 3;
            $('#p'+i).attr('src', 'statics/3.png');
          break;

          case 4:
            temp -= 4;
            $('#p'+i).attr('src', 'statics/4.png');
          break;

        default:
          $('#p'+i).attr('src', 'statics/0.png');
        }
        
      }
    }
  }

  /*----------------------------------------*/
  function pintar24(a, b, temp){
    if (temp <= 12){
      pintar(a, b, temp);
    }
    else{
      a +=3;
      temp -= 12;
      pintar(a, b, temp);
    }
  }
});

/*-----------------------------------------------------*/