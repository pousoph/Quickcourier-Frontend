import React, { useEffect, useState } from "react";
import {
    getAllUsers,
    getUserById,
    updateUser,
} from "../../services/admin/userServiceAdmin.js";
import "../../styles/userManagement.css";

export const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [pageData, setPageData] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size] = useState(8);

    const token = localStorage.getItem("accessToken");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers(token, page, size);
            setUsers(data.content || []);
            setPageData(data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const handleEditClick = async (user) => {
        try {
            const userData = await getUserById(token, user.id);
            setSelectedUser(userData);
        } catch (error) {
            console.error("Error obteniendo usuario:", error);
        }
    };

    const handleSave = async () => {
        try {
            if (selectedUser) {
                await updateUser(token, selectedUser.id, selectedUser);
                setSelectedUser(null);
                fetchUsers();
            }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };


    return (
        <div className="container fade-in">

            <div className="card">
                <table className="styled-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    {user.firstName} {user.lastName}
                                </td>
                                <td>{user.email}</td>
                                <td>{user.phone || "—"}</td>
                                <td>{user.role}</td>
                                <td>
                    <span
                        className={
                            user.isActive ? "status-active" : "status-inactive"
                        }
                    >
                      {user.isActive ? "Activo" : "Inactivo"}
                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="7"
                                style={{
                                    textAlign: "center",
                                    padding: "20px",
                                    color: "var(--color-text-light)",
                                }}
                            >
                                No hay usuarios registrados.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                {/* 📖 Paginación */}
                <div className="pagination">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                        disabled={page === 0}
                        className="btn-secondary"
                    >
                        ◀ Anterior
                    </button>
                    <span>
            Página {page + 1} de {pageData.totalPages || 1}
          </span>
                    <button
                        onClick={() =>
                            setPage((prev) =>
                                pageData.totalPages && prev < pageData.totalPages - 1
                                    ? prev + 1
                                    : prev
                            )
                        }
                        disabled={!pageData.totalPages || page === pageData.totalPages - 1}
                        className="btn-secondary"
                    >
                        Siguiente ▶
                    </button>
                </div>
            </div>

            {/* ✨ Modal de edición */}
            {selectedUser && (
                <div className="modal">
                    <div className="modal-content fade-in">
                        <h2>Editar Usuario</h2>

                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={selectedUser.firstName}
                            onChange={(e) =>
                                setSelectedUser({ ...selectedUser, firstName: e.target.value })
                            }
                        />
                        <label>Apellido:</label>
                        <input
                            type="text"
                            value={selectedUser.lastName}
                            onChange={(e) =>
                                setSelectedUser({ ...selectedUser, lastName: e.target.value })
                            }
                        />
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            value={selectedUser.phone || ""}
                            onChange={(e) =>
                                setSelectedUser({ ...selectedUser, phone: e.target.value })
                            }
                        />
                        <label>Rol:</label>
                        <select
                            value={selectedUser.role}
                            onChange={(e) =>
                                setSelectedUser({ ...selectedUser, role: e.target.value })
                            }
                        >
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>
                            <option value="DRIVER">DRIVER</option>
                        </select>

                        <div className="modal-actions">
                            <button className="btn-primary" onClick={handleSave}>
                                💾 Guardar
                            </button>
                            <button
                                className="btn-cancel"
                                onClick={() => setSelectedUser(null)}
                            >
                                ❌ Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
