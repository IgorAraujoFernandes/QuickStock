using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Data.SQLite;

namespace BackEnd.Models;
 
 public class Product
 {

    public Product() 
    { }

    public Product( string name, string desc, int price, int quant, int av)
    {
        Name = name;
        Description = desc;
        Price = price;
        Quantity = quant;
        Avaliable = av;
    }  
   
     public int Id { get; set; }
     public string Name { get; set; } = string.Empty;
     public string Description { get; set; } = string.Empty;
     public int Price { get; set; }
     public int Quantity { get; set; }
     public int Avaliable { get; set; }

    public override string ToString()
    {
        return JsonSerializer.Serialize(this);
    }
}