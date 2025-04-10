package main;

import (
    "fmt"
    "net/http"
    "github.com/go-chi/chi"
    "log"
    "time"
    "api/roots/game"
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
    route.Get("/wordle",wordle.GenWord);
    log.Fatal(server.ListenAndServeTLS("./ssl/server.cert","./ssl/server.key"));
    fmt.Println("https://127.0.0.1");
    
}
