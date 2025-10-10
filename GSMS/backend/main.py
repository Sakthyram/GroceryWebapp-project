import mysql.connector

cnx = mysql.connector.connect(user='sakthyramvishnu@gmail.com', password='Sakthy@2112002',
                              host='127.0.0.1',
                              database='employees')
cnx.close()