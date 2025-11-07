import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export const CategoryModal = ({ onClose, onSave, editingCategory }) => {
    const [category, setCategory] = useState({
        name: "",
        description: "",
    });

    useEffect(() => {
        if (editingCategory) {
            setCategory(editingCategory);
        }
    }, [editingCategory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            name: category.name.trim(),
            description: category.description.trim(),
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{editingCategory ? "Editar Categoría" : "Nueva Categoría"}</h3>
                    <button className="btn-close" onClick={onClose}>
                        <X />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Descripción</label>
                    <textarea
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                    />

                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">
                            {editingCategory ? "Actualizar" : "Guardar"}
                        </button>
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
