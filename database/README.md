##DB Creation Instructions

In phpMyAdmin create a new database called "portfolio_manager". Then click on the Import tab and the Choose File button. Select the first .sql file accept the defaults and click the "Go" button. The tables have test data in them and should be imported in the following order:

1. company.sql
2. incomestatement.sql
3. balancesheet.sql
4. history.sql
5. history-part2.sql
6. history-part3.sql
7. history-part4.sql
8. symbol.sql
9. user.sql
10. watchlist.sql
11. watchlistitems.sql
12. transaction.sql
13. auth.sql 

##Stored Procedures

Run procs.sql to create the stored procedures in the database. Check the [Stored Procedures.md](Stored Procedures.md) file for specific details on the stored procedures.
