package main

//TODO
// - rate limit - 100 request from single ip per 15mins

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Result struct {
	Message Message `json:"message"`
}

type Message struct {
	Abstract string `json:"abstract"`
}

func handler(w http.ResponseWriter, r *http.Request) {

	//TODO dev environment only
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var result Result

	q := r.URL.Query()
	//TODO handle unexpected calls?
	doi := q["id"][0]

	//unfortunately most of articles don't have abstract medata data
	//TODO: check is there an abstract and fallback if it doesn't exist - e.g. follow doi.org redirect and extract
	//it from httml?
	resp, err := http.Get(fmt.Sprintf("https://api.crossref.org/works/%s", doi))
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	log.Print("")

	data := []byte(result.Message.Abstract)
	w.Header().Set("Content-Type", "application/text")
	w.WriteHeader(200)
	w.Write(data)
}

func main() {
	http.HandleFunc("/2/doi2abstract", handler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
