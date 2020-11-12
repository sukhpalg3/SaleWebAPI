using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SaleWebAPI.Models
{
    /// <summary>
    /// This class is represent the Sale Model
    /// </summary>
    public class Sale
    {
        // Primary Key of Sale Model
        [Key]
        public int SaleID { get; set; }

        // Represent Product Name
        [Required]
        [StringLength(200)]
        public string ProductName { get; set; }

        // Represent Quantity Sold
        [Required]
        public int Quantity { get; set; }

        // Sale Date
        [Required]
        public string Date { get; set; }

        [Required]
        public string SoldBy { get; set; }

    }
}
