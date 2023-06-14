package main

import (
	"reflect"
	"testing"
)

func TestGetMenuLevels(t *testing.T) {
	// Create a sample menu structure
	menu := []MenuItem{
		{
			Title:    "Home",
			Path:     "/",
			Category: "Tab",
			Menu: []MenuItem{
				{
					Title:    "Tyk API Gateway Documentation",
					Path:     "/",
					Category: "Page",
					Menu: []MenuItem{
						{
							Title:    "Second level",
							Path:     "/itachi",
							Category: "Page",
							Menu: []MenuItem{
								{
									Title:    "Third Level",
									Path:     "/level-3",
									Category: "",
									Menu:     nil,
								},
							},
						},
					},
				},

				{
					Title:    "Cloud Support SLA Policies",
					Path:     "/frequently-asked-questions/sla-policies",
					Category: "Page",
				},
			},
		},
		{
			Title:    "Deployment and Operations",
			Path:     "/apim",
			Category: "Tab",
		},
	}

	expectedLevels := map[*MenuItem]int{
		&menu[0]:                 0,
		&menu[0].Menu[0]:         1,
		&menu[0].Menu[1]:         1,
		&menu[1]:                 0,
		&menu[0].Menu[0].Menu[0]: 2,
	}

	actualLevels := getMenuLevels(menu, 0)
	for item, i := range actualLevels {
		t.Log(item)
		t.Log(i)
	}
	if !reflect.DeepEqual(expectedLevels, actualLevels) {
		t.Errorf("Unexpected levels. Expected: %v, Got: %v", expectedLevels, actualLevels)
	}
}
