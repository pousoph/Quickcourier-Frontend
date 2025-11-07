import React, { useEffect, useState } from "react";
import { getUserAddresses, createAddress } from "../../services/customer/addressService";
import "../../styles/checkoutAddress.css";

const CheckoutStep1Address = ({ token, selectedAddress, setSelectedAddress, onNext }) => {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        zone: "",
        postalCode: "",
        isDefault: true,
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const data = await getUserAddresses(token);
            setAddresses(data);
            if (data.length > 0)
                setSelectedAddress(data.find((a) => a.isDefault) || data[0]);
        } catch (error) {
            console.error("Error al obtener direcciones:", error);
        }
    };

    const handleChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const created = await createAddress(token, newAddress);
            setAddresses([...addresses, created]);
            setSelectedAddress(created);
            setShowForm(false);
        } catch (error) {
            console.error("Error al crear dirección:", error);
        }
    };

    return (
        <div className="checkout-step">
            <h3>Dirección de entrega</h3>

            {addresses.length > 0 ? (
                <div className="address-list">
                    {addresses.map((addr) => (
                        <label
                            key={addr.id}
                            className={`address-card ${selectedAddress?.id === addr.id ? "active" : ""}`}
                        >
                            <input
                                type="radio"
                                name="address"
                                checked={selectedAddress?.id === addr.id}
                                onChange={() => setSelectedAddress(addr)}
                            />
                            <div>
                                <strong>{addr.addressLine1}</strong>
                                <p>{addr.city}, {addr.zone}</p>
                                <p className="addr-small">{addr.addressLine2}</p>
                            </div>
                        </label>
                    ))}
                </div>
            ) : (
                <p>No tienes direcciones guardadas</p>
            )}

            <button className="btn-secondary" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancelar" : "Agregar nueva dirección"}
            </button>

            {showForm && (
                <form className="address-form" onSubmit={handleSubmit}>
                    <input name="addressLine1" placeholder="Dirección principal" required onChange={handleChange} />
                    <input name="addressLine2" placeholder="Complemento (opcional)" onChange={handleChange} />
                    <div className="form-row">
                        <input name="city" placeholder="Ciudad" required onChange={handleChange} />
                        <input name="zone" placeholder="Zona" required onChange={handleChange} />
                    </div>
                    <input name="postalCode" placeholder="Código postal" onChange={handleChange} />
                    <button type="submit" className="btn-primary">Guardar dirección</button>
                </form>
            )}

            <div className="checkout-actions">
                <button className="btn-primary" disabled={!selectedAddress} onClick={onNext}>
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default CheckoutStep1Address;
