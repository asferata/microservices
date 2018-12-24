namespace ShopFront.DTO 
{
    public class SimpleOrderDTO
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
    }
}