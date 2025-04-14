package database

import (
    "fmt"
    "log"
    "database/sql"
    "github.com/go-sql-driver/mysql"
)
var DB *sql.DB;

func InitDb() {
    config := mysql.Config{
        User: "root",
        Passwd: "9goFK18O7XNFZI",
        Net: "tcp",
        Addr: "127.0.0.1:3306",
        DBName: "wordle",
    };

    var err error;
    DB, err = sql.Open("mysql",config.FormatDSN());
    if err != nil {
        log.Fatal(err);
    }
    ping := DB.Ping();
    if ping != nil {
        log.Fatal(ping);
    }

    fmt.Println("MySQL db connected!");
}
