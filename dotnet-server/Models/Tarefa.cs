using System;
using System.Collections.Generic;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Linq;

namespace dotnet_server.Models
{
    public class Tarefa {
        private static IMongoClient _client;
        private static IMongoDatabase _database;

        static Tarefa() {
            _client = new MongoClient();
            _database = _client.GetDatabase("Todo");
        }

        public static IEnumerable<BsonDocument> GetAll() {
            var collection =_database.GetCollection<BsonDocument>("Tarefa");
            return collection.Find(new BsonDocument()).ToList();
        }

        public static BsonDocument GetById(string id)
        {
            var collection = _database.GetCollection<BsonDocument>("Tarefa");
            var filter = new BsonDocument("_id", id);
            return collection.Find(filter).FirstOrDefault();
        }
    }
}