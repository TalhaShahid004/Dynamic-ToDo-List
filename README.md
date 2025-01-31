
<div align="center">

# Dynamic-ToDo-List

</div>

A dynamic to-do list that calculates priority based on due date, importance, and time to complete. This project aims to provide a user-friendly interface for managing tasks effectively.

## Features

-   **Dynamic Priority Calculation**: Automatically calculates task priority based on due date, importance, and estimated time.
-   **Task Management**: Easily add, edit, and delete tasks.
-   **Task Completion**: Track the completion status of tasks.
-   **Local Storage**: Tasks are saved in the browser's local storage, enabling persistence between sessions.
-   **Responsive Interface**: A clean and responsive user interface for all screen sizes.
-   **Customizable Importance**: Set the importance of each task on a scale of 1-10.
-   **Due Date Input**: Add due dates to your tasks to get a more accurate priority calculation.
-   **Estimated Time**: Input the estimated time in hours to complete a task, which is used in priority calculation.
-   **Sorting**: Tasks are automatically sorted by priority.


## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/TalhaShahid004/Dynamic-ToDo-List.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd Dynamic-ToDo-List
    ```
3.  Open the `src/index.html` file in your browser.

## Usage

Once the `index.html` file is open in your browser, you can start using the to-do list:

1.  **Add a Task**:
    -   Enter the task name in the "Task Name" field.
    -   Enter the importance of the task (1-10) in the "Importance" field.
    -   Optionally, add a due date in the "Due Date" field.
    -   Enter the estimated time (in hours) to complete the task.
    -   Click the "Add Task" button.

2.  **Edit a Task**:
    -   Click the "Edit" button next to the task you want to edit.
    -   A prompt will ask for the new task name, importance, due date, and estimated time.
    -   Enter the new values and click "OK". If you wish to cancel, click cancel.

3.  **Delete a Task**:
    -   Click the "Delete" button next to the task you want to delete.
    -   Confirm your action if the task is incomplete.

4.  **Mark Task as Complete**:
    -   Check the checkbox next to the task to toggle the completion status.

5.  **Clear All Tasks**:
    - Click the Clear All button, and confirm deletion.

The tasks will be automatically sorted by priority.

## Dependencies

-   **None**: This project is built using only HTML, CSS, and JavaScript. No external libraries or frameworks are needed to run it.

## Contributing

Contributions to the Dynamic-ToDo-List are welcome! If you'd like to contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or fix:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3.  Make your changes and commit them:

    ```bash
    git commit -am 'Add some feature'
    ```

4.  Push to the branch:

    ```bash
    git push origin feature/your-feature-name
    ```

5.  Submit a pull request to the `main` branch.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) 
