package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/watariRyo/go-react/database"
	"github.com/watariRyo/go-react/models"
)

func AllPermissions(c *fiber.Ctx) error {
	var permissions []models.Permission

	database.DB.Find(&permissions)

	return c.JSON(permissions)
}

