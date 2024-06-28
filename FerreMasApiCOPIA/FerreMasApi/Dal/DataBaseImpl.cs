using System.Data;
using System.Data.SqlClient;

namespace FerreMasApi.Dal
{
    public class DataBaseImpl
    {
        public IConfiguration _configuration;

        public DataBaseImpl(IConfiguration _configuration)
        {
            this._configuration = _configuration;
        }

        // Creamos funcion para obtener todos los datos de la base de datos en una lista
        public Object getDataList(String query)
        {

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("FerreMasCon")))
            {

                SqlDataAdapter dataAdapter = new SqlDataAdapter(query, connection);

                DataTable table = new DataTable();

                dataAdapter.Fill(table);

                List<Object> lista = new List<Object>();

                if (table.Rows.Count == 0)
                {
                    return null;
                }

                return table;

            }
        }

        public int addUpdateDeleteData(string query)
        {
            try
            {
                int rowsAffected = 0;

                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("FerreMasCon")))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        rowsAffected = command.ExecuteNonQuery();
                    }
                }

                return rowsAffected;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
