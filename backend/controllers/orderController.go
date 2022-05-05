package controllers

import (
	"encoding/csv"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/watariRyo/go-react/database"
	"github.com/watariRyo/go-react/models"
)

const deleteOrderItems = "DELETE FROM order_items WHERE order_id = ?"

func AllOrders(c *fiber.Ctx) error {
	page, _ := strconv.Atoi(c.Query("page", "1"))

	return c.JSON(models.Pagenagte(database.DB, &models.Order{}, page))
}

func CreateOrder(c *fiber.Ctx) error {
	var order models.Order

	if err := c.BodyParser(&order); err != nil {
		return err
	}

	database.DB.Create(&order)

	return c.JSON(order)
}

func GetOrder(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	order := models.Order{
		Id: uint(id),
	}

	database.DB.Find(&order)

	return c.JSON(order)
}

func Updateorder(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	order := models.Order{
		Id: uint(id),
	}

	if err := c.BodyParser(&order); err != nil {
		return err
	}
	database.DB.Model(&order).Updates(order)

	return c.JSON(order)
}

func Deleteorder(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	database.DB.Exec(deleteOrderItems, id)

	order := models.Order{
		Id: uint(id),
	}

	database.DB.Delete(&order)

	return nil
}

func Export(c *fiber.Ctx) error {
	filePath := "./source/orders.csv"

	if err := createFile(filePath); err != nil {
		return err
	}

	return c.Download(filePath)
}

func createFile(filePath string) error {
	file, err := os.Create(filePath)

	if err != nil {
		return err
	}

	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	var orders []models.Order

	database.DB.Preload("OrderItems").Find(&orders)

	writer.Write([]string{
		"ID", "Name", "Email", "Product Title", "Price", "Quantity",
	})

	for _, order := range orders {
		data := []string{
			strconv.Itoa(int(order.Id)),
			order.FirstName + " " + order.LastName,
			order.Email,
			"",
			"",
			"",
		}
		if err := writer.Write(data); err != nil {
			return err
		}

		for _, orderItem := range order.OrderItems {
			data := []string{
				"",
				"",
				"",
				orderItem.ProductTitle,
				strconv.Itoa(int(orderItem.Price)),
				strconv.Itoa(int(orderItem.Quantity)),
			}
			if err := writer.Write(data); err != nil {
				return err
			}
		}
	}

	return nil
}

type Sales struct {
	Date string `json:"date"`
	Sum string `json:"sum"`
}

func Chart(c *fiber.Ctx) error {
	var sales []Sales

	database.DB.Raw(`
		SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, SUM(oi.price * oi.quantity) as sum FROM orders o INNER JOIN order_items oi ON o.id = oi.order_id GROUP BY date
	`).Scan(&sales)

	return c.JSON(sales)	
}