using FerreMasApi.InterfaceService;
using FerreMasApi.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FerreMasApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {

        private ClientesInterface clientesInterface;

        public ClienteController(ClientesInterface clientesInterface)
        {
            this.clientesInterface = clientesInterface;
        }
        // GET: api/<ClienteController>
        [HttpGet]
        [Route("/obtenerClientes")]
        public Response getAllClients()
        {
            return clientesInterface.getAllClients();
        }

        [HttpGet]
        [Route("/obtenerCliente/{id}")]
        public Response getClient(int id)
        {
            return clientesInterface.getClient(id);
        }

        [HttpPost]
        [Route("/añadirCliente")]
        public Response postClient([FromBody] Cliente cliente)
        {
            return clientesInterface.postClient(cliente);
        }

        [HttpPut]
        [Route("/actualizarCliente/{id}")]
        public Response putClient(int id, [FromBody] Cliente cliente)
        {
            return clientesInterface.putClient(id, cliente);
        }

        [HttpDelete]
        [Route("/eliminarCliente/{id}")]
        public Response deleteClient(int id)
        {
            return clientesInterface.deleteClient(id);
        }
    }
}
