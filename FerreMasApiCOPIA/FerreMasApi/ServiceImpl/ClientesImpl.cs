using FerreMasApi.Dal;
using FerreMasApi.InterfaceService;
using FerreMasApi.Models;
using System.Data;

namespace FerreMasApi.ServiceImpl
{
    public class ClientesImpl : ClientesInterface
    {

        private DataBaseImpl _dBImpl;

        public ClientesImpl(DataBaseImpl dBImpl)
        {
            _dBImpl = dBImpl;
        }

        // METODO PARA OBTENER TODOS LOS CLIENTES
        public Response getAllClients()
        {
            Response response = new Response();

            try
            {
                // Creamos una lista de productos para almacenar los productos existentes de la base de datos
                List<Cliente> ListaClientes = new List<Cliente>();

                // Se hace la consulta al a base de datos
                DataTable dt = (DataTable)_dBImpl.getDataList("SELECT * FROM Clientes");

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

                    Cliente cliente = new Cliente();

                    cliente.id = Convert.ToInt32(dt.Rows[i]["id"]);
                    cliente.nombre = dt.Rows[i]["nombre"].ToString();
                    cliente.rut = dt.Rows[i]["rut"].ToString(); ;
                    cliente.direccion = dt.Rows[i]["direccion"].ToString(); ;
                    cliente.correo = dt.Rows[i]["correo"].ToString();

                    ListaClientes.Add(cliente);

                }

                // Si la lista de los productos no tiene datos nos devolverá un estado 404
                if (ListaClientes.Count == 0)
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
                response.data = ListaClientes;
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

        // METODO PARA OBTENER UN CLIENTE
        public Response getClient(int id)
        {

            Response response = new Response();

            Cliente clienteBuscado = new Cliente();

            try
            {
                DataTable dt = (DataTable)_dBImpl.getDataList("SELECT * FROM Clientes WHERE id = " + id);

                if (dt.Rows.Count == 0 || dt is null)
                {

                    response.statusCode = 404;
                    response.message = "No se encontraron datos";
                    response.data = null;
                    return response;

                }

                clienteBuscado.id = Convert.ToInt32(dt.Rows[0]["id"]);
                clienteBuscado.nombre = dt.Rows[0]["nombre"].ToString();
                clienteBuscado.rut = dt.Rows[0]["rut"].ToString(); ;
                clienteBuscado.direccion = dt.Rows[0]["direccion"].ToString(); ;
                clienteBuscado.correo = dt.Rows[0]["correo"].ToString();

                response.statusCode = 200;
                response.message = "Exito";
                response.data = clienteBuscado;
                return response;

            }
            catch(Exception ex)
            {

                response.statusCode = 500;
                response.message = ex.Message;
                response.data = null;
                return response;

            }

        }

        // METODO REUTILIZABLE DE RESPUESTA PARA AGREGAR, ACTUALIZAR O ELIMINAR CLIENTES
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

        // METODO PARA AÑADIR CLIENTES
        public Response postClient(Cliente cliente)
        {
            try
            {
                String query = "INSERT INTO Clientes (nombre, rut, direccion, correo) VALUES ('"
                + cliente.nombre + "', '" + cliente.rut + "', '" + cliente.direccion + "', '" + cliente.correo + "')";

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

        // METODO PARA ACTUALIZAR CLIENTES
        public Response putClient(int id, Cliente cliente)
        {
            try
            {
                String query = "UPDATE Clientes SET nombre = '" + cliente.nombre + "', rut = '"
                    + cliente.rut + "', direccion = '" + cliente.direccion + "', correo = '" + cliente.correo +
                    "' WHERE id = " + id;
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

        // METODO PARA ELIMINAR CLIENTES
        public Response deleteClient(int id)
        {
            String query = "DELETE FROM Clientes WHERE id = " + id;

            return executeQuery(query);
        }
    }
}
