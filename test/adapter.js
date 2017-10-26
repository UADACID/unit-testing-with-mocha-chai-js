var expect    = require("chai").expect;
var adapter = require("../app/adapter");

describe("GraphQl filter Adapter", function() {
  describe("normal filter", function() {
    it("adapted to sequelize object", function() {

      const graphQlObj = {
        name: "asd",
        age_gt: 1,
        age_lt: 10,
        tags_in: ["bcl","abc"],
        family_not_startswith: "b"
      }

      const result = {
        name:"asd",
        age:{
          gt:1,lt:10
        },
        tags:{
          in:["bcl","abc"]
        },
        family:{
          notLike:"b"
        }
      }

      var normalFilter   = adapter.graphQlToSequelize(graphQlObj);

      expect(normalFilter).to.deep.equal(result);
    });
  });

  describe("or filter", function() {
    it("adapted to sequelize object", function() {

      const graphQlObj = {
        OR: [
              {age_lt: 10},
              {age_gt:5},
              {name:'aji'}
            ]
      }

      const result = {
        or:[
            {
              age:{gt:5,lt:10}
            },
            {
              name:'aji'
            }
          ]
      }

      var orFilter   = adapter.graphQlToSequelize(graphQlObj);

      expect(orFilter).to.deep.equal(result);
    });
  });


});
