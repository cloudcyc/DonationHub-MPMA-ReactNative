using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.S3;
using System.Collections.Generic;
using System;
using System.Text;
using System.IO;
using SixLabors.ImageSharp;

namespace donationhubUsers
{
 public class UserProvider : IUserProvider
    {
        private readonly IAmazonDynamoDB dynamoDB;
        public UserProvider (IAmazonDynamoDB dynamoDB){
            this.dynamoDB = dynamoDB;
        }

        // search centre by status 
        //example: /centres?inputCentreStatus=Active
        // 
        // public async Task<UserModel[]> GetUserByEmailAndPasswordAsync(string inputUserEmail)
        public async Task<UserModel[]> GetUserByEmailAndPasswordAsync(string inputUserEmail, string inputUserPassword)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "users-dev",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":userEmail", new AttributeValue { S = inputUserEmail }},
                    {":userPassword", new AttributeValue { S = inputUserPassword }},
                },
                KeyConditionExpression = "userEmail = :userEmail",
                FilterExpression = "userPassword = :userPassword"
            });

            if (result != null && result.Items != null){
                var user = new  List<UserModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("userID", out var userID);
                    item.TryGetValue("userEmail", out var userEmail);
                    item.TryGetValue("userFullname", out var userFullname);
                    item.TryGetValue("userPassword", out var userPassword);
                    item.TryGetValue("userDoB", out var userDoB);
                    item.TryGetValue("createdTime", out var createdTime);
                    
                    user.Add(new UserModel{
                        userID = userID?.S,
                        userEmail = userEmail?.S,
                        userFullname = userFullname?.S,
                        userPassword = userPassword?.S,
                        userDoB = userDoB?.S,
                        createdTime = createdTime?.S
                    });
                }
                return user.ToArray();
            }
            return Array.Empty<UserModel>();
        }
    }
}