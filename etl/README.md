#ETL Scripts

The JS files in the ETL folder are the ones which run in the background on the server and transfer data from Yahoo! Finance into the database. These scripts require Node.js which must be downloaded and installed on the server/dev machine. In addition, there are two Node modules which are used: mysql and request. However, these have been included in the source and should not need to be installed. The first module, mysql, is a MySQL client. The second, request, facilitates making HTTP requests to the Yahoo! API.

###loadCompanyData.js
This script is meant to be run nightly and should take approximately 1.5 hours in order to stay under Yahoo's request rate limit. It connects to the database and pulls the Symbol table into an array. The array is then consumed by a function which shifts the array (pops the first member), builds a YQL request, processes the return JSON and then calls a stored procedure which will either insert or update a record in the Company table. The function is called using setInterval with an interval of 3 seconds. In practice this gets called a bit faster than every 3 seconds but should be sufficient to stay under the 2000 request per hour limit.
