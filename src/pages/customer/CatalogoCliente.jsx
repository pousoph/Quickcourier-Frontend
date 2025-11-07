import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/catalogo.css";
import { ShoppingCart, LogOut, User, Search } from "lucide-react";
import {
    getAllProducts,
    searchProducts,
    getProductsByCategory,
} from "../../services/customer/productService.js";
import ProfileCard from "../../components/ProfileCard.jsx";

export const CatalogoCliente = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [loading, setLoading] = useState(true);

    // Paginación
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !token) {
            navigate("/login");
            return;
        }
        setUser(storedUser);
        fetchProducts(0);
    }, [navigate]);

    const fetchProducts = async (pageNumber = 0) => {
        try {
            setLoading(true);
            const data = await getAllProducts(token, pageNumber, 6);
            setProducts(data.content || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (value, pageNumber = 0) => {
        setSearch(value);
        if (value.trim() === "") {
            fetchProducts(0);
            return;
        }
        try {
            const data = await searchProducts(token, value, pageNumber, 6);
            setProducts(data.content || []);
            setTotalPages(data.totalPages || 1);
            setPage(pageNumber);
        } catch (error) {
            console.error("Error al buscar productos:", error);
        }
    };

    const handleCategory = async (cat, pageNumber = 0) => {
        setSelectedCategory(cat);
        setPage(0);
        if (cat === "Todos") {
            fetchProducts(0);
            return;
        }

        const categoryMap = { Libros: 3, Snacks: 4, Accesorios: 5 };
        const categoryId = categoryMap[cat];

        try {
            const data = await getProductsByCategory(token, categoryId, pageNumber, 6);
            setProducts(data.content || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Error al filtrar por categoría:", error);
        }
    };

    const handleAddToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = storedCart.find((item) => item.id === product.id);

        let updatedCart;
        if (existing) {
            updatedCart = storedCart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...storedCart, { ...product, quantity: 1 }];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert(`${product.name} agregado al carrito`);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const nextPage = () => {
        if (page + 1 < totalPages) {
            setPage(page + 1);
            fetchProducts(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
            fetchProducts(page - 1);
        }
    };

    return (
        <div className="catalogo-container fade-in">
            {/* 🔝 NAVBAR */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <h2>QuickCourier</h2>
                    <p>Entregas urbanas rápidas</p>
                </div>

                <div className="navbar-actions">
                    <button className="cart-btn" onClick={() => navigate("/customer/cart")}>
                        <ShoppingCart size={18} /> Carrito
                    </button>

                    <ProfileCard user={user} onClick={() => navigate("/customer/profile")} />

                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                    </button>
                </div>
            </nav>

            {/* 🔍 BARRA DE FILTROS */}
            <div className="filters-bar">
                <div className="search-bar">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <div className="category-filters">
                    {["Todos", "Libros", "Snacks", "Accesorios"].map((cat) => (
                        <button
                            key={cat}
                            className={selectedCategory === cat ? "active" : ""}
                            onClick={() => handleCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* 🛍️ CATÁLOGO */}
            {loading ? (
                <p className="loading-text">Cargando productos...</p>
            ) : (
                <>
                    <div className="catalogo-grid">
                        {products.length > 0 ? (
                            products.map((prod) => (
                                <div key={prod.id} className="product-card">
                                    <img
                                        src={prod.imageUrl || "https://via.placeholder.com/300x200?text=Sin+Imagen"}
                                        alt={prod.name}
                                    />
                                    <div className="product-info">
                                        <h3>{prod.name}</h3>
                                        <p className="descripcion">{prod.description}</p>
                                        <div className="precio">
                                            <span className="monto">${prod.price?.toLocaleString()}</span>
                                            <span className="peso">{prod.weightKg}kg</span>
                                        </div>
                                        <div className="categoria-tag">
                                            {prod.category?.name || "General"}
                                        </div>
                                        <button
                                            className="btn-agregar"
                                            onClick={() => handleAddToCart(prod)}
                                        >
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-results">No hay productos disponibles</p>
                        )}
                    </div>

                    {/* 🔁 Paginación */}
                    <div className="pagination">
                        <button onClick={prevPage} disabled={page === 0}>
                            Anterior
                        </button>
                        <span>
                            Página {page + 1} de {totalPages}
                        </span>
                        <button onClick={nextPage} disabled={page + 1 >= totalPages}>
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
