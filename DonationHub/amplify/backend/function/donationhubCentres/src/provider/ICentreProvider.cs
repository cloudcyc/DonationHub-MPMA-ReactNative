using System.Threading.Tasks;
using System;
namespace donationhubCentres
{
    public interface ICentreProvider
    {
        Task<CentreModel[]> GetAllCentresAsync();
        Task<CentreModel[]> GetAllActiveCentresAsync();
        Task<CentreModel[]> GetSelectedCentresAsync(String selectedCentreID);
        // Task<bool> CreateUserAsync(UserModel user);
    }
}