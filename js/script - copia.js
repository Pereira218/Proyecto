var productos = [];
var reciente = [];
var guardado = [];


function validar(){

	if(document.getElementById("idCodigo").value == ""){
		alert("Hace falta ingresar el código del producto!");
		return false;
	}

	if(document.getElementById("idNombre").value == ""){
		alert("Hace falta ingresar el nombre del producto!");
		return false;
	}

	if(document.getElementById("idPrecio").value == ""){
		alert("Hace falta ingresar el Precio del producto!");
		return false;
	}

	if (document.getElementById("idImagen").value == "") {
		alert("Hace falta ingresar el Precio del producto!");
		return false;
	}

}

function getFile(){

	var resultado="";
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();

	reader.addEventListener("load", function(){
		resultado = reader.result;
		sessionStorage.setItem("url", resultado);
	},false);

	if (file){
		reader.readAsDataURL(file);
	}

}

function llenarArreglo(){
	var codigo = document.getElementById("idCodigo").value;
	var nombre = document.getElementById("idNombre").value;
	var precio = "Q. "+ document.getElementById("idPrecio").value;
	var imagen = sessionStorage.getItem("url");

	var codigoEx = false;

	if(localStorage.getItem("registro") != null){
		productos = JSON.parse(localStorage.getItem("registro"));
	
			for(var i =0; i<productos.length; i++){

				if (productos[i].codigo == codigo){
					codigoEx = true;
					alert("El código ya ha sido ingresado");
				}
			}

	}

	if(codigoEx == false){
	var prod = new objproducto(codigo, nombre, precio, imagen);
	reciente.push(prod);
	productos.push(prod);

	localStorage.clear();
	localStorage.setItem("registro", JSON.stringify(productos));	
	}

	
}

function objproducto(codigo, nombre, precio, imagen){
	this.codigo = codigo,
	this.nombre = nombre,
	this.precio = precio,
	this.imagen = imagen
}

function actualizarTabla(){

	debugger;

	var scriptTabla="";

	for(var index=0; index<reciente.length; index++){

		scriptTabla+="<tr>";
		scriptTabla+="<td>"+reciente[index].codigo+"</td>";
		scriptTabla+="<td>"+reciente[index].nombre+"</td>";
		scriptTabla+="<td>"+reciente[index].precio+"</td>";
		scriptTabla+="<td><img src=\""+reciente[index].imagen+"\" width=\"75px\"></td>";
		scriptTabla+="</tr>";

	}

	document.getElementById("idTableBody").innerHTML = scriptTabla;

}

function limpiar(){
	document.getElementById("idCodigo").value = "";
	document.getElementById("idNombre").value = "";
	document.getElementById("idPrecio").value = "";
	document.getElementById("idImagen").value = "";
}

function verproductos(){
	//localStorage.clear();
	var guarda2 = [];
	guarda2 = JSON.parse(localStorage.getItem("registro"));

	var scriptTabla;

	for(var index=0; index<guarda2.length; index++){

		scriptTabla+="<tr>";
		scriptTabla+="<td>"+guarda2[index].codigo+"</td>";
		scriptTabla+="<td>"+guarda2[index].nombre+"</td>";
		scriptTabla+="<td>"+guarda2[index].precio+"</td>";
		scriptTabla+="<td><img src=\""+guarda2[index].imagen+"\" width=\"100px\"></td>";
		scriptTabla+="</tr>";
		scriptTabla+="<tr>";
		scriptTabla+="<td colspan=\"2\"><label for=\""+guarda2[index].codigo+"\">Cantidad: </label> <input type=\"number\" id=\""+"c"+guarda2[index].codigo+"\" min = \"1\"></td>";
		scriptTabla+="<td colspan=\"2\"><input type=\"button\" value=\"Añadir al carrito\" id=\""+guarda2[index].codigo+"\" onclick=\"añadirCarrito(this.id)\"></td>";
		scriptTabla+="</tr>";
}
	document.getElementById("idTableBody2").innerHTML = scriptTabla;
}

function objpedido(codigo, nombre, precio, imagen, cantidad){
	this.codigo = codigo,
	this.nombre = nombre,
	this.precio = precio,
	this.imagen = imagen,
	this.cantidad = cantidad
}

function añadirCarrito(id){
	
		debugger;

	var buscarProductos = [];
	var auxiliar = [];
	var getProducto = [];

	var codigo;
	var nombre;
	var precio;
	var imagen;
	var cantidad;

	buscarProductos = JSON.parse(localStorage.getItem("registro"));

	for(var i=0; i<buscarProductos.length; i++){

		if(buscarProductos[i].codigo == id){
			codigo = buscarProductos[i].codigo;
			nombre = buscarProductos[i].nombre;
			precio = buscarProductos[i].precio;
			imagen = buscarProductos[i].imagen;
			cantidad = document.getElementById("c"+id).value;
		}

	}

	if(cantidad != "" && cantidad > 0){

		if(JSON.parse(sessionStorage.getItem("regPedido"))!=null){

			var actualizar = false;

			auxiliar = JSON.parse(sessionStorage.getItem("regPedido"));

			for(var y=0; y<auxiliar.length; y++){
				if(auxiliar[y].codigo == codigo){
					actualizar = true;
					break;
				}
			}

			if(actualizar == true){
				for(var z=0; z<auxiliar.length; z++){
					if(auxiliar[z].codigo != codigo){
						getProducto.push(auxiliar[z]);
					}
				}

				var ped = new objpedido(codigo, nombre, precio, imagen, cantidad);

				getProducto.push(ped);

				sessionStorage.clear();
				sessionStorage.setItem("regPedido", JSON.stringify(getProducto));
			}else{

				getProducto = auxiliar;

				var ped = new objpedido(codigo, nombre, precio, imagen, cantidad);

				getProducto.push(ped);

				sessionStorage.clear();
				sessionStorage.setItem("regPedido", JSON.stringify(getProducto));

			}

		}else{
			var ped = new objpedido(codigo, nombre, precio, imagen, cantidad);

			getProducto.push(ped);

			sessionStorage.clear();
			sessionStorage.setItem("regPedido", JSON.stringify(getProducto));
		}

	}else{

		alert("NO SE HA INGRESADO UNA CANTIDAD!");

	}

	var aux2 = JSON.parse(sessionStorage.getItem("regPedido"));

	for(var x=0; x<aux2.length; x++){
		alert(aux2[x].nombre);
		alert(aux2[x].cantidad);
	}
}

function agregarProducto(){



	if(validar()==false){
		return false;
	}

	llenarArreglo();

	actualizarTabla();

	limpiar();

}