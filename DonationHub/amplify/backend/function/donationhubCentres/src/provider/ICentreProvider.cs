using System.Threading.Tasks;
using System;
namespace donationhubCentres
{
    public interface ICentreProvider
    {
        Task<CentreModel[]> GetAllCentresAsync();
        Task<CentreModel[]> GetAllCentresByStatusAsync(String inputCentreStatus);
        Task<CentreModel[]> GetSelectedCentresByStatusAndIDAsync(String inputCentreID, String inputCentreStatus);
        Task<bool> AddNewCentreAsync(CentreModel centre);
        Task<bool> DeleteSelectedCentresByStatusAndIDAsync(String inputCentreID, String inputCentreStatus);
        Task<bool> UpdateCentreStatusAsync (String inputCentreID, String inputCurrentCentreStatus, String inputNewCentreStatus);
    }
}