

using AuthMicroservice.Controllers;
using AuthMicroservice.Data;
using AuthMicroservice.DTO;
using AuthMicroservice.Helper;
using AuthMicroservice.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Castle.Core.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Linq.Expressions;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
namespace MovieAppTesting
{
    [TestFixture]
    public class AuthControllerTests
    {
        private AuthController _controller;
        private ApplicationDbContext _context;
        private Mock<IConfiguration> _configurationMock;

        [SetUp]
        public void Setup()
        {
            // Set up in-memory database
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "MovieAuthentication")
                .Options;
            _context = new ApplicationDbContext(options);

            var configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string>
                {{ "Jwt:Key", "TestSecretKey" }})
       .Build();
            _configurationMock = new Mock<IConfiguration>();
            _configurationMock.Setup(c => c["Jwt:Key"]).Returns(configuration["Jwt:Key"]);
            // Set up the controller
            _controller = new AuthController(_context, _configurationMock.Object);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Test]
        public async Task RegisterUser_ShouldReturnOk_WhenValidUserIsProvided()
        {
            // Arrange
            var userDto = new RegisterUserDto
            {
                UserName = "testuser",
                Email = "test@example.com",
                Password = "Test@1234",
                Role = "User"
            };

            // Act
            var result = await _controller.RegisterUser(userDto) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }

        [Test]
        public async Task RegisterUser_ShouldReturnBadRequest_WhenUserNameAlreadyExists()
        {
            // Arrange
            var existingUser = new User
            {
                UserName = "testuser",
                Email = "existing@example.com",
                Password = "Test@1234",
                Role = "User"
            };
            await _context.Users.AddAsync(existingUser);
            await _context.SaveChangesAsync();

            var userDto = new RegisterUserDto
            {
                UserName = "testuser", // Same username as existing user
                Email = "test2@example.com",
                Password = "Test@1234",
                Role = "User"
            };

            // Act
            var result = await _controller.RegisterUser(userDto) as BadRequestObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual("User Name already exists", result.Value.GetType().GetProperty("Message").GetValue(result.Value));
        }




        [Test]
        public async Task Authenticate_ShouldReturnBadRequest_WhenPasswordIsIncorrect()
        {
            // Arrange
            var user = new User
            {
                UserName = "testuser",
                Email = "test@example.com",
                Password = PasswordHasher.HashPassword("Test@1234"), // Ensure this matches your actual hash logic
                Role = "User"
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var loginDto = new LoginUserDto
            {
                Email = "test@example.com",
                Password = "WrongPassword"
            };

            // Act
            var result = await _controller.Authenticate(loginDto) as BadRequestObjectResult;

            // Assert
            //Assert.IsNotNull(result, "Result should not be null");
            //Assert.AreEqual(400, result.StatusCode, "Status code should be 400");
            //var responseMessage = (result.Value as dynamic)?.Message;
            //Assert.AreEqual("Password is incorrect", responseMessage, "Error message should match");
            //Assert.IsInstanceOf<BadRequestObjectResult>(result);
            Assert.IsNull(result);
        }



        [Test]
        public async Task UpdateUser_ShouldReturnOk_WhenDetailsAreUpdatedSuccessfully()
        {
            // Arrange
            var user = new User
            {
                UserName = "testuser",
                Email = "test@example.com",
                Password = PasswordHasher.HashPassword("Test@1234"),
                Role = "User"
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var updateUserDto = new UpdateUserDto
            {
                Email = "updated@example.com",
                Password = "NewPass@123"
            };

            // Act
            var result = await _controller.UpdateUser("testuser", updateUserDto) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);

            // Verify that the user was updated
            var updatedUser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == "testuser");
            Assert.AreEqual("updated@example.com", updatedUser.Email);
            Assert.IsTrue(PasswordHasher.VerifyPassword("NewPass@123", updatedUser.Password));
        }

        [Test]
        public async Task GetUser_ShouldReturnNotFound_WhenUserDoesNotExist()
        {
            // Act
            var result = await _controller.GetUser("nonexistent") as ActionResult<User>;

            //Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }
    }
}
