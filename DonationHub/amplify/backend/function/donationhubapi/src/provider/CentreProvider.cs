using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.S3;
using System.Collections.Generic;
using System;

namespace donationhubapi
{
 public class CentreProvider : ICentreProvider
    {
        private readonly IAmazonDynamoDB dynamoDB;
        public CentreProvider (IAmazonDynamoDB dynamoDB){
            this.dynamoDB = dynamoDB;
        }

        public async Task<CentreModel[]> GetAllCentresAsync()
        {
            // dynamoDB.ScanAsync used to get All
            // dynamoDB.GetItemAsync used to get single response
            // dynamoDB.BatchGetItemAsync used to get multiple response
            var result = await dynamoDB.ScanAsync(new ScanRequest{
                TableName = "centres-dev",
                // ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                //     {":userEmail", new AttributeValue { S = "createandupload@gmail.com" }},
                //     {":userPassword", new AttributeValue { S = "createandupload" }},
                // },
                // FilterExpression = "userEmail = :userEmail AND userPassword = :userPassword",
            });

            if (result != null && result.Items != null){
                var centres = new  List<CentreModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("centreID", out var centreID);
                    item.TryGetValue("centreName", out var centreName);
                    item.TryGetValue("centreAddress", out var centreAddress);
                    item.TryGetValue("centreCoordinate", out var centreCoordinate);
                    item.TryGetValue("centreDescription", out var centreDescription);
                    item.TryGetValue("centreStatus", out var centreStatus);
                    item.TryGetValue("createdTime", out var createdTime);
                    
                    centres.Add(new CentreModel{
                        centreID = centreID?.S,
                        centreName = centreName?.S,
                        centreAddress = centreAddress?.S,
                        centreCoordinate = centreCoordinate?.SS,
                        centreDescription = centreDescription?.S,
                        centreStatus = centreStatus?.S,
                        createdTime = createdTime?.S
                    });
                }
                return centres.ToArray();
            }
            return Array.Empty<CentreModel>();
        }

        public async Task<CentreModel[]> GetSelectedCentresAsync(String selectedCentreID)
        {
            // dynamoDB.ScanAsync used to get All
            // dynamoDB.GetItemAsync used to get single response
            // dynamoDB.BatchGetItemAsync used to get multiple response
            var result = await dynamoDB.ScanAsync(new ScanRequest{
                TableName = "centres-dev",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":centreID", new AttributeValue { S = selectedCentreID }},
                },
                FilterExpression = "centreID = :centreID",
            });

            if (result != null && result.Items != null){
                var centres = new  List<CentreModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("centreID", out var centreID);
                    item.TryGetValue("centreName", out var centreName);
                    item.TryGetValue("centreAddress", out var centreAddress);
                    item.TryGetValue("centreCoordinate", out var centreCoordinate);
                    item.TryGetValue("centreDescription", out var centreDescription);
                    item.TryGetValue("centreStatus", out var centreStatus);
                    item.TryGetValue("createdTime", out var createdTime);
                    
                    centres.Add(new CentreModel{
                        centreID = centreID?.S,
                        centreName = centreName?.S,
                        centreAddress = centreAddress?.S,
                        centreCoordinate = centreCoordinate?.SS,
                        centreDescription = centreDescription?.S,
                        centreStatus = centreStatus?.S,
                        createdTime = createdTime?.S
                    });
                }
                return centres.ToArray();
            }
            return Array.Empty<CentreModel>();
        }

        
    }
}