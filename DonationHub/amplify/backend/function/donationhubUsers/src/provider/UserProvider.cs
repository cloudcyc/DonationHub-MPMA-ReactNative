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
    }
}