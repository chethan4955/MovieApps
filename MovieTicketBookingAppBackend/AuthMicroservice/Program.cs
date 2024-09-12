
using AuthMicroservice.Middleware;
using Microsoft.EntityFrameworkCore;
using System.Text;


using AuthMicroservice.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace AuthMicroservice
{
    public class Program
    {
      
            public static void Main(string[] args)
            {
                var builder = WebApplication.CreateBuilder(args);

                // Add services to the container.
                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen();

                IConfiguration configuration = new ConfigurationBuilder()
                    .AddJsonFile("appsettings.json")
                    .Build();

                builder.Services.AddDbContext<ApplicationDbContext>(options =>
                {
                    options.UseSqlServer(configuration.GetConnectionString("AuthContext"));
                });

                // Configure CORS policy
                builder.Services.AddCors(options =>
                {
                    options.AddPolicy("EnableCors", builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials(); // Use AllowCredentials if you need to allow credentials
                    });
                });

                // Add JWT authentication
                var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
                builder.Services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

                builder.Services.AddControllers();

                var app = builder.Build();

                // Configure the HTTP request pipeline.
                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                app.UseRouting();

                // Use built-in CORS middleware
                app.UseCors("EnableCors");

                app.UseAuthentication();
                app.UseAuthorization();

                app.MapControllers();
                app.Run();
            }
        }
    }
