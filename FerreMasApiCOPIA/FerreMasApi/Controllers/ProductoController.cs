using FerreMasApi.InterfaceService;
using FerreMasApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FerreMasApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {

        private ProductosInterface productosInterface;

        public ProductoController(ProductosInterface productosInterface)
        {
            this.productosInterface = productosInterface;
        }

        // OBTENER TODOS LOS PRODUCTOS
        [HttpGet]
        [Route("/obtenerProductos")]
        public Response getAllProducts()
        {
            return productosInterface.getAllProducts();
        }

        [HttpGet]
        [Route("/obtenerProducto/{id}")]
        public Response getProduct(int id)
        {
            return productosInterface.getProduct(id);
        }

        // AÑADIR PRODUCTOS
        [HttpPost]
        [Route("/añadirProducto")]
        public Response postProduct([FromBody] Producto producto)
        {
            return productosInterface.postProduct(producto);
        }

        // ACTUALIZAR PRODUCTOS
        [HttpPut]
        [Route("/actualizarProducto/{id}")]
        public Response putProduct(int id, [FromBody] Producto producto) 
        { 
            return productosInterface.putProduct(id, producto);
        }

        [HttpDelete]
        [Route("/eliminarProducto/{id}")]
        public Response deleteProduct(int id) 
        {
            return productosInterface.deleteProduct(id);
        }

        [HttpPut]
        [Route("/descontarStock/{id}")]
        public Response descontarStock(int id, [FromBody] Producto producto)
        {
            return productosInterface.descontarStock(id, producto);
        }

    }
}
