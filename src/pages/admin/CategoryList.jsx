import React, { useEffect, useState } from "react";
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../services/admin/CategoryService.js";
import { PlusCircle, Edit, Trash2, EyeOff, Eye } from "lucide-react";
import "./../../styles/categories.css";
import { CategoryModal } from "./CategoryModal";

export const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const token = localStorage.getItem("accessToken");

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories(token);
            setCategories(data.content || []);
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async (categoryData) => {
        try {
            await createCategory(token, categoryData);
            setShowModal(false);
            fetchCategories();
        } catch (error) {
            alert("Error al crear categoría");
        }
    };

    const handleUpdate = async (categoryData) => {
        try {
            await updateCategory(token, editingCategory.id, categoryData);
            setShowModal(false);
            setEditingCategory(null);
            fetchCategories();
        } catch (error) {
            alert("Error al actualizar categoría");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta categoría?")) return;
        try {
            await deleteCategory(token, id);
            fetchCategories();
        } catch (error) {
            alert("Error al eliminar categoría");
        }
    };

    return (
        <div className="categories-container">
            <div className="categories-header">
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <PlusCircle /> Nueva Categoría
                </button>
            </div>

            <table className="categories-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Activo</th>
                    <th>Creado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {categories.length > 0 ? (
                    categories.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.description || "—"}</td>
                            <td className={c.isActive ? "active" : "inactive"}>
                                {c.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                            </td>
                            <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="btn-edit"
                                    onClick={() => {
                                        setEditingCategory(c);
                                        setShowModal(true);
                                    }}
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(c.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                            No hay categorías registradas
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {showModal && (
                <CategoryModal
                    onClose={() => {
                        setShowModal(false);
                        setEditingCategory(null);
                    }}
                    onSave={editingCategory ? handleUpdate : handleCreate}
                    editingCategory={editingCategory}
                />
            )}
        </div>
    );
};
