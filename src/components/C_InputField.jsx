import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const C_InputField = ({ label, value, onChange }) => {
    const [isEditing, setEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(value);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        setEditing(false);
        onChange(editedValue);
    };

    const handleCancelClick = () => {
        setEditing(false);
        setEditedValue(value);
    };

    return (
        <div className="input-field">
            <label>{label}:</label>
            {isEditing ? (
                <div className="edit-input">
                    <input
                        type="text"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                    />
                    <FaSave onClick={handleSaveClick} />
                    <FaTimes onClick={handleCancelClick} />
                </div>
            ) : (
                <div className="edit-input">
                    {value}
                    <FaEdit onClick={handleEditClick} />
                </div>
            )}
        </div>
    );
};

export default C_InputField
