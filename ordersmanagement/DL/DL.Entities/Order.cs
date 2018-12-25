using System;
using DL.Entities.Base;

namespace DL.Entities
{
    public class Order: BaseEntity
    {
        public string UserId { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
    }
}
