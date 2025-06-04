using System;
using Microsoft.EntityFrameworkCore;
using BackEnd.Models;
using System.Collections.Generic;
using Microsoft.Extensions.WebEncoders.Testing;
using BackEnd.Data;
using System.Text.Json;

public class Launcher
{
    public static void Main(string[] args)
    {

        Product product2 = new Product("Suco", "Laranja", 10, 2, 1);

        using var context = new QuickSortContext();

        try
        {

            var select = context.Products.Find(1);
            Console.WriteLine(select);     
        }
        catch(Exception ex)
        {
            Console.WriteLine(ex);
        }
       
    }

}