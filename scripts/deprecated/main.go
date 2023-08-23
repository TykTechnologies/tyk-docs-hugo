package main

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"

	"gopkg.in/yaml.v3"
)

const (
	filePath  = "../../tyk-docs/data/menu.yaml"
	directory = "../../tyk-docs/data"
	script    = "./deprecated.sh"
)

func main() {
	data, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("error opening menu.yaml file: %s", err.Error())
	}

	var menu Menu
	err = yaml.Unmarshal(data, &menu)
	if err != nil {
		log.Fatalf("error Unmarshal menu.yaml file: %s", err.Error())
		return
	}
	menuItems := findMenuItemsWithTitle(menu.Menu, "Deprecated pages")
	paths := getDeprecatedPaths(menuItems)
	findPagesWithDeprecatedPages(paths)
}

func findPagesWithDeprecatedPages(paths []string) {
	var found []string
	for _, path := range paths {
		// grep -nrE '\{\{< ref "(/|content/|/content/)?basic-config-and-security/security/dashboard(\.md|/)?" >}}\)'
		// searchTerm := fmt.Sprintf(`\{\{< ref "(/|content/|/content/)?%s(\.md|/)?" >}}\)`, strings.TrimPrefix(path, "/"))
		cmd := exec.Command("bash", script, strings.TrimPrefix(path, "/"))
		var stdout, stderr bytes.Buffer
		cmd.Stdout = &stdout
		cmd.Stderr = &stderr
		err := cmd.Run()
		if err != nil {
			fmt.Printf("Error: %v\n", err)
			// fmt.Printf("Stderr: %s\n", stderr.String())
			os.Exit(1)
		} else {
		}
		content := stdout.String()
		if !strings.Contains(content, "Pattern not") {
			println(fmt.Sprintf("%s is in:\n%s", path, content))
			// found = append(found, fmt.Sprintf("%s is in:\n%s", path, content))
		}

	}
	for _, item := range found {
		log.Println(item)
	}
}

func getDeprecatedPaths(menuItems []MenuItem) []string {
	var paths []string
	for _, menu := range menuItems {
		for _, item := range menu.Menu {
			paths = append(paths, item.Path)
		}
	}
	return paths
}

func findMenuItemsWithTitle(menu []MenuItem, title string) []MenuItem {
	var result []MenuItem
	for _, menuItem := range menu {
		if strings.ToLower(menuItem.Title) == strings.ToLower(title) {
			result = append(result, menuItem)
		}
		if menuItem.Menu != nil {
			subItems := findMenuItemsWithTitle(menuItem.Menu, title)
			result = append(result, subItems...)
			// subLevels := getMenuLevels(menuItem.Menu, level+1)
			// for subMenuItem, subLevel := range subLevels {
			///levels[subMenuItem] = subLevel
			//}
		}
	}
	return result
}

type Menu struct {
	Menu []MenuItem `yaml:"menu"`
}

type MenuItem struct {
	Title    string     `yaml:"title"`
	Path     string     `yaml:"path"`
	Category string     `yaml:"category"`
	Menu     []MenuItem `yaml:"menu"`
}
