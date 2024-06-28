from flask import Flask, request, jsonify
from flask_restful import Api, Resource
import requests
from flask_cors import cross_origin
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

url_cliente = "http://localhost:5027/obtenerCliente"

url_producto = "http://localhost:5027/obtenerProducto"

boleta_counter = 1

class Factura(Resource):
    @cross_origin()
    def post(self):
        global boleta_counter
        # Objeto de respuesta inicial
        objRespuesta = {
            "id_cliente": 0,
            "nombre_cliente": "",
            "direccion_cliente": "",
            "id_producto": 0,
            "cantidad": 0,
            "precio": 0,
            "total_venta": 0,
            "tipo_entrega": 0
        }

        try:
            # Obtener JSON de la solicitud
            json_data = request.get_json()

            # Validar y obtener datos del cliente
            cliente_response = requests.get(f"{url_cliente}/{json_data['id_cliente']}").json()

            if cliente_response["statusCode"] == 200:
                cliente_data = cliente_response["data"]
                objRespuesta["id_cliente"] = cliente_data["id"]
                objRespuesta["nombre_cliente"] = cliente_data["nombre"]
                objRespuesta["direccion_cliente"] = cliente_data["direccion"]
            else:
                return jsonify({"error": "Error al obtener datos del cliente"}), 404

            # Validar y obtener datos del producto
            producto_response = requests.get(f"{url_producto}/{json_data['id_producto']}").json()
            if producto_response['statusCode'] == 200:
                producto_data = producto_response["data"]
                objRespuesta["id_producto"] = producto_data["id"]
                objRespuesta["nombre_producto"] = producto_data["nombre"]
                objRespuesta["precio"] = producto_data["precio"]
                cantidad = int(json_data['cantidad'])
                objRespuesta["cantidad"] = cantidad
                objRespuesta["total_venta"] = producto_data["precio"] * cantidad
                objRespuesta["tipo_entrega"] = 'Despacho' if int(json_data['tipoEntrega']) == 0 else 'Retiro'

                # Aquí ajustamos el acceso al campo correcto
                if cantidad > producto_data["cantidad"]:
                    print("STOCK INSUFICIENTE")
                    return jsonify({"error": "Stock insuficiente"}), 400

                boleta = {
                    "id": boleta_counter,
                    "id_cliente": cliente_data["id"],
                    "nombre_cliente": cliente_data["nombre"],
                    "direccion_cliente": cliente_data["direccion"],
                    "id_producto": producto_data["id"],
                    "cantidad": cantidad,
                    "precio": producto_data["precio"],
                    "total_venta": producto_data["precio"] * cantidad,
                    "tipo_entrega": 'Despacho' if int(json_data['tipoEntrega']) == 0 else 'Retiro'

                }

                boleta_counter += 1

                return jsonify(boleta), 200
            else:
                return jsonify({"error": "Error al obtener datos del producto"}), 404

        except KeyError as e:
            return jsonify({"error": f"Campo requerido faltante: {str(e)}"}), 400
        except requests.exceptions.RequestException as e:
            return jsonify({"error": f"Error en la solicitud a servicio externo: {str(e)}"}), 500

    
api.add_resource(Factura, "/api/boleta")

app.run(debug=True, port=5001)