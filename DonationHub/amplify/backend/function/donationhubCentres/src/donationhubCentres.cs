using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.DynamoDBv2;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

// If you rename this namespace, you will need to update the invocation shim
// to match if you intend to test the function with 'amplify mock function'
namespace donationhubCentres
{
    // If you rename this class, you will need to update the invocation shim
    // to match if you intend to test the function with 'amplify mock function'
    public class donationhubCentres
    {
        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The list of blogs</returns>
        /// <remarks>
        /// If you rename this function, you will need to update the invocation shim
        /// to match if you intend to test the function with 'amplify mock function'
        /// </remarks>
#pragma warning disable CS1998
        public async Task<APIGatewayProxyResponse> LambdaHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            var response = new APIGatewayProxyResponse {
                Headers = new Dictionary<string, string> {
                    { "Access-Control-Allow-Origin", "*" },
                    { "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" }
                }
            };

            string contentType = null;
            request.Headers?.TryGetValue("Content-Type", out contentType);

            switch (request.HttpMethod) {
                case "GET":
                    if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputCentreStatus") && request.QueryStringParameters.ContainsKey("inputCentreID"))
                    {
                        var centreProvider = new CentreProvider(new AmazonDynamoDBClient());
                        var centres = await centreProvider.GetSelectedCentresByStatusAndIDAsync( request.QueryStringParameters["inputCentreID"] ,request.QueryStringParameters["inputCentreStatus"]);
                        return new APIGatewayProxyResponse
                        {
                            StatusCode = 200,
                            Body = JsonConvert.SerializeObject(centres)
                        };
                    }
                    else if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputCentreStatus")){
                        var centreProvider = new CentreProvider(new AmazonDynamoDBClient());
                        var centres = await centreProvider.GetAllCentresByStatusAsync(request.QueryStringParameters["inputCentreStatus"]);
                        return new APIGatewayProxyResponse
                        {
                            StatusCode = 200,
                            Body = JsonConvert.SerializeObject(centres)
                        };
                    } 
                    else if (request.QueryStringParameters == null){
                        var centreProvider = new CentreProvider(new AmazonDynamoDBClient());
                        var centres = await centreProvider.GetAllCentresByStatusAsync("Active");
                        return new APIGatewayProxyResponse
                        {
                            StatusCode = 200,
                            Body = JsonConvert.SerializeObject(centres)
                        };
                    }
                    
                     
                    break;
                case "POST":
                    var centre = JsonConvert.DeserializeObject<CentreModel>(request.Body);
                    if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputCurrentCentreStatus") && request.QueryStringParameters.ContainsKey("inputCentreID"))
                    {
                        if (centre == null){
                        return new APIGatewayProxyResponse {StatusCode = 400};
                        }
                        else if (centre != null)
                        {
                            var centreProvider = new CentreProvider(new AmazonDynamoDBClient());
                            if (await centreProvider.AddNewCentreAsync(centre))
                            {
                                if (await centreProvider.DeleteSelectedCentresByStatusAndIDAsync(request.QueryStringParameters["inputCentreID"],request.QueryStringParameters["inputCurrentCentreStatus"]))
                                {
                                    return new APIGatewayProxyResponse 
                                    { 
                                        StatusCode = 200
                                    };
                                }
                                else{
                                    return new APIGatewayProxyResponse
                                    {
                                        StatusCode = 400
                                    };
                                }
                            }
                            else
                            {
                                return new APIGatewayProxyResponse
                                {
                                    StatusCode = 400
                                };
                            }
                        }
                    } else if(request.QueryStringParameters == null)
                    {
                        if (centre == null){
                            return new APIGatewayProxyResponse {StatusCode = 400};
                        }
                        else if (centre != null)
                        {
                            var addCentre = new CentreProvider(new AmazonDynamoDBClient());
                            if (await addCentre.AddNewCentreAsync(centre))
                            {
                                return new APIGatewayProxyResponse 
                                { 
                                    StatusCode = 200
                                };
                            }
                            else
                            {
                                return new APIGatewayProxyResponse
                                {
                                    StatusCode = 400
                                };
                            }
                        }
                    }
                    
                    break;
                case "PUT":
                    context.Logger.LogLine($"Put Request: {request.Path}\n");
                    if (!String.IsNullOrEmpty(contentType)) {
                        context.Logger.LogLine($"Content type: {contentType}");
                    }
                    context.Logger.LogLine($"Body: {request.Body}");
                    response.StatusCode = (int)HttpStatusCode.OK;
                    break;
                case "DELETE":
                    if(request.QueryStringParameters != null && request.QueryStringParameters.ContainsKey("inputCentreStatus") && request.QueryStringParameters.ContainsKey("inputCentreID"))
                    {
                        var centreProvider = new CentreProvider(new AmazonDynamoDBClient());
                        if (await centreProvider.DeleteSelectedCentresByStatusAndIDAsync(request.QueryStringParameters["inputCentreID"],request.QueryStringParameters["inputCentreStatus"]))
                        {
                            return new APIGatewayProxyResponse 
                            { 
                                StatusCode = 200
                            };
                        }
                        else{
                            return new APIGatewayProxyResponse
                            {
                                StatusCode = 400
                            };
                        }
                        
                    } 
                    break;
                default:
                    context.Logger.LogLine($"Unrecognized verb {request.HttpMethod}\n");
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    break;
            }

            return response;
        }
    }
}
