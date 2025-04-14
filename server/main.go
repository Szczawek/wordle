package main;

import (
    "fmt"
    "net/http"
    "github.com/go-chi/chi"
    "log"
    "time"
    "api/roots/game"
    "api/roots/config"
)

func main() {
    route := chi.NewRouter();
    server := &http.Server{
        Addr: ":443",
        Handler: route,
        ReadTimeout: 10 * time.Second,
        WriteTimeout: 10 * time.Second,
        MaxHeaderBytes: 1 << 20,
    } 
    database.InitDb();
    rows,err := database.DB.Query("SELECT * FROM words");
    if err != nil {
        log.Fatal(err);
    }
    
    type Table struct {
        id int64;
        word string;
    }
    words := make([]Table, 0);
    for rows.Next() {
        var word Table;
        
        if err := rows.Scan(&word); err != nil {
            log.Fatal(err);   
        }
        words = append(words,word);
    }
    
    if err := rows.Err(); err !=nil {
        log.Fatal(err);
    }

    fmt.Println(words);
    
    defer rows.Close()  


    fmt.Println(rows);
    route.Get("/wordle",wordle.GenWord);
    log.Fatal(server.ListenAndServeTLS("./ssl/server.cert","./ssl/server.key"));
    fmt.Println("https://127.0.0.1");
    
}
