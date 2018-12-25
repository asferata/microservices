using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DL.Migrations.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    UpdateDate = table.Column<DateTime>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    Title = table.Column<string>(maxLength: 500, nullable: true),
                    Amount = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "Amount", "CreateDate", "Title", "UpdateDate", "UserId" },
                values: new object[,]
                {
                    { 1, 1056.45m, new DateTime(2018, 12, 25, 19, 3, 50, 258, DateTimeKind.Utc).AddTicks(6997), "New Year's Presents", null, "101" },
                    { 2, 498.21m, new DateTime(2018, 12, 25, 19, 3, 50, 258, DateTimeKind.Utc).AddTicks(7521), "Table", null, "202" },
                    { 3, 381.02m, new DateTime(2018, 12, 25, 19, 3, 50, 258, DateTimeKind.Utc).AddTicks(7525), "Chair", null, "5c20cf2275330c7821d6237c" },
                    { 4, 160.45m, new DateTime(2018, 12, 25, 19, 3, 50, 258, DateTimeKind.Utc).AddTicks(7529), "Shoes", null, "5c20cf3b75330c7821d6237d" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
