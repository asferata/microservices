namespace ShopFront.DTO 
{
    public class OrderDTO
    {
        public long Id { get; set; }
        public UserDTO User { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
    }
}