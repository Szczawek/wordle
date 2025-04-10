package wordle 

import (
    "encoding/json"
    "net/http"
    "fmt"
    "os"
)

func GenWord(res http.ResponseWriter, req *http.Request) {
    data := "test";
    word,err := json.Marshal(data);
    if err != nil {
         fmt.Println("not ok");
        return;
     }
    
    ans := readWords()
    fmt.Println(word);
    fmt.Println(ans);
    fmt.Println("ok");
    res.Write([]byte("test"));
}

func readWords() string {
    data, err := os.ReadFile("roots/game/list.txt");
    if err != nil {
        fmt.Println(err)
        return "error"
    }
    fmt.Println(data);
    return "ok";
}
