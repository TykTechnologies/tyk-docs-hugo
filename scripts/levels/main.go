package main

import (
	"log"
	"os"
	"strconv"

	"github.com/olekukonko/tablewriter"
	"gopkg.in/yaml.v3"
)

func main() {
	max := 3
	data, err := os.ReadFile("../../tyk-docs/data/menu.yaml")
	if err != nil {
		log.Fatal(err)
	}
	var menu Menu
	err = yaml.Unmarshal(data, &menu)
	if err != nil {
		log.Fatal(err)
		return
	}
	levels := getMenuLevels(menu.Menu, 0)

	intLevels := getIntLevels(levels)
	shouldErr := false
	headers := []string{"Levels", "Title", "Category", "Path"}
	rows := make([][]string, 0)
	for i, menuItems := range intLevels {
		if i > max {
			for _, item := range menuItems {
				row := []string{
					strconv.Itoa(i), item.Title, item.Category, item.Path,
				}
				rows = append(rows, row)
			}

			shouldErr = true
		}
	}
	if shouldErr {
		Printable(headers, rows)
		log.Fatalf("The menuitem listed above are more than %d levels deep", max)
	}
}

type MenuItem struct {
	Title    string     `yaml:"title"`
	Path     string     `yaml:"path"`
	Category string     `yaml:"category"`
	Menu     []MenuItem `yaml:"menu"`
}

type Menu struct {
	Menu []MenuItem `yaml:"menu"`
}

func getIntLevels(levels map[*MenuItem]int) map[int][]MenuItem {
	intLevels := make(map[int][]MenuItem)
	for item, i := range levels {
		if _, ok := intLevels[i]; !ok {
			intLevels[i] = []MenuItem{}
		}
		intLevels[i] = append(intLevels[i], *item)
	}
	return intLevels
}

func getMenuLevels(menu []MenuItem, level int) map[*MenuItem]int {
	levels := make(map[*MenuItem]int)
	for _, menuItem := range menu {
		levels[&menuItem] = level
		if menuItem.Menu != nil && len(menuItem.Menu) > 0 {
			subLevels := getMenuLevels(menuItem.Menu, level+1)
			for subMenuItem, subLevel := range subLevels {
				levels[subMenuItem] = subLevel
			}
		}
	}
	return levels
}

func Printable(headers []string, data [][]string) {
	table := tablewriter.NewWriter(os.Stdout)
	table.SetHeader(headers)
	table.AppendBulk(data)
	table.SetBorder(false)
	table.SetRowLine(false)
	table.SetAutoMergeCells(false)
	table.SetHeaderAlignment(0)
	table.SetAutoFormatHeaders(true)
	table.Render()
}
