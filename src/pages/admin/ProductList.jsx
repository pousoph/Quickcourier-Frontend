import React, { useEffect, useState } from "react";
import {
    getAllProducts,
    getLowStockProducts,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../services/admin/productServiceAdmin.js";
import { PlusCircle, Edit, Trash2, EyeOff, Eye, AlertTriangle } from "lucide-react";
import "./../../styles/products.css";
import { ProductModal } from "./ProductModal";

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [showLowStock, setShowLowStock] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const token = localStorage.getItem("accessToken");

    const fetchProducts = async (pageNumber = 0) => {
        try {
            const data = await getAllProducts(token, pageNumber, 8);
            setProducts(data.content || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    const fetchByCategory = async (categoryId, pageNumber = 0) => {
        try {
            const data = await getProductsByCategory(token, categoryId, pageNumber, 8);
            setProducts(data.content || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Error filtrando productos:", error);
        }
    };

    const fetchLowStock = async () => {
        try {
            const data = await getLowStockProducts(token);
            setLowStockProducts(data.content || []);
        } catch (error) {
            console.error("Error cargando productos con bajo stock:", error);
        }
    };

    useEffect(() => {
        if (selectedCategory === "Todos") {
            fetchProducts(page);
        } else {
            const map = { Libros: 3, Snacks: 4, Accesorios: 5 };
            fetchByCategory(map[selectedCategory], page);
        }
    }, [page, selectedCategory]);

    useEffect(() => {
        fetchLowStock();
    }, []);

    const handleCreate = async (productData) => {
        try {
            const newProduct = await createProduct(token, productData);
            setProducts((prev) => [newProduct, ...prev]);
            setShowModal(false);
        } catch (error) {
            alert("Error al crear producto");
        }
    };

    const handleUpdate = async (productData) => {
        try {
            const updatedProduct = await updateProduct(token, editingProduct.id, productData);
            setProducts((prev) =>
                prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
            );
            setShowModal(false);
            setEditingProduct(null);
        } catch (error) {
            alert("Error al actualizar producto");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
        try {
            await deleteProduct(token, id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            alert("Error al eliminar producto");
        }
    };

    return (
        <div className="products-container fade-in">
            <div className="products-header">
                <div className="actions">
                    <button className="btn-primary" onClick={() => setShowModal(true)}>
                        <PlusCircle /> Nuevo producto
                    </button>
                    <button
                        className={`btn-secondary ${showLowStock ? "active" : ""}`}
                        onClick={() => setShowLowStock(!showLowStock)}
                    >
                        <AlertTriangle /> {showLowStock ? "Ver todos" : "Ver bajo stock"}
                    </button>
                </div>
            </div>

            {/* FILTRO POR CATEGORÍA */}
            <div className="category-filters">
                {["Todos", "Libros", "Snacks", "Accesorios"].map((cat) => (
                    <button
                        key={cat}
                        className={selectedCategory === cat ? "active" : ""}
                        onClick={() => {
                            setSelectedCategory(cat);
                            setPage(0);
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* TABLA */}
            <table className="products-table">
                <thead>
                <tr>
                    <th>Imagen</th>
                    <th>SKU</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Activo</th>
                    <th>Creado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {(showLowStock ? lowStockProducts : products).length > 0 ? (
                    (showLowStock ? lowStockProducts : products).map((p) => (
                        <tr key={p.id} className={p.stockQuantity <= 10 ? "low-stock-row" : ""}>
                            <td>
                                {p.imageUrl ? (
                                    <img src={p.imageUrl} alt={p.name} className="product-image" />
                                ) : (
                                    <span className="no-image">—</span>
                                )}
                            </td>
                            <td>{p.sku}</td>
                            <td>{p.name}</td>
                            <td>{p.category?.name || "—"}</td>
                            <td>${p.price?.toLocaleString()}</td>
                            <td className={p.stockQuantity <= 10 ? "low-stock" : ""}>{p.stockQuantity}</td>
                            <td className={p.isActive ? "active" : "inactive"}>
                                {p.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                            </td>
                            <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="btn-edit"
                                    onClick={() => {
                                        setEditingProduct(p);
                                        setShowModal(true);
                                    }}
                                >
                                    <Edit size={16} />
                                </button>
                                <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" style={{ textAlign: "center" }}>
                            {showLowStock
                                ? "No hay productos con stock bajo"
                                : "No hay productos registrados"}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* PAGINACIÓN */}
            {!showLowStock && (
                <div className="pagination">
                    <button disabled={page === 0} onClick={() => setPage(page - 1)}>
                       Anterior
                    </button>
                    <span>Página {page + 1} de {totalPages}</span>
                    <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>
                        Siguiente
                    </button>
                </div>
            )}

            {/* 🧩 MODAL */}
            {showModal && (
                <ProductModal
                    onClose={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                    }}
                    onSave={editingProduct ? handleUpdate : handleCreate}
                    editingProduct={editingProduct}
                />
            )}
        </div>
    );
};
