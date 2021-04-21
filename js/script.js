var productos = [];
var reciente = [];

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
	var precio = document.getElementById("idPrecio").value;
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
		scriptTabla+="<td>Q "+reciente[index].precio+"</td>";
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
		scriptTabla+="<td>"+guarda2[index].nombre+"<br><br><label for=\""+guarda2[index].codigo+"\">Cantidad: </label> <input type=\"number\" id=\""+"c"+guarda2[index].codigo+"\"></td>";
		scriptTabla+="<td>Q "+guarda2[index].precio+"<br><br><input type=\"button\" value=\"Añadir al carrito\" id=\""+guarda2[index].codigo+"\" onclick=\"añadirCarrito(this.id)\"></td>";
		scriptTabla+="<td><img src=\""+guarda2[index].imagen+"\" width=\"75px\"></td>";
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

}

function revisarPedido(){
	var carrito = [];
	var total = 0;
	carrito = JSON.parse(sessionStorage.getItem("regPedido"));

	var scriptTabla;

	for(var index=0; index<carrito.length; index++){

		scriptTabla+="<tr>";
		scriptTabla+="<td>"+carrito[index].codigo+"</td>";
		scriptTabla+="<td>"+carrito[index].nombre+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src=\""+carrito[index].imagen+"\" width=\"75px\"></td>"
		scriptTabla+="<td>"+carrito[index].cantidad+"<br><br><label for=\""+carrito[index].codigo+"\">Cantidad: </label> <input type=\"number\" id=\""+"c"+carrito[index].codigo+"\" onchange=\"actualizarCantidad(this.id)\">&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"button\" value=\"Descartar\" id=\""+carrito[index].codigo+"\" onclick=\"quitarCarrito(this.id)\"></td>";
		scriptTabla+="<td>Q "+carrito[index].precio+"</td>";
		scriptTabla+="<td>Q "+carrito[index].cantidad*carrito[index].precio+"</td>";
		scriptTabla+="</tr>";
		total+=carrito[index].cantidad*carrito[index].precio;
	}

	document.getElementById("idTableBody3").innerHTML = scriptTabla;
	document.getElementById("total").innerHTML = "Total de su compra:&nbsp;&nbsp;&nbsp;&nbsp;Q "+total;
}

function actualizarCantidad(id){
	var nuevoid = id.substring(1);
	
	añadirCarrito(nuevoid);

	revisarPedido();
}

function quitarCarrito(id){

	var pedidoActual = [];
	var nuevoPedido = [];

	pedidoActual = JSON.parse(sessionStorage.getItem("regPedido"));

	for(var y=0; y<pedidoActual.length; y++){
		if(pedidoActual[y].codigo != id){
			nuevoPedido.push(pedidoActual[y]);
		}
	}

	sessionStorage.clear();
	sessionStorage.setItem("regPedido", JSON.stringify(nuevoPedido));

	revisarPedido();

}

function validarCompra(){

	var total = document.getElementById("total");
	var contenido = total.innerHTML;

	if(contenido.charAt(contenido.length-1) == 0 && contenido.charAt(contenido.length-2)==" "){
		alert("NO HAY PRODUCTOS EN EL CARRITO!");
		return false;
	}

	if(document.getElementById("idNombre").value == ""){
		alert("DEBE INGRESAR SU NOMBRE COMPLETO!");
		return false;
	}

	if(document.getElementById("idDireccion").value == ""){
		alert("DEBE INGRESAR UNA DIRECCION DE ENTREGA!");
		return false;
	}

}

function comprar(){

	if(validarCompra()==false){
		return false;
	}

	document.getElementById("idNit").value="";
	document.getElementById("idNombre").value="";
	document.getElementById("idDireccion").value="";
	sessionStorage.clear();
	alert("Su pedido se registro correctamente!\n Muchas gracias por su compra!");

}

function agregarProducto(){



	if(validar()==false){
		return false;
	}

	llenarArreglo();

	actualizarTabla();

	limpiar();

}