import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../../styles/productModal.css"

export const ProductModal = ({ onClose, onSave, editingProduct }) => {
    const [product, setProduct] = useState({
        sku: "",
        name: "",
        description: "",
        categoryId: "",
        price: "",
        weightKg: "",
        stockQuantity: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (editingProduct) {
            setProduct({
                ...editingProduct,
                categoryId: editingProduct.category?.id || editingProduct.categoryId || "",
            });
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedProduct = {
            sku: product.sku.trim(),
            name: product.name.trim(),
            description: product.description.trim(),
            categoryId: Number(product.categoryId),
            price: parseFloat(product.price),
            weightKg: parseFloat(product.weightKg),
            stockQuantity: parseInt(product.stockQuantity || 0),
            imageUrl: product.imageUrl.trim(),
        };

        if (!formattedProduct.categoryId || isNaN(formattedProduct.categoryId)) {
            alert("Por favor selecciona una categoría válida.");
            return;
        }

        onSave(formattedProduct);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content fade-in">
                <div className="modal-header">
                    <h3>{editingProduct ? "Editar producto" : "Nuevo producto"}</h3>
                    <button className="btn-close" onClick={onClose}>
                        <X />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>SKU *</label>
                        <input
                            type="text"
                            name="sku"
                            value={product.sku}
                            onChange={handleChange}
                            disabled={!!editingProduct}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Nombre *</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Descripción</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Describe brevemente el producto"
                        />
                    </div>

                    <div className="form-group half-width">
                        <label>ID Categoría *</label>
                        <input
                            type="number"
                            name="categoryId"
                            value={product.categoryId}
                            onChange={handleChange}
                            placeholder="Ej: 3"
                            required
                        />
                    </div>

                    <div className="form-group half-width">
                        <label>Precio *</label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group half-width">
                        <label>Peso (kg) *</label>
                        <input
                            type="number"
                            step="0.001"
                            name="weightKg"
                            value={product.weightKg}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group half-width">
                        <label>Stock</label>
                        <input
                            type="number"
                            name="stockQuantity"
                            value={product.stockQuantity}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>URL de imagen</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={product.imageUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </div>

                    {product.imageUrl && (
                        <div className="preview-image">
                            <img src={product.imageUrl} alt="Vista previa" />
                        </div>
                    )}

                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">
                            {editingProduct ? "Actualizar" : "Guardar"}
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
