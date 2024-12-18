// package main
// // import "github.com/rs/cors"

// import (
// 	// "encoding/json"
// 	// "log"
// 	// "errors"
// 	"fmt"
// 	"net/http"
// 	"log"
// )

// // Struct to hold the cell coordinates
// type Cell struct {
// 	RowIndex   int `json:"rowIndex"`
// 	ColIndex   int `json:"colIndex"`
// }

// // Struct for the request body (coordinates of two selected cells)
// type CoordinatesRequest struct {
// 	Cell1 Cell `json:"cell1"`
// 	Cell2 Cell `json:"cell2"`
// }

// func handler(w http.ResponseWriter, r *http.Request) {
//     fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
// }

// func main() {
//     http.HandleFunc("/", handler)
//     log.Fatal(http.ListenAndServe(":8000", nil))
// }


package main

import (
	// "errors"
	"fmt"
	"io"
	"net/http"
	"log"
)

func getRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got / request\n")
	io.WriteString(w, "This is my website!\n")
}
func getHello(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got /hello request\n")
	io.WriteString(w, "Hello, HTTP!\n")
}

func main() {
	http.HandleFunc("/", getRoot)
	http.HandleFunc("/hello", getHello)

	// err := http.ListenAndServe(":8000", nil)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

