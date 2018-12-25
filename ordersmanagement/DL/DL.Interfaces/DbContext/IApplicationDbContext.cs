using System;
using System.Collections.Generic;
using System.Text;
using DL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DL.Interfaces.DbContext
{
    public interface IApplicationDbContext: IDbContext
    {
        DbSet<Order> Orders { set; get; }
    }
}
