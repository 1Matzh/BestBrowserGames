import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const C_CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState("");

    const cookies = new Cookies();
    const userRoles = cookies.get("token") ? jwtDecode(cookies.get("token")).roles : [];

    const token = cookies.get("token");

    useEffect(() => {
        if (!userRoles.includes("admin")) {
            console.log("Acesso restrito. Somente administradores podem acessar esta página.");
        } else {
            fetchCategories();
        }
    }, [userRoles]);

    const fetchCategories = () => {
        axios
            .get("https://bestbrowsergamesapi--1matzh.repl.co/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error.response.data);
            });
    };

    const handleAddCategory = () => {
        axios
            .post("https://bestbrowsergamesapi--1matzh.repl.co/categories", {
                name: newCategoryName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                fetchCategories();
                setNewCategoryName("");
                console.log("Category added successfully");
            })
            .catch((error) => {
                console.error("Error adding category:", error);
            });
    };

    const handleEditCategory = () => {
        axios
            .put(`https://bestbrowsergamesapi--1matzh.repl.co/categories/${editingCategoryId}`, {
                name: editedCategoryName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                fetchCategories();
                setEditingCategoryId(null);
                setEditedCategoryName("");
            })
            .catch((error) => {
                console.error("Error editing category:", error);
            });
    };

    const handleDeleteCategory = (categoryId) => {
        axios
            .delete(`https://bestbrowsergamesapi--1matzh.repl.co/categories/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                fetchCategories();
            })
            .catch((error) => {
                console.error("Error deleting category:", error);
            });
    };

    const renderCategories = () => {
        return categories.map((category) => (
            <div className="category-item" key={category._id}>
                {editingCategoryId === category._id ? (
                    <div>
                        <input
                            type="text"
                            value={editedCategoryName}
                            onChange={(e) => setEditedCategoryName(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleEditCategory}>Salvar</button>
                        <button className="btn btn-danger" onClick={() => setEditingCategoryId(null)}>Cancelar</button>
                    </div>
                ) : (
                    <div>
                        <span>{category.name}</span>
                        <button className="btn btn-primary" onClick={() => setEditingCategoryId(category._id)}>Editar</button>
                        <button className="btn btn-danger" onClick={() => handleDeleteCategory(category._id)}>Excluir</button>
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div>
            <h2><strong>[ADMIN]</strong> Gerenciamento de Categorias</h2>
            <div className="add-category">
                <h3>Adicionar Nova Categoria</h3>
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddCategory}>Adicionar</button>
            </div>
            <div className="category-list">
                <h3>Lista de Categorias</h3>
                {renderCategories()}
            </div>
        </div>
    );
};

export default C_CategoryManagement;
