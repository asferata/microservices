namespace OrdersManagement.DTO
{
    public class OrderDTO
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
    }
}