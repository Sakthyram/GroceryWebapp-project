__cnx = None
import mysql.connector
def get_sql_connection():
    global __cnx
    if __cnx is None:
        __cnx = mysql.connector.connect(user='root', password='Sakthy@2112002',
                                    host='127.0.0.1',
                                    database='gs')
    return __cnx