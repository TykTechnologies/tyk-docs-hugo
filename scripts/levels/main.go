package main

import (
	"log"
	"os"

	"gopkg.in/yaml.v3"
)

func main() {
	max := 4
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
	for i := range intLevels {
		if i > max {
			shouldErr = true
		}
	}
	if shouldErr {
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
