import React from "react";
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, TextFilterModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function TodoTable(props) {
    const handleFilterChange = (field, value) => {
        props.setFilters({
            ...props.filters,
            [field]: value
        });
    };

    const filteredTodos = props.todos.filter(todo => {
        return (
            todo.date.includes(props.filters.date) &&
            todo.description.includes(props.filters.description) &&
            todo.priority.includes(props.filters.priority)
        );
    })

    const columns = [
        { headerName: "Description", field: "description", filter: 'agTextColumnFilter', floatingFilter: true, sortable: true },
        { headerName: "Date", field: "date", filter: 'agTextColumnFilter', floatingFilter: true },
        { headerName: "Priority", field: "priority", filter: 'agTextColumnFilter', floatingFilter: true }
    ];

    return (
        <div class="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
            <AgGridReact
                rowData={filteredTodos}
                columnDefs={columns}
                animateRows={true}
                modules={[ClientSideRowModelModule, TextFilterModule]}
            />
        </div>
    );
}

export default TodoTable;