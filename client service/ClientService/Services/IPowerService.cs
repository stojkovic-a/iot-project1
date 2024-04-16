using Microsoft.AspNetCore.Mvc;

namespace ClientService.Services
{
    public interface IPowerService
    {

        public Task<List<FieldResponse>> GetFieldForPeriod(FieldPeriod period);
        public Task<List<AllFieldResponse>> GetAllFieldsForPeriod(Period period);
        public Task<ResponseCode> AddMeasurement(AllFieldsValue measurement);

        public Task<ResponseCode> AddBulkMeasurements(Bulk measurements);

        public Task<ResponseCode> AddFieldToOutput(UpdateFieldObject updateObject);
        public Task<ResponseCode> UpdateField([FromBody] UpdateFieldObject updateFieldObject);

        public Task<ResponseCode> DeleteTimestamp([FromBody] TimeStamp timestamp);

        public Task<ResponseCode> DeleteRange([FromBody] Period period);

        public Task<FieldResponse> MinFieldForPeriod(FieldPeriod fieldPeriod);

        public Task<AllFieldValueResponse> MinAllFieldsForPeriod(Period period);

        public Task<FieldResponse> MaxFieldForPeriod(FieldPeriod fieldPeriod);

        public Task<AllFieldValueResponse> MaxAllFieldsForPeriod(Period period);

        public Task<FieldValue> AvgFieldForPeriod(FieldPeriod fieldPeriod);

        public Task<AllFieldValueResponse> AvgAllFieldsForPeriod(Period period);

        public Task<FieldValue> SumFieldForPeriod(FieldPeriod fieldPeriod);

        public Task<AllFieldValueResponse> SumAllFieldsForPeriod(Period period);
    }
}
