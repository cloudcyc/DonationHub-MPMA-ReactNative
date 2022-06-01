using System.Threading.Tasks;
using System;
namespace donationhubUsers
{
    public interface IUserProvider
    {
    //    Task<UserModel[]> GetUserByEmailAndPasswordAsync(string inputUserEmail);
       Task<UserModel[]> GetUserByEmailAndPasswordAsync(string inputUserEmail, string inputUserPassword);
       Task<UserModel[]> GetUserByIDAsync(string inputUserID);
    
    }
}