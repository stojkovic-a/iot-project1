using ClientService.Models;
using ClientService.Services;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace ClientService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PowerController : ControllerBase
    {
        private readonly IPowerService _powerService;

        public PowerController(IPowerService powerService)
        {
            _powerService = powerService;
        }


        [HttpGet("GetFieldForPeriod")]
        public async Task<ActionResult> GetFieldForPeriod(
            [FromQuery] string field,
            [FromQuery] DateTime from,
            [FromQuery] DateTime? to=null
            )
        {
            try
            {
                FieldPeriod fieldPeriod = new FieldPeriod()
                {
                    Field = field,
                    Period = new Period()
                    {
                        From = from.ToString("O", CultureInfo.InvariantCulture),
                        To = to == null ? null : to?.ToString("O", CultureInfo.InvariantCulture)
                    }
                };

                var response = await _powerService.GetFieldForPeriod(fieldPeriod);
                return Ok(response);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("GetAllFieldsForPeriod")]
        public async Task<ActionResult> GetAllFieldsForPeriod(
           [FromQuery] DateTime from,
           [FromQuery] DateTime? to=null
           )
        {
            try
            {
                Period period = new Period()
                {
                    From = from.ToString("O", CultureInfo.InvariantCulture),
                    To = to == null ? null : to?.ToString("O", CultureInfo.InvariantCulture)
                };

                var response = await _powerService.GetAllFieldsForPeriod(period);
                return Ok(response);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("AddMeasurement")]
        public async Task<ActionResult> AddMeasurement([FromBody] AllFieldsValue measurement)
        {
            try
            {
                var response = await _powerService.AddMeasurement(measurement);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddBulkMeasurements")]
        public async Task<ActionResult> AddBulkMeasurements([FromBody] Bulk measurements)
        {
            try
            {
                var response = await _powerService.AddBulkMeasurements(measurements);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("AddFieldToOutput")]
        public async Task<ActionResult> AddFieldToOutput(
            [FromQuery] string timeStamp,
            [FromQuery] string field,
            [FromQuery] string value)
        {
            try
            {
                var response = await _powerService.AddFieldToOutput(
                    new UpdateFieldObject()
                    {
                        Field = field,
                        TimeStamp = timeStamp,
                        Value = value
                    });

                return Ok(response);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateField")]
        public async Task<ActionResult> UpdateField([FromBody] UpdateFieldObject updateFieldObject)
        {
            try
            {
                var response = await _powerService.UpdateField(updateFieldObject);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteTimestamp")]
        public async Task<ActionResult> DeleteTimestamp([FromBody] TimeStamp timestamp)
        {
            try
            {
                var response=await _powerService.DeleteTimestamp(timestamp);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteRange")]
        public async Task<ActionResult> DeleteRange([FromBody] Period period)
        {
            try
            {
                var response = await _powerService.DeleteRange(period);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("MinFieldForPeriod")]
        public async Task<ActionResult> MinFieldForPeriod(
            [FromQuery] string field,
            [FromQuery] string from,
            [FromQuery] string? to=null)
        {
            try
            {
                var fieldPeriod = new FieldPeriod()
                {
                    Field = field,
                    Period = new Period()
                    {
                        From = from,
                        To = to
                    }
                };

                var response = await _powerService.MinFieldForPeriod(fieldPeriod);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpGet("MinAllFieldsForPeriod")]
        public async Task<ActionResult> MinAllFieldsForPeriod(
          [FromQuery] string from,
          [FromQuery] string? to=null)
        {
            try
            {
                var period = new Period()
                {
                    From = from,
                    To = to
                };

                var response = await _powerService.MinAllFieldsForPeriod(period);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("MaxFieldForPeriod")]
        public async Task<ActionResult> MaxFieldForPeriod(
          [FromQuery] string field,
          [FromQuery] string from,
          [FromQuery] string? to = null)
        {
            try
            {
                var fieldPeriod = new FieldPeriod()
                {
                    Field = field,
                    Period = new Period()
                    {
                        From = from,
                        To = to
                    }
                };

                var response = await _powerService.MaxFieldForPeriod(fieldPeriod);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpGet("MaxAllFieldsForPeriod")]
        public async Task<ActionResult> MaxAllFieldsForPeriod(
          [FromQuery] string from,
          [FromQuery] string? to=null)
        {
            try
            {
                var period = new Period()
                {
                    From = from,
                    To = to
                };

                var response = await _powerService.MaxAllFieldsForPeriod(period);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("AvgFieldForPeriod")]
        public async Task<ActionResult> AvgFieldForPeriod(
        [FromQuery] string field,
        [FromQuery] string from,
        [FromQuery] string? to = null)
        {
            try
            {
                var fieldPeriod = new FieldPeriod()
                {
                    Field = field,
                    Period = new Period()
                    {
                        From = from,
                        To = to
                    }
                };

                var response = await _powerService.AvgFieldForPeriod(fieldPeriod);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpGet("AvgAllFieldsForPeriod")]
        public async Task<ActionResult> AvgAllFieldsForPeriod(
          [FromQuery] string from,
          [FromQuery] string? to=null)
        {
            try
            {
                var period = new Period()
                {
                    From = from,
                    To = to
                };

                var response = await _powerService.AvgAllFieldsForPeriod(period);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("SumFieldForPeriod")]
        public async Task<ActionResult> SumFieldForPeriod(
        [FromQuery] string field,
        [FromQuery] string from,
        [FromQuery] string? to = null)
        {
            try
            {
                var fieldPeriod = new FieldPeriod()
                {
                    Field = field,
                    Period = new Period()
                    {
                        From = from,
                        To = to
                    }
                };

                var response = await _powerService.SumFieldForPeriod(fieldPeriod);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpGet("SumAllFieldsForPeriod")]
        public async Task<ActionResult> SumAllFieldsForPeriod(
          [FromQuery] string from,
          [FromQuery] string? to=null)
        {
            try
            {
                var period = new Period()
                {
                    From = from,
                    To = to
                };

                var response = await _powerService.SumAllFieldsForPeriod(period);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
