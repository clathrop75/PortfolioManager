#ETL Scripts

The JS files in the ETL folder are the ones which run in the background on the server and transfer data from Yahoo! Finance into the database. These scripts require Node.js which must be downloaded and installed on the server/dev machine. In addition, there are three Node modules which are used: mysql, request and cheerio. However, these have been included in the source and should not need to be installed. The first module, mysql, is a MySQL client. The second, request, facilitates making HTTP requests to the Yahoo! API. The third, cheerio, is a Node-specific implementation of jQuery and is used for the scripts which need to scrape data off of pages.

###loadCompanyData.js
This script is meant to be run nightly and should take approximately 1.5 hours in order to stay under Yahoo's request rate limit. It connects to the database and pulls the Symbol table into an array. The array is then consumed by a function which shifts the array (pops the first member), builds a YQL request, processes the return JSON and then calls a stored procedure which will either insert or update a record in the Company table. The function is called using setInterval with an interval of 3 seconds. In practice this gets called a bit faster than every 3 seconds but should be sufficient to stay under the 2000 request per hour limit.

###loadCompanyHistoryData.js
This script is meant to be run nightly and pulls the daily stock history data (e.g. high, low, open, close, etc) into the History table. The structure of the script is similar to that of loadCompanyData.js.

###loadCompanyKeyStats.js
This script is meant to be run nightly. It pulls data from other content providers that Yahoo is surfacing (primarily Capital IQ and EDGAR Online). The scripts pulls a list of stock symbols then grabs the associated "Key Statistics" page on Yahoo! Finance. The HTML file is scraped for the desired info and inserted into the KeyStats table.

###loadCompanyIncomeStatement.js
This script is meant to be run annually. It pulls a list of stock symbols and then grabs the associated "Income Statement" page on Yahoo! Finance. There are typically three years worth of income statements on the page; however, occasionally there are only 1 or 2. Regardless of the number of years of income statements, all data will scraped and inserted, if necessary, into the appropriate year in the IncomeStatement table.

###loadCompanyBalanceSheet.js
This script is meant to be run annually. It pulls a list of stock symbols and then grabs the associated "Balance Sheet" page on Yahoo! Finance. There are typically three years worth of balance sheets on the page; however, occasionally there are only 1 or 2. Regardless of the number of years of balance sheets, all data will scraped and inserted, if necessary, into the appropriate year in the BalanceSheet table.
