import { Command } from "commander";
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import chalk from "chalk";
import Table from "cli-table3";
import prompts from "prompts";

const program = new Command();
const client = new PrismaClient();

program.name("CLI-Todo-App")
program.version("1.0.0")
program.description("This is a CLI Todo App")

// Add Todo Item Command
program
  .command("add-Todoitem")
  .description("Add a new todo item")
  .action(async () => {
    try {
      const response = await prompts([
        {
          type: "text",
          name: "title",
          message: "Enter the title of the todo",
        },
        {
          type: "text",
          name: "description",
          message: "Description of the todo",
        },
        {
          type: "select",
          name: "status",
          message: "Select the status",
          choices: [
            { title: "todo", value: "todo" },
            { title: "in-progress", value: "in-progress" },
            { title: "done", value: "done" },
          ],
          initial: 0,
        },
      ]);

      const newTodoitem = await client.todoTask.create({
        data: {
          id: nanoid(6), // Ensure uniqueness or use Prisma’s UUID
          title: response.title || "Todoitem",
          description: response.description || "This is a new Todoitem",
          status: response.status || "pending", // Ensure this field is provided
        },
      });
      
      
      console.log(chalk.green("Todoitem created successfully!"));
      console.log(newTodoitem);
    } catch (error) {
      console.error(chalk.red("Error creating Todoitem:"), error);
    }
  });

// Update Todo Item Command
program
  .command("update-Todoitem")
  .description("Update an existing todo item")
  .requiredOption("-i, --id <value>", "ID of the todo item to update")
  .option("-t, --title <value>", "New title")
  .option("-d, --description <value>", "New description")
  .option("-s, --status <value>", "New status (todo, in-progress, done)")
  .action(async (options) => {
    try {
      // Validate status if provided
      if (options.status && !["todo", "in-progress", "done"].includes(options.status)) {
        console.error(chalk.red("Invalid status. Must be 'todo', 'in-progress', or 'done'"));
        return;
      }
      
      const { id, ...updateData } = options;
      const dataToUpdate = Object.fromEntries(
        Object.entries(updateData).filter(([_, v]) => v !== undefined)
      );
      
      const updatedTodoitem = await client.todotask.update({
        where: {
          id: id,
        },
        data: dataToUpdate,
      });
      
      console.log(chalk.green("Todoitem updated successfully!"));
      console.log(updatedTodoitem);
    } catch (error) {
      console.error(chalk.red("Error updating Todoitem:"), error);
    }
  });

// Read All Todo Items Command
program
  .command("read-all-Todoitem")
  .description("List all todo items")
  .option("-s, --status <value>", "Filter by status")
  .option("-i, --id <value>", "Filter by specific ID")
  .action(async (options) => {
    try {
      const where = {};
      if (options.status) where.status = options.status;
      if (options.id) where.id = options.id;
      
      const todoItems = await client.todotask.findMany({ where });
      
      if (todoItems.length === 0) {
        console.log(chalk.yellow("No todo items found."));
        return;
      }
      
      console.log(chalk.blue("Todoitem retrieved successfully!"));
      
      const table = new Table({
        head: ["ID", "Title", "Description", "Status"],
        colWidths: [10, 20, 40, 15],
      });
      
      todoItems.forEach((item) => {
        table.push([
          item.id, 
          item.title, 
          item.description, 
          item.status
        ]);
      });
      
      console.log(table.toString());
    } catch (error) {
      console.error(chalk.red("Error retrieving Todoitems:"), error);
    }
  });

// Delete Specific Todo Item Command
program
  .command("delete-Todoitem-by-id")
  .description("Delete a specific todo item by ID")
  .requiredOption("-i, --id <value>", "ID of the todo item to delete")
  .action(async (options) => {
    try {
      // First check if the item exists
      const foundTodoitem = await client.todotask.findUnique({
        where: { id: options.id },
      });
      
      if (!foundTodoitem) {
        console.log(chalk.yellow("Todoitem not found!"));
        return;
      }
      
      await client.todotask.delete({
        where: { id: options.id },
      });
      
      console.log(chalk.red("Todoitem deleted successfully!"));
    } catch (error) {
      console.error(chalk.red("Error deleting Todoitem:"), error);
    }
  });

// Delete All Todo Items Command
program
  .command("delete-all-Todoitem")
  .description("Delete all todo items")
  .option("-s, --status <value>", "Delete items with specific status")
  .action(async (options) => {
    try {
      const where = {};
      if (options.status) where.status = options.status;
      
      const confirmation = await prompts({
        type: "confirm",
        name: "value",
        message: options.status 
          ? `Are you sure you want to delete all ${options.status} todo items?`
          : "Are you sure you want to delete ALL todo items?",
        initial: false
      });
      
      if (confirmation.value) {
        const result = await client.todotask.deleteMany({ where });
        console.log(chalk.red(`${result.count} Todoitem(s) deleted successfully!`));
      } else {
        console.log(chalk.yellow("Operation cancelled."));
      }
    } catch (error) {
      console.error(chalk.red("Error deleting Todoitems:"), error);
    }
  });

// Help Command
program
  .command("help")
  .description("Show help information")
  .action(() => {
    console.log(chalk.blue("Available commands:"));
    console.log(chalk.green("add-Todoitem              - Add a new todo item"));
    console.log(chalk.green("update-Todoitem -i ID     - Update a todo item by ID"));
    console.log(chalk.green("read-all-Todoitem         - List all todo items"));
    console.log(chalk.green("read-all-Todoitem -i ID   - Get a specific todo item by ID"));
    console.log(chalk.green("delete-Todoitem-by-id -i ID - Delete a specific todo item by ID"));
    console.log(chalk.green("delete-all-Todoitem       - Delete all todo items (with confirmation)"));
  });

program.parse(process.argv);