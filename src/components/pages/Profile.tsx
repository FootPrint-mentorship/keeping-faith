"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/profile.module.scss";
import { useAuthContext } from "@/contexts/AuthContext";

const Profile: React.FC = () => {
  const { profile, fetchProfile, updateProfile } = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [editableFields, setEditableFields] = useState({
    username: "",
    address: "",
    gender: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Only fetch profile once on component mount
  useEffect(() => {
    console.log('Fetching profile...');
    fetchProfile();
  }, []); // Remove fetchProfile from dependencies

  // Only set editable fields when profile changes AND we're not in edit mode
  useEffect(() => {
    if (profile && !editMode) {
      console.log('Setting initial profile data:', profile);
      setEditableFields({
        username: profile.username || "",
        address: profile.address || "",
        gender: profile.gender || "",
      });
    }
  }, [profile, editMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('Input changing:', { name, value, editMode });
    setEditableFields(prev => {
      const newFields = {
        ...prev,
        [name]: value
      };
      console.log('New editable fields:', newFields);
      return newFields;
    });
  };

  const handleImageClick = () => {
    console.log('Image clicked, editMode:', editMode);
    if (editMode) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log('New image selected');
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpdate = () => {
    console.log('Update button clicked, enabling edit mode');
    setEditMode(true);
  };

  const handleCancel = () => {
    console.log('Canceling edits');
    setEditMode(false);
    // Reset fields to original profile data
    if (profile) {
      setEditableFields({
        username: profile.username || "",
        address: profile.address || "",
        gender: profile.gender || "",
      });
    }
    setSelectedImage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile changes...');
    console.log('Current editable fields:', editableFields);
    console.log('Selected image:', selectedImage);
    
    try {
      setIsUpdating(true);
      const updateFormData = new FormData();
      
      updateFormData.append('username', editableFields.username);
      updateFormData.append('gender', editableFields.gender);
      updateFormData.append('address', editableFields.address);
      
      if (selectedImage) {
        updateFormData.append('profile_picture', selectedImage);
      }

      console.log('Sending update to API...');
      await updateProfile(updateFormData);
      console.log('Update successful');
      setEditMode(false);
      setSelectedImage(null);
      // Fetch fresh profile data after successful update
      await fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.profile}>
      <h2>Profile</h2>
      <form onSubmit={handleSave} className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profilePictureSection}>
            <span className={styles.label}>Profile Picture</span>
            <div className={styles.pictureContainer}>
              <Image
                src={selectedImage ? URL.createObjectURL(selectedImage) : (profile?.profile_picture || "/images/profileImage.jpeg")}
                alt="Profile"
                width={120}
                height={120}
                className={styles.profileImage}
                onClick={handleImageClick}
                style={{ cursor: editMode ? 'pointer' : 'default' }}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button 
                type="button" 
                className={styles.updateButton} 
                onClick={editMode ? handleCancel : handleUpdate}
              >
                {editMode ? 'Cancel' : 'Update'}
              </button>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <div className={styles.labelflex}>
                  <label htmlFor="fullname">Full Name</label>
                  <label htmlFor="username">Username</label>
                  <label htmlFor="email">Email Address</label>
                </div>

                <div className={styles.inputflex}>
                  <input
                    id="fullname"
                    type="text"
                    name="username"
                    value={editableFields.username}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                    style={{ backgroundColor: editMode ? 'white' : '#f5f5f5' }}
                  />
                  <input
                    id="username"
                    type="text"
                    value={editableFields.username}
                    disabled
                  />
                  <input
                    id="email"
                    type="email"
                    name="emailAddress"
                    value={profile?.email || ""}
                    disabled
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.labelflex}>
                  <label htmlFor="address">Address</label>
                  <label htmlFor="dateJoined">Date Joined</label>
                  <label htmlFor="gender">Gender</label>
                </div>

                <div className={styles.inputflex}>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={editableFields.address}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                    style={{ backgroundColor: editMode ? 'white' : '#f5f5f5' }}
                  />
                  <input
                    id="dateJoined"
                    type="text"
                    name="dateJoined"
                    value={profile ? new Date(profile.createdAt).toLocaleDateString() : ""}
                    disabled
                  />
                  <input
                    id="gender"
                    type="text"
                    name="gender"
                    value={editableFields.gender}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                    style={{ backgroundColor: editMode ? 'white' : '#f5f5f5' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {editMode && (
          <button 
            type="submit"
            className={styles.saveButton} 
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save'}
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
