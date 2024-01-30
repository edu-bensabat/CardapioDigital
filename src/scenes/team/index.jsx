import * as React from "react";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { tokens } from "../../theme";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomArrayItem } from "@mui/x-data-grid-generator";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: 1,
    name: "",
    age: 10,
    status: "Ativo",
  },
  {
    id: 2,
    name: "",
    age: 10,
    status: "Ativo",
  },
  {
    id: 3,
    name: "",
    age: 10,
    status: "Ativo",
  },
  {
    id: 4,
    name: "",
    age: 10,

    status: "Ativo",
  },
  {
    id: 5,
    name: "",
    age: 10,
    status: "Ativo",
  },
];

export default function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [editedRows, setEditedRows] = React.useState(new Set());

  // Função para alternar o status "Ativo/Inativo"
  const handleToggleStatusClick = (id, currentStatus) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          status: currentStatus === "Ativo" ? "Inativo" : "Ativo",
        };
      }
      return row;
    });

    setRows(updatedRows);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
      const updatedEditedRows = new Set(editedRows);
      updatedEditedRows.add(params.id);
      setEditedRows(updatedEditedRows);
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        row.id === newRow.id ? updatedRow : row
      );
      return updatedRows;
    });
    return updatedRow;
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      flex: 1,
      headerName: "Apelido",
      width: 180,
      editable: true,
    },
    {
      field: "age",
      flex: 1,

      headerName: "Serviço (%)",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "status", // Nova coluna de status
      headerName: "Situação",
      width: 120,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant={params.row.status === "Ativo" ? "contained" : "contained"}
          color={params.row.status === "Ativo" ? "secondary" : "error"}
          onClick={() =>
            handleToggleStatusClick(params.row.id, params.row.status)
          }
        >
          {params.row.status}
        </Button>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Salvar"
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancelar"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Excluir"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleEditClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
    const updatedEditedRows = new Set(editedRows);
    updatedEditedRows.delete(id);
    setEditedRows(updatedEditedRows);
  };

  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }

    const updatedEditedRows = new Set(editedRows);
    updatedEditedRows.delete(id);
    setEditedRows(updatedEditedRows);
  };

  const handleDeleteClick = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleAddRow = () => {
    const newId = rows.length + 1;
    const newRow = {
      id: newId,
      name: "",
      age: "",
      status: "Ativo",
      isNew: true,
    };

    setRows([...rows, newRow]);
    setRowModesModel({
      ...rowModesModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    });
  };

  return (
    <Box m="20px">
      <Header
        title="CLIENTES E MESAS"
        subtitle="Verifique a Situação das Mesas"
      />
      <Box
        m="40px 0 0 0"
        maxWidth="95%"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          isCellEditable={(params) =>
            !editedRows.has(params.id) &&
            params.field !== "id" &&
            params.field !== "actions"
          }
          components={{
            Toolbar: () => (
              <GridToolbarContainer>
                <Button
                  color="secondary"
                  startIcon={<AddIcon />}
                  onClick={handleAddRow}
                >
                  Adicionar mesa
                </Button>
              </GridToolbarContainer>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
