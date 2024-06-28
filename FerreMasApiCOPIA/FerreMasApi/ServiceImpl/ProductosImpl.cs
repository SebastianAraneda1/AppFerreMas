using FerreMasApi.Dal;
using FerreMasApi.InterfaceService;
using FerreMasApi.Models;
using Microsoft.AspNetCore.Components.Sections;
using System.Data;

namespace FerreMasApi.ServiceImpl
{
    public class ProductosImpl : ProductosInterface
    {

        private DataBaseImpl _dBImpl;

        public ProductosImpl(DataBaseImpl dBImpl)
        {
            _dBImpl = dBImpl;
        }

        // METODO PARA OBTENER TODOS LOS PRODUCTOS
        public Response getAllProducts()
        {
            Response response = new Response();

            try
            {
                // Creamos una lista de productos para almacenar los productos existentes de la base de datos
                List<Producto> ListaProductos = new List<Producto>();

                // Se hace la consulta al a base de datos
                DataTable dt = (DataTable)_dBImpl.getDataList("SELECT * FROM Productos");

                // Si la tabla no tiene datos otorgara un estado 404
                if (dt.Rows.Count == 0 || dt is null)
                {

                    response.statusCode = 404;
                    response.message = "No se encontraron datos";
                    response.data = null;
                    return response;

                }

                // Se igualan los valores de la base de datos con el modelo y se añade a la lista.
                for (int i = 0; i < dt.Rows.Count; i++)
                {

                    Producto producto = new Producto();

                    producto.id = Convert.ToInt32(dt.Rows[i]["id"]);
                    producto.nombre = dt.Rows[i]["nombre"].ToString();
                    producto.descripcion = dt.Rows[i]["descripcion"].ToString();
                    producto.precio = Convert.ToInt32(dt.Rows[i]["precio"]);
                    producto.cantidad = Convert.ToInt32(dt.Rows[i]["cantidad"]);

                    ListaProductos.Add(producto);

                }

                // Si la lista de los productos no tiene datos nos devolverá un estado 404
                if (ListaProductos.Count == 0)
                {

                    response.statusCode = 404;
                    response.message = "No se encontraron datos";
                    response.data = null;
                    return response;

                }

                // Si todo va bien y tanto la tabla como la lista tienen datos para mostrar se retornará la lista de los productos
                // y también devuelve un código 200.
                response.statusCode = 200;
                response.message = "Exito";
                response.data = ListaProductos;
                return response;

            }

            // En el caso de alguna excepción nos dirigirá aqui y devolvera este response.
            catch (Exception ex)
            {

                response.statusCode = 500;
                response.message = ex.Message;
                response.data = null;
                return response;

            }

        }

        // METODO PARA OBTENER UN PRODUCTO
        public Response getProduct(int id) 
        {
            Response response = new Response();

            Producto productoBuscado = new Producto();

            try
            {
                DataTable dt = (DataTable)_dBImpl.getDataList("SELECT * FROM Productos WHERE id = " + id);

                if (dt.Rows.Count == 0 || dt is null)
                {

                    response.statusCode = 404;
                    response.message = "No se encontraron datos";
                    response.data = null;
                    return response;

                }


                productoBuscado.id = Convert.ToInt32(dt.Rows[0]["id"]);
                productoBuscado.nombre = dt.Rows[0]["nombre"].ToString();
                productoBuscado.descripcion = dt.Rows[0]["descripcion"].ToString();
                productoBuscado.precio = Convert.ToInt32(dt.Rows[0]["precio"]);
                productoBuscado.cantidad = Convert.ToInt32(dt.Rows[0]["cantidad"]);

                response.statusCode = 200;
                response.message = "Exito";
                response.data = productoBuscado;
                return response;

            }
            catch (Exception ex)
            {

                response.statusCode = 500;
                response.message = ex.Message;
                response.data = null;
                return response;

            }
        }

        // METODO REUTILIZABLE DE RESPUESTA PARA AGREGAR, ACTUALIZAR O ELIMINAR PRODUCTOS
        public Response executeQuery(string query)
        {
            Response response = new Response();

            try
            {
                int rowAffected = _dBImpl.addUpdateDeleteData(query);

                if (rowAffected == 0)
                {
                    response.statusCode = 500;
                    response.message = "No se encontraron registros";
                    response.data = null;
                    return response;
                }

                response.statusCode = 200;
                response.message = "Exito";
                response.data = null;
                return response;

            }
            catch (Exception ex)
            {
                response.statusCode = 500;
                response.message = ex.Message;
                response.data = null;
                return response;
            }
        }

        // METODO PARA AÑADIR PRODUCTOS
        public Response postProduct(Producto producto)
        {
            try
            {
                String query = "INSERT INTO Productos (nombre, descripcion, precio, cantidad) VALUES ('"
                + producto.nombre + "', '" + producto.descripcion + "', " + producto.precio + ", " + producto.cantidad + ")";

                return executeQuery(query);

            }
            catch (Exception ex) {

                Response response = new Response();
                response.statusCode = 500;
                response.message = "No se pudieron obtener datos: " + ex.Message;
                response.data = null;
                return response;

            }
        }

        // METODO PARA ACTUALIZAR PRODUCTOS
        public Response putProduct(int id, Producto producto)
        {
            try
            {
                String query = "UPDATE Productos SET nombre = '" + producto.nombre + "', descripcion = '"
                    + producto.descripcion + "', precio = " + producto.precio + ", cantidad = " + producto.cantidad +
                    " WHERE id = " + id;
                return executeQuery(query);
            }
            catch (Exception ex) 
            {
                Response response = new Response();
                response.statusCode = 500;
                response.message = "No se pudieron obtener datos: " + ex.Message;
                response.data = null;
                return response;
            }
        }
    
        // METODO PARA ELIMINAR PRODUCTOS
        public Response deleteProduct(int id)
        {
            String query = "DELETE FROM Productos WHERE id =" + id;

            return executeQuery(query);
        }

        // METODO PARA DESCONTAR STOCK
        public Response descontarStock(int id, Producto producto)
        {

            try
            {

                DataTable dt = (DataTable)_dBImpl.getDataList("SELECT * FROM Productos WHERE id = " + id);

                DataRow filaProducto = dt.Rows[0];
                int cantidad = Convert.ToInt32(filaProducto["cantidad"]);

                if (producto.cantidad > cantidad) 
                {

                    Response response = new Response();
                    response.statusCode = 404;
                    response.message = "Cantidad de descuento es mayor al Stock";
                    response.data = null;
                    return response;


                }

                int descuento = cantidad - producto.cantidad;

                Console.WriteLine(descuento);

                String query = "UPDATE productos SET cantidad = " + descuento + "WHERE id = " + id;
                return executeQuery(query);

            }
            catch (Exception ex) 
            {

                Response response = new Response();
                response.statusCode = 500;
                response.message = "No se pudieron obtener datos: " + ex.Message;
                response.data = null;
                return response;

            }

        }

    }
}
