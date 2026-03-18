using Microsoft.EntityFrameworkCore;
using PerformanceApi.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar la conexión a PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 2. Bucle de espera para la Base de Datos (Evita que la API muera al arrancar)
for (int i = 0; i < 10; i++)
{
    try
    {
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.EnsureCreated();
            Console.WriteLine("✅ Conexión exitosa: La base de datos está lista.");
        }
        break; // Éxito, salimos del bucle
    }
    catch (Exception ex)
    {
        Console.WriteLine($"⏳ Intento {i + 1}/10: Esperando a PostgreSQL...");
        if (i == 9) throw; // Si falla tras 10 intentos, cierra la app
        Thread.Sleep(3000); // Espera 3 segundos
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();