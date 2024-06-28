using FerreMasApi.Models;

namespace FerreMasApi.InterfaceService
{
    public interface ProductosInterface
    {
        public Response getAllProducts();

        public Response postProduct(Producto producto);

        public Response putProduct(int id, Producto producto);

        public Response deleteProduct(int id);

        public Response descontarStock(int id, Producto producto);

        public Response getProduct(int id);
    }
}
