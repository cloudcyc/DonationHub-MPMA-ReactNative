using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.S3;
using System.Collections.Generic;
using System;



namespace donationhubCentres
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
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "centres-dev",
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
        // search centre by status 
        //example: /centres?inputCentreStatus=Active
        public async Task<CentreModel[]> GetAllCentresByStatusAsync(string inputCentreStatus)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "centres-dev",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":centreStatus", new AttributeValue { S = inputCentreStatus }},
                },
                KeyConditionExpression = "centreStatus = :centreStatus"
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
        // search centre by status and ID
        // example: /centres?inputCentreStatus=Active&inputCentreID=cid0002
        public async Task<CentreModel[]> GetSelectedCentresByStatusAndIDAsync(String inputCentreID, String inputCentreStatus)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "centres-dev",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":centreStatus", new AttributeValue { S = inputCentreStatus }},
                    {":centreID", new AttributeValue { S = inputCentreID }},
                },
                KeyConditionExpression = "centreStatus = :centreStatus AND centreID = :centreID",
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

        //Create New Centre into DynamoDB Table centres-dev 
        public async Task<bool> AddNewCentreAsync (CentreModel centre)
        {
            var request = new PutItemRequest
            {
                TableName = "centres-dev",
                Item = new Dictionary<string, AttributeValue>
                {
                    {"centreID", new AttributeValue(centre.centreID)},
                    {"centreName", new AttributeValue(centre.centreName)},
                    {"centreAddress", new AttributeValue(centre.centreAddress)},
                    {"centreCoordinate", new AttributeValue(centre.centreCoordinate)},
                    {"centreDescription", new AttributeValue(centre.centreDescription)},
                    {"centreStatus", new AttributeValue(centre.centreStatus)},
                    {"createdTime", new AttributeValue(centre.createdTime)},
                }
            };
            var response = await dynamoDB.PutItemAsync(request);
            // var client = new AmazonS3Client();
            // await client.PutObjectAsync (new Amazon.S3.Model.PutObjectRequest
            // {
            //     BucketName = "nics3test8860/DonationHub",
            //     Key = $"{user.userFullname}.txt",
            //     ContentType = "text/plain",
            //     ContentBody = $"I am {user.userFullname}"

            // });
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }

        // Update Centre Status
        public async Task<bool> UpdateCentreStatusAsync (String inputCentreID, String inputCurrentCentreStatus, String inputNewCentreStatus)
        {
            var request = new UpdateItemRequest
            {
                TableName = "centres-dev",
                    Key = new Dictionary<string,AttributeValue>() 
                    {
                         { "centreStatus", new AttributeValue { S = inputCurrentCentreStatus } },
                         { "centreID", new AttributeValue { S = inputCentreID } }
                     },
                     ExpressionAttributeValues = new Dictionary<string, AttributeValue>()
                    {
                        {":inputNewCentreStatus",new AttributeValue {S = inputNewCentreStatus}},
                    },
                    UpdateExpression = "SET centreStatus = :inputNewCentreStatus"
            };
            var response = await dynamoDB.UpdateItemAsync(request);
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }

        // Delete centre by status and ID
        // example: /centres?inputCentreStatus=Active&inputCentreID=cid0002
        public async Task<bool> DeleteSelectedCentresByStatusAndIDAsync(String inputCentreID, String inputCentreStatus){
            var request = new DeleteItemRequest
                {
                    TableName = "centres-dev",
                    Key = new Dictionary<string,AttributeValue>() {
                         { "centreStatus", new AttributeValue { S = inputCentreStatus } },
                         { "centreID", new AttributeValue { S = inputCentreID } }
                     },
                };
            var response = await dynamoDB.DeleteItemAsync(request);
            
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }        

        
    }
}