namespace OrdersManagement.DTO
{
    public class OrderDTO
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
    }
}