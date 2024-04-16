using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Grpc.Net.Client;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using System.Threading.Channels;

namespace ClientService.Services
{
    public class PowerService:IPowerService
    {
        private readonly ClientService.PowerService.PowerServiceClient _client;

        public PowerService(ClientService.PowerService.PowerServiceClient client)
        {
            _client = client;
        }

        public async Task<List<FieldResponse>> GetFieldForPeriod(FieldPeriod fieldPeriod)
        {
            List<FieldResponse> responses = new List<FieldResponse>();
            try
            {
                var call=_client.GetFieldForPeriod(fieldPeriod);
                await foreach(var resp in call.ResponseStream.ReadAllAsync())
                {
                    responses.Add(resp);
                }
                return responses;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<AllFieldResponse>> GetAllFieldsForPeriod(Period period)
        {
            List<AllFieldResponse> responses = new List<AllFieldResponse>();
            try
            {
                var call = _client.GetAllFieldsForPeriod(period);
                await foreach (var resp in call.ResponseStream.ReadAllAsync())
                {
                    responses.Add(resp);
                }
                return responses;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ResponseCode> AddMeasurement(AllFieldsValue measurement)
        {
            try
            {
                var response=await _client.AddMeasurementAsync(measurement);
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ResponseCode> AddBulkMeasurements(Bulk measurements)
        {
            try
            {
                var response = await _client.AddBulkMeasurementsAsync(measurements);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public async Task<ResponseCode> AddFieldToOutput(UpdateFieldObject updateObject)
        {
            try
            {
                var response = await _client.AddFieldToOutputAsync(updateObject);
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ResponseCode> UpdateField([FromBody] UpdateFieldObject updateFieldObject)
        {
            try
            {
                var response = await _client.UpdateFieldAsync(updateFieldObject);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<ResponseCode> DeleteTimestamp([FromBody] TimeStamp timestamp)
        {
            try
            {
                var response = await _client.DeleteTimestampAsync(timestamp);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<ResponseCode> DeleteRange([FromBody] Period period)
        {
            try
            {
                var response = await _client.DeleteRangeAsync(period);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<FieldResponse> MinFieldForPeriod(FieldPeriod fieldPeriod)
        {
            try
            {
                var response = await _client.MinFieldForPeriodAsync(fieldPeriod);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<AllFieldValueResponse> MinAllFieldsForPeriod(Period period)
        {
            try
            {
                var response = await _client.MinAllFieldsForPeriodAsync(period);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<FieldResponse> MaxFieldForPeriod(FieldPeriod fieldPeriod)
        {
            try
            {
                var response = await _client.MaxFieldForPeriodAsync(fieldPeriod);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<AllFieldValueResponse> MaxAllFieldsForPeriod(Period period)
        {
            try
            {
                var response = await _client.MaxAllFieldsForPeriodAsync(period);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }



        public async Task<FieldValue> AvgFieldForPeriod(FieldPeriod fieldPeriod)
        {
            try
            {
                var response = await _client.AvgFieldForPeriodAsync(fieldPeriod);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<AllFieldValueResponse> AvgAllFieldsForPeriod(Period period)
        {
            try
            {
                var response = await _client.AvgAllFieldsForPeriodAsync(period);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<FieldValue> SumFieldForPeriod(FieldPeriod fieldPeriod)
        {
            try
            {
                var response = await _client.SumFieldForPeriodAsync(fieldPeriod);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<AllFieldValueResponse> SumAllFieldsForPeriod(Period period)
        {
            try
            {
                var response = await _client.SumAllFieldsForPeriodAsync(period);
                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
