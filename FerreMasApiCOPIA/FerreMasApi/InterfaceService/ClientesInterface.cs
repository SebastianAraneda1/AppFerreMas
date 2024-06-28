using FerreMasApi.Models;

namespace FerreMasApi.InterfaceService
{
    public interface ClientesInterface
    {
        public Response getAllClients();

        public Response getClient(int id);

        public Response putClient(int id, Cliente cliente);

        public Response deleteClient(int id);

        public Response postClient(Cliente cliente);
    }
}
