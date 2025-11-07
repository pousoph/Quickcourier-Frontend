import React, { useEffect, useState } from "react";
import {
    getUserAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "../../services/customer/addressService";
import "../../styles/addressManager.css";

const AddressManager = () => {
    const token = localStorage.getItem("accessToken");
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        zone: "",
        postalCode: "",
        isDefault: false,
    });

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            setLoading(true);
            const data = await getUserAddresses(token);
            setAddresses(data);
        } catch (err) {
            console.error(err);
            alert("Error al cargar las direcciones");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await updateAddress(token, editing.id, form);
                alert("Dirección actualizada correctamente");
            } else {
                await createAddress(token, form);
                alert("Dirección creada correctamente");
            }
            setForm({
                addressLine1: "",
                addressLine2: "",
                city: "",
                zone: "",
                postalCode: "",
                isDefault: false,
            });
            setEditing(null);
            loadAddresses();
        } catch (err) {
            alert("Error al guardar la dirección");
        }
    };

    const handleEdit = (addr) => {
        setEditing(addr);
        setForm({
            addressLine1: addr.addressLine1,
            addressLine2: addr.addressLine2 || "",
            city: addr.city,
            zone: addr.zone,
            postalCode: addr.postalCode || "",
            isDefault: addr.isDefault,
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta dirección?")) return;
        try {
            await deleteAddress(token, id);
            alert("Dirección eliminada correctamente");
            loadAddresses();
        } catch {
            alert("No se pudo eliminar la dirección");
        }
    };

    const handleSetDefault = async (id) => {
        try {
            await setDefaultAddress(token, id);
            alert("Dirección marcada como predeterminada");
            loadAddresses();
        } catch {
            alert("Error al establecer como predeterminada");
        }
    };

    return (
        <div className="address-container">
            <h2>Mis Direcciones</h2>

            <form onSubmit={handleSubmit} className="address-form">
                <h4>{editing ? "Editar dirección" : "Nueva dirección"}</h4>
                <input
                    type="text"
                    name="addressLine1"
                    placeholder="Dirección principal"
                    value={form.addressLine1}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="addressLine2"
                    placeholder="Referencia (opcional)"
                    value={form.addressLine2}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={form.city}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="zone"
                    placeholder="Zona"
                    value={form.zone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Código postal"
                    value={form.postalCode}
                    onChange={handleChange}
                />

                <label className="checkbox-line">
                    <input
                        type="checkbox"
                        name="isDefault"
                        checked={form.isDefault}
                        onChange={handleChange}
                    />
                    Establecer como predeterminada
                </label>

                <button type="submit" className="btn-primary">
                    {editing ? "Actualizar" : "Guardar"}
                </button>
            </form>

            <hr />

            {loading ? (
                <p>Cargando direcciones...</p>
            ) : addresses.length > 0 ? (
                <div className="address-list">
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            className={`address-card ${
                                addr.isDefault ? "default" : ""
                            }`}
                        >
                            <div>
                                <p><strong>{addr.addressLine1}</strong></p>
                                {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                                <p>{addr.city} - {addr.zone}</p>
                                {addr.postalCode && <p>C.P. {addr.postalCode}</p>}
                                {addr.isDefault && <span className="badge">Predeterminada</span>}
                            </div>
                            <div className="address-actions">
                                <button onClick={() => handleEdit(addr)}>Editar</button>
                                <button onClick={() => handleDelete(addr.id)}>Eliminar</button>
                                {!addr.isDefault && (
                                    <button onClick={() => handleSetDefault(addr.id)}>
                                        ⭐ Predeterminada
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tienes direcciones registradas.</p>
            )}
        </div>
    );
};

export default AddressManager;
