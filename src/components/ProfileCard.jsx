import React from "react";
import { User } from "lucide-react";
import "../styles/profileCard.css";

const ProfileCard = ({ user, onClick }) => {
    return (
        <div className="profile-card-navbar" onClick={onClick}>
            <div className="profile-avatar-small">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
            </div>
            <div className="profile-info-small">
                <span className="profile-name">{user?.firstName} {user?.lastName}</span>
                <span className="profile-email">{user?.email}</span>
            </div>
        </div>
    );
};

export default ProfileCard;
