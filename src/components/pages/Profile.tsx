"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/profile.module.scss";

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState({
    fullName: "Onome Rose",
    username: "Onome Rose",
    emailAddress: "OnomeRose@gmail.com",
    address: "Volta Lagos",
    dateJoined: "Onome Rose",
    gender: "Female",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle save functionality here
    console.log("Saving profile data:", profileData);
  };

  return (
    <div className={styles.profile}>
      <h2>Profile</h2>
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <div className={styles.profilePictureSection}>
          <span className={styles.label}>Profile Picture</span>
          <div className={styles.pictureContainer}>
            <Image
              src="/images/profileImage.jpeg"
              alt="Profile"
              width={120}
              height={120}
              className={styles.profileImage}
            />
            <button className={styles.updateButton}>Update</button>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <div className={styles.labelflex}>
                <label>Full Name</label>
                <label>Username</label>
                <label>Email Address</label>
              </div>

              <div className={styles.inputflex}>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleInputChange}
                />

                <input
                  type="email"
                  name="emailAddress"
                  value={profileData.emailAddress}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.labelflex}>
                <label>Address</label>
                <label>Date Joined</label>
                <label>Gender</label>
              </div>

              <div className={styles.inputflex}>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="dateJoined"
                  value={profileData.dateJoined}
                  onChange={handleInputChange}
                />

                <input
                  type="email"
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>


          
        </div>

      </div>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
    </div>
    </div>
  );
};

export default Profile;
