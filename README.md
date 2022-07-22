## TODO

In routes/api create users.js to allow admin to manage users.

## Notes

NoSql: Collections instead of tables. And documents instead of records.

Create a mew project, then cluster, then database on mongodb.com.

npm i mongoose

{"user": "alex1", "pwd": "1234"} Role:User: 2001, Editor:1984, Admin:5150
{"user": "alex2", "pwd": "12345"} Role: User:2001
{"user": "alex3", "pwd": "123456"} Role: User:2001

## Employees

Employees colletion to demonstrate CRUD API.

{"\_id":{"$oid":"62d1f693cbc598e86d51c438"},"firstname":"sunny0402","lastname":"Codes","__v":{"$numberInt":"0"}}

## Users

Users collection for authentication, authorization. Users have roles.

{"\_id":{"$oid":"62d15fe78826ed4b3a838b14"},"username":"alex3","roles":{"User":{"$numberInt":"2001"}},"password":"$2b$10$86dXb6zkJ24aNzQqODlouudTt3eUu9xge2fkRyhLFr7447sA5MH.O","__v":{"$numberInt":"0"},"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgzIiwiaWF0IjoxNjU3OTE1NDI0LCJleHAiOjE2NTgwMDE4MjR9.xVa6v1yY0ygnJZTsQuTMRad9bdmqX2xoWRl97bftEgs"}

{"\_id":{"$oid":"62d1609a8826ed4b3a838b17"},"username":"alex1","roles":{"User":{"$numberInt":"2001"},"Editor":{"$numberInt":"1984"},"Admin":{"$numberInt":"5150"}},"password":"$2b$10$C5DT0ueE1ANl2RGubGxJJulgdNN0SzAMFLk8YkILdx4HN1d6dPMPe","\_\_v":{"$numberInt":"0"},"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgxIiwiaWF0IjoxNjU4MDEyMjIzLCJleHAiOjE2NTgwOTg2MjN9.FEoif5HZd2_63g7JLKbK4Ug9XZ4D6n_9AFE5fkaQBvQ"}

## Tutorial Source

Thank you: https://github.com/gitdagray
https://github.com/gitdagray/node_js_resources
