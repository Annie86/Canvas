
$(function() {
		
		//Initialisation des �v�nement de contr�le au chargement
		
		$(".palette span").on('click', function(){
			var whatColor = $(this).attr("rel");
			modifierCouleur(whatColor);
		});
		
		$("#tracer").on('change', function(){
			var newTracer= $(this).val();
			modifierTracer(newTracer);
		});
		
		//========= Suppression de l'image  (Ajout Version 1.2) ========/
		
		$(".linkClear").on('click', function(){
			clearCanvas();
			$('a.linkDownload').css('display','none');
		});	
		
		//===============================================================/
		
		// Tactile
		$(".palette span").on('touchstart', function(){
			var whatColor = $(this).attr("rel");
			modifierCouleur(whatColor);
		});
		
		$("#tracer").on('touchstart', function(){
			var newTracer= $(this).val();
			modifierTracer(newTracer);
		});
		
			

		//========= Enregistrement de l'image  (Ajout Version 1.2) ========/
		
		$(".linkSave").on('click', function(){
		
			// initialisation data to url
			var imgdata = colorCanvas.toDataURL('image/png');
			
			// modification du dataUrl pour transformer les datas du canvas en image
			var newdata = imgdata.replace(/^data:image\/png/,'data:application/octet-stream');
			
			// Ajout du lien de download
			  $('a.linkDownload').fadeIn(200);
			  $('a.linkDownload').attr('download','image.png').attr('href',newdata);
			
		});
		
		//Disparition du lien et message de confirmation
		
		$("a.linkDownload").on('click', function(){
	
			$("a.linkDownload").fadeOut(500);
			$("#message").fadeIn(600);
			setTimeout(function(){$("#message").fadeOut(600)},3000);
			
		
		});
		
		//=======================================================================/
	});
	
	// Cr�ation des �l�ments et du contexte
	var $elm = $("#colorblock");
	var colorCanvas = document.getElementById('colorblock');
	var ctx = colorCanvas.getContext('2d');
	var en_dessin = false;
	
	//Propri�t�s graphiques par d�faut
	
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	
	//=================== Gestion des �v�nements tactiles (Ajout Version 1.1) =========/
	
	colorCanvas.addEventListener('touchstart', function(e){
		
		//Touch� activ�
		e.preventDefault();
		
		//Dessin activ�
		en_dessin = true;
		
		//Correctif pour aligner le pointer et le trac�
		var o = $elm.offset();
		
		//Nouveau trac� permettant d'appliquer la couleur s�lectionn�e
		ctx.beginPath(); 

		//Repositionnement du d�but du trac�
		ctx.moveTo(e.touches[0].pageX-o.left,e.touches[0].pageY-o.top);

		
	});
	
	colorCanvas.addEventListener('touchmove', function(e){
		
		//Touch� en mouvement
		e.preventDefault();
		var o = $elm.offset();
		if(en_dessin) dessiner(e.touches[0].pageX-o.left,e.touches[0].pageY-o.top);
		
	});
	
	colorCanvas.addEventListener('touchend', function(e){
		
		//Touch� rel�ch�
		e.preventDefault();
		
		//Dessin d�sactiv�
		en_dessin = false;
		
	});
	
	//=======================================================================/
	
	//==================== Gestion des �v�nements de la souris ==============/
	
	//Boution de souris activ�
	colorCanvas.onmousedown = function(e){
	
		//Dessin activ�
		en_dessin = true;
		
		//Nouveau trac� permettant d'appliquer la couleur s�lectionn�e
		ctx.beginPath(); 
		
		//Repositionnement du d�but du trac�
		ctx.moveTo(e.layerX,e.layerY);
		
	};
	
	
	//Mouvement de la souris
	colorCanvas.onmousemove = function(e){
	
		if(en_dessin) dessiner(e.layerX,e.layerY);
		
	};
	
	//Bouton de souris rel�ch�
	colorCanvas.onmouseup = function(e){
	
		//Dessin d�sactiv�
		en_dessin = false;
		
	};
	
	//Ajoute un segment au trac�
	function dessiner(x,y){

		ctx.lineTo(x,y);
		ctx.stroke();         
		
	}
	
	
	//Modification de la couleur du contexte
	function modifierCouleur(codeCouleur){
		
		if (codeCouleur) ctx.strokeStyle = codeCouleur;
	
	}
	
	//Modification de l'�paisseur du trac� 
	function modifierTracer(newTracer){
		
		if (newTracer) ctx.lineWidth = newTracer;
	
	}
	
	//========= Fonction de suppression de l'image  (Ajout Version 1.2) ========/
	
	function clearCanvas(){
		
		ctx.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
		
	}
	
	//=======================================================================/	
	

	
var path = [];

var myMouse = false;

function maFontion1() {

}

$('#colorblock')
	.mousemove(function (event) {
		coordinates = [event.offsetX, event.offsetY];
		path.push(coordinates);
		if(myMouse === true) {
			drawPath();
		}
	})
	.mousedown(function() {
		path = [];
		myMouse = true;
	})
	.mouseup(function() {
		myMouse = false;

		var data = {
			path: path
		};

		var query = {
			 url: 'http://draw.api.niamor.com/paths/add',
			 method: 'POST' ,
			 data: data
		};
		 $.ajax(query).done(maFontion1);
	});