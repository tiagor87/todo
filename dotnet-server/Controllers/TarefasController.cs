using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnet_server.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace dotnet_server.Controllers
{
    [Route("api/[controller]")]
    public class TarefasController : Controller
    {
        // GET api/tarefas
        [HttpGet]
        public IEnumerable<BsonDocument> Get()
        {
            return Tarefa.GetAll();
        }

        // GET api/tarefas/5
        [HttpGet("{id}")]
        public BsonDocument Get(string id)
        {
            return Tarefa.GetById(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/tarefas/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/tarefas/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
