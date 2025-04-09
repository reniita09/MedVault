import React, { useState, useEffect } from 'react';

const EditDoctorModal = ({ doctor, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        degree: '',
        speciality: '',
        fees: '',
        experience: '',
        image: '', // Can be URL or file
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (doctor) {
            setFormData({
                name: doctor.name || '',
                email: doctor.email || '',
                degree: doctor.degree || '',
                speciality: doctor.speciality || '',
                fees: doctor.fees || '',
                experience: doctor.experience || '',
                image: doctor.image || '',
            });
            setImagePreview(doctor.image || '');
        }
    }, [doctor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = new FormData();

        updatedData.append('name', formData.name);
        updatedData.append('email', formData.email);
        updatedData.append('degree', formData.degree);
        updatedData.append('speciality', formData.speciality);
        updatedData.append('fees', formData.fees);
        updatedData.append('experience', formData.experience);

        if (imageFile) {
            updatedData.append('image', imageFile);
        }

        onSave(updatedData); // Now sending FormData
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
                <h2 className="text-xl font-semibold mb-4">Edit Doctor</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Degree</label>
                        <input
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Speciality</label>
                        <select
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        >
                            <option value="">Select Speciality</option>
                            <option value="General physician">General physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Fees</label>
                        <input
                            name="fees"
                            value={formData.fees}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Experience</label>
                        <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        >
                            <option value="">Select Years</option>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Year">2 Years</option>
                            <option value="3 Year">3 Years</option>
                            <option value="4 Year">4 Years</option>
                            <option value="5 Year">5 Years</option>
                            <option value="6 Year">6 Years</option>
                            <option value="8 Year">8 Years</option>
                            <option value="9 Year">9 Years</option>
                            <option value="10 Year">10 Years</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-2 w-32 h-32 object-cover rounded-md border"
                            />
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                    </div>

                </form>

                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default EditDoctorModal;
