using System.Threading.Tasks;
using System;
namespace donationhubapi
{
    public interface ICentreProvider
    {
        Task<CentreModel[]> GetAllCentresAsync();
        Task<CentreModel[]> GetSelectedCentresAsync(String selectedCentreID);
        // Task<bool> CreateUserAsync(UserModel user);
    }
}